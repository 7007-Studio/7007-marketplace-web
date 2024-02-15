import { useState } from "react";
import Image from "next/image";
import { Address } from "viem";

import PromptStep from "./promptStep";
import MintStep from "./mintStep";
import { concatAddress, openseaUrl } from "@/helpers";

export interface AIGCContent {
  name: string;
  prompt: string;
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
  const [aigcContent, setAigcContent] = useState<AIGCContent>();
  const [isMinted, setIsMinted] = useState<string | number>();

  if (!aigcContent) {
    return (
      <PromptStep
        modelIndex={modelIndex}
        onArtGenerated={(metadata) => {
          setAigcContent(metadata);
        }}
      />
    );
  }

  if (!isMinted) {
    return (
      <MintStep
        modelIndex={modelIndex}
        aigtAddress={aigtAddress}
        aigcAddress={aigcAddress}
        aigcContent={aigcContent}
        setAigcContent={setAigcContent}
        onMintSuccess={(tokenId) => {
          setIsMinted(tokenId);
        }}
      />
    );
  }

  return (
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
        <span>Opensea link</span>
        <span>
          {isMinted && (
            <a href={openseaUrl(aigcAddress, isMinted)}>
              {openseaUrl(concatAddress(aigcAddress), isMinted)}
            </a>
          )}
        </span>
      </div>
      <div className="flex flex-row w-full gap-4">
        <div className="flex-1">
          <button
            type="button"
            className="btn btn-secondary w-full"
            onClick={() => {}}
          >
            Register NFT
          </button>
        </div>
        <div className="flex-1">
          <button
            type="button"
            className="btn btn-secondary w-full"
            onClick={() => {}}
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
              setIsMinted(undefined);
            }}
          >
            Generate again
          </button>
        </div>
      </div>
    </div>
  );
}
