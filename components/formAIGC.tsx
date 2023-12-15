import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import TextInput from "./textInput";
import { useAigcMint, useAigtApprove } from "@/generated";
import { useEffect, useState } from "react";
import axios from "axios";
import { create } from "ipfs-http-client";
import { ethers } from "ethers";
import { Address } from "viem";
import { useWaitForTransaction } from "wagmi";

const projectId = "2V1B4bBqSCyncDB2jeHd7uy5oLN";
const projectSecret = "2b18de3a067e0a35d8700ef362c816dc";
const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");
const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

export interface IFormAIGCInput {
  name: string;
  prompt: string;
  type: string;
  model: string;
}

interface FormAIGCProps {
  setIsGenerating: (isGenerating: boolean) => void;
  aigtAddress: string;
  aigcAddress: string;
}

export default function FormAIGC({
  setIsGenerating,
  aigtAddress,
  aigcAddress,
}: FormAIGCProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  console.log("aigtAddress :", aigtAddress);
  console.log("aigcAddress :", aigcAddress);
  const { data: aigtApprove, write: writeAigtApprove } = useAigtApprove({
    address: aigtAddress as Address,
  });
  const { isSuccess: approveIsSuccess } = useWaitForTransaction({
    hash: aigtApprove?.hash,
  });
  const { data: mintData, isSuccess: mintIsSuccess, write: writeAigcMint } = useAigcMint({
    address: aigcAddress as Address,
  });
  const { isSuccess: isMinted } = useWaitForTransaction({
    hash: mintData?.hash,
  });
  const { register, handleSubmit, formState, getValues } =
    useForm<IFormAIGCInput>();
  const { errors } = formState;

  const [imageUrl, setImageUrl] = useState("");
  const [audio, setAudio] = useState("");
  const [hashedPrompt, setHashedPrompt] = useState<`0x${string}` | undefined>();
  const [contractAddress, setContractAddress] = useState("");

  const initOPML = async (type: GenerateType, prompt: string) => {
    let error;
    try {
      console.log("initOPML");
      let response, data;
      if (type === GenerateType.Image) {
        data = {
          modelName: "StableDiffusion",
          prompt: prompt,
        };
        console.log(data);

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
        console.log(data);
        response = await axios.post(
          "https://demo.7007.studio/api/v1/dalle/opMLRequest",
          data,
          {
            timeout: 300000,
          }
        );
      }
      console.log("response", response);
      setContractAddress(response?.data.MPChallenge);
      return [response?.data.MPChallenge, null]; // return data and null for error
    } catch (error) {
      console.error(error);
      return [null, "Something went wrong! \n\n ERROR: " + error]; // return null for data and error message
    }
  };

  const generateImage = async (contractAddr: string, prompt: string) => {
    try {
      setIsGenerating(true);
      console.log("generate Image");
      let response = await axios.post(
        "https://demo.7007.studio/api/v1/dalle/txt2img",
        { contractAddress: contractAddr, prompt: prompt },
        { timeout: 300000 }
      );
      const imageUrl = "data:image/png;base64," + response.data;
      setImageUrl(imageUrl);
      return [imageUrl, ""];
    } catch (error) {
      return [null, "Something went wrong! \n\n ERROR: " + error];
    }
  };

  const generateMusic = async (contractAddr: string, prompt: string) => {
    try {
      console.log("generate Music");
      const response = await axios.post(
        "https://demo.7007.studio/api/v1/dalle/txt2music",
        { contractAddress: contractAddr, prompt: prompt },
        { timeout: 300000 }
      );
      console.log("/api/v1/dalle/txt2music");
      const audioUrl = "data:audio/mpeg;base64," + response.data;

      console.log(audioUrl);
      setAudio(audioUrl);

      return [audioUrl, null];
    } catch (error) {
      return [null, "Something went wrong! \n\n ERROR: " + error];
    }
  };

  const getTokenURI = async (
    imageUrl: string,
    audio: string,
    prompt: string
  ) => {
    console.log("mintNft");
    console.log("imageUrl: ", imageUrl);
    console.log("audio: ", audio);

    // mint an nft with the photo and audio
    // make an mp4 with the photo and audio
    let response = await fetch(imageUrl);
    let blob = await response.blob();
    let file = new File([blob], "file.png", { type: "image/png" });
    let result = await client.add(file);
    const ipfsLinkImg = "https://cloudflare-ipfs.com/ipfs/" + result.path;
    // console.log("ipfs hash: ", result.path)

    response = await fetch(audio);
    blob = await response.blob();
    file = new File([blob], "file.mp3", { type: "audio/mp3" });
    result = await client.add(file);
    const ipfsLinkAudio = "https://cloudflare-ipfs.com/ipfs/" + result.path;

    // upload the mp4 to ipfs
    const metadata = {
      name: "7007 AIGC NFT",
      description:
        "This NFT is generated and verified with OPML on https://demo.7007.studio/. The model used is Stable Diffusion and MusicGen. The original prompt is: " +
        prompt,
      image: ipfsLinkImg,
      external_url: "https://demo.7007.studio/",
      attributes: [
        {
          trait_type: "prompt",
          value: prompt,
        },
        {
          trait_type: "music",
          value: ipfsLinkAudio,
        },
        {
          trait_type: "model",
          value: "Stable Diffusion, MusicGen",
        },
      ],
    };

    let buffer = Buffer.from(JSON.stringify(metadata));
    result = await client.add(buffer);

    const ipfsLinkMetadata = "https://cloudflare-ipfs.com/ipfs/" + result.path;
    console.log("ipfs metadata: ", ipfsLinkMetadata);
    return { ipfsLinkMetadata, metadata };

    // mint the nft
    // const provider = new ethers.BrowserProvider(window.ethereum);
    // await provider.send("eth_requestAccounts", []);
    // const signer = await provider.getSigner();
    // // const provider = new JsonRpcProvider("https://goerli.infura.io/v3/a84b538abf714818b3662cd1fcd7c530");
    // const contract = new ethers.Contract("0x4754a4059128fF45ae408bc7AB8Efe52b69cc5a4", abi, signer);
    // console.log("contract: ", contract)
    // let tx = await contract.mint(ipfsLinkMetadata)
    // await tx.wait()
    // console.log("tx: ", tx)
  };

  const onSubmit: SubmitHandler<IFormAIGCInput> = async (data) => {
    setIsSubmitting(true);
    setIsGenerating(true);
    console.log(data);

    let [contractAddr, error] = await initOPML(GenerateType.Image, data.prompt);
    // console.log("contractAddr: ", contractAddr)
    const [img] = await generateImage(contractAddr, data.prompt);

    [contractAddr, error] = await initOPML(GenerateType.Music, data.prompt);
    const [audio] = await generateMusic(contractAddr, data.prompt);
    console.log("aigtAddress :", aigtAddress);
    console.log("aigcAddress :", aigcAddress);
    writeAigtApprove({
      args: [aigcAddress as Address, BigInt(1000)],
    });

    const hashedPrompt = ethers.encodeBytes32String(
      data.prompt
    ) as `0x${string}`;
    setHashedPrompt(hashedPrompt);

    // TODO: replace with call to mint model
    // setTimeout(() => {
    //   router.push("/");
    // }, 5000);
  };

  const onMint = async () => {
    const prompt = getValues("prompt");
    const { ipfsLinkMetadata, metadata } = await getTokenURI(
      imageUrl,
      audio,
      prompt
    );
    console.log("tokenURI", ipfsLinkMetadata);

    const hashedPrompt = ethers.encodeBytes32String(prompt) as `0x${string}`;

    writeAigcMint({
      args: [
        ipfsLinkMetadata,
        hashedPrompt,
        "0x7465787400000000000000000000000000000000000000000000000000000000",
        metadata.image,
      ],
    });
  };

  useEffect(() => {
    if(isMinted){
      router.push(
        `/model/${aigtAddress}/aigc/${aigcAddress}/detail`
      );
    }
  },[isMinted,aigtAddress,aigcAddress,router])

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

        {!approveIsSuccess && (
          <button className="btn btn-primary">
            {isSubmitting ? (
              <>
                <span className="loading loading-spinner"></span>
                loading
              </>
            ) : (
              "Generate"
            )}
          </button>
        )}

        {approveIsSuccess && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onMint()}
          >
            Mint
          </button>
        )}
        {/* {isError && <div>Error: {error?.message}</div>} */}
      </div>
      {imageUrl && <img src={imageUrl} />}
      {audio && (
        <audio
          controls
          src={audio}
          // type="audio/ogg"
          className="w-full h-full object-contain"
        ></audio>
      )}
    </form>
  );
}

export enum GenerateType {
  Image,
  Music,
}
