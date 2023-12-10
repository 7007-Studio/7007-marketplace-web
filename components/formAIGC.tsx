import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import TextInput from "./textInput";
import { useAigcMint, usePrepareAigcMint } from "@/generated";
import { useState,  Dispatch,SetStateAction } from "react";
import axios from "axios";

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

  const { register, handleSubmit, formState } = useForm<IFormAIGCInput>();
  const { errors } = formState;

  // const [nftName , setNftName] = useState("");
  // const [prompt , setPrompt] = useState("");
  // const [audioURL , setAudioURL] = useState("");
  // const [photo , setPhoto] = useState("");

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
        errors={errors}
      />

      <label className="form-control w-full">
        <textarea
          className="textarea textarea-bordered h-24"
          placeholder="Enter your prompt"
          {...register("prompt", {required: "prompt is required"})}
        ></textarea>
        <p className=" text-red-600 text-left text-sm">{errors.prompt?.message}</p>
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
          disabled={isLoading || isSubmitting }
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


export enum GenerateType {
  Image,
  Music,
}

const initOPML = async (type: GenerateType, prompt: string) => {
  let error
  try {
    console.log("initOPML")
    let response, data
    if (type === GenerateType.Image) {
       data = {
        modelName: "MusicGen",
        prompt: prompt
      }
      console.log(data)
       response = await axios.post("/api/v1/dalle/opMLRequest", data, { timeout: 300000 })
    }else if (type === GenerateType.Music) {
      data = {
        modelName: "StableDiffusion",
        prompt: prompt
      }
      console.log(data)

      response = await axios.post("/api/v1/dalle/opMLRequest", data, { timeout: 300000 })
    }
    console.log("response", response)
    return [response?.data.MPChallenge, null]; // return data and null for error
  } catch (error) {
    console.error(error);
    return [null, "Something went wrong! \n\n ERROR: " + error]; // return null for data and error message
  }
}

const generateImage = async (contractAddr: string, prompt: string, setIsGenerating: Dispatch<SetStateAction<boolean>>) => {
  try {
    setIsGenerating(true);
    console.log("generate Image")
    let response = await axios.post("/api/v1/dalle/txt2img", {contractAddress: contractAddr,  prompt: prompt }, {timeout:300000})
    const imageUrl = "data:image/png;base64," + response.data
    return [imageUrl, ""]
  } catch (error) {
    return [null, "Something went wrong! \n\n ERROR: " + error]
  }
};

const generateMusic = async (contractAddr: string, img: string, prompt: string) => {
    try {
      var audioUrl
      console.log("generate Music")
      axios.post("/api/v1/dalle/txt2music", {contractAddress: contractAddr,  prompt: prompt }, {timeout:300000})
      .then((response) => {
          console.log("/api/v1/dalle/txt2music")
        audioUrl = "data:audio/mpeg;base64," + response.data
      })
      
      // setCorrect
      axios.post("/api/v1/dalle/setIsCorrect", {contractAddress: contractAddr,  isCorrect: true }, {timeout:300000})
      .then((response) => {
          console.log("/api/v1/dalle/setIsCorrect: ", response.data)
      })

      // submitterUploadResult
      axios.post("/api/v1/dalle/submitterUploadResult", {contractAddress: contractAddr,}, {timeout:300000})
      .then((response) => {
          console.log("submitterUploadResult")
          console.log(response.data)
      })
      return [audioUrl, ""]
    } catch (error) {
      return [null, "Something went wrong! \n\n ERROR: " + error]
    } 
};