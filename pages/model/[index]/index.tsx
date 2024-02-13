import { useRouter } from "next/router";
import {
  AIGC_FACTORY_CONTRACT_ADDRESS,
  AIGT_CONTRACT_ADDRESS,
} from "@/constants";
import {
  useAigcFactoryDeployedAigCs,
  useAigcFactoryDeployedAigTs,
  useAigcTokenId,
  useAigtName,
} from "@/generated";
import { Address } from "viem";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useMemo } from "react";
import Hero from "@/components/model/hero";
import HeadingLarge from "@/components/text/headingLarge";
import AigcNftCreated from "@/components/model/aigcNftCreated";
import Link from "next/link";
import ModelTimeline from "@/components/model/modelTimeline";
import Launched from "@/components/model/launched";

export default function Detail() {
  const router = useRouter();
  const { index } = router.query;
  const isMounted = useIsMounted();
  const { data: aigtAddress } = useAigcFactoryDeployedAigTs({
    address: AIGC_FACTORY_CONTRACT_ADDRESS,
    args: index ? [BigInt(index as string)] : undefined,
  });
  const { data: modelName } = useAigtName({
    address: aigtAddress,
  });
  const { data: aigcAddress } = useAigcFactoryDeployedAigCs({
    address: AIGC_FACTORY_CONTRACT_ADDRESS,
    args: index ? [BigInt(index as string)] : undefined,
  });
  const { data: totalNFTMinted } = useAigcTokenId({
    address: aigcAddress as Address,
  });

  const { data: lastTokenId } = useAigcTokenId({
    address: aigcAddress,
  });

  const tokenIds = useMemo(() => {
    const ids: number[] = [];
    if (!lastTokenId) return ids;

    for (let i = 0; i < Number(lastTokenId); i++) {
      ids.push(i);
    }
    return ids;
  }, [lastTokenId]);

  if (!isMounted) return null;

  return (
    <div>
      <Link href="/">Back</Link>
      <Hero modelName={modelName} aigtAddress={AIGT_CONTRACT_ADDRESS} />
      <HeadingLarge>Portfolio</HeadingLarge>
      <div className="flex flex-row gap-x-10">
        <div className="flex-1">
          <ModelTimeline />
        </div>
        <div className="flex-grow-0">
          <Launched />
        </div>
      </div>
      <HeadingLarge>AIGC NFT Created</HeadingLarge>
      <div></div>

      {aigcAddress && (
        <AigcNftCreated
          tokenIds={tokenIds}
          modelIndex={Number(index as string)}
        />
      )}
    </div>
  );
}
