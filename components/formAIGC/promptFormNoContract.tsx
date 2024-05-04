import { useForm, SubmitHandler, DefaultValues } from "react-hook-form";
import TextInput from "../form/textInput";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import { useRouter } from "next/navigation";
import { ModelInfo } from "@/types";
import axios from "axios";
import { useWriteAigcMint } from "@/generated";
import { ethers } from "ethers";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { getTokenURI } from "./ipfsHelper";
import useNftContract from "@/hooks/useNftContract";
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
  const { address, isConnected, chain } = useAccount();
  const { register, handleSubmit, formState } = useForm<IFormAIGCInput>({
    defaultValues,
  });
  const { writeContract: mintAIGC, data: mintTx } = useWriteAigcMint();
  const mintResult = useWaitForTransactionReceipt({
    hash: mintTx,
  });

  const [image, setImage] = useState();
  const { openConnectModal } = useConnectModal();
  const [mintInitialized, setMintInitialized] = useState(false);
  const { nftContract } = useNftContract({
    modelIndex: 1n,
    chainId: chain?.id,
  });
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
      const targetTask = data.filter(
        (task: any) => task.prompt === prompt && task.seed === seed
      );
      console.log("Target task:", targetTask);
      if (targetTask.length === 0) return;
      fetchImages(targetTask[0].id);
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
      console.log("Image:", image.data.images[0]);
      // setImages(image.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };
  // const genImage = async () => {
  //   setLoading(true);
  //   if (!prompt || !seed || !address) return;
  //   const data = JSON.stringify({
  //     prompt: prompt,
  //     seed: seed,
  //     modelID: modelID,
  //     modelAuthorID: modelInfo.modelAuthorID,
  //   });
  //   try {
  //     const res = await axios.post(
  //       "https://f3593qhe00.execute-api.ap-northeast-1.amazonaws.com/dev/model_inference_task",
  //       // "https://ai.7007.studio/gen",
  //       data,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           "user-id": address,
  //         },
  //       }
  //     );
  //     if (res.data.message === "Success") {
  //       // router.push("/account/inferencing");
  //       dialogRef.current?.showModal();
  //       handleFetchData();
  //     } else {
  //       throw new Error(`Failed to get presigned URL: ${res.status}`);
  //     }
  //   } catch (error) {
  //     console.error("Request error while getting presigned URL:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const genImage = async () => {
    setLoading(true);
    if (!prompt || !seed || !address) return;
    const data = JSON.stringify({
      prompt: prompt,
      seed: seed,
    });
    try {
      const res = await axios.post("https://ai.7007.studio/gen", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setImage(res.data);
      dialogRef.current?.showModal();
      // handleFetchData();
    } catch (error) {
      console.error("Request error while getting presigned URL:", error);
    } finally {
      setLoading(false);
    }
  };
  const onSubmit: SubmitHandler<IFormAIGCInput> = async (data) => {
    genImage();
  };

  const onMint = async () => {
    if (!isConnected) {
      openConnectModal?.();
      return;
    }

    if (
      !title ||
      !prompt ||
      !seed ||
      !image ||
      !address ||
      !nftContract ||
      !modelInfo
    ) {
      return;
    }

    setMintInitialized(true);

    const { ipfsLinkMetadata, metadata } = await getTokenURI(
      modelInfo ? modelInfo.modelName : "Genesis Model",
      title,
      prompt,
      Number(seed),
      `https://cloudflare-ipfs.com/ipfs/${image}`
    );
    console.log("ipfsLinkMetadata:", ipfsLinkMetadata);
    console.log("metadata:", metadata);

    const hashedPrompt = ethers.encodeBytes32String(prompt) as `0x${string}`;

    mintAIGC(
      {
        address: nftContract,
        args: [
          ipfsLinkMetadata,
          hashedPrompt,
          "0x7465787400000000000000000000000000000000000000000000000000000000",
          metadata?.image || "",
        ],
      },
      {
        onError(error: any) {
          setMintInitialized(false);
        },
      }
    );
  };

  useEffect(() => {
    if (mintResult.isSuccess) {
      setMintInitialized(false);
      router.push("/account/created");
    }
  }, [mintResult.isSuccess]);

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
              onChange={(e: any) => {
                const regex = /^(0|[1-9]\d*)$/;
                if (e.target.value === "" || regex.test(e.target.value)) {
                  setSeed(e.target.value);
                }
              }} // Update the input value directly
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
      </form>
      <dialog ref={dialogRef} className="modal">
        <div className="modal-box flex flex-col p-4 items-center gap-4">
          {image ? (
            <img
              src={`https://cloudflare-ipfs.com/ipfs/${image}`}
              alt="Image"
              className="size-[500px]"
            />
          ) : (
            <div className="flex gap-2 size-[200px] justify-center items-center">
              <span className="loading loading-spinner text-black" />
              <a className="text-black">loading</a>
            </div>
          )}
          <div className="flex justify-between w-full gap-4 h-[45px]">
            <button
              className="z-20 bg-transparent text-black border border-black font-bold transition-all flex justify-center items-center p-1 rounded w-full"
              onClick={() => dialogRef.current?.close()}
            >
              Cancel
            </button>
            <button
              className="z-20 bg-transparent text-black border border-black font-bold transition-all flex justify-center items-center p-1 rounded w-full"
              onClick={() => onMint()}
              disabled={mintInitialized}
            >
              {mintInitialized ? (
                <div className="flex gap-2 items-center">
                  <span className="loading loading-spinner"></span>
                  Minting
                </div>
              ) : (
                "Mint"
              )}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default PromptForm;
