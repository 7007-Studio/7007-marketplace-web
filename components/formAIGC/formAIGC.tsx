import { useRouter } from "next/router";
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
import PromptStep from "./promptStep";
import MintStep from "./mintStep";

export interface AIGCContent {
  name: string;
  prompt: string;
  imageUrl?: string;
  audioUrl?: string;
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

  const [aigcContent, setAigcContent] = useState<AIGCContent>();
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

  const insufficientInferencePoint = () => {
    if (inferencePoint === undefined || consumedInferencePoint === undefined) {
      return true;
    }

    return 0 > inferencePoint - consumedInferencePoint - parseUnits("100", 0);
  };

  const insufficientCostToken = () => {
    if (balance === undefined || mintCostToken === undefined) {
      return true;
    }

    return 0 > balance - mintCostToken;
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

    setLog(`Token ready to be minted. Consuming inference points...\n`);

    await axios.post("/api/consumeInferencePoint", {
      user: address,
    });

    mintAIGC({
      args: [
        ipfsLinkMetadata,
        hashedPrompt,
        "0x7465787400000000000000000000000000000000000000000000000000000000",
        metadata?.image || "",
      ],
    });
  };

  if (!aigcContent) {
    return (
      <PromptStep
        modelIndex={modelIndex}
        onArtGenerated={(metadata) => setAigcContent(metadata)}
      />
    );
  }

  return <MintStep metadata={aigcContent} />;

  //   {artGenerated && !approvedSpending && (
  //     <button
  //       className="btn btn-primary"
  //       type="button"
  //       disabled={approveInitialized}
  //       onClick={() => {
  //         onApprove();
  //       }}
  //     >
  //       {approveInitialized ? (
  //         <>
  //           <span className="loading loading-spinner"></span>
  //           loading
  //         </>
  //       ) : (
  //         "Approve"
  //       )}
  //     </button>
  //   )}

  //   {artGenerated && approvedSpending && (
  //     <button
  //       className="btn btn-primary"
  //       type="button"
  //       disabled={mintInitialized}
  //       onClick={() => {
  //         onMint();
  //       }}
  //     >
  //       {mintInitialized ? (
  //         <>
  //           <span className="loading loading-spinner"></span>
  //           loading
  //         </>
  //       ) : (
  //         "Mint"
  //       )}
  //     </button>
  //   )}
  // </div>
}
