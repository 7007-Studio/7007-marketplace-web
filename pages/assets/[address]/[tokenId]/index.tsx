import { useRouter } from "next/router";
import {
  useReadAigcModelName,
  useReadAigcOwnerOf,
  useReadAigcTokenUri,
  useReadErc20Decimals,
  useReadErc20Symbol,
  useReadMarketplaceV3,
  useWriteMarketplaceV3BuyFromListing,
} from "@/generated";
import MarketplaceV3Abi from "@/abis/MarketplaceV3.json";
import { useEffect, useState } from "react";
import axios from "axios";
import { Listing, Metadata } from "@/types";
import {
  concatAddress,
  formatDate,
  formatDaysLeft,
  getContractAddress,
  openseaUrl,
} from "@/helpers";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import { Abi, Address, formatEther, formatUnits } from "viem";
import ArrowLeftIcon from "@/components/arrowLeftIcon";
import Card from "@/components/card";
import { getPublicClient } from "@/client";
import { NATIVE_TOKEN_ADDRESS } from "@/constants";

export default function Detail() {
  const router = useRouter();
  const { address, tokenId } = router.query;

  const { isConnected, address: connectedWallet, chainId } = useAccount();
  const { openConnectModal } = useConnectModal();

  const [metadataIsLoading, setMetadataIsLoading] = useState(true);
  const [metadata, setMetadata] = useState<Metadata>();
  const [animationUrl, setAnimationUrl] = useState<string>();

  const [listing, setListing] = useState<Listing>();

  const [buyInitialized, setBuyInitialized] = useState(false);

  // read contracts
  const { data: modelName } = useReadAigcModelName({
    address: address as Address,
  });

  const { data: owner, refetch: refetchOwner } = useReadAigcOwnerOf({
    address: address as Address,
    args: tokenId ? [BigInt(tokenId as string)] : undefined,
  });

  const { data: tokenUri } = useReadAigcTokenUri({
    address: address as Address,
    args: tokenId ? [BigInt(tokenId as string)] : undefined,
  });

  useEffect(() => {
    if (!address || !tokenId || !chainId) return;

    const marketplaceV3 = getContractAddress("MarketplaceV3", chainId);
    const fetchCreateListingEvents = async () => {
      const client = getPublicClient(chainId);
      const logs = await client.getContractEvents({
        address: marketplaceV3,
        abi: MarketplaceV3Abi,
        eventName: "NewListing",
        args: {
          assetContract: address,
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
          Number(listing.tokenId) === Number(tokenId as string) &&
          Number(listing.endTimestamp) * 1000 > currentTimestamp
        );
      });

      if (results.length > 0) {
        setListing(results[0].args.listing);
      }
    };
    fetchCreateListingEvents();
  }, [address, chainId, tokenId]);

  const { data: decimals } = useReadErc20Decimals({
    address: listing?.currency,
  });
  const { data: symbol } = useReadErc20Symbol({
    address: listing?.currency,
  });

  // write contracts
  const { writeContract: buyNft, data: buyNftTx } =
    useWriteMarketplaceV3BuyFromListing();

  const buyResult = useWaitForTransactionReceipt({
    hash: buyNftTx,
  });
  useEffect(() => {
    console.debug("buyResult changed");
    if (buyResult.isSuccess) {
      // refetchOwner();
      // refetchIsListed();

      setBuyInitialized(false);
    }
  }, [buyResult]);

  // TODO: find creator of the token

  useEffect(() => {
    if (!tokenUri) return;

    const fetchMetadata = async () => {
      const res = await axios.get(tokenUri);
      const metadata = res.data;

      setMetadata(res.data);

      if (metadata.animation_url) {
        setAnimationUrl(metadata.animation_url);
      }

      setMetadataIsLoading(false);
    };

    fetchMetadata();
  }, [tokenUri]);

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
                    <a
                      href={`https://sepolia.etherscan.io/address/${address}`}
                      className="text-primary overflow-hidden"
                      target="_blank"
                    >
                      {concatAddress(address as Address)}
                    </a>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>Token ID</div>
                    <div>{tokenId}</div>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>Link</div>
                    <a
                      href={openseaUrl(address as Address, tokenId as string)}
                      className="text-primary overflow-hidden"
                      target="_blank"
                    >
                      View on OpenSea
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className="grid-cols-subgrid col-span-2 flex flex-col gap-y-2">
          <h2 className="heading-lg">{modelName}</h2>
          <h3 className="heading-md">{metadata.name}</h3>
          {owner && <p>Owned by {concatAddress(owner)}</p>}
          {listing && owner !== connectedWallet && (
            <>
              <div className="pb-2 flex flex-col">
                <span>
                  Sale ends {formatDate(Number(listing.endTimestamp) * 1000)}
                </span>
                <span className="heading-md">
                  {decimals
                    ? formatUnits(listing.pricePerToken, decimals)
                    : formatEther(listing.pricePerToken)}{" "}
                  {symbol ? symbol : "ETH"}
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
        </div>
      </div>
    </div>
  );
}
