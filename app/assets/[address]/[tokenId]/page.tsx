"use client";

import { aigcAbi, useWriteMarketplaceV3BuyFromListing } from "@/generated";
import MarketplaceV3Abi from "@/abis/MarketplaceV3.json";
import { useEffect, useState } from "react";
import axios from "axios";
import { Listing, Metadata } from "@/types";
import {
  concatAddress,
  formatDate,
  getContractAddress,
  openseaUrl,
} from "@/helpers";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import {
  useAccount,
  useReadContracts,
  useWaitForTransactionReceipt,
} from "wagmi";
import { Address, erc20Abi, formatEther, formatUnits, stringToHex } from "viem";
import ArrowLeftIcon from "@/components/arrowLeftIcon";
import Card from "@/components/card";
import { getPublicClient } from "@/client";
import { NATIVE_TOKEN_ADDRESS } from "@/constants";
import {
  useRegisterRootIp,
  useWatchRootIpRegistered,
  useMintLicense,
  useReadIpAssetRegistryIpId,
} from "@story-protocol/react";
import { useParams, useRouter } from "next/navigation";

export default function Detail() {
  const router = useRouter();
  const params = useParams<{ address: string; tokenId: string }>();
  const { address: nftContract, tokenId } = params || {};

  const { isConnected, address: connectedWallet, chainId } = useAccount();
  const { openConnectModal } = useConnectModal();

  const [metadataIsLoading, setMetadataIsLoading] = useState(true);
  const [metadata, setMetadata] = useState<Metadata>();
  const [animationUrl, setAnimationUrl] = useState<string>();

  const [listing, setListing] = useState<Listing>();

  const [buyInitialized, setBuyInitialized] = useState(false);

  // read contracts
  const aigcContractConfig = { address: nftContract as Address, abi: aigcAbi };
  const { data } = useReadContracts({
    contracts: [
      {
        ...aigcContractConfig,
        functionName: "modelName",
      },
      {
        ...aigcContractConfig,
        functionName: "ownerOf",
        args: tokenId ? [BigInt(tokenId)] : undefined,
      },
      {
        ...aigcContractConfig,
        functionName: "tokenURI",
        args: tokenId ? [BigInt(tokenId)] : undefined,
      },
      {
        address: listing?.currency,
        abi: erc20Abi,
        functionName: "decimals",
      },
      {
        address: listing?.currency,
        abi: erc20Abi,
        functionName: "symbol",
      },
    ],
  });
  const [modelName, owner, tokenUri, decimals, symbol] = data || [];

  useEffect(() => {
    if (!nftContract || !tokenId || !chainId) return;

    const marketplaceV3 = getContractAddress("MarketplaceV3", chainId);
    const fetchCreateListingEvents = async () => {
      const client = getPublicClient(chainId);
      const logs = await client.getContractEvents({
        address: marketplaceV3,
        abi: MarketplaceV3Abi,
        eventName: "NewListing",
        args: {
          assetContract: nftContract,
        },
        fromBlock: BigInt(5079109),
      });
      const results = (
        logs as unknown as { args: { listing: Listing } }[]
      ).filter((log) => {
        const {
          args: { listing },
        } = log;

        const currentTimestamp = new Date().getTime();
        return (
          Number(listing.tokenId) === Number(tokenId) &&
          Number(listing.endTimestamp) * 1000 > currentTimestamp
        );
      });

      if (results.length > 0) {
        setListing(results[0].args.listing);
      }
    };
    fetchCreateListingEvents();
  }, [nftContract, tokenId, chainId]);

  // write contracts
  const { writeContract: buyNft, data: buyNftTx } =
    useWriteMarketplaceV3BuyFromListing();

  const buyResult = useWaitForTransactionReceipt({
    hash: buyNftTx,
  });

  useEffect(() => {
    console.debug("buyResult changed");
    if (buyResult.isSuccess) {
      setBuyInitialized(false);
    }
  }, [buyResult.isSuccess]);

  // TODO: find creator of the token

  useEffect(() => {
    if (!tokenUri?.result) return;

    const fetchMetadata = async () => {
      const res = await axios.get(tokenUri.result);
      const metadata = res.data;

      setMetadata(res.data);

      if (metadata.animation_url) {
        setAnimationUrl(metadata.animation_url);
      }

      setMetadataIsLoading(false);
    };

    fetchMetadata();
  }, [tokenUri]);

  // story protocol integration
  const policyId = BigInt(3);
  const [ipId, setIpId] = useState<Address>();

  const { writeContract: registerRootIp } = useRegisterRootIp();

  useWatchRootIpRegistered({
    onLogs(logs) {
      console.log("Root IP registered", logs);
      const events = logs as unknown as {
        args: { caller: Address; ipId: Address; policyId: bigint };
      }[];
      setIpId(events[0].args.ipId);
    },
  });

  const { writeContract: mintLicense } = useMintLicense();

  // TODO: need to figure out if this NFT is already registered an IP
  const { data: _ipId } = useReadIpAssetRegistryIpId({
    args:
      chainId === undefined || tokenId === undefined
        ? undefined
        : [BigInt(chainId), nftContract as Address, BigInt(tokenId)],
  });

  useEffect(() => {
    if (_ipId) {
      setIpId(_ipId);
    }
  }, [_ipId]);
  // TODO: add "remix" functionality (mintLicense, linkIpToParent)

  if (!metadata) return;

  return (
    <div>
      <div className="py-10">
        <a
          onClick={() => router.back()}
          className="flex flex-row gap-2 hover:cursor-pointer"
        >
          <ArrowLeftIcon className="text-primary" /> Back
        </a>
      </div>
      <div className="grid grid-cols-3 gap-8">
        <div className="flex flex-col gap-y-2">
          <Card>
            <figure>
              {metadataIsLoading ? (
                <div className="flex w-full h-[258px] justify-center items-center">
                  <span className="loading loading-spinner loading-lg"></span>
                </div>
              ) : animationUrl ? (
                <div className="max-h-[254px] overflow-hidden">
                  <iframe src={animationUrl} width={258} height={258} />
                </div>
              ) : (
                metadata.image && (
                  <img
                    src={metadata.image}
                    alt={metadata.name}
                    className="w-full object-cover aspect-square"
                  />
                )
              )}
            </figure>

            <div className="card-body">
              <div>
                <h3 className="text-lg pb-2">Description</h3>
                <p className="pb-4">{metadata.description}</p>
              </div>
              <div>
                <h3 className="text-lg pb-2">Details</h3>
                <div className="opacity-100 transition-opacity ease-in-out duration-500">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>Contract Address</div>
                    {nftContract && (
                      <a
                        href={`https://sepolia.etherscan.io/address/${nftContract}`}
                        className="text-primary overflow-hidden"
                        target="_blank"
                      >
                        {concatAddress(nftContract)}
                      </a>
                    )}
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>Token ID</div>
                    <div>{tokenId}</div>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>Link</div>
                    {nftContract && (
                      <a
                        href={openseaUrl(nftContract, tokenId as string)}
                        className="text-primary overflow-hidden"
                        target="_blank"
                      >
                        View on OpenSea
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className="grid-cols-subgrid col-span-2 flex flex-col gap-y-2">
          {modelName?.result && (
            <h2 className="heading-lg">{modelName.result}</h2>
          )}
          <h3 className="heading-md">{metadata.name}</h3>
          {owner?.result && <p>Owned by {concatAddress(owner.result)}</p>}
          {listing && owner?.result !== connectedWallet && (
            <>
              <div className="pb-2 flex flex-col">
                <span>
                  Sale ends {formatDate(Number(listing.endTimestamp) * 1000)}
                </span>
                <span className="heading-md">
                  {decimals?.result
                    ? formatUnits(listing.pricePerToken, decimals.result)
                    : formatEther(listing.pricePerToken)}{" "}
                  {symbol?.result ? symbol.result : "ETH"}
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isConnected || !connectedWallet || !chainId) {
                    openConnectModal?.();
                    return;
                  }

                  const marketplaceV3 = getContractAddress(
                    "MarketplaceV3",
                    chainId
                  );
                  if (!marketplaceV3) return;

                  setBuyInitialized(true);
                  const args: [bigint, Address, bigint, Address, bigint] = [
                    listing.listingId,
                    connectedWallet,
                    listing.quantity,
                    listing.currency,
                    listing.pricePerToken,
                  ];
                  console.debug(args);
                  buyNft(
                    {
                      address: marketplaceV3,
                      value:
                        listing.currency === NATIVE_TOKEN_ADDRESS
                          ? listing.pricePerToken
                          : undefined,
                      args,
                    },
                    {
                      onError(error) {
                        console.debug("buyNft error", error);
                        setBuyInitialized(false);
                      },
                    }
                  );
                }}
                disabled={buyInitialized}
                className="btn btn-primary max-w-sm"
              >
                {buyInitialized ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    loading
                  </>
                ) : (
                  "Buy Now"
                )}
              </button>
            </>
          )}

          {!ipId && nftContract && tokenId && (
            <button
              className="btn btn-primary"
              onClick={() => {
                registerRootIp({
                  args: [
                    policyId,
                    nftContract as Address, // nftContract
                    BigInt(tokenId),
                    "", //ipName,
                    stringToHex("0x", { size: 32 }), //contentHash,
                    "", //externalURL,
                  ],
                });
              }}
            >
              Register IP
            </button>
          )}
          {nftContract && tokenId && connectedWallet && ipId && (
            <button
              className="btn btn-primary"
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
          )}
        </div>
      </div>
    </div>
  );
}
