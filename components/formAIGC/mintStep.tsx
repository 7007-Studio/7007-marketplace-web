import { useState } from "react";
import { ethers } from "ethers";
import { Address, useWaitForTransaction } from "wagmi";
import { create } from "ipfs-http-client";

import {
  useAigcCostToken,
  useAigcMint,
  useAigcModelName,
  useAigcTokenId,
  useAigcTransferEvent,
  useAigtApprovalEvent,
  useAigtApprove,
} from "@/generated";
import generateAigcContent from "@/helpers/generateAigcContent";
import ArrowLeftIcon from "@/components/arrowLeftIcon";

import { AIGCContent } from "./formAIGC";

interface MintStepProps {
  modelIndex: number | string;
  aigtAddress: Address;
  aigcAddress: Address;
  aigcContent: AIGCContent;
  setAigcContent: (aigcContent?: AIGCContent) => void;
  onMintSuccess: (tokenId: string | number) => void;
}

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
  name: string,
  prompt: string,
  imageUrl?: string,
  audio?: string
) => {
  // make an mp4 with the photo and audio
  let ipfsLinkImg;
  let result;
  if (imageUrl) {
    let response = await fetch(imageUrl);
    let blob = await response.blob();
    let file = new File([blob], "file.png", { type: "image/png" });
    result = await client.add(file);
    ipfsLinkImg = "https://cloudflare-ipfs.com/ipfs/" + result.path;
  }
  // response = await fetch(audio);
  // blob = await response.blob();
  // file = new File([blob], "file.mp3", { type: "audio/mp3" });
  // result = await client.add(file);
  // const ipfsLinkAudio = "https://cloudflare-ipfs.com/ipfs/" + result.path;

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
      // {
      //   trait_type: "music",
      //   value: ipfsLinkAudio,
      // },
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

const MintStep = ({
  modelIndex,
  aigtAddress,
  aigcAddress,
  aigcContent,
  setAigcContent,
  onMintSuccess,
}: MintStepProps) => {
  const [approvedSpending, setApprovedSpending] = useState(false);
  const [approveInitialized, setApproveInitialized] = useState(false);
  const [mintInitialized, setMintInitialized] = useState(false);
  const [regenerating, setRegenerating] = useState(false);

  const { data: modelName } = useAigcModelName({
    address: aigcAddress,
  });
  const { data: tokenId } = useAigcTokenId({
    address: aigcAddress,
  });
  const { data: mintCostToken } = useAigcCostToken({
    address: aigcAddress,
  });

  // write contracts
  const { write: approveSpendingAIGT, data: approveTx } = useAigtApprove({
    address: aigtAddress,
    onError(error) {
      setApproveInitialized(false);
    },
    onSuccess(data) {},
  });
  const { write: mintAIGC, data: mintTx } = useAigcMint({
    address: aigcAddress,
    onError(error) {
      setMintInitialized(false);
    },
    onSuccess(data) {},
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
      // router.push(`/model/${modelIndex}/aigc/${tokenId}`);
      onMintSuccess(String(tokenId));
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

  const onApprove = () => {
    if (mintCostToken === undefined) {
      return;
    }

    setApproveInitialized(true);
    approveSpendingAIGT({ args: [aigcAddress, mintCostToken] });
  };

  const onMint = async () => {
    setMintInitialized(true);
    if (!aigcContent) {
      return;
    }

    const { name, prompt, imageUrl, audioUrl } = aigcContent;
    const { ipfsLinkMetadata, metadata } = await getTokenURI(
      name,
      prompt,
      imageUrl,
      audioUrl
    );

    const hashedPrompt = ethers.encodeBytes32String(prompt) as `0x${string}`;

    mintAIGC({
      args: [
        ipfsLinkMetadata,
        hashedPrompt,
        "0x7465787400000000000000000000000000000000000000000000000000000000",
        metadata?.image || "",
      ],
    });
  };

  return (
    <div>
      <div className="py-10">
        <span
          onClick={() => {
            setAigcContent(undefined);
          }}
          className="flex flex-row gap-2"
        >
          <ArrowLeftIcon className="text-primary" /> Back
        </span>
      </div>
      <div className="card card-bordered max-w-[534px] mx-auto mb-10 bg-white">
        <div className="py-4 px-6">
          <span className="badge badge-lg text-[#FF78F1] bg-[#FF78F1]/[0.12]">
            {modelName}
          </span>
        </div>
        {regenerating ? (
          <div className="flex justify-center align-middle aspect-square bg-base-100">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : (
          <img src={aigcContent.imageUrl} alt="Generated image" />
        )}
        <div className="pt-20 px-6 pb-4 heading-lg">{aigcContent.name}</div>
        <div className="px-6">{aigcContent.prompt}</div>
        <div className="flex flex-row pt-4 px-6 pb-10 justify-end gap-4">
          <button
            className="btn btn-secondary"
            onClick={async () => {
              setRegenerating(true);
              const newAigcContent = await generateAigcContent(
                aigcContent.name,
                aigcContent.prompt
              );
              setAigcContent(newAigcContent);

              setRegenerating(false);
            }}
          >
            Regenerate
          </button>
          {!approvedSpending && (
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
          {approvedSpending && (
            <button
              className="btn btn-primary"
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
                "Mint for 0.001eth"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MintStep;
