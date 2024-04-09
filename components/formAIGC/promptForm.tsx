import generateAigcContent from "@/helpers/generateAigcContent";
import { useForm, SubmitHandler, DefaultValues } from "react-hook-form";
import TextInput from "../form/textInput";
import { useState } from "react";
import { AIGCContent } from ".";
import Image from "next/image";

export interface IFormAIGCInput {
  name: string;
  prompt: string;
  type: string;
  model: string;
  imageUrl: string;
  audioUrl: string;
}
const PromptForm = ({
  submitText = "Generate",
  modelName = "Genesis Model",
  defaultValues,
  onArtGenerated,
}: {
  submitText?: string;
  modelName?: string;
  defaultValues?: DefaultValues<IFormAIGCInput>;
  onArtGenerated: (aigcContent: AIGCContent) => void;
}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState } = useForm<IFormAIGCInput>({
    defaultValues,
  });
  const { errors } = formState;

  const onSubmit: SubmitHandler<IFormAIGCInput> = async (data) => {
    setErrorMessage("");
    setIsSubmitting(true);

    const aigcContent = await generateAigcContent(
      data.name,
      data.prompt,
      Math.floor(Math.random() * 9999999)
    );
    onArtGenerated(aigcContent);
    setIsSubmitting(false);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-[30px]"
    >
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
        label="title"
        register={register}
        errors={errors}
        required
      />
      <label className="form-control w-full gap-2">
        <span className="text-[18px] pl-3">prompt</span>
        <textarea
          className="textarea h-24 bg-grey"
          placeholder="Enter your prompt"
          {...register("prompt", { required: "prompt is required" })}
        ></textarea>
        <p className=" text-red-600 text-left text-sm">
          {errors.prompt?.message}
        </p>
      </label>
      <label className="form-control w-full gap-2">
        <span className="text-[18px] pl-3">Negative prompt (optional)</span>
        <textarea
          className="textarea h-24 bg-grey"
          placeholder="Enter your prompt"
          {...register("prompt", { required: "prompt is required" })}
        ></textarea>
        <p className=" text-red-600 text-left text-sm">
          {errors.prompt?.message}
        </p>
      </label>
      {/* TODO: hardcode */}
      <div className="flex gap-[30px]">
        <TextInput
          placeholder="Enter Seed +"
          name="name"
          label="seed"
          register={register}
          errors={errors}
          required
        />
        <TextInput
          placeholder="Model name +"
          name="name"
          label="model"
          register={register}
          errors={errors}
          required
        />
      </div>
      <div className="flex w-full items-start pt-[100px] flex-col gap-5">
        <div className="flex justify-between w-full">
          <Image
            src="/7007-logo-black.svg"
            alt="7007 Studio"
            width={44}
            height={44}
            className="w-10 h-10 opacity-30"
          />
          <div className="flex justify-end text-end flex-col">
            <div>estimate mint cost</div>
            <div>~ 0.05 eth</div>
          </div>
        </div>
        <div className="flex justify-between w-full gap-12">
          <a className="max-w-[502px]">
            this is a function description a description this is function
            function description function
          </a>
          <button
            className="w-[260px] h-[58px] bg-white/40 border border-white rounded"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="loading loading-spinner"></span>
                loading
              </>
            ) : (
              `${submitText}`
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PromptForm;
