"use client";

import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import Card from "./ui/card";
import { ModelDetail, ModelList } from "@/types";

export interface ModelCardProps {
  modelData: ModelDetail;
}

const ModelCard: React.FC<ModelCardProps> = ({ modelData }) => {
  const router = useRouter();

  return (
    <Card className="w-[258px] max-h-[390px] h-[390px]">
      <div
        className="cursor-pointer h-full"
        onClick={() =>
          // router.push(`/collection/${modelInfo.id}&${modelInfo.modelAuthorID}`)
          router.push(`/collection/${modelData.id}`)
        }
      >
        <div className="flex flex-col relative justify-between h-full">
          <div className="absolute bg-white/30 top-4 z-10 right-4 px-2 py-1 flex justify-center items-center">
            {modelData.type}
          </div>
          <div
            className="size-full"
            style={{
              backgroundImage: `url('${modelData.logo}')`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
          />

          <div className="flex gap-4 h-fit items-start px-4 border-t-[1px] py-2 border-white flex-col">
            <div className="w-full text-center text-lg">
              <a className="">{modelData.modelName}</a>
            </div>
            <div className="flex flex-col gap-2 w-full ">
              <div className="w-full flex justify-between">
                Started <span className="font-bold">Jan 1th</span>
              </div>
              <div className="w-full flex justify-between">
                Action
                <span className="font-bold">{modelData.action}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ModelCard;
