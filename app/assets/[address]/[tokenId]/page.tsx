"use client";

import { useEffect, useRef, useState } from "react";
import { useAccount, useReadContracts } from "wagmi";
import {
  Address,
  formatEther,
  isAddressEqual,
  parseEther,
  zeroAddress,
} from "viem";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { aigcAbi } from "@/generated";
import { Listing, Metadata, Offer } from "@/types";
import {
  concatAddress,
  formatDate,
  getContractAddress,
  openseaUrl,
} from "@/helpers";
import Buy from "./buy";
import SPIntegration from "./sp-integration";
// import RemixModal from "@/components/modal/remixModal";
import { AIGCContent } from "@/components/formAIGC";
import { getSrc } from "@livepeer/react/external";
import * as Player from "@livepeer/react/player";
import { useListingModal } from "@/utils/modalProvider";
import Image from "next/image";
import CancelOfferButton from "@/components/cancelOffer-button";
import AcceptOfferButton from "@/components/acceptOffer-button";
import CancelListingButton from "@/components/cancelListing-button";
import useValidListings from "@/hooks/useValidListings";
import useAllListings from "@/hooks/useAllListings";
import useAllOffers from "@/hooks/useAllOffers";
import useValidOffers from "@/hooks/useValidOffers";
import { ListingType } from "@/enums/ListingType";
import BuyButton from "@/components/buy-button";
import Skeleton from "react-loading-skeleton";

export default function Detail() {
  const params = useParams<{ address: string; tokenId: string }>();
  const { address: nftContract, tokenId } = params || {};
  const { showListingModal } = useListingModal();
  const remixModalRef = useRef<HTMLDialogElement>(null);
  const [original, setOriginal] = useState<AIGCContent>();
  const { address: connectedWallet, chain } = useAccount();
  const [metadata, setMetadata] = useState<Metadata>();
  const [animationUrl, setAnimationUrl] = useState<string>();
  const [reFetch, setReFetch] = useState(false);
  const [ETHPrice, setETHPrice] = useState<string>("");
  const { listings } = useAllListings({
    chainId: chain?.id,
    tokenId: Number(tokenId),
    assetContract: nftContract as Address,
  });
  const { offers } = useValidOffers({
    chainId: chain?.id,
    tokenId: Number(tokenId),
    assetContract: nftContract as Address,
  });
  const handleReFetch = () => {
    setReFetch(!reFetch);
  };
  const getETHUSDPrice = async () => {
    const url = "https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT";
    try {
      const res = await axios.get(url);
      if (res.status !== 200) {
        throw new Error("Failed to fetch price");
      }
      const ethPrice = Number(res.data.price).toFixed(2);
      setETHPrice(ethPrice);
    } catch (error: any) {
      console.log(error);
    }
  };
  useEffect(() => {
    getETHUSDPrice();
  }, []);

  // read contracts
  const aigcContractConfig = { address: nftContract as Address, abi: aigcAbi };
  const { data: aigcData } = useReadContracts({
    contracts: [
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
    ],
  });
  const [ownerOf, tokenUri] = aigcData || [];

  useEffect(() => {
    if (!tokenUri?.result) return;

    const fetchMetadata = async () => {
      const res = await axios.get(tokenUri.result);
      const metadata = res.data;
      setMetadata(metadata);

      if (metadata.animation_url) {
        setAnimationUrl(metadata.animation_url);
      }

      setOriginal({
        name: metadata?.name || "",
        prompt:
          metadata?.attributes?.find(
            (a: { trait_type: string; value: string }) =>
              a.trait_type === "prompt"
          )?.value || "",
        imageUrl: metadata?.image,
      });
    };

    fetchMetadata();
  }, [tokenUri, reFetch]);

  const isOwner =
    ownerOf?.result &&
    connectedWallet &&
    isAddressEqual(ownerOf?.result, connectedWallet as Address);
  const currentTimestamp = Math.floor(Date.now() / 1000);

  const listingAction = (list: Listing) => {
    if (list.status === ListingType.CANCELLED) {
      return <a className="text-sm">Cancelled</a>;
    } else if (list.status === ListingType.COMPLETED) {
      return <a className="text-sm">Completed</a>;
    } else if (list.status === ListingType.CREATED) {
      if (currentTimestamp > Number(list.endTimestamp)) {
        return <a className="text-sm">Expired</a>;
      } else {
        if (list.listingCreator === connectedWallet) {
          return (
            <CancelListingButton
              listingId={list.listingId.toString()}
              handleReFetch={handleReFetch}
            />
          );
        } else {
          return <BuyButton listing={list} handleReFetch={handleReFetch} />;
        }
      }
    }
  };

  return (
    <>
      <div className="flex items-center flex-col h-full gap-[50px] mt-[180px] relative px-10">
        <div className="flex gap-[50px] w-full justify-center">
          <div className="w-1/2 max-w-[650px]">
            {!metadata ? (
              <div className="flex w-full h-[650px] justify-center items-center border border-white rounded">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            ) : animationUrl?.startsWith("https://vod") ? (
              <Player.Root
                src={getSrc({
                  type: "vod",
                  // @ts-ignore
                  meta: {
                    playbackPolicy: null,
                    source: [
                      {
                        hrn: "HLS (TS)",
                        type: "html5/application/vnd.apple.mpegurl",
                        url: animationUrl,
                      },
                    ],
                  },
                })}
                autoPlay
                volume={0}
              >
                <Player.Container>
                  <Player.Video
                    title="Agent 327"
                    style={{ height: "100%", width: "100%" }}
                  />
                </Player.Container>
              </Player.Root>
            ) : animationUrl ? (
              <div className="max-h-[254px] overflow-hidden">
                <iframe src={animationUrl} width={258} height={258} />
              </div>
            ) : (
              metadata.image && (
                <Image
                  src={metadata?.image}
                  alt={metadata?.name}
                  width={258}
                  height={258}
                  className="w-full object-contain aspect-square border border-white rounded"
                />
              )
            )}
          </div>
          <div className="flex flex-col w-1/2 max-w-[650px] gap-5">
            <div className="flex gap-4 items-center">
              {metadata?.attributes && (
                <a className="text-[30px] font-bold leading-none">
                  {metadata?.attributes.map((attr: any) => {
                    if (attr.trait_type === "model") {
                      return attr.value;
                    }
                  })}
                </a>
              )}
              <div className="bg-white/30 mb-2 text-white font-bold max-h-[24px] h-full rounded flex items-center px-4">
                <a>Text-To-Image</a>
              </div>
            </div>
            {metadata && <a className="text-[60px]">{metadata.name}</a>}
            {ownerOf?.result && (
              <div className="flex gap-4">
                <Image src="/avatar.svg" alt="avatar" width={22} height={22} />
                <a className="font-bold">
                  {isOwner ? "You" : concatAddress(ownerOf.result)}
                </a>
              </div>
            )}
            <div className="flex-wrap flex flex-col text-md line-clamp-4 gap-4">
              {(metadata &&
                metadata.attributes &&
                metadata.attributes
                  .filter(
                    (a) =>
                      a.trait_type === "positive_prompt" ||
                      a.trait_type === "negative_prompt"
                  )
                  .map((prompt) => (
                    <div key={prompt.value} className="">
                      <a className="font-semibold text-[28px]">
                        {prompt.trait_type === "positive_prompt"
                          ? "Positive"
                          : "Negative"}
                        :{" "}
                      </a>
                      <a className="text-[24px]">{prompt.value}</a>
                    </div>
                  ))) || <Skeleton count={5} />}
            </div>
            {!isOwner && nftContract && tokenId && metadata && (
              <Buy
                nftContract={nftContract as Address}
                tokenId={tokenId}
                metadata={metadata}
                handleReFetch={handleReFetch}
              />
            )}
            {/* <div className="relative w-full">
              <input
                type="text"
                placeholder="prompt"
                className="w-full h-[60px] border bg-transparent rounded px-7"
              />
              <div className="flex absolute gap-16 py-3 h-full items-center right-14 top-1/2 -translate-y-1/2">
                <div className="bg-white/40 h-full w-[1px]" />
                <a>remix</a>
              </div>
            </div> */}
            {/* {chain && nftContract && tokenId && connectedWallet && (
              <SPIntegration
                chain={chain}
                connectedWallet={connectedWallet}
                nftContract={nftContract as Address}
                tokenId={tokenId}
                setListingLicense={(license: ListingNFT) => {
                  showListingModal(license);
                }}
                onRemixClicked={() => {
                  remixModalRef?.current?.showModal();
                }}
              />
            )} */}
          </div>
          {/* {metadata && (
            <div>
              <p className="pb-4">{metadata.description}</p>
              {metadata?.attributes?.map((attr) => (
                <div
                  key={attr.trait_type}
                  className="grid grid-flow-col grid-cols-2 border-b-1"
                >
                  <div>{attr.trait_type}:</div>
                  <div className="break-all">{attr.value}</div>
                </div>
              ))}
            </div>
          )} */}
        </div>
        <div className="w-full flex pt-8 gap-[50px] h-full justify-center">
          <div className="w-[650px] flex flex-col gap-[30px] h-full">
            <div className="border border-white w-full h-full rounded-md">
              <div className="py-5 border-b px-[30px] flex font-bold">
                price history
              </div>
              <div className="w-full h-full flex flex-col"></div>
            </div>
            <div className="border border-white w-full h-full rounded-md">
              <div className="py-5 border-b px-[30px] flex font-bold">
                detail
              </div>
              <div className="w-full h-fit flex flex-col gap-6 py-5 px-[30px]">
                <div className="w-full flex justify-between gap-10">
                  <a>Contract Address</a>
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
                <div className="w-full flex justify-between gap-10">
                  <a>Token ID</a>
                  <a>{tokenId}</a>
                </div>
                <div className="w-full flex justify-between gap-10">
                  <div>Link</div>
                  {nftContract && (
                    <a
                      href={openseaUrl(nftContract, tokenId as string)}
                      className="text-blue overflow-hidden"
                      target="_blank"
                    >
                      View on OpenSea
                    </a>
                  )}
                </div>
                <div className="w-full flex justify-between gap-10">
                  <a>Token standard</a>
                  <a>ERC-7007</a>
                </div>
                <div className="w-full flex justify-between gap-10">
                  <a>chain</a>
                  <a>{chain?.name}</a>
                </div>
                <div className="w-full flex justify-between gap-10">
                  <a>last updated</a>
                  <a>1 month age</a>
                </div>
                <div className="w-full flex justify-between gap-10">
                  <a>Creator Earnings</a>
                  <a>5%</a>
                </div>
                {metadata?.attributes?.map((attr) => (
                  <div
                    key={attr.trait_type}
                    className="w-full flex justify-between gap-10"
                  >
                    <a>
                      {attr.trait_type === "positive_prompt"
                        ? "Positive Prompt"
                        : attr.trait_type === "negative_prompt"
                          ? "Negative Prompt"
                          : attr.trait_type}
                    </a>
                    {attr.trait_type === "music" ? (
                      <a
                        href={attr.value}
                        className="text-blue overflow-hidden"
                        target="_blank"
                      >
                        View on IPFS
                      </a>
                    ) : (
                      <a>{attr.value}</a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-[650px] flex flex-col gap-[30px] h-full">
            <div className="border border-white w-full h-full rounded-md">
              <div className="py-5 border-b px-[30px] flex font-bold">
                listings
              </div>
              <div className="w-full h-full flex flex-col gap-6 px-5">
                <div className="w-full grid grid-cols-6 gap-5 pt-7 pb-5 justify-items-center items-center content-center border-b border-grey">
                  <a className="text-sm">price</a>
                  <a className="text-sm">use price</a>
                  <a className="text-sm">quantity</a>
                  <a className="text-sm text-center">floor difference</a>
                  <a className="text-sm">from</a>
                </div>
                {listings &&
                  listings
                    .slice()
                    .reverse()
                    .map((list: Listing, index: number) => (
                      <div
                        className="w-full grid grid-cols-6 gap-5 pb-4 justify-items-center text-center items-center content-center border-b border-grey"
                        key={index}
                      >
                        <a className="">
                          {formatEther(list.pricePerToken)} ETH
                        </a>
                        <a className="">
                          ${" "}
                          {(
                            Number(formatEther(list.pricePerToken)) *
                            Number(ETHPrice)
                          ).toFixed(2)}
                        </a>
                        <a className="">{list.quantity.toString()}</a>
                        <a className="">31% below</a>
                        <a className="text-blue">
                          {connectedWallet &&
                          connectedWallet === list.listingCreator
                            ? "You"
                            : concatAddress(list.listingCreator)}
                        </a>
                        {listingAction(list)}
                      </div>
                    ))}
              </div>
            </div>
            <div className="border border-white w-full h-full rounded-md">
              <div className="py-5 border-b px-[30px] flex font-bold">
                offers
              </div>
              <div className="w-full h-full flex flex-col gap-6 px-5">
                {/* TODO:filter offers to find if offeror = account */}
                <div
                  className={`w-full gap-5 pt-7 pb-5 justify-items-center content-center border-b border-grey grid grid-cols-5`}
                >
                  <a className="text-sm">price</a>
                  <a className="text-sm">quantity</a>
                  <a className="text-sm">expiration</a>
                  <a className="text-sm">from</a>
                </div>
                {offers &&
                  offers.map((offer: Offer, index: number) => (
                    <div
                      className="w-full grid grid-cols-5 gap-5 pb-4 justify-items-center text-center items-center content-center border-b border-grey"
                      key={index}
                    >
                      <a className="">{formatEther(offer.totalPrice)} ETH</a>
                      <a className="">{offer.quantity.toString()}</a>
                      <a className="">{offer.expirationTimestamp.toString()}</a>
                      <a className="text-blue">
                        {connectedWallet && connectedWallet === offer.offeror
                          ? "You"
                          : concatAddress(offer.offeror)}
                      </a>
                      {connectedWallet && connectedWallet === offer.offeror && (
                        <CancelOfferButton
                          offerId={offer.offerId.toString()}
                          handleReFetch={handleReFetch}
                        />
                      )}
                      {connectedWallet &&
                        connectedWallet === ownerOf?.result && (
                          <AcceptOfferButton
                            offerId={offer.offerId.toString()}
                            handleReFetch={handleReFetch}
                          />
                        )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {original && (
        <RemixModal
          ref={remixModalRef}
          modelIndex={1}
          aigtAddress={zeroAddress}
          nftContract={nftContract as Address}
          original={original}
        />
      )} */}
    </>
  );
}
