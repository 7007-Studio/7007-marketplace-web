"use client";
 
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

import { useReadAigcFactoryDeployedAigCs, useReadAigtName } from "@/generated";
import { getContractAddress } from "@/helpers";

import Card from "./ui/card";
  
export interface ModelCardProps {
  modelIndex: bigint;
  modelInfo: any;
}
 
const ModelCard: React.FC<ModelCardProps> = ({ modelIndex, modelInfo }) => {
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

  // console.log('modelName', modelName)

  return (
    <Card className="max-w-[390px] max-h-[390px] w-[390px] h-[390px]">
      <div
        className="hover:cursor-pointer h-full"
        onClick={() => router.push(`/collection/${modelIndex}`)}
      >
        <div className="flex flex-col justify-between h-full">
          <div className="flex justify-between items-center p-4">
            <div className="rounded-full border-2 w-16 h-16 flex justify-center items-center">ORA</div>
            <div className="border-2 w-24 h-8 flex justify-center items-center">Type</div>
          </div>
          <div className="flex justify-between h-20 items-center border-t-[1px] border-white">
            <div><h2 className="mb-4 pl-2">{modelName}</h2></div>
            <div className="text-base pr-2">
              <div className="text-sm">Started <span className="font-bold	pl-2">Jan 1th</span></div>
              <div className="text-sm">Status <span className="font-bold pl-2">Ended</span></div>
            </div>
          </div>

        </div>
      </div>
    </Card>
  );
};

export default ModelCard;
