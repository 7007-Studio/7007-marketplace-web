import { useForm, SubmitHandler, DefaultValues } from "react-hook-form";
import TextInput from "../form/textInput";
import { useState } from "react";
import Image from "next/image";
import {useModelInfoStore} from '../../app/stats/store'
import { useAccount } from "wagmi";
import { useRouter } from 'next/navigation'
export interface IFormAIGCInput {
  name: string;
  prompt: string;
  type: string;
  negative: string;
  seed: string;
  modelID: string;
  model: string;
  imageUrl: string;
  audioUrl: string;
}
const PromptForm = ({
  submitText = "Generate",
  modelName = "Genesis Model",
  defaultValues,
}: {
  submitText?: string;
  modelName?: string;
  defaultValues?: DefaultValues<IFormAIGCInput>;
}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { model } = useModelInfoStore();
  const [prompt, setPrompt] = useState();
  const [negativePrompt, setNegativePrompt] = useState();
  const [seed, setSeed] = useState();
  const router = useRouter();
  const [title, setTitle] = useState();
  const [genImageData, setGenImageData] = useState();
const { address } = useAccount();
  const { register, handleSubmit, formState } = useForm<IFormAIGCInput>({
    defaultValues,
  });
  const { errors } = formState;

  const genImage = async () => {

    var data = JSON.stringify({ modelID: model.id, prompt: prompt, modelAuthorID: model.author });

    try {
      const response = await fetch('https://f3593qhe00.execute-api.ap-northeast-1.amazonaws.com/dev/model_inference_task', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'user-id': address
        },
        body: data
      })
      if (response.ok) {
        const data = await response.json();
        setGenImageData(data)
        router.push('/account/inferencing');
        return data;
      } else {
        throw new Error(`Failed to get presigned URL: ${response.status}`);
      }
    } catch (error) {
      console.error('Request error while getting presigned URL:', error);
    }
  };

  const onSubmit: SubmitHandler<IFormAIGCInput> = async (data) => {
    // console.log('data', data)
    genImage()
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
      {/* <TextInput
        placeholder="Let's give it a cool name"
        name="name"
        label="Title"
        register={register}
        errors={errors}
        required
      /> */}


      <p>Title</p>
      <input
        type="text"
        name="modelTitle"
        id="modelTitle"
        className="bg-grey h-16 pl-10"
        value={title} // Bind the value to the state variable
        onChange={(e) => setTitle(e.target.value)} // Update the input value directly
        required
        placeholder="Let's give it a cool name"
      />
      <p>Positive prompt</p>
      <input
        type="text"
        name="modelPositive"
        id="modelPositive"
        className="bg-grey h-16 pl-10"
        value={prompt} // Bind the value to the state variable
        onChange={(e) => setPrompt(e.target.value)} // Update the input value directly
        required
        placeholder="Enter your prompt"
      />
      <p>Negative prompt</p>
      <input
        type="text"
        name="modelPositive"
        id="modelPositive"
        className="bg-grey h-16 pl-10"
        value={negativePrompt} // Bind the value to the state variable
        onChange={(e) => setNegativePrompt(e.target.value)} // Update the input value directly
        placeholder="Enter your prompt"
      />
      {/* <label className="form-control w-full gap-2">
        <span className="text-[18px] pl-3">Positive prompt</span>
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
          {...register("prompt")}
        ></textarea>
        <p className=" text-red-600 text-left text-sm">
          {errors.prompt?.message}
        </p>
      </label> */}
      {/* TODO: hardcode */}
      <div className="flex gap-[20px] justify-between">
      <div className="flex flex-col w-1/2 gap-[30px]">
          <p>Seed</p>
            <input
              type="text"
              name="modelSeed"
              id="modelSeed"
              className="bg-grey h-16 pl-10"
              value={seed} // Bind the value to the state variable
              onChange={(e) => setSeed(e.target.value)} // Update the input value directly
              placeholder="Enter Seed +"
            />
        </div>
        
        {/* <TextInput
          placeholder="Enter Seed +"
          name="name"
          label="seed"
          register={register}
          errors={errors}
          required
        /> */}
        {/* <TextInput
          placeholder="Model name +"
          name="name"
          label="model"
          register={register}
          errors={errors}
          required
          defaultValue="Your default value here"
        /> */}
        {/* <TextInput
          placeholder="Model name +"
          name="name"
          label="model"
          register={register}
          errors={errors}
          required
          defaultValue={model.name} // Set the default value
          readOnly={true} // Make the input field read-only
        /> */}

        <div className="flex flex-col w-1/2 gap-[30px]">
          <p>Model</p>
          <input
            type="text"
            name="modelName" // Provide a name attribute to identify the input field
            id="modelName"
            className="bg-grey h-16 pl-10"
            defaultValue={model.name}
            readOnly
            placeholder="Model name +"
          />
        </div>
      </div>
      <div className="flex w-full items-start pt-[100px] flex-col gap-5">
        <div className="flex justify-between w-full">
          <Image
            src="/7007logo.svg"
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
