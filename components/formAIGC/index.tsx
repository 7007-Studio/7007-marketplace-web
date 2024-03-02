import { useRef, useState } from "react";
import Image from "next/image";
import { Address } from "viem";

import PromptStep from "./promptStep";
import MintStep from "./mintStep";
import { concatAddress, openseaUrl } from "@/helpers";
import ConnectToSPModal from "../modal/connectToSPModal";
import ListingNFTModal, { ListingNFT } from "../modal/listingNFTModal";
import { useRouter } from "next/navigation";

export interface AIGCContent {
  name: string;
  prompt: string;
  seed?: number;
  imageUrl?: string;
  audioUrl?: string;
}

interface FormAIGCProps {
  modelIndex: number;
  aigtAddress: Address;
  aigcAddress: Address;
}

export default function FormAIGC({
  modelIndex,
  aigtAddress,
  aigcAddress,
}: FormAIGCProps) {
  const router = useRouter();
  const [aigcContent, setAigcContent] = useState<AIGCContent>();
  const [mintedTokenId, setMintedTokenId] = useState<string | number>();

  const listingNFTModalRef = useRef<HTMLDialogElement>(null);
  const [listingNFT, setListingNFT] = useState<ListingNFT>();

  const connectToSPModalRef = useRef<HTMLDialogElement>(null);

  if (!aigcContent) {
    return (
      <PromptStep
        modelIndex={modelIndex}
        onArtGenerated={(_aigcContent) => {
          setAigcContent(_aigcContent);
        }}
      />
    );
  }

  if (!mintedTokenId) {
    return (
      <MintStep
        modelIndex={modelIndex}
        aigtAddress={aigtAddress}
        aigcAddress={aigcAddress}
        aigcContent={aigcContent}
        setAigcContent={setAigcContent}
        onMintSuccess={(tokenId) => {
          setMintedTokenId(tokenId);
        }}
      />
    );
  }

  return (
    <>
      <div className="flex flex-col max-w-[552px] mx-auto mt-24 justify-center items-center gap-10">
        <Image src="/check.svg" alt="NFT minted" width={160} height={160} />
        <div className="px-4 text-center">
          <h2 className="heading-lg">Your NFT was minted successfully!</h2>
        </div>
        <div className="flex flex-row px-12 w-full justify-between">
          <span>Contract Address</span>
          <span>{concatAddress(aigcAddress)}</span>
        </div>

        <div className="flex flex-row px-12 w-full justify-between">
          <span>Link</span>
          <span>
            {mintedTokenId && (
              <a href={openseaUrl(aigcAddress, mintedTokenId)}>
                View on OpenSea
              </a>
            )}
          </span>
        </div>
        <div className="flex flex-row w-full items-center gap-4">
          <div className="flex-1">
            <button
              type="button"
              className="btn btn-secondary w-full"
              onClick={() => {
                connectToSPModalRef.current?.showModal();
              }}
            >
              Register NFT
            </button>
          </div>

          <div
            className="tooltip -mx-3"
            data-tip="Protect your Intellectual Property.&#10;Prove ownership of your Artworks.&#10;Disclose AI usage.&#10;Publish and monetize your Artworks."
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex-1">
            <button
              type="button"
              className="btn btn-secondary w-full"
              onClick={() => {
                setListingNFT({
                  address: aigcAddress,
                  tokenId: BigInt(mintedTokenId),
                  metadata: { name: aigcContent.name },
                });
                listingNFTModalRef.current?.showModal();
              }}
            >
              Listing
            </button>
          </div>
          <div className="flex-1">
            <button
              type="button"
              className="btn btn-primary w-full"
              onClick={() => {
                setAigcContent(undefined);
                setMintedTokenId(undefined);
              }}
            >
              Generate again
            </button>
          </div>
        </div>
      </div>

      <ListingNFTModal
        ref={listingNFTModalRef}
        listingNFT={listingNFT}
        listingSuccess={() => {
          router.push("/");
        }}
      />
      <ConnectToSPModal
        ref={connectToSPModalRef}
        onConnect={() => {}}
        tokenId={BigInt(mintedTokenId)}
        nftContract={aigcAddress}
      />
    </>
  );
}
