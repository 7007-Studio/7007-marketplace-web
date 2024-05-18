import { useReadAigcFactoryDeployedAigCs } from "@/generated";
import { getContractAddress } from "@/helpers";
import { sepolia } from "viem/chains";

const useNftContracts = ({
  // modelIndex,
  chainId = sepolia.id,
}: {
  // modelIndex: bigint;
  chainId?: number;
}) => {
  const SDNFT = getContractAddress("StableDiffusionNFT", chainId);
  const OPMLNFT = getContractAddress("OPMLNFT", chainId);

  return { nftContracts: [SDNFT, OPMLNFT] };
};

export default useNftContracts;
