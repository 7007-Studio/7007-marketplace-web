"use client";

import { useState, useEffect } from "react";
import {
  Address,
  Chain,
  PublicClient,
  isAddress,
  isAddressEqual,
  stringToHex,
  zeroAddress,
} from "viem";
import SPLicenseRegistryAbi from "@/abis/SPLicenseRegistry.json";

import { getPublicClient } from "@/client";
import {
  useReadIpAssetRegistryIpId,
  useReadIpAssetRegistryIsRegistered,
  useWatchRootIpRegistered,
  useRegisterRootIp,
  useMintLicense,
} from "@story-protocol/react";
import { getContractAddress } from "@/helpers";
import { ListingNFT } from "@/components/modal/listingNFTModal";
import { useReadContract } from "wagmi";

async function getLicensesBelongToIpId(
  client: PublicClient,
  licenseRegistry: Address,
  ipId: Address,
  licensesOwned: { id: string; value: number }[]
) {
  return await Promise.allSettled(
    licensesOwned.map(async (l: { id: string; value: number }) => {
      const licensorIpId = await client.readContract({
        address: licenseRegistry,
        abi: SPLicenseRegistryAbi,
        functionName: "licensorIpId",
        args: [BigInt(l.id)],
      });

      return {
        ...l,
        isValid:
          typeof licensorIpId === "string" &&
          isAddress(licensorIpId) &&
          isAddressEqual(ipId, licensorIpId),
      };
    })
  ).then((results) => {
    const isFulfilled = (
      input: PromiseSettledResult<{
        id: string;
        value: number;
        isValid: boolean;
      }>
    ): input is PromiseFulfilledResult<{
      id: string;
      value: number;
      isValid: boolean;
    }> => input.status === "fulfilled";

    return results
      .filter(isFulfilled)
      .map((result) => result.value)
      .filter((l) => l.isValid);
  });
}

interface SPIntegrationProps {
  chain: Chain;
  connectedWallet: Address;
  nftContract: Address;
  tokenId: string;
  setListingLicense?: (license: ListingNFT) => void;
}

export default function SPIntegration({
  chain,
  connectedWallet,
  nftContract,
  tokenId,
  setListingLicense,
}: SPIntegrationProps) {
  // story protocol integration
  const [ipId, setIpId] = useState<Address>();

  const { data: _ipId } = useReadIpAssetRegistryIpId({
    args:
      chain === undefined || tokenId === undefined
        ? undefined
        : [BigInt(chain.id), nftContract as Address, BigInt(tokenId)],
  });

  useEffect(() => {
    if (_ipId) {
      console.debug("_idId fetched", _ipId);
      setIpId(_ipId);
    }
  }, [_ipId]);

  const { data: isRegistered, refetch: refetchIsRegistered } =
    useReadIpAssetRegistryIsRegistered({
      args: [ipId as Address],
    });
  useEffect(() => {
    if (!ipId) return;
    console.debug("refetchIsRegistered using ipId:", ipId);
    refetchIsRegistered();
  }, [ipId, refetchIsRegistered]);

  const { writeContract: registerRootIp } = useRegisterRootIp();
  useWatchRootIpRegistered({
    onLogs(logs) {
      const events = logs as unknown as {
        args: { caller: Address; ipId: Address; policyId: bigint };
      }[];
      setIpId(events[0].args.ipId);
    },
  });

  const { writeContract: mintLicense } = useMintLicense();
  // useWatchLicenseMinted({
  //   onLogs(logs) {
  //     const licensesBelongToIpId = await getLicensesBelongToIpId(
  //       client,
  //       licenseRegistry,
  //       ipId,
  //       licensesOwned
  //     );

  //     setLicenses(licensesBelongToIpId);
  //   }
  // })

  // Check if the token has licenses minted
  const [licenses, setLicenses] = useState<{ id: string; value: number }[]>();

  useEffect(() => {
    if (!connectedWallet || !chain.id || !ipId) return;

    const fetchTransferBatchEvents = async () => {
      const client: PublicClient = getPublicClient(chain);
      const licenseRegistry = getContractAddress("SPLicenseRegistry", chain.id);

      if (!client || !licenseRegistry) {
        return;
      }

      const logs = await client.getContractEvents({
        address: licenseRegistry,
        abi: SPLicenseRegistryAbi,
        eventName: "TransferSingle",
        args: {
          to: connectedWallet,
        },
        fromBlock: 5079109n,
      });

      const licensesOwned = (
        logs as unknown as { args: { id: bigint; value: bigint } }[]
      ).reduce((cur: { id: string; value: number }[], log) => {
        const {
          args: { id, value },
        } = log;

        const exist = cur.find((l) => {
          return l.id === String(id);
        });
        if (exist) {
          exist.value += Number(value);
        } else {
          cur.push({ id: String(id), value: Number(value) });
        }

        return cur;
      }, []);

      const licensesBelongToIpId = await getLicensesBelongToIpId(
        client,
        licenseRegistry,
        ipId,
        licensesOwned
      );

      console.debug("licensesBelongToIpId", licensesBelongToIpId);
      setLicenses(licensesBelongToIpId);
    };
    fetchTransferBatchEvents();
  }, [connectedWallet, chain, ipId]);

  if (isRegistered === undefined) {
    return null;
  }

  return (
    <div>
      {!isRegistered ? (
        <button
          className="btn btn-primary max-w-sm"
          onClick={() => {
            registerRootIp({
              args: [
                8n, // policyId
                nftContract as Address, // nftContract
                BigInt(tokenId),
                "7007 AIGC", //ipName,
                stringToHex("0x", { size: 32 }), //contentHash,
                "https://www.7007.studio/", //externalURL,
              ],
            });
          }}
        >
          Register IP
        </button>
      ) : (
        ipId && (
          <button
            className="btn btn-primary max-w-sm"
            onClick={() => {
              mintLicense({
                args: [
                  8n, // policyId,
                  ipId,
                  1n, // amount,
                  connectedWallet, // minter,
                  "0x", // royaltyContext
                ],
              });
            }}
          >
            Mint license
          </button>
        )
      )}

      {licenses && (
        <div>
          <h3 className="heading-md">Licenses</h3>
          <div className="flex flex-col gap-4">
            {licenses.map((l) => (
              <div key={l.id} className="flex flex-row items-baseline">
                <div>
                  License {l.id}: {l.value}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();

                    const licenseRegistry = getContractAddress(
                      "SPLicenseRegistry",
                      chain.id
                    );

                    if (!licenseRegistry) {
                      return;
                    }
                    setListingLicense?.({
                      address: licenseRegistry,
                      tokenId: BigInt(l.id),
                    });
                  }}
                  className="btn btn-primary"
                >
                  List License
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="btn btn-secondary"
                >
                  Remix
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
