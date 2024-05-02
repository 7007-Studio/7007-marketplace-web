import ArrowLeftIcon from "@/components/ui/arrowLeftIcon";

import PromptForm from "./promptFormNoContract";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ModelInfo } from "@/types";
import { useEffect, useState } from "react";

const PromptStep = ({ modelIndex }: { modelIndex: string }) => {
  const router = useRouter();
  const [modelInfo, setModelInfo] = useState<ModelInfo>();
  const [modelID, modelAuthorID] = modelIndex.split("%26");

  const fetchModelDetails = async () => {
    const apiUrl = `https://f3593qhe00.execute-api.ap-northeast-1.amazonaws.com/dev/users/${modelAuthorID}/models/${modelID}`;

    try {
      const response = await axios.get(apiUrl);
      if (response.status !== 200) {
        throw new Error("Failed to fetch");
      }
      const data = response.data;
      setModelInfo(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchModelDetails();
  }, [modelIndex]);

  return (
    <div className="flex flex-col items-center w-full h-full">
      <a className="mb-[50px] text-[30px] font-bold text-center">
        Unleash imagination
      </a>
      <div className="py-[50px] border-white border rounded-lg px-14 max-w-[954px]">
        <span
          onClick={() => {
            router.back();
          }}
          className="flex flex-row gap-2 hover:cursor-pointer pb-10 opacity-40"
        >
          <ArrowLeftIcon className="text-white/40" /> Back
        </span>
        {modelInfo && (
          <PromptForm
            submitText="Prompt &amp; Mint"
            modelInfo={modelInfo}
            modelID={modelID}
          />
        )}
      </div>
    </div>
  );
};

export default PromptStep;
