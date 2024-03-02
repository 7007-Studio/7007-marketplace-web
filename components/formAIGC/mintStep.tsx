import { useRef, useState } from "react";
import { ethers } from "ethers";
import { Address } from "viem";
import { useAccount } from "wagmi";

import {
  useReadAigcModelName,
  useReadAigcTokenId,
  useWatchAigcTransferEvent,
  useWriteAigcMint,
} from "@/generated";
import generateAigcContent from "@/helpers/generateAigcContent";
import ArrowLeftIcon from "@/components/arrowLeftIcon";

import PromptForm from "./promptForm";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { AIGCContent } from ".";
import getTokenURI from "./getTokenURI";

interface MintStepProps {
  modelIndex: number | string;
  aigtAddress: Address;
  aigcAddress: Address;
  aigcContent: AIGCContent;
  setAigcContent: (aigcContent?: AIGCContent) => void;
  onMintSuccess: (tokenId: string | number) => void;
}

const MintStep = ({
  modelIndex,
  aigtAddress,
  aigcAddress,
  aigcContent,
  setAigcContent,
  onMintSuccess,
}: MintStepProps) => {
  const editPromptModalRef = useRef<HTMLDialogElement>(null);

  const [mintInitialized, setMintInitialized] = useState(false);
  const [regenerating, setRegenerating] = useState(false);

  const { address: connectedWallet, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  const { data: modelName } = useReadAigcModelName({
    address: aigcAddress,
  });
  const { data: tokenId } = useReadAigcTokenId({
    address: aigcAddress,
  });

  // write contracts
  const { writeContract: mintAIGC } = useWriteAigcMint();

  // contract events
  useWatchAigcTransferEvent({
    address: aigcAddress,
    args: { to: connectedWallet },
    onLogs: () => {
      onMintSuccess(String(tokenId));
    },
  });

  const onMint = async () => {
    if (!isConnected) {
      openConnectModal?.();
      return;
    }

    if (!aigcContent) {
      return;
    }

    setMintInitialized(true);

    const { name, prompt, imageUrl, audioUrl } = aigcContent;
    const { ipfsLinkMetadata, metadata } = await getTokenURI(
      modelName || "Genesis Model",
      name,
      prompt,
      imageUrl,
      audioUrl
    );

    const hashedPrompt = ethers.encodeBytes32String(prompt) as `0x${string}`;

    mintAIGC(
      {
        address: aigcAddress,
        args: [
          ipfsLinkMetadata,
          hashedPrompt,
          "0x7465787400000000000000000000000000000000000000000000000000000000",
          metadata?.image || "",
        ],
      },
      {
        onError(error) {
          setMintInitialized(false);
        },
      }
    );
  };

  return (
    <>
      <div>
        <div className="py-10">
          <span
            onClick={() => {
              setAigcContent(undefined);
            }}
            className="flex flex-row gap-2 hover:cursor-pointer"
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
          <div className="pt-20 px-6 pb-4 flex flex-row justify-between items-center">
            <h2 className="heading-lg">{aigcContent.name}</h2>
            <button
              className="btn btn-sm btn-secondary"
              onClick={() => {
                editPromptModalRef?.current?.showModal();
              }}
            >
              Edit
            </button>
          </div>
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

            {
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
            }
          </div>
        </div>
      </div>

      <dialog ref={editPromptModalRef} id="" className="modal">
        <div className="modal-box max-w-[904px] py-16 px-20 bg-white">
          <h2 className="heading-lg mb-12">Edit prompt</h2>
          <PromptForm
            submitText="Generate"
            defaultValues={{
              name: aigcContent.name,
              prompt: aigcContent.prompt,
            }}
            onArtGenerated={(_aigcContent) => {
              setAigcContent(_aigcContent);
              editPromptModalRef.current?.close();
            }}
          />
        </div>
      </dialog>
    </>
  );
};

export default MintStep;
