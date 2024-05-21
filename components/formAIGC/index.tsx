import ArrowLeftIcon from "@/components/ui/arrowLeftIcon";
import PromptFormSD from "./promptFormSD";
import PromptFormOP from "./promptFormOP";
import { useRouter } from "next/navigation";
import { ModelDetail, ModelInfo } from "@/types";

export interface AIGCContent {
  name: string;
  prompt: string;
  seed?: number;
  imageUrl?: string;
}

interface FormAIGCProps {
  modelData: ModelDetail;
  modelIndex?: string;
}

export default function FormAIGC({ modelData, modelIndex }: FormAIGCProps) {
  const router = useRouter();
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
        {modelData && modelIndex === "0" ? (
          <PromptFormSD submitText="Prompt" modelData={modelData} />
        ) : modelIndex === "1" ? (
          <PromptFormOP submitText="Prompt" modelData={modelData} />
        ) : null}
      </div>
    </div>
  );
}
