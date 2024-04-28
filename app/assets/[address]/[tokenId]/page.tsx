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
import MarketplaceV3Abi from "@/abis/MarketplaceV3.json";
import { aigcAbi } from "@/generated";
import { Listing, Metadata, Offer } from "@/types";
import { concatAddress, getContractAddress, openseaUrl } from "@/helpers";
import { getPublicClient } from "@/client";
import { ListingNFT } from "@/components/modal/listingNFTModal";
import Buy from "./buy";
import SPIntegration from "./sp-integration";
import RemixModal from "@/components/modal/remixModal";
import { AIGCContent } from "@/components/formAIGC";
import { getSrc } from "@livepeer/react/external";
import * as Player from "@livepeer/react/player";
import { useListingModal } from "@/utils/modalProvider";
import Image from "next/image";
import CancelOfferButton from "@/components/cancelOffer-button";

export default function Detail() {
  const params = useParams<{ address: string; tokenId: string }>();
  const { address: nftContract, tokenId } = params || {};
  const { showListingModal } = useListingModal();
  const remixModalRef = useRef<HTMLDialogElement>(null);
  const [original, setOriginal] = useState<AIGCContent>();
  const { address: connectedWallet, chain } = useAccount();
  const [metadata, setMetadata] = useState<Metadata>();
  const [animationUrl, setAnimationUrl] = useState<string>();
  const [listing, setListing] = useState<Listing[]>();
  const [offers, setOffers] = useState<Offer[]>();
  const [reFetch, setReFetch] = useState(false);
  const handleReFetch = () => {
    setReFetch(!reFetch);
  };

  useEffect(() => {
    const fetchCreateListing = async () => {
      if (!nftContract || !tokenId || !chain) return;
      const client = getPublicClient(chain);
      const marketplaceV3 = getContractAddress("MarketplaceV3", chain.id);
      if (!marketplaceV3) return;
      const logs = (await client.getContractEvents({
        address: marketplaceV3,
        abi: MarketplaceV3Abi,
        eventName: "NewListing",
        args: {
          assetContract: nftContract,
        },
        fromBlock: BigInt(5079109),
      })) as any;
      if (logs.length > 0) {
        const totalLength = logs.length - 1;
        const start = logs[0].args.listing.listingId;
        const end = logs[totalLength].args.listing.listingId;
        const allListings = await client.readContract({
          address: marketplaceV3,
          abi: MarketplaceV3Abi,
          functionName: "getAllListings",
          args: [start, end],
        });

        const results = (allListings as unknown as Listing[]).filter(
          (listing) => {
            const currentTimestamp = new Date().getTime();
            return (
              Number(listing.tokenId) === Number(tokenId) &&
              Number(listing.endTimestamp) * 1000 > currentTimestamp
            );
          }
        );
        if (results.length > 0) {
          setListing(results);
        }
      } else {
        setListing(undefined);
      }
    };
    const fetchOffers = async () => {
      if (!nftContract || !tokenId || !chain) return;
      const client = getPublicClient(chain);
      const marketplaceV3 = getContractAddress("MarketplaceV3", chain.id);
      if (!marketplaceV3) return;
      const logs = (await client.getContractEvents({
        address: marketplaceV3,
        abi: MarketplaceV3Abi,
        eventName: "NewOffer",
        args: {
          assetContract: nftContract,
        },
        fromBlock: BigInt(5079109),
      })) as any;

      if (logs.length > 0) {
        const totalLength = logs.length;
        const start = logs[0].args.offer.offerId;
        const end = logs[totalLength - 1].args.offer.offerId;
        const allOffer = await client.readContract({
          address: marketplaceV3,
          abi: MarketplaceV3Abi,
          functionName: "getAllValidOffers", //getAllOffers
          args: [start, end],
        });
        const results = (allOffer as unknown as Offer[]).filter((offer) => {
          return Number(offer.tokenId) === Number(tokenId);
        });
        if (results.length > 0) {
          setOffers(results);
        }
      } else {
        setOffers(undefined);
      }
    };
    fetchCreateListing();
    fetchOffers();
  }, [nftContract, tokenId, chain, reFetch]);

  // read contracts
  const aigcContractConfig = { address: nftContract as Address, abi: aigcAbi };
  const { data: aigcData } = useReadContracts({
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
    ],
  });

  const [modelName, ownerOf, tokenUri] = aigcData || [];

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
  return (
    <>
      <div className="flex items-center flex-col h-full gap-[50px] mt-[180px] relative px-10">
        <div className="flex gap-[50px] w-full justify-center">
          <div className="size-[650px] border border-white rounded">
            {!metadata ? (
              <div className="flex w-full h-[258px] justify-center items-center">
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
                <img
                  src={metadata.image}
                  alt={metadata.name}
                  className="w-full object-cover aspect-square"
                />
              )
            )}
          </div>
          <div className="flex flex-col w-1/2 max-w-[650px] gap-5">
            <div className="flex gap-4 items-center">
              {modelName?.result && (
                <a className="text-[30px] font-bold leading-none">
                  {modelName.result}
                </a>
              )}
              <div className="bg-white/30 mb-2 text-white font-bold max-h-[24px] h-full rounded flex items-center px-4">
                <a>text-to-text</a>
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

            {!isOwner && nftContract && tokenId && metadata && (
              <Buy
                nftContract={nftContract as Address}
                tokenId={tokenId}
                metadata={metadata}
                handleReFetch={handleReFetch}
              />
            )}
            <div className="relative w-full">
              <input
                type="text"
                placeholder="prompt"
                className="w-full h-[60px] border bg-transparent rounded px-7"
              />
              <div className="flex absolute gap-16 py-3 h-full items-center right-14 top-1/2 -translate-y-1/2">
                <div className="bg-white/40 h-full w-[1px]" />
                <a>remix</a>
              </div>
            </div>
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
                  <a>ethereum</a>
                </div>
                <div className="w-full flex justify-between gap-10">
                  <a>last updated</a>
                  <a>7 month age</a>
                </div>
                <div className="w-full flex justify-between gap-10">
                  <a>Creator Earnings</a>
                  <a>5%</a>
                </div>
                <div className="w-full flex justify-between gap-10">
                  <a>attribute</a>
                  <a>base model</a>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[650px] flex flex-col gap-[30px] h-full">
            <div className="border border-white w-full h-full rounded-md">
              <div className="py-5 border-b px-[30px] flex font-bold">
                listings
              </div>
              <div className="w-full h-full flex flex-col gap-6 px-5">
                <div className="w-full grid grid-cols-5 gap-5 pt-7 pb-5 justify-items-center items-center content-center border-b border-grey">
                  <a className="text-sm">price</a>
                  <a className="text-sm">use price</a>
                  <a className="text-sm">quantity</a>
                  <a className="text-sm text-center">floor difference</a>
                  <a className="text-sm">from</a>
                </div>
                {listing &&
                  listing?.map((list, index) => (
                    <div
                      className="w-full grid grid-cols-5 gap-5 pb-4 justify-items-center content-center border-b border-grey"
                      key={index}
                    >
                      <a className="">{formatEther(list.pricePerToken)} ETH</a>
                      <a className="">
                        ${" "}
                        {(
                          Number(formatEther(list.pricePerToken)) * 3000
                        ).toFixed(2)}
                      </a>
                      <a className="">{list.quantity.toString()}</a>
                      <a className="">31% below</a>
                      <a className="text-blue">
                        {concatAddress(list.listingCreator)}
                      </a>
                    </div>
                  ))}
              </div>
            </div>
            <div className="border border-white w-full h-full rounded-md">
              <div className="py-5 border-b px-[30px] flex font-bold">
                offers
              </div>
              <div className="w-full h-full flex flex-col gap-6 px-5">
                {/* filter offers to find if offeror = account */}
                <div
                  className={`w-full gap-5 pt-7 pb-5 justify-items-center content-center border-b border-grey grid grid-cols-5`}
                >
                  <a className="text-sm">price</a>
                  <a className="text-sm">quantity</a>
                  <a className="text-sm">expiration</a>
                  <a className="text-sm">from</a>
                </div>
                {offers &&
                  offers.map((offer, index) => (
                    <div
                      className="w-full grid grid-cols-5 gap-5 pb-4 justify-items-center content-center border-b border-grey"
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
                      <a>
                        {connectedWallet &&
                          connectedWallet === offer.offeror && (
                            <CancelOfferButton
                              offerId={offer.offerId.toString()}
                              handleReFetch={handleReFetch}
                            />
                          )}
                      </a>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {original && (
        <RemixModal
          ref={remixModalRef}
          modelIndex={1}
          aigtAddress={zeroAddress}
          nftContract={nftContract as Address}
          original={original}
        />
      )}
    </>
  );
}
