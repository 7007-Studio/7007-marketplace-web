import FormAIGC from "@/components/formAIGC/formAIGC";
import { AIGC_FACTORY_CONTRACT_ADDRESS } from "@/constants";
import {
  useAigcFactoryDeployedAigTs,
  useAigcFactoryDeployedAigCs,
} from "@/generated";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useRouter } from "next/router";

export default function GenerateAIGC() {
  const router = useRouter();
  const { index } = router.query;

  const { data: aigtAddress } = useAigcFactoryDeployedAigTs({
    address: AIGC_FACTORY_CONTRACT_ADDRESS,
    args: index ? [BigInt(index as string)] : undefined,
    enabled: !!index,
  });
  const { data: aigcAddress } = useAigcFactoryDeployedAigCs({
    address: AIGC_FACTORY_CONTRACT_ADDRESS,
    args: index ? [BigInt(index as string)] : undefined,
    enabled: !!index,
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
