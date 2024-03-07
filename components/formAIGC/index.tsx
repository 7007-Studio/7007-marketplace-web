import { useState } from "react";
import { useRouter } from "next/navigation";
import { Address } from "viem";

import PromptStep from "./promptStep";
import MintStep from "./mintStep";
import CompleteStep from "./completeStep";
import { useListingModal } from "@/utils/modalProvider";

export interface AIGCContent {
  name: string;
  prompt: string;
  seed?: number;
  imageUrl?: string;
}

interface FormAIGCProps {
  nftContract: Address;
}

export default function FormAIGC({ nftContract }: FormAIGCProps) {
  const router = useRouter();
  const [aigcContent, setAigcContent] = useState<AIGCContent>();
  const [mintedTokenId, setMintedTokenId] = useState<bigint>();

  const { showListingModal } = useListingModal();

  if (!aigcContent) {
    return (
      <PromptStep
        nftContract={nftContract}
        onArtGenerated={(_aigcContent) => {
          setAigcContent(_aigcContent);
        }}
      />
    );
  }

  if (!mintedTokenId) {
    return (
      <MintStep
        nftContract={nftContract}
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
      <CompleteStep
        nftContract={nftContract}
        mintedTokenId={mintedTokenId}
        onList={() => {
          showListingModal({
            address: nftContract,
            tokenId: BigInt(mintedTokenId),
            metadata: { name: aigcContent.name },
          });
        }}
        onGenerateAgain={() => {
          setAigcContent(undefined);
          setMintedTokenId(undefined);
        }}
      />
    </>
  );
}
