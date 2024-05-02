import { useForm, SubmitHandler, DefaultValues } from "react-hook-form";
import TextInput from "../form/textInput";
import { useRef, useState } from "react";
import Image from "next/image";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { ModelInfo } from "@/types";
import axios from "axios";
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
  defaultValues,
  modelInfo,
  modelID,
}: {
  submitText?: string;
  defaultValues?: DefaultValues<IFormAIGCInput>;
  modelInfo: ModelInfo;
  modelID: string;
}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState();
  const [negativePrompt, setNegativePrompt] = useState();
  const [seed, setSeed] = useState();
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [title, setTitle] = useState();
  const { address } = useAccount();
  const { register, handleSubmit, formState } = useForm<IFormAIGCInput>({
    defaultValues,
  });
  const { errors } = formState;
  const [images, setImages] = useState([]);
  const [task, setTask] = useState();

  const handleFetchData = async () => {
    if (!address) return;

    try {
      const apiUrl = `https://f3593qhe00.execute-api.ap-northeast-1.amazonaws.com/dev/tasks_status?action=inference`;
      const response = await axios.get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          "user-id": address,
        },
      });

      const data = response.data;
      console.log("Data:", data);
      setTask(data);
      data.map((task: any) => {
        fetchImages(task.requestID);
        console.log("Task:", task);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchImages = async (requestId: string) => {
    if (!address || !requestId) return;
    try {
      const image = await axios.get(
        `https://f3593qhe00.execute-api.ap-northeast-1.amazonaws.com/dev/genImages?requestID=${requestId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "user-id": address,
          },
        }
      );
      console.log("Image:", image);
      // setImages(image.data.images);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };
  const genImage = async () => {
    setLoading(true);
    const data = JSON.stringify({
      prompt: prompt,
      seed: seed,
      modelID: modelID,
      modelAuthorID: modelInfo.modelAuthorID,
    });
    try {
      const res = await axios.post(
        "https://f3593qhe00.execute-api.ap-northeast-1.amazonaws.com/dev/model_inference_task",
        // "https://ai.7007.studio/gen",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            "user-id": address,
          },
        }
      );
      if (res.data.message === "Success") {
        // router.push("/account/inferencing");
        dialogRef.current?.showModal();
        handleFetchData();
      } else {
        throw new Error(`Failed to get presigned URL: ${res.status}`);
      }
    } catch (error) {
      console.error("Request error while getting presigned URL:", error);
    } finally {
      setLoading(false);
    }
  };
  const onSubmit: SubmitHandler<IFormAIGCInput> = async (data) => {
    genImage();
  };

  return (
    <>
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
        <div className="flex flex-col w-full gap-3">
          <p className="pl-2">Title</p>
          <input
            type="text"
            name="modelTitle"
            id="modelTitle"
            className="bg-grey h-16 pl-10"
            value={title} // Bind the value to the state variable
            onChange={(e: any) => setTitle(e.target.value)} // Update the input value directly
            required
            placeholder="Let's give it a cool name"
          />
        </div>
        <div className="flex flex-col w-full gap-3">
          <p className="pl-2">Positive prompt</p>
          <input
            type="text"
            name="modelPositive"
            id="modelPositive"
            className="bg-grey h-32 pl-10"
            value={prompt} // Bind the value to the state variable
            onChange={(e: any) => setPrompt(e.target.value)} // Update the input value directly
            required
            placeholder="Enter your prompt"
          />
        </div>
        <div className="flex flex-col w-full gap-3">
          <p className="pl-2">Negative prompt (optional)</p>
          <input
            type="text"
            name="modelPositive"
            id="modelPositive"
            className="bg-grey h-32 pl-10"
            value={negativePrompt} // Bind the value to the state variable
            onChange={(e: any) => setNegativePrompt(e.target.value)} // Update the input value directly
            placeholder="Enter your prompt"
          />
        </div>
        <div className="flex gap-[20px] justify-between">
          <div className="flex flex-col w-1/2 gap-3">
            <p className="pl-2">Seed</p>
            <input
              type="text"
              name="modelSeed"
              id="modelSeed"
              className="bg-grey h-16 pl-10"
              value={seed} // Bind the value to the state variable
              onChange={(e: any) => setSeed(e.target.value)} // Update the input value directly
              placeholder="Enter Seed +"
            />
          </div>
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
          <div className="flex flex-col w-1/2 gap-3">
            <p className="pl-2">Model</p>
            <input
              type="text"
              name="modelName" // Provide a name attribute to identify the input field
              id="modelName"
              className="bg-grey h-16 pl-10"
              defaultValue={modelInfo?.modelName}
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
              className="w-[260px] h-[58px] bg-white/40 border flex items-center justify-center gap-2 border-white rounded"
              disabled={loading}
            >
              {loading ? (
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
        <button onClick={() => dialogRef.current?.showModal()}>sasd</button>
      </form>
      <dialog id="my_modal_2" ref={dialogRef} className="modal">
        <div className="modal-box flex flex-col p-4 items-center gap-4">
          {images.map((imgData, index) => (
            <img
              key={index}
              src={`data:image/jpeg;base64,${imgData}`}
              alt={`Image ${index}`}
            />
          ))}
          <Image
            src={
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII="
            }
            alt="Image"
            width={100}
            height={100}
          />
          <div className="flex justify-between w-full gap-4 h-[45px]">
            <button className="z-20 bg-transparent text-black border border-black font-bold transition-all flex justify-center items-center p-1 rounded w-full ">
              Cancel
            </button>
            <button className="z-20 bg-transparent text-black border border-black font-bold transition-all flex justify-center items-center p-1 rounded w-full">
              Mint
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default PromptForm;
