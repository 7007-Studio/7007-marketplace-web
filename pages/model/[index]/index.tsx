import ModelDetail from "@/components/modelDetail";
import NFTCard from "@/components/nftCard";
import { useRouter } from "next/router";
import { AIGC_FACTORY_CONTRACT_ADDRESS } from "@/constants";
import { useAigcFactoryDeployedAigCs, useAigcTokenId } from "@/generated";
import { Address } from "viem";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useMemo } from "react";

export default function Detail() {
  const router = useRouter();
  const { index } = router.query;
  const isMounted = useIsMounted();

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
    <div className=" mx-auto w-[85vw]">
      <div className="flex items-center justify-center flex-col my-10">
        {index && <ModelDetail modelIndex={Number(index as string)} />}
      </div>
      <h2 className="text-white font-bold text-2xl mb-10">More</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
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
