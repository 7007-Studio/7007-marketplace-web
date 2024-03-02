import { useMemo } from "react";
import { useRouter } from "next/router";
import { Address } from "viem";
import { useAccount } from "wagmi";

import {
  useReadAigcFactoryDeployedAigCs,
  useReadAigcFactoryDeployedAigTs,
  useReadAigcTokenId,
  useReadAigtName,
} from "@/generated";
import { getContractAddress } from "@/helpers";
import { useIsMounted } from "@/hooks/useIsMounted";
import Hero from "@/components/model/hero";
import AigcNftCreated from "@/components/model/aigcNftCreated";
import ModelTimeline from "@/components/model/modelTimeline";
import Launched from "@/components/model/launched";
import ArrowLeftIcon from "@/components/arrowLeftIcon";

export default function Detail() {
  const router = useRouter();
  const { index } = router.query;

  const { chainId } = useAccount();
  const aigcFactory = getContractAddress("AIGCFactory", chainId);

  const isMounted = useIsMounted();
  const { data: aigtAddress } = useReadAigcFactoryDeployedAigTs({
    address: aigcFactory,
    args: index ? [BigInt(index as string)] : undefined,
  });
  const { data: modelName } = useReadAigtName({
    address: aigtAddress,
  });
  const { data: aigcAddress } = useReadAigcFactoryDeployedAigCs({
    address: aigcFactory,
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
        <a
          onClick={() => router.back()}
          className="flex flex-row gap-2 hover:cursor-pointer"
        >
          <ArrowLeftIcon className="text-primary" /> Back
        </a>
      </div>
      <Hero modelName={modelName} aigtAddress={aigtAddress} />
      <h2 className="heading-lg mt-10 mb-6">Portfolio</h2>
      <div className="flex flex-row gap-x-10">
        <div className="flex-1">
          <ModelTimeline />

          <h2 className="heading-lg mt-14 mb-6">AIGC NFT Created</h2>

          {aigcAddress && (
            <AigcNftCreated tokenIds={tokenIds} aigcAddress={aigcAddress} />
          )}
        </div>
        <div className="flex-grow-0">
          <Launched modelIndex={index as string} />
        </div>
      </div>
    </div>
  );
}
