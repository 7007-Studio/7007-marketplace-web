"use client";

import { useEffect, useRef, useState } from "react";
import { useAccount, useReadContracts } from "wagmi";
import { Address, isAddressEqual } from "viem";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import { aigcAbi } from "@/generated";
import { Metadata } from "@/types";
import { concatAddress, openseaUrl } from "@/helpers";
import ArrowLeftIcon from "@/components/arrowLeftIcon";
import Card from "@/components/card";
import ListingNFTModal, {
  ListingNFT,
} from "@/components/modal/listingNFTModal";
import Buy from "./buy";
import SPIntegration from "./sp-integration";

export default function Detail() {
  const router = useRouter();
  const params = useParams<{ address: string; tokenId: string }>();
  const { address: nftContract, tokenId } = params || {};

  const listingNFTModalRef = useRef<HTMLDialogElement>(null);
  const [listingNFT, setListingNFT] = useState<ListingNFT>();

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
    };

    fetchMetadata();
  }, [tokenUri]);

  // TODO: add "remix" functionality (mintLicense, linkIpToParent)

  const isOwner =
    ownerOf?.result &&
    connectedWallet &&
    isAddressEqual(ownerOf?.result, connectedWallet as Address);

  return (
    <>
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
                {!metadata ? (
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
                  {metadata && (
                    <div>
                      <p className="pb-4">{metadata.description}</p>
                      {metadata?.attributes?.map((attr) => (
                        <div
                          key={attr.trait_type}
                          className="grid grid-flow-col grid-cols-2 border-b-1"
                        >
                          <div>{attr.trait_type}:</div>
                          <div>{attr.value}</div>
                        </div>
                      ))}
                    </div>
                  )}
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
            {metadata && <h3 className="heading-md">{metadata.name}</h3>}
            {ownerOf?.result && (
              <p>Owned by {isOwner ? "You" : concatAddress(ownerOf.result)}</p>
            )}
            {!isOwner && nftContract && tokenId && (
              <Buy nftContract={nftContract as Address} tokenId={tokenId} />
            )}
            {chain && nftContract && tokenId && connectedWallet && (
              <SPIntegration
                chain={chain}
                connectedWallet={connectedWallet}
                nftContract={nftContract as Address}
                tokenId={tokenId}
                setListingLicense={(license: ListingNFT) => {
                  setListingNFT(license);
                  listingNFTModalRef.current?.showModal();
                }}
              />
            )}
          </div>
        </div>
      </div>
      <ListingNFTModal
        ref={listingNFTModalRef}
        listingNFT={listingNFT}
        // listingSuccess={() => {TODO: refresh the card state}}
      />
    </>
  );
}
