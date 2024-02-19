import { useRouter } from "next/router";
import {
  AIGC_FACTORY_CONTRACT_ADDRESS,
  AIGT_CONTRACT_ADDRESS,
} from "@/constants";
import {
  useReadAigcFactoryDeployedAigCs,
  useReadAigcFactoryDeployedAigTs,
  useReadAigcTokenId,
  useReadAigtName,
} from "@/generated";
import { Address } from "viem";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useMemo } from "react";
import Hero from "@/components/model/hero";
import AigcNftCreated from "@/components/model/aigcNftCreated";
import Link from "next/link";
import ModelTimeline from "@/components/model/modelTimeline";
import Launched from "@/components/model/launched";
import ArrowLeftIcon from "@/components/arrowLeftIcon";

export default function Detail() {
  const router = useRouter();
  const { index } = router.query;
  const isMounted = useIsMounted();
  const { data: aigtAddress } = useReadAigcFactoryDeployedAigTs({
    address: AIGC_FACTORY_CONTRACT_ADDRESS,
    args: index ? [BigInt(index as string)] : undefined,
  });
  const { data: modelName } = useReadAigtName({
    address: aigtAddress,
  });
  const { data: aigcAddress } = useReadAigcFactoryDeployedAigCs({
    address: AIGC_FACTORY_CONTRACT_ADDRESS,
    args: index ? [BigInt(index as string)] : undefined,
  });
  const { data: totalNFTMinted } = useReadAigcTokenId({
    address: aigcAddress as Address,
  });

  const { data: lastTokenId } = useReadAigcTokenId({
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
      <div className="py-10">
        <Link href="/" className="flex flex-row gap-2">
          <ArrowLeftIcon className="text-primary" /> Back
        </Link>
      </div>
      <Hero modelName={modelName} aigtAddress={AIGT_CONTRACT_ADDRESS} />
      <h2 className="text-lg mt-10 mb-6">Portfolio</h2>
      <div className="flex flex-row gap-x-10">
        <div className="flex-1">
          <ModelTimeline />
        </div>
        <div className="flex-grow-0">
          <Launched modelIndex={index as string} />
        </div>
      </div>
      <h2 className="text-lg mt-14 mb-6">AIGC NFT Created</h2>
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
