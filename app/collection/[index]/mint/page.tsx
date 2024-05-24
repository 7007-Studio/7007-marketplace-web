"use client";

import { useParams } from "next/navigation";
// import { useAccount } from "wagmi";
import FormAIGC from "@/components/formAIGC";
import { ModelDetail } from "@/types";
import { modelData } from "@/constants/constants";
import { Address } from "viem";
import { getModelsData } from "@/helpers";
import { useAccount } from "wagmi";

export default function MintPage() {
  const { index } = useParams<{ index: string }>() || {};
  const { chainId } = useAccount();
  const modelList: ModelDetail[] | undefined = getModelsData(chainId);

  return (
    <div className="h-full w-[80%]">
      {index && modelList && (
        <FormAIGC modelData={modelList[Number(index)]} modelIndex={index} />
      )}
    </div>
  );
}
