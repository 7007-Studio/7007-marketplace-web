"use client";

import { AIGC_FACTORY_CONTRACT_ADDRESS } from "@/constants";
import {
  useReadAigcFactoryDeployedAigTs,
  useReadAigcFactoryDeployedAigCs,
} from "@/generated";
import { useIsMounted } from "@/hooks/useIsMounted";
import FormAIGC from "@/components/formAIGC";
import { useParams } from "next/navigation";

export default function GenerateAIGC() {
  const params = useParams<{ index: string }>();
  const index = params?.index;

  const { data: aigtAddress } = useReadAigcFactoryDeployedAigTs({
    address: AIGC_FACTORY_CONTRACT_ADDRESS,
    args: index ? [BigInt(index)] : undefined,
    query: {
      enabled: !!index,
    },
  });
  const { data: aigcAddress } = useReadAigcFactoryDeployedAigCs({
    address: AIGC_FACTORY_CONTRACT_ADDRESS,
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
