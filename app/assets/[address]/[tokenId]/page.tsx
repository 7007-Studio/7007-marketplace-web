"use client";

import { useEffect, useRef, useState } from "react";
import { useAccount, useReadContracts } from "wagmi";
import { Address, isAddressEqual, zeroAddress } from "viem";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { CiClock1 } from "react-icons/ci";

import { aigcAbi } from "@/generated";
import { Metadata } from "@/types";
import { concatAddress, openseaUrl } from "@/helpers";
import ArrowLeftIcon from "@/components/ui/arrowLeftIcon";
import Card from "@/components/ui/card";
import { ListingNFT } from "@/components/modal/listingNFTModal";
import Buy from "./buy";
import SPIntegration from "./sp-integration";
import RemixModal from "@/components/modal/remixModal";
import { AIGCContent } from "@/components/formAIGC";
import { getSrc } from "@livepeer/react/external";
import * as Player from "@livepeer/react/player";
import { useListingModal } from "@/utils/modalProvider";
import Image from "next/image";

export default function Detail() {
  const router = useRouter();
  const params = useParams<{ address: string; tokenId: string }>();
  const { address: nftContract, tokenId } = params || {};

  const { showListingModal } = useListingModal();

  const remixModalRef = useRef<HTMLDialogElement>(null);
  const [original, setOriginal] = useState<AIGCContent>();

  const { address: connectedWallet, chain } = useAccount();

  const [metadata, setMetadata] = useState<Metadata>();
  const [animationUrl, setAnimationUrl] = useState<string>();

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
  }, [tokenUri]);

  const isOwner =
    ownerOf?.result &&
    connectedWallet &&
    isAddressEqual(ownerOf?.result, connectedWallet as Address);

  return (
    <>
      <div className="flex items-center flex-col h-full gap-[50px] mt-[180px] relative">
        {/* <a
          onClick={() => router.back()}
          className="flex flex-row gap-2 hover:cursor-pointer absolute top-0 left-10 p-4"
        >
          <ArrowLeftIcon className="text-primary" /> Back
        </a> */}
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
            <div className="flex w-full flex-col mt-20 py-7 px-6 gap-7 bg-grey rounded-xl">
              <div className="flex items-center gap-2">
                <CiClock1 size={25} />
                <a>Sale ends 01/01/2022 at 17:77</a>
              </div>
              <div className="space-y-2">
                <a>current price</a>
                <div className="flex gap-2 items-end">
                  <a className="text-[45px] leading-none">7.77 ETH</a>
                  <a className="text-[12px] pb-1">$ 77,777</a>
                </div>
              </div>
              <div className="flex gap-5">
                <button className="w-[47%] bg-white text-black font-bold transition-all flex justify-center items-center h-[45px] rounded">
                  buy now
                </button>
                <button className="w-[47%] bg-transparent text-white flex justify-center items-center border border-white h-[45px] rounded">
                  make offer
                </button>
              </div>
            </div>
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
                  <a>
                    {nftContract && (
                      <a
                        href={`https://sepolia.etherscan.io/address/${nftContract}`}
                        className="text-primary overflow-hidden"
                        target="_blank"
                      >
                        {concatAddress(nftContract)}
                      </a>
                    )}
                  </a>
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
                      className="text-primary overflow-hidden"
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
                <div className="w-full grid grid-cols-5 gap-5 pt-7 pb-5 justify-items-center content-center border-b border-grey">
                  <a className="text-sm">price</a>
                  <a className="text-sm">use price</a>
                  <a className="text-sm">quantity</a>
                  <a className="text-sm">floor difference</a>
                  <a className="text-sm">from</a>
                </div>
                <div className="w-full grid grid-cols-5 gap-5 pb-4 justify-items-center content-center border-b border-grey">
                  <a className="">17.77 ETH</a>
                  <a className="">$17,967.16</a>
                  <a className="">7</a>
                  <a className="">31% below</a>
                  <a className="text-blue">0x77..777</a>
                </div>
              </div>
            </div>
            <div className="border border-white w-full h-full rounded-md">
              <div className="py-5 border-b px-[30px] flex font-bold">
                offers
              </div>
              <div className="w-full h-full flex flex-col gap-6 px-5">
                <div className="w-full grid grid-cols-4 gap-5 pt-7 pb-5 justify-items-center content-center border-b border-grey">
                  <a className="text-sm">price</a>
                  <a className="text-sm">quantity</a>
                  <a className="text-sm">expiration</a>
                  <a className="text-sm">from</a>
                </div>
                <div className="w-full grid grid-cols-4 gap-5 pb-4 justify-items-center content-center border-b border-grey">
                  <a className="">17.77 ETH</a>
                  <a className="">7</a>
                  <a className="">30 days</a>
                  <a className="text-blue">0x77..777</a>
                </div>
              </div>
            </div>
          </div>

          {/* {!isOwner && nftContract && tokenId && (
            <Buy nftContract={nftContract as Address} tokenId={tokenId} />
          )} */}
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
