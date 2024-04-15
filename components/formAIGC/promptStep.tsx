import { useMemo } from "react";
import { useAccount } from "wagmi";

import {
  useReadAigcFactoryDeployedAigCs,
  useReadAigcModelName,
  useReadAigcTokenId,
} from "@/generated";
import { getContractAddress } from "@/helpers";
import ArrowLeftIcon from "@/components/ui/arrowLeftIcon";

import { AIGCContent } from ".";
import PromptForm from "./promptForm";
import { Address } from "viem";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface PromptStepProps {
  nftContract: Address;
  onArtGenerated: (metadata: AIGCContent) => void;
  setAigcContent: (aigcContent?: AIGCContent) => void;
}

const PromptStep = ({
  nftContract,
  onArtGenerated,
  setAigcContent,
}: PromptStepProps) => {
  const { data: modelName } = useReadAigcModelName({
    address: nftContract,
  });
  const router = useRouter();
  const [userId, setUserId] = useState('jasonTest')
  // const [modelId, setModelId] = useState("0b52b440-8482-4a3a-8bcc-8bf4c2cbbaa2")
  const [prompt, setPrompt] = useState('jasonTest 6666666') 
  const [data, setData] = useState('')
  
  const { address } = useAccount();



  console.log('data', data)

  return (
    <div className="flex flex-col items-center w-full h-full">
      <a className="mb-[50px] text-[30px] font-bold text-center">
        Unleash imagination
      </a>
      {/* <button className="text-white" onClick={genImage}>Refresh</button> */}
      <div className="py-[50px] border-white border rounded-lg px-14 max-w-[954px]">
        <span
          onClick={() => {
            setAigcContent(undefined);
            router.back();
          }}
          className="flex flex-row gap-2 hover:cursor-pointer pb-10 opacity-40"
        >
          <ArrowLeftIcon className="text-white/40" /> Back
        </span>
        <PromptForm
          submitText="Prompt &amp; Mint"
          modelName={modelName || "Genesis Model"}
          onArtGenerated={onArtGenerated}
        />
      </div>
    </div>
  );
};

export default PromptStep;
