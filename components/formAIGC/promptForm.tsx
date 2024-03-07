import generateAigcContent from "@/helpers/generateAigcContent";
import { useForm, SubmitHandler, DefaultValues } from "react-hook-form";
import TextInput from "../form/textInput";
import { useState } from "react";
import { AIGCContent } from ".";

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
            <select className="select w-full" value={1} onChange={(e) => {}}>
              <option value={1}>Image</option>
            </select>
          </label>
          <label className="form-control">
            <div className="label">
              <span className="label-text">Model</span>
            </div>
            <select className="select w-full" value={1} onChange={(e) => {}}>
              <option value={1}>{modelName}</option>
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
            `${submitText}`
          )}
        </button>
      </div>
    </form>
  );
};

export default PromptForm;
