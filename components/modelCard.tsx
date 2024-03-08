"use client";

import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

import { useReadAigcFactoryDeployedAigCs, useReadAigtName } from "@/generated";
import { getContractAddress } from "@/helpers";

import Card from "./ui/card";

export interface ModelCardProps {
  modelIndex: bigint;
}

const ModelCard: React.FC<ModelCardProps> = ({ modelIndex }) => {
  const router = useRouter();

  const { chainId } = useAccount();
  const aigcFactory = getContractAddress("AIGCFactory", chainId);
  const { data: nftContract } = useReadAigcFactoryDeployedAigCs({
    address: aigcFactory,
    args: modelIndex ? [modelIndex] : undefined,
  });

  const { data: modelName } = useReadAigtName({
    address: nftContract,
  });

  return (
    <Card className="max-w-[390px]">
      <div
        className="p-6 hover:cursor-pointer"
        onClick={() => router.push(`/collection/${modelIndex}`)}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-lg mb-4">{modelName}</h2>
        </div>
      </div>
    </Card>
  );
};

export default ModelCard;
