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
  useAigtBalanceOf,
  useAigtSymbol,
  useStake7007ConsumedInferencePoint,
  useStake7007GetInferencePoint,
} from "@/generated";
import { useState } from "react";
import axios from "axios";
import { create } from "ipfs-http-client";
import { ethers } from "ethers";
import { Address, parseUnits } from "viem";
import { useAccount, useWaitForTransaction } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { STAKE7007_CONTRACT_ADDRESS } from "@/constants";

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

const projectId = process.env.NEXT_PUBLIC_INFURA_PROJECT_ID;
const projectSecret = process.env.NEXT_PUBLIC_INFURA_PROJECT_SECRET;
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

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [artGenerated, setArtGenerated] = useState(false);
  const [approvedSpending, setApprovedSpending] = useState(false);
  const [approveInitialized, setApproveInitialized] = useState(false);
  const [mintInitialized, setMintInitialized] = useState(false);

  const [log, setLog] = useState("");

  // read contracts
  const { data: symbol } = useAigtSymbol({
    address: aigtAddress,
  });
  const { data: balance } = useAigtBalanceOf({
    address: aigtAddress,
    args: address ? [address] : undefined,
  });
  const { data: tokenId } = useAigcTokenId({
    address: aigcAddress,
  });
  const { data: mintCostToken } = useAigcCostToken({
    address: aigcAddress,
  });

  const { data: inferencePoint } = useStake7007GetInferencePoint({
    address: STAKE7007_CONTRACT_ADDRESS,
    args: address ? [address] : undefined,
  });

  const { data: consumedInferencePoint } = useStake7007ConsumedInferencePoint({
    address: STAKE7007_CONTRACT_ADDRESS,
    args: address ? [address] : undefined,
  });

  // write contracts
  const { write: approveSpendingAIGT, data: approveTx } = useAigtApprove({
    address: aigtAddress,
    onError(error) {
      setLog(`Approve spending is canceled due to: ${error.message}\n`);
      setApproveInitialized(false);
    },
    onSuccess(data) {
      setLog(`Approval transaction sent. Waiting for confirmation event.\n`);
    },
  });
  const { write: mintAIGC, data: mintTx } = useAigcMint({
    address: aigcAddress,
    onError(error) {
      setLog(`Mint is canceled due to: ${error.message}\n`);
      setMintInitialized(false);
    },
    onSuccess(data) {
      setLog(`Mint transaction sent. Waiting for confirmation event.\n`);
    },
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
      router.push(`/model/${modelIndex}/aigc/${tokenId}`);
    },
  });

  // wait for tx confirmation
  useWaitForTransaction({
    hash: approveTx?.hash,
    onSuccess(data) {
      setApprovedSpending(true);
      setApproveInitialized(false);
    },
  });
  useWaitForTransaction({
    hash: mintTx?.hash,
    onSuccess(data) {
      setMintInitialized(false);
    },
  });

  const { register, handleSubmit, formState, getValues, setValue } =
    useForm<IFormAIGCInput>();
  const { errors } = formState;

  const insufficientInferencePoint = () => {
    if (inferencePoint === undefined || consumedInferencePoint === undefined) {
      return true;
    }

    return (
      0 > inferencePoint - consumedInferencePoint - parseUnits("10000", 18)
    );
  };

  const insufficientCostToken = () => {
    if (balance === undefined || mintCostToken === undefined) {
      return true;
    }

    return 0 > balance - mintCostToken;
  };

  const onSubmit: SubmitHandler<IFormAIGCInput> = async (data) => {
    setErrorMessage("");
    if (!isConnected) {
      openConnectModal?.();
      return;
    }

    if (insufficientInferencePoint()) {
      setErrorMessage(
        "Insufficient inference point. Please mint and stake 7007 token to earn inference points."
      );
      return;
    }

    if (insufficientCostToken()) {
      setErrorMessage(`Insufficient ${symbol} token.`);
      return;
    }

    setIsSubmitting(true);

    let contractAddr = await initOPML(GenerateType.Image, data.prompt);
    setLog(`Generating image...\n`);
    const imageUrl = await generateImage(contractAddr, data.prompt);
    if (imageUrl) {
      setValue("imageUrl", imageUrl);
    }

    setLog(`Image generated. Generating music...\n`);

    contractAddr = await initOPML(GenerateType.Music, data.prompt);
    const audioUrl = await generateMusic(contractAddr, data.prompt);
    if (audioUrl) {
      setValue("audioUrl", audioUrl);
    }

    setLog(`Audio generated. Please approve ${symbol} token spending...\n`);

    setArtGenerated(true);

    onApprove();
  };

  const onApprove = () => {
    if (mintCostToken === undefined) {
      return;
    }

    setApproveInitialized(true);
    approveSpendingAIGT({ args: [aigcAddress, mintCostToken] });
  };

  const onMint = async () => {
    setMintInitialized(true);

    const prompt = getValues("prompt");
    const { ipfsLinkMetadata, metadata } = await getTokenURI(
      getValues("imageUrl"),
      getValues("audioUrl"),
      getValues("name"),
      prompt
    );

    const hashedPrompt = ethers.encodeBytes32String(prompt) as `0x${string}`;

    setLog(`Token ready to be minted. Consuming inference points...\n`);

    await axios.post("/api/consumeInferencePoint", {
      user: address,
    });

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
            <select
              className="select select-bordered w-full"
              value={1}
              onChange={(e) => {}}
            >
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
              "Generate"
            )}
          </button>
        )}

        {artGenerated && !approvedSpending && (
          <button
            className="btn btn-primary"
            type="button"
            disabled={approveInitialized}
            onClick={() => {
              onApprove();
            }}
          >
            {approveInitialized ? (
              <>
                <span className="loading loading-spinner"></span>
                loading
              </>
            ) : (
              "Approve"
            )}
          </button>
        )}

        {artGenerated && approvedSpending && (
          <button
            className="btn btn-primary"
            type="button"
            disabled={mintInitialized}
            onClick={() => {
              onMint();
            }}
          >
            {mintInitialized ? (
              <>
                <span className="loading loading-spinner"></span>
                loading
              </>
            ) : (
              "Mint"
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
}
