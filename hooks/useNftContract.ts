import { useReadAigcFactoryDeployedAigCs } from "@/generated";
import { getContractAddress } from "@/helpers";

const useNftContract = ({
  modelIndex,
  chainId,
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
