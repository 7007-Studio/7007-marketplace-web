"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAccount, useReadContracts } from "wagmi";
import axios from "axios";
import {
  Address,
  erc20Abi,
  erc721Abi,
  formatEther,
  formatUnits,
  isAddressEqual,
} from "viem";

// skeleton
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// livepeer
import { getSrc } from "@livepeer/react/external";
import * as Player from "@livepeer/react/player";

import SPLicenseRegistry from "@/abis/SPLicenseRegistry.json";
import { useReadAigcName } from "@/generated";
import { Listing, Metadata, Offer } from "@/types";

import { formatDaysLeft } from "@/helpers";

import BuyButton from "@/components/buy-button";
import Card from "@/components/ui/card";
import { useListingModal } from "@/utils/modalProvider";
import { getPublicClient } from "@/client";
import { tr } from "@faker-js/faker";

function NFTCoverAsset({ metadata }: { metadata?: Metadata }) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleLoad = () => {
    setImageLoading(false);
  };

  if (!metadata) {
    return (
      <div className="relative border-y border-white bg-[#eee] pb-[100%]">
        <div className="flex w-full h-[258px] justify-center items-center absolute left-0 top-0">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );
  }

  if (metadata?.animation_url) {
    // if animation url starts with https:// do the following
    if (!metadata.animation_url.startsWith("https://vod")) {
      return (
        <div className="max-h-[258px] overflow-hidden absolute left-0 top-0">
          <iframe src={metadata.animation_url} width={258} height={258} />
        </div>
      );
    }
    const vodSource = {
      type: "vod",
      meta: {
        playbackPolicy: null,
        source: [
          {
            hrn: "HLS (TS)",
            type: "html5/application/vnd.apple.mpegurl",
            url: metadata.animation_url,
          },
        ],
      },
    };
    return (
      <Player.Root src={getSrc(vodSource)} autoPlay volume={0}>
        <Player.Container>
          <Player.Video
            title="Agent 327"
            style={{ height: "100%", width: "100%" }}
          />
        </Player.Container>
      </Player.Root>
    );
  }
  // console.log("metadata", metadata?.image);
  if (metadata?.image) {
    return (
      <>
        {!imageError ? (
          <div className="relative border-y border-white bg-[#eee] pb-[100%]">
            <Image
              src={metadata?.image}
              alt={metadata?.name}
              width={258}
              height={258}
              className="w-full object-cover aspect-square absolute left-0 top-0 bg-[#eee]"
              onError={handleError}
              onLoad={handleLoad}
            />
          </div>
        ) : (
          <div className="flex w-[258px] h-[258px] items-center justify-center border-y border-white bg-[#eee]">
            <span className="loading loading-spinner loading-lg text-black"></span>
          </div>
        )}
      </>
    );
  }

  return <div className="flex w-[258px] h-[258px]"></div>;
}
export interface NFTCardProps {
  nftContract: Address;
  tokenId: bigint;
  listing?: Listing;
  offer?: Offer;
}

const NFTCard: React.FC<NFTCardProps> = ({
  nftContract,
  tokenId,
  listing,
  offer,
}) => {
  const router = useRouter();
  const { address: connectedWallet, chainId, chain } = useAccount();
  const [hover, setHover] = useState(false);
  const [metadata, setMetadata] = useState<Metadata>();

  const { data: name } = useReadAigcName({
    address: nftContract,
  });

  const erc721Results = useReadContracts({
    contracts: [
      {
        address: nftContract,
        abi: erc721Abi,
        functionName: "ownerOf",
        args: [tokenId],
      },
      {
        address: nftContract,
        abi: erc721Abi,
        functionName: "tokenURI",
        args: [tokenId],
      },
    ],
  });
  const [isErc721, ownerOf, tokenURI] = useMemo(() => {
    if (!erc721Results?.isFetched || !erc721Results?.data) {
      return [];
    }

    return (
      [
        !erc721Results.data[0].error,
        ...(erc721Results.data.map((d: any) => d.result) as [Address, string]),
      ] || []
    );
  }, [erc721Results.isFetched, erc721Results.data]);

  const erc1155Results = useReadContracts({
    contracts: [
      {
        address: nftContract,
        abi: SPLicenseRegistry,
        functionName: "name",
      },
      {
        address: nftContract,
        abi: SPLicenseRegistry,
        functionName: "balanceOf",
        args: [connectedWallet, tokenId],
      },
      {
        address: nftContract,
        abi: SPLicenseRegistry,
        functionName: "imageUrl",
      },
      {
        address: nftContract,
        abi: SPLicenseRegistry,
        functionName: "uri",
        args: [tokenId],
      },
    ],
  });
  const [isErc1155, erc1155Name, balanceOf, imageUrl, uri] = useMemo(() => {
    if (!erc1155Results?.isFetched || !erc1155Results?.data) {
      return [];
    }
    return (
      [
        !erc1155Results.data[0].error,
        ...(erc1155Results.data.map((d: any) => d.result) as [
          string,
          bigint,
          string,
          string,
        ]),
      ] || []
    );
  }, [erc1155Results.isFetched, erc1155Results.data]);
  const { data: listingData } = useReadContracts({
    contracts: [
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
  const [decimals, symbol] = listingData || [];
  const isOwner =
    ownerOf && connectedWallet && isAddressEqual(ownerOf, connectedWallet);
  useEffect(() => {
    if (!nftContract) return;

    if (isErc721 && tokenURI) {
      const fetchMetadata = async () => {
        try {
          const res = await axios.get(tokenURI);
          setMetadata(res.data);
        } catch (error) {
          console.error("Error fetching metadata via:", tokenURI);
        }
      };

      fetchMetadata();
    }

    if (isErc1155 && uri) {
      const parseURI = () => {
        try {
          const decodedURI = atob(
            uri.replace("data:application/json;base64,", "")
          );
          const parsedMetadata = JSON.parse(decodedURI);
          setMetadata(parsedMetadata);
        } catch (error) {
          console.error("Error parsing URI:", error);
        }
      };

      parseURI();
    }
  }, [nftContract, isErc721, tokenURI, isErc1155, uri]);
  const { showListingModal } = useListingModal();
  return (
    <Card
      className={`w-[258px] h-full transition-all ${hover ? "drop-shadow-card" : ""}`}
    >
      <div className="h-[38px] px-[10px] flex items-center justify-between">
        <a className="text-white/40 text-sm">ID {tokenId?.toString()}</a>
        <a className="text-[10px] text-end">
          {metadata &&
            metadata.attributes &&
            metadata.attributes.find((a) => a.trait_type === "model")?.value}
        </a>
      </div>
      <div
        className="hover:cursor-pointer flex flex-col w-full h-full relative"
        onClick={() => router.push(`/assets/${nftContract}/${tokenId}`)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {metadata && <NFTCoverAsset metadata={metadata} />}

        <div
          className={`gap-2 pt-5 px-5 flex flex-col justify-between h-[190px]`}
        >
          <div className="flex flex-col gap-2">
            <a className="text-lg font-bold">
              {metadata?.name || <Skeleton count={1} />}
            </a>
            <div className="flex flex-col gap-1 text-md line-clamp-2">
              {(metadata &&
                metadata.attributes &&
                metadata.attributes
                  .filter(
                    (a) =>
                      a.trait_type === "positive_prompt" ||
                      a.trait_type === "negative_prompt" ||
                      a.trait_type === "prompt"
                  )
                  .map((prompt) => (
                    <a key={prompt.value} className="line-clamp-2">
                      {prompt.trait_type === "positive_prompt"
                        ? "Positive"
                        : prompt.trait_type === "negative_prompt"
                          ? "Negative"
                          : "Prompt"}
                      : {prompt.value}
                    </a>
                  ))) || <Skeleton count={2} />}
            </div>
          </div>
          {listing && (
            <div className="flex w-full justify-between gap-4 py-2 items-end">
              <div className="flex items-end gap-1">
                <a className="text-[20px]">
                  {decimals?.result && listing.pricePerToken
                    ? formatUnits(listing.pricePerToken, decimals.result)
                    : Number(formatEther(listing.pricePerToken)).toFixed(4) || (
                        <Skeleton />
                      )}
                  {" " || <Skeleton />}
                </a>
                <a className="">
                  {symbol?.result ? symbol.result : "ETH" || <Skeleton />}
                </a>
              </div>
              <a className="opacity-40 text-sm">
                {formatDaysLeft(Number(listing.endTimestamp) * 1000) || (
                  <Skeleton />
                )}
              </a>
            </div>
          )}
          {offer && (
            <div className="flex w-full justify-between gap-4 py-2 items-end">
              <div className="flex items-end gap-1">
                <a className="text-[20px]">
                  {decimals?.result && offer.totalPrice
                    ? formatUnits(offer.totalPrice, decimals.result)
                    : Number(formatEther(offer.totalPrice)).toFixed(4) || (
                        <Skeleton />
                      )}
                  {" " || <Skeleton />}
                </a>
                <a className="">
                  {symbol?.result ? symbol.result : "ETH" || <Skeleton />}
                </a>
              </div>
              <a className="opacity-40 text-sm">
                {formatDaysLeft(Number(offer.expirationTimestamp) * 1000) || (
                  <Skeleton />
                )}
              </a>
            </div>
          )}
        </div>
        {isOwner && hover && (
          <button
            onClick={(e) => {
              console.debug("List button clicked");
              e.stopPropagation();
              // show list modal for this (nftContract, tokenId, metadata)
              showListingModal({
                nftContract: nftContract,
                name: name || "",
                tokenId,
                metadata,
              });
            }}
            className={`w-full z-20 bg-white text-black font-bold transition-all flex justify-center items-center ${hover ? "h-12" : "h-0"}`}
            disabled={!!listing}
          >
            {!!listing ? "Listed" : "List for sale"}
          </button>
        )}

        {listing && !isOwner && hover && (
          <BuyButton listing={listing} hover={hover} className={"h-12"} />
        )}
      </div>
    </Card>
  );
};

export default NFTCard;
