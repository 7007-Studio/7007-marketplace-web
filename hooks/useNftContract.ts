import { useReadAigcFactoryDeployedAigCs } from "@/generated";
import { getContractAddress } from "@/helpers";
import { sepolia } from "viem/chains";

const useNftContract = ({
  modelIndex,
  chainId = sepolia.id,
}: {
  modelIndex: bigint;
  chainId?: number;
}) => {
  const aigcFactory = getContractAddress("AIGCFactory", chainId);
  const { data: nftContract } = useReadAigcFactoryDeployedAigCs({
    address: aigcFactory,
    args: [modelIndex],
  });

  return { nftContract };
};

export default useNftContract;
