import ModelDetail from "@/components/modelDetail";
import NFTCard from "@/components/nftCard";
import { useRouter } from "next/router";
import { AIGC_FACTORY_CONTRACT_ADDRESS } from "@/constants";
import {
  useAigcFactoryDeployedAigCs,
  useAigcFactoryDeployedAigTs,
  useAigcTokenId,
  useAigtMaxSupply,
  useAigtName,
  useAigtTotalSupply,
} from "@/generated";
import { Address } from "viem";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useMemo } from "react";

export default function Detail() {
  const router = useRouter();
  const { index } = router.query;
  const isMounted = useIsMounted();

  const { data: aigtAddress } = useAigcFactoryDeployedAigTs({
    address: AIGC_FACTORY_CONTRACT_ADDRESS,
    args: index ? [BigInt(index as string)] : undefined,
  });
  const { data: aigcAddress } = useAigcFactoryDeployedAigCs({
    address: AIGC_FACTORY_CONTRACT_ADDRESS,
    args: index ? [BigInt(index as string)] : undefined,
  });

  const { data: modelName } = useAigtName({
    address: index as Address,
  });
  const { data: totalSupply } = useAigtTotalSupply({
    address: index as Address,
  });
  const { data: maxSupply } = useAigtMaxSupply({
    address: index as Address as Address,
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
    <div className=" mx-auto w-[85vw]">
      <div className="flex items-center justify-center flex-col my-10">
        {index && <ModelDetail modelIndex={Number(index as string)} />}
      </div>
      <h2 className="text-white font-bold text-2xl mb-10">More</h2>
      <div className="flex items-start flex-wrap justify-center gap-6 mb-10">
        {aigcAddress &&
          tokenIds.map((id) => (
            <NFTCard
              key={id}
              modelIndex={Number(index as string)}
              tokenId={id.toString()}
            />
          ))}
      </div>
    </div>
  );
}
