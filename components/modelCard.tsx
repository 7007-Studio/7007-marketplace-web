"use client";

import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

import { useReadAigcFactoryDeployedAigCs, useReadAigtName } from "@/generated";
import { getContractAddress } from "@/helpers";

import Card from "./ui/card";
import { ModelList } from "@/types";

export interface ModelCardProps {
  modelIndex?: bigint;
  modelInfo: ModelList;
}

const ModelCard: React.FC<ModelCardProps> = ({ modelIndex, modelInfo }) => {
  const router = useRouter();

  const { chainId } = useAccount();
  const aigcFactory = getContractAddress("AIGCFactory", chainId);
  // const { data: nftContract } = useReadAigcFactoryDeployedAigCs({
  //   address: aigcFactory,
  //   args: modelIndex ? [modelIndex] : undefined,
  // });

  // const { data: modelName } = useReadAigtName({
  //   address: nftContract,
  // });

  return (
    <Card className="w-[300px] max-h-[390px] h-[390px]">
      <div
        className="hover:cursor-pointer h-full"
        onClick={() => router.push(`/collection/${modelInfo.id}`)}
      >
        <div className="flex flex-col justify-between h-full">
          <div className="flex justify-between items-center p-4">
            <div className="rounded-full border-2 w-16 h-16 flex justify-center items-center">
              ORA
            </div>
            <div className="border-2 w-24 h-8 flex justify-center items-center">
              Type
            </div>
          </div>
          <div className="flex gap-4 h-fit items-start px-4 border-t-[1px] py-2 border-white flex-col">
            <div className="w-full text-center text-lg">
              <a className="">{modelInfo.modelName}</a>
            </div>
            <div className="flex flex-col gap-2 w-full ">
              <div className="w-full flex justify-between">
                Started <span className="font-bold">Jan 1th</span>
              </div>
              <div className=" w-full flex justify-between">
                action
                <span className="font-bold">{modelInfo.action}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ModelCard;
