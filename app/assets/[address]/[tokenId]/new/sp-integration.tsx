"use client";

import { useState, useEffect } from "react";
import { Address, stringToHex, zeroAddress } from "viem";
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

interface SPIntegrationProps {
  chainId: number;
  connectedWallet: Address;
  nftContract: Address;
  tokenId: string;
  setListingLicense?: (license: ListingNFT) => void;
}

export default function SPIntegration({
  chainId,
  connectedWallet,
  nftContract,
  tokenId,
  setListingLicense,
}: SPIntegrationProps) {
  // story protocol integration
  const policyId = BigInt(3);
  const [ipId, setIpId] = useState<Address>();

  const { data: _ipId } = useReadIpAssetRegistryIpId({
    args:
      chainId === undefined || tokenId === undefined
        ? undefined
        : [BigInt(chainId), nftContract as Address, BigInt(tokenId)],
  });

  useEffect(() => {
    console.debug("_idId fetched", _ipId);
    if (_ipId) {
      setIpId(_ipId);
    }
  }, [_ipId]);

  const { data: isRegistered, refetch: refetchIsRegistered } =
    useReadIpAssetRegistryIsRegistered({
      args: [ipId as Address],
    });
  useEffect(() => {
    console.debug("refetchIsRegistered ipId", ipId);
    refetchIsRegistered();
  }, [ipId, refetchIsRegistered]);

  useWatchRootIpRegistered({
    onLogs(logs) {
      const events = logs as unknown as {
        args: { caller: Address; ipId: Address; policyId: bigint };
      }[];
      setIpId(events[0].args.ipId);
    },
  });

  const { writeContract: registerRootIp } = useRegisterRootIp();
  const { writeContract: mintLicense } = useMintLicense();

  // Check if the token has licenses minted
  const [licenses, setLicenses] = useState<{ id: string; value: number }[]>();
  useEffect(() => {
    if (!connectedWallet || !chainId) return;

    const licenseRegistry = getContractAddress("SPLicenseRegistry", chainId);
    const fetchTransferBatchEvents = async () => {
      const client = getPublicClient(chainId);
      const logs = await client.getContractEvents({
        address: licenseRegistry,
        abi: SPLicenseRegistryAbi,
        eventName: "TransferSingle",
        args: {
          from: zeroAddress,
          to: connectedWallet,
        },
        fromBlock: BigInt(5079109),
      });
      console.debug(logs);

      const results = (
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

      setLicenses(results);
    };
    fetchTransferBatchEvents();
  }, [connectedWallet, chainId]);

  console.debug("SPIntegration");
  if (isRegistered === undefined) {
    return null;
  }

  console.debug("ipId", ipId);

  return (
    <div>
      {!isRegistered ? (
        <button
          className="btn btn-primary max-w-sm"
          onClick={() => {
            registerRootIp({
              args: [
                policyId,
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
                  policyId,
                  ipId,
                  BigInt(1), // amount,
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
                      chainId
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
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return null;
}
