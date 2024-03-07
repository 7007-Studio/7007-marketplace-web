import { Address } from "viem";
import { useReadContracts } from "wagmi";

import AIGC from "@/abis/AIGC.json";
import { useMemo } from "react";

const useReadAigcContracts = ({ nftContract }: { nftContract?: Address }) => {
  const aigcContractConfig = { address: nftContract, abi: AIGC.abi };
  const aigcResults = useReadContracts({
    contracts: [
      {
        ...aigcContractConfig,
        functionName: "name",
      },
      {
        ...aigcContractConfig,
        functionName: "tokenId",
      },
    ],
  });
  const [name, tokenId] = useMemo(() => {
    if (!aigcResults?.isFetched || !aigcResults?.data) {
      return [];
    }

    return (aigcResults.data.map((d) => d.result) as [string, bigint]) || [];
  }, [aigcResults.isFetched, aigcResults.data]);

  return {
    name,
    tokenId,
  };
};

export default useReadAigcContracts;
