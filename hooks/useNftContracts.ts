import { useReadAigcFactoryDeployedAigCs } from "@/generated";
import { getContractAddress } from "@/helpers";
import { mainnet, sepolia } from "viem/chains";

const useNftContracts = ({
  // modelIndex,
  chainId = mainnet.id,
}: {
  // modelIndex: bigint;
  chainId?: number;
}) => {
  const SDNFT = getContractAddress("StableDiffusionNFT", chainId);
  const OPMLNFT = getContractAddress("OPMLNFT", chainId);

  return { nftContracts: [SDNFT, OPMLNFT] };
};

export default useNftContracts;
