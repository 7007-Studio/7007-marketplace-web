import { useRouter } from "next/router";
import { AIGC_FACTORY_CONTRACT_ADDRESS } from "@/constants";
import {
  useReadAigcFactoryDeployedAigTs,
  useReadAigcFactoryDeployedAigCs,
} from "@/generated";
import { useIsMounted } from "@/hooks/useIsMounted";
import FormAIGC from "@/components/formAIGC";

export default function GenerateAIGC() {
  const router = useRouter();
  const { index } = router.query;

  const { data: aigtAddress } = useReadAigcFactoryDeployedAigTs({
    address: AIGC_FACTORY_CONTRACT_ADDRESS,
    args: index ? [BigInt(index as string)] : undefined,
    query: {
      enabled: !!index,
    }
  });
  const { data: aigcAddress } = useReadAigcFactoryDeployedAigCs({
    address: AIGC_FACTORY_CONTRACT_ADDRESS,
    args: index ? [BigInt(index as string)] : undefined,
    query: {
      enabled: !!index,
    }
  });

  const isMounted = useIsMounted();
  if (!isMounted) return null;

  return (
    <div>
      {aigtAddress && aigcAddress && (
        <FormAIGC
          modelIndex={Number(index as string)}
          aigtAddress={aigtAddress}
          aigcAddress={aigcAddress}
        />
      )}
    </div>
  );
}
