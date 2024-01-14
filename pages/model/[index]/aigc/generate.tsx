import FormAIGC from "@/components/formAIGC";
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
  });
  const { data: aigcAddress } = useAigcFactoryDeployedAigCs({
    address: AIGC_FACTORY_CONTRACT_ADDRESS,
    args: index ? [BigInt(index as string)] : undefined,
  });

  const isMounted = useIsMounted();
  if (!isMounted) return null;

  return (
    <div className="container mx-auto md:max-w-2xl flex min-h-screen flex-col p-4">
      <h1 className="text-3xl font-bold mb-4">
        Generate your music and art with 7007 Studio
      </h1>
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
