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
        className="cursor-pointer h-full"
        onClick={() =>
          router.push(`/collection/${modelInfo.id}&${modelInfo.modelAuthorID}`)
        }
      >
        <div className="flex flex-col relative justify-between h-full">
          <div className="absolute bg-white/30 top-4 z-10 right-4 px-2 py-1 flex justify-center items-center">
            TEXT-TO-TEXT
          </div>
          <div
            className="size-full"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1608874973445-de098faf870f?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
              backgroundSize: "cover",
            }}
          ></div>

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
