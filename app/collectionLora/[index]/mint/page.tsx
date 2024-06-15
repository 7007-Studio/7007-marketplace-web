"use client";

import { useParams } from "next/navigation";
// import { useAccount } from "wagmi";
import FormAIGC from "@/components/formAIGC";
import { ModelDetail } from "@/types";
import { modelData } from "@/constants/constants";
import { Address } from "viem";
import { getModelsData } from "@/helpers";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";
import PromptFormLora from "@/components/formAIGC/promptFormLora";

export default function MintPage() {
  const { index } = useParams<{ index: string }>() || {};
  const { chainId } = useAccount();
  const modelList: ModelDetail[] | undefined = getModelsData(chainId);
  const router = useRouter();

  return (
    <div className="h-full w-[80%]">
      {index && modelList && (
        <div className="flex flex-col items-center w-full h-full">
          <a className="mb-[50px] text-[30px] font-bold text-center">
            Unleash imagination
          </a>
          <div className="py-[50px] border-white border rounded-lg px-14 max-w-[954px]">
            <span
              onClick={() => {
                router.back();
              }}
              className="flex flex-row gap-2 hover:cursor-pointer pb-10 opacity-40"
            >
              <ArrowLeftIcon className="text-white/40" /> Back
            </span>
            <PromptFormLora
              submitText="Prompt"
              modelData={modelList[parseInt(index)]}
            />
          </div>
        </div>
      )}
    </div>
  );
}
