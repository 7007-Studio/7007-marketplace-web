import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import TextInput from "./textInput";
import {
  useAigcCostToken,
  useAigcMint,
  useAigcTokenId,
  useAigcTransferEvent,
  useAigtApprovalEvent,
  useAigtApprove,
} from "@/generated";
import { useState } from "react";
import axios from "axios";
import { create } from "ipfs-http-client";
import { ethers } from "ethers";
import { Address } from "viem";
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";

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

const getTokenURI = async (
  imageUrl: string,
  audio: string,
  name: string,
  prompt: string
) => {
  // make an mp4 with the photo and audio
  let response = await fetch(imageUrl);
  let blob = await response.blob();
  let file = new File([blob], "file.png", { type: "image/png" });
  let result = await client.add(file);
  const ipfsLinkImg = "https://cloudflare-ipfs.com/ipfs/" + result.path;

  response = await fetch(audio);
  blob = await response.blob();
  file = new File([blob], "file.mp3", { type: "audio/mp3" });
  result = await client.add(file);
  const ipfsLinkAudio = "https://cloudflare-ipfs.com/ipfs/" + result.path;

  // upload the mp4 to ipfs
  const metadata = {
    name,
    description:
      "This NFT is generated and verified with OPML on https://demo.7007.studio/. The model used is Stable Diffusion and MusicGen. The original prompt is: " +
      prompt,
    image: ipfsLinkImg,
    external_url: "https://alpha.7007.studio/",
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
        value: "Genesis Model",
      },
    ],
  };

  let buffer = Buffer.from(JSON.stringify(metadata));
  result = await client.add(buffer);

  const ipfsLinkMetadata = "https://cloudflare-ipfs.com/ipfs/" + result.path;
  return { ipfsLinkMetadata, metadata };
};

export interface IFormAIGCInput {
  name: string;
  prompt: string;
  type: string;
  model: string;
  imageUrl: string;
  audioUrl: string;
}

interface FormAIGCProps {
  modelIndex: number;
  aigtAddress: Address;
  aigcAddress: Address;
}

export default function FormAIGC({
  modelIndex,
  aigtAddress,
  aigcAddress,
}: FormAIGCProps) {
  const router = useRouter();
  const { isConnected, address } = useAccount();
  const { openConnectModal } = useConnectModal();

  const [isSubmitting, setIsSubmitting] = useState(false);

  // read contracts
  const { data: tokenId } = useAigcTokenId({
    address: aigcAddress,
  });
  const { data: mintCostToken } = useAigcCostToken({
    address: aigcAddress,
  });

  // write contracts
  const { write: approveSpendingAIGT } = useAigtApprove({
    address: aigtAddress,
  });
  const { write: mintAIGC } = useAigcMint({
    address: aigcAddress,
  });

  // contract events
  useAigtApprovalEvent({
    address: aigtAddress,
    listener: (log) => {
      // console.log(log);
      onMint();
    },
  });

  useAigcTransferEvent({
    address: aigcAddress,
    listener: async (log) => {
      // console.log(log);

      await axios.post("/api/consumeInferencePoint", {
        user: address,
      });
      router.push(`/model/${modelIndex}/aigc/${tokenId}`);
    },
  });

  const { register, handleSubmit, formState, getValues, setValue } =
    useForm<IFormAIGCInput>();
  const { errors } = formState;

  // const [imageUrl, setImageUrl] = useState("");
  // const [audio, setAudio] = useState("");

  const onSubmit: SubmitHandler<IFormAIGCInput> = async (data) => {
    if (!isConnected) {
      openConnectModal?.();
      return;
    }

    setIsSubmitting(true);

    let contractAddr = await initOPML(GenerateType.Image, data.prompt);
    const imageUrl = await generateImage(contractAddr, data.prompt);
    if (imageUrl) {
      setValue("imageUrl", imageUrl);
    }

    contractAddr = await initOPML(GenerateType.Music, data.prompt);
    const audioUrl = await generateMusic(contractAddr, data.prompt);
    if (audioUrl) {
      setValue("audioUrl", audioUrl);
    }

    if (mintCostToken === undefined) {
      return;
    }

    approveSpendingAIGT({
      args: [aigcAddress as Address, mintCostToken],
    });
  };

  const onMint = async () => {
    const prompt = getValues("prompt");
    const { ipfsLinkMetadata, metadata } = await getTokenURI(
      getValues("imageUrl"),
      getValues("audioUrl"),
      getValues("name"),
      prompt
    );

    const hashedPrompt = ethers.encodeBytes32String(prompt) as `0x${string}`;

    mintAIGC({
      args: [
        ipfsLinkMetadata,
        hashedPrompt,
        "0x7465787400000000000000000000000000000000000000000000000000000000",
        metadata.image,
      ],
    });
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
              <span className="label-text">Model</span>
            </div>
            <select className="select select-bordered w-full" value={1}>
              <option value={1}>Genesis Model</option>
            </select>
          </label>
        </div>

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
      </div>
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
}
