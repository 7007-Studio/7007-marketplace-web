import { useReadAigcTotalSupply } from "@/generated";
import { useMemo } from "react";
import { Address } from "viem";

const useNftCollection = ({
  nftContract,
  from = 0,
  to = 20,
}: {
  nftContract?: Address;
  from?: number;
  to?: number;
}) => {
  const { data: totalSupply } = useReadAigcTotalSupply({
    address: nftContract,
  });

  const tokenIds = useMemo(() => {
    const ids: number[] = [];
    if (!totalSupply) return ids;

    for (let i = from; i < Math.min(Number(totalSupply), to); i++) {
      ids.push(i);
    }
    return ids;
  }, [totalSupply, from, to]);

  if (!nftContract) return { tokenIds: [] };

  return { tokenIds };
};

export default useNftCollection;
