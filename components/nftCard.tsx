import { useEffect, useState } from "react";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import axios from "axios";
import { Listing, Metadata, MetadataAttribute } from "@/types";
import { NATIVE_TOKEN_ADDRESS } from "@/constants";
import { Address, formatEther, formatUnits } from "viem";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Card from "./card";
import {
  concatAddress,
  formatDaysLeft,
  getContractAddress,
  openseaUrl,
} from "@/helpers";
import { ListingNFT } from "./modal/listingNFTModal";
import {
  useReadAigcModelName,
  useReadAigcOwnerOf,
  useReadAigcTokenUri,
  useReadErc20Decimals,
  useReadErc20Symbol,
  useWriteMarketplaceV3BuyFromListing,
} from "@/generated";
export interface NFTCardProps {
  aigcAddress: Address;
  tokenId: string | number;
  onListingNFT?: ({ tokenId, metadata }: ListingNFT) => void;
  onConnectToSP?: () => void;
  listing?: Listing;
}

const NFTCard: React.FC<NFTCardProps> = ({
  aigcAddress,
  tokenId,
  onListingNFT,
  onConnectToSP,
  listing,
}) => {
  const { isConnected, address: connectedWallet, chainId } = useAccount();
  const { openConnectModal } = useConnectModal();

  const [isCollapsed, setIsCollapsed] = useState(true);
  const [metadataIsLoading, setMetadataIsLoading] = useState(true);
  const [metadata, setMetadata] = useState<Metadata>();
  const [animationUrl, setAnimationUrl] = useState<string>();
  const [audioUrl, setAudioUrl] = useState();

  const [buyInitialized, setBuyInitialized] = useState(false);

  // read contracts
  const { data: modelName } = useReadAigcModelName({
    address: aigcAddress,
  });

  const { data: owner, refetch: refetchOwner } = useReadAigcOwnerOf({
    address: aigcAddress,
    args: [BigInt(tokenId)],
  });

  const { data: tokenUri } = useReadAigcTokenUri({
    address: aigcAddress,
    args: [BigInt(tokenId)],
  });

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
    if (!aigcAddress || !tokenUri) return;

    const fetchMetadata = async () => {
      const res = await axios.get(tokenUri);
      const metadata = res.data;

      setMetadata(res.data);

      if (metadata.animation_url) {
        setAnimationUrl(metadata.animation_url);
      }

      const audioUrl = metadata.attributes.find(
        (a: MetadataAttribute) => a.trait_type === "Audio"
      )?.value;
      if (audioUrl) setAudioUrl(audioUrl);

      setMetadataIsLoading(false);
    };

    fetchMetadata();
  }, [aigcAddress, tokenUri]);

  if (!metadata) return;

  return (
    <Card className="w-[258px]">
      <div className="flex py-4 px-6 justify-between items-center">
        <span>DATE</span>
        {modelName && (
          <span className="badge badge-lg text-[#FF78F1] bg-[#FF78F1]/[0.12]">
            {modelName}
          </span>
        )}
      </div>

      <figure>
        {metadataIsLoading ? (
          <div className="flex w-full h-[258px] justify-center items-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : animationUrl ? (
          <div className="max-h-[254px] overflow-hidden">
            <iframe src={animationUrl} width={512} height={512} />
          </div>
        ) : (
          metadata.image && (
            <Image
              src={metadata.image}
              alt={metadata.name}
              width={512}
              height={512}
              className="w-full object-cover aspect-square"
            />
          )
        )}
      </figure>

      <div className="card-body flex-grow gap-2">
        <h3 className="heading-md">{metadata.name}</h3>
        <p className="pb-4">{metadata.description}</p>

        {listing && owner !== connectedWallet && (
          <>
            <div className="pb-2 flex flex-row justify-between items-baseline">
              <span className="heading-md">
                {decimals
                  ? formatUnits(listing.pricePerToken, decimals)
                  : formatEther(listing.pricePerToken)}{" "}
                {symbol ? symbol : "ETH"}
              </span>
              <span className="text-sm">
                {formatDaysLeft(Number(listing.endTimestamp) * 1000)}
              </span>
            </div>
            <button
              onClick={() => {
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
              className="btn btn-primary"
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
        {aigcAddress && connectedWallet === owner && (
          <button
            onClick={() => {
              onListingNFT?.({ address: aigcAddress, tokenId, metadata });
            }}
            className="btn btn-primary"
            disabled={!!listing}
          >
            {!!listing ? "Listed" : "List"}
          </button>
        )}

        <button
          className="pt-8 flex flex-row justify-between items-center"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <div>{isCollapsed ? "View more" : "Collapse"}</div>
          <svg
            className="w-4 h-4 transform text-primary"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
            viewBox="0 0 24 24"
            stroke="currentColor"
            style={{
              transform: isCollapsed ? "rotate(0)" : "rotate(-90deg)",
              transition: "all 0.25s ease-in-out ",
            }}
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <div
          className={`${
            isCollapsed
              ? "opacity-0 max-h-0 hidden"
              : "opacity-100 transition-opacity ease-in-out duration-500"
          } `}
        >
          {aigcAddress && (
            <div className="flex flex-col md:flex-row md:items-center md:justify-between text-sm leading-5">
              <div>Contract Address</div>
              <a
                href={`https://sepolia.etherscan.io/address/${aigcAddress}`}
                className="text-primary overflow-hidden"
                target="_blank"
              >
                {concatAddress(aigcAddress)}
              </a>
            </div>
          )}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between text-sm leading-5">
            <div>Token ID</div>
            <div>{tokenId}</div>
          </div>

          {aigcAddress && (
            <div className="flex flex-col md:flex-row md:items-center md:justify-between text-sm leading-5">
              <div>Link</div>
              <a
                href={openseaUrl(aigcAddress, tokenId as string)}
                className="text-primary overflow-hidden"
                target="_blank"
              >
                View on OpenSea
              </a>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default NFTCard;
