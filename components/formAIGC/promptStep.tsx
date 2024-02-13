import axios from "axios";
import { log } from "console";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import TextInput from "../textInput";
import { AIGCContent } from "./formAIGC";

enum GenerateType {
  Image,
  Music,
}

const initOPML = async (type: GenerateType, prompt: string) => {
  let error;
  try {
    let response, data;
    if (type === GenerateType.Image) {
      data = {
        modelName: "StableDiffusion",
        prompt: prompt,
      };

      response = await axios.post(
        "https://demo.7007.studio/api/v1/dalle/opMLRequest",
        data,
        {
          timeout: 300000,
        }
      );
    } else if (type === GenerateType.Music) {
      data = {
        modelName: "MusicGen",
        prompt: prompt,
      };
      response = await axios.post(
        "https://demo.7007.studio/api/v1/dalle/opMLRequest",
        data,
        {
          timeout: 300000,
        }
      );
    }
    return response?.data.MPChallenge;
  } catch (error) {
    console.error(error);
  }
};

const generateImage = async (contractAddr: string, prompt: string) => {
  try {
    let response = await axios.post(
      "https://demo.7007.studio/api/v1/dalle/txt2img",
      { contractAddress: contractAddr, prompt: prompt },
      { timeout: 300000 }
    );
    return "data:image/png;base64," + response.data;
  } catch (error) {
    console.error(error);
  }
};

const generateMusic = async (contractAddr: string, prompt: string) => {
  try {
    const response = await axios.post(
      "https://demo.7007.studio/api/v1/dalle/txt2music",
      { contractAddress: contractAddr, prompt: prompt },
      { timeout: 300000 }
    );
    return "data:audio/mpeg;base64," + response.data;
  } catch (error) {
    console.error(error);
  }
};

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
  const [artGenerated, setArtGenerated] = useState(false);
  const [log, setLog] = useState("");

  const { register, handleSubmit, formState, getValues, setValue } =
    useForm<IFormAIGCInput>();
  const { errors } = formState;

  const onSubmit: SubmitHandler<IFormAIGCInput> = async (data) => {
    setErrorMessage("");

    setIsSubmitting(true);

    let contractAddr = await initOPML(GenerateType.Image, data.prompt);
    setLog(`Generating image...\n`);
    const imageUrl = await generateImage(contractAddr, data.prompt);
    if (imageUrl) {
      setValue("imageUrl", imageUrl);
    }
    setLog(`Image generated.\n`);
    // setLog(`Image generated. Please approve ${symbol} token spending...\n`);

    // setLog(`Image generated. Generating music...\n`);

    // contractAddr = await initOPML(GenerateType.Music, data.prompt);
    // const audioUrl = await generateMusic(contractAddr, data.prompt);
    // if (audioUrl) {
    //   setValue("audioUrl", audioUrl);
    // }

    // setLog(`Audio generated. Please approve ${symbol} token spending...\n`);

    setArtGenerated(true);

    onArtGenerated({
      name: data.name,
      prompt: data.prompt,
      imageUrl,
      // audioUrl
    });
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
              <option value={1}>Track</option>
            </select>
          </label>
          <label className="form-control">
            <div className="label">
              <span className="label-text">Model</span>
            </div>
            <select className="select w-full" value={1} onChange={(e) => {}}>
              <option value={1}>Genesis Model</option>
            </select>
          </label>
        </div>

        {!artGenerated && (
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
        )}
      </div>
      <div>{log && <code>{log}</code>}</div>
      {getValues("imageUrl") && <img src={getValues("imageUrl")} />}
      {getValues("audioUrl") && (
        <audio
          controls
          src={getValues("audioUrl")}
          className="w-full h-full object-contain"
        ></audio>
      )}
    </form>
  );
};

export default PromptStep;
