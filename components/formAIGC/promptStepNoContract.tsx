import ArrowLeftIcon from "@/components/ui/arrowLeftIcon";

import PromptForm from "./promptFormNoContract";
import { useRouter } from "next/navigation";
import { useModelInfoStore } from "../../app/stats/store"

const PromptStep = () => {
  const router = useRouter();
  const { model } = useModelInfoStore();

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
        <PromptForm
          submitText="Prompt &amp; Mint"
          modelName={model.name || "Genesis Model"}
        />
      </div>
    </div>
  );
};


export default PromptStep;
