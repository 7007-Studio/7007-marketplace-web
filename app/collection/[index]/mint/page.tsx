"use client";

import { useParams } from "next/navigation";
// import { useAccount } from "wagmi";
import FormAIGC from "@/components/formAIGC";
import { ModelDetail } from "@/types";
import { modelData } from "@/constants/constants";
import { Address } from "viem";

export default function MintPage() {
  const { index } = useParams<{ index: string }>() || {};
  const modelInfo: ModelDetail[] = modelData;

  return (
    <div className="h-full w-[80%]">
      {index && <FormAIGC modelData={modelInfo[Number(index)]} />}
    </div>
  );
}
