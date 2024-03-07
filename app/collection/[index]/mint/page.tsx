"use client";

import { useRouter, useParams } from "next/navigation";
import { useAccount } from "wagmi";

import {
  useReadAigcFactoryDeployedAigTs,
  useReadAigcFactoryDeployedAigCs,
} from "@/generated";
import { useIsMounted } from "@/hooks/useIsMounted";
import FormAIGC from "@/components/formAIGC";
import { getContractAddress } from "@/helpers";

export default function GenerateAIGC() {
  const router = useRouter();
  const { index } = useParams<{ index: string }>() || {};

  const { chainId } = useAccount();
  const aigcFactory = getContractAddress("AIGCFactory", chainId);

  const { data: aigtAddress } = useReadAigcFactoryDeployedAigTs({
    address: aigcFactory,
    args: index ? [BigInt(index)] : undefined,
    query: {
      enabled: !!index,
    },
  });
  const { data: aigcAddress } = useReadAigcFactoryDeployedAigCs({
    address: aigcFactory,
    args: index ? [BigInt(index)] : undefined,
    query: {
      enabled: !!index,
    },
  });

  const isMounted = useIsMounted();
  if (!isMounted) return null;

  return (
    <div className="h-full">
      {aigtAddress && aigcAddress && (
        <FormAIGC
          modelIndex={Number(index)}
          aigtAddress={aigtAddress}
          aigcAddress={aigcAddress}
        />
      )}
    </div>
  );
}
