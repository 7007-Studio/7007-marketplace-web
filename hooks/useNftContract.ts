import { useReadAigcFactoryDeployedAigCs } from "@/generated";
import { getContractAddress } from "@/helpers";
import { sepolia } from "viem/chains";

const useNftContract = ({
  // modelIndex,
  chainId = sepolia.id,
}: {
  // modelIndex: bigint;
  chainId?: number;
}) => {
  const nftContract = getContractAddress("NFTContract", chainId);

  return { nftContract };
};

export default useNftContract;
