import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import TextInput from "./textInput";
import { useAigcMint, usePrepareAigcMint } from "@/generated";
import { useState } from "react";

export interface IFormAIGCInput {
  name: string;
  prompt: string;
  type: string;
  model: string;
}

interface FormAIGCProps {
  setIsGenerating: (isGenerating: boolean) => void;
}

export default function FormAIGC({ setIsGenerating }: FormAIGCProps) {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { config, error, isError } = usePrepareAigcMint();
  const { data, write, isLoading, isSuccess } = useAigcMint(config);

  const { register, handleSubmit } = useForm<IFormAIGCInput>();
  const onSubmit: SubmitHandler<IFormAIGCInput> = (data) => {
    setIsSubmitting(true);
    setIsGenerating(true);
    console.log(data);

    if (write) {
      write();
    }

    // TODO: replace with call to mint model
    // setTimeout(() => {
    //   router.push("/");
    // }, 5000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <TextInput
        placeholder="Let’s give it a cool name"
        name="name"
        register={register}
      />

      <label className="form-control w-full">
        <textarea
          className="textarea textarea-bordered h-24"
          placeholder="Enter your prompt"
          {...register("prompt")}
        ></textarea>
      </label>

      <div className="flex justify-between items-end">
        <div className="flex flex-1 gap-4">
          <label className="form-control">
            <div className="label">
              <span className="label-text">Type</span>
            </div>
            <select className="select select-bordered w-full">
              <option selected>Track</option>
              <option>Image</option>
              <option>Video</option>
            </select>
          </label>

          <label className="form-control">
            <div className="label">
              <span className="label-text">Model</span>
            </div>
            <select className="select select-bordered w-full">
              <option selected>Model A</option>
              <option>Model B</option>
              <option>Model C</option>
            </select>
          </label>
        </div>

        <button
          disabled={isLoading || isSubmitting || !write}
          className="btn btn-primary"
        >
          {isSubmitting ? (
            <>
              <span className="loading loading-spinner"></span>
              loading
            </>
          ) : (
            "Generate"
          )}
        </button>
        {isError && <div>Error: {error?.message}</div>}
      </div>
    </form>
  );
}
