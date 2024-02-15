import { useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { AIGC_FACTORY_CONTRACT_ADDRESS } from "@/constants";
import { useAigcFactoryDeployedAigCs, useAigcTokenId } from "@/generated";
import TextInput from "@/components/textInput";
import AigcNftCreated from "@/components/model/aigcNftCreated";

import { AIGCContent } from "./formAIGC";
import generateAigcContent from "@/helpers/generateAigcContent";

export interface IFormAIGCInput {
  name: string;
  prompt: string;
  type: string;
  model: string;
  imageUrl: string;
  audioUrl: string;
}

interface PromptStepProps {
  modelIndex: number;
  onArtGenerated: (metadata: AIGCContent) => void;
}

const PromptStep = ({ modelIndex, onArtGenerated }: PromptStepProps) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: aigcAddress } = useAigcFactoryDeployedAigCs({
    address: AIGC_FACTORY_CONTRACT_ADDRESS,
    args: modelIndex ? [BigInt(modelIndex)] : undefined,
  });

  const { data: lastTokenId } = useAigcTokenId({
    address: aigcAddress,
  });

  const tokenIds = useMemo(() => {
    const ids: number[] = [];
    if (!lastTokenId) return ids;

    for (let i = 0; i < Number(lastTokenId); i++) {
      ids.push(i);
    }
    return ids;
  }, [lastTokenId]);

  const { register, handleSubmit, formState } = useForm<IFormAIGCInput>();
  const { errors } = formState;

  const onSubmit: SubmitHandler<IFormAIGCInput> = async (data) => {
    setErrorMessage("");
    setIsSubmitting(true);

    const aigcContent = await generateAigcContent(data.name, data.prompt);
    onArtGenerated(aigcContent);
  };

  return (
    <>
      <h2 className="heading-lg mt-44 mb-12 text-center">
        Generate your AIGC music and art with 7007 Studio
      </h2>
      <div className="py-20 px-40 max-w-[1106px] mx-auto bg-white">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {errorMessage && (
            <div role="alert" className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{errorMessage}</span>
            </div>
          )}
          <TextInput
            placeholder="Let’s give it a cool name"
            name="name"
            register={register}
            errors={errors}
            required
          />
          <label className="form-control w-full">
            <textarea
              className="textarea h-24"
              placeholder="Enter your prompt"
              {...register("prompt", { required: "prompt is required" })}
            ></textarea>
            <p className=" text-red-600 text-left text-sm">
              {errors.prompt?.message}
            </p>
          </label>
          <div className="flex justify-between items-end">
            <div className="flex flex-1 gap-4">
              <label className="form-control">
                <div className="label">
                  <span className="label-text">Type</span>
                </div>
                <select
                  className="select w-full"
                  value={1}
                  onChange={(e) => {}}
                >
                  <option value={1}>Image</option>
                </select>
              </label>
              <label className="form-control">
                <div className="label">
                  <span className="label-text">Model</span>
                </div>
                <select
                  className="select w-full"
                  value={1}
                  onChange={(e) => {}}
                >
                  <option value={1}>Genesis Model</option>
                </select>
              </label>
            </div>

            <button className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className="loading loading-spinner"></span>
                  loading
                </>
              ) : (
                "Prompt for free"
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-20 py-20 pt-10 max-w-[1106px] mx-auto">
        <h2 className="heading-lg mb-12">By our community</h2>

        {aigcAddress && (
          <AigcNftCreated tokenIds={tokenIds} modelIndex={modelIndex} />
        )}
      </div>
    </>
  );
};

export default PromptStep;
