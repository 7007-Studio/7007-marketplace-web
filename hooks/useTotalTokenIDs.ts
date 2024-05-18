import { useMemo } from "react";
import { Abi, Address } from "viem";
import { useReadContracts } from "wagmi";
import AIGC from "@/abis/AIGC.json";

interface UseTotalSupplyProps {
  nftContracts: (Address | undefined)[];
}
export interface TokenIDs {
  id: BigInt;
  contract: Address;
}

const useTotalTokenIDs = ({ nftContracts }: UseTotalSupplyProps) => {
  const totalSupplyResults = useReadContracts({
    contracts: nftContracts
      .filter((contract): contract is `0x${string}` => contract !== undefined)
      .map((contract) => ({
        address: contract,
        abi: AIGC.abi as Abi,
        functionName: "totalSupply",
      })),
  });

  const tokenIds: TokenIDs[] = useMemo(() => {
    return (
      totalSupplyResults.data?.flatMap((totalSupply: any, index: number) => {
        const ids: TokenIDs[] = [];
        if (!totalSupply?.result) return ids;

        for (let i = 0; i < Number(totalSupply.result); i++) {
          ids.push({ id: BigInt(i), contract: nftContracts[index] as Address });
        }
        return ids;
      }) || []
    );
  }, [totalSupplyResults.data, nftContracts]);

  return { tokenIds, totalSupplyResults };
};

export default useTotalTokenIDs;
