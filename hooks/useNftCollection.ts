import { useMemo } from "react";
import { Address } from "viem";
import { useReadAigcTokenId } from "@/generated";

const useNftCollection = ({
  nftContract,
  from = 0,
  to = 20,
}: {
  nftContract?: Address;
  from?: number;
  to?: number;
}) => {
  const { data: tokenId } = useReadAigcTokenId({
    address: nftContract,
  });

  const tokenIds = useMemo(() => {
    const ids: number[] = [];
    if (!tokenId) return ids;

    for (let i = from; i < Math.min(Number(tokenId), to); i++) {
      ids.push(i);
    }
    return ids;
  }, [tokenId, from, to]);

  if (!nftContract) return { tokenIds: [] };

  return { tokenIds };
};

export default useNftCollection;
