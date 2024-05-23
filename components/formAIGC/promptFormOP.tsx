import { RefObject, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  useAccount,
  useBalance,
  useReadContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { useRouter } from "next/navigation";
import { ModelDetail } from "@/types";
import axios from "axios";
import { useReadAigcEstimateTotalFee, useWriteAigcMint } from "@/generated";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { Address, parseUnits } from "viem";
import { toast } from "react-hot-toast";

const PromptFormOP = ({
  submitText = "Generate",
  modelData,
}: {
  submitText?: string;
  modelData: ModelDetail;
}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [prompt, setPrompt] = useState("");
  const [minted, setMinted] = useState(false);
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { address, isConnected, chain } = useAccount();
  const { writeContract: mintAIGC, data: mintTx } = useWriteAigcMint();
  const mintResult = useWaitForTransactionReceipt({
    hash: mintTx,
  });
  const { data: totalFee } = useReadAigcEstimateTotalFee({
    address: modelData.NFTContract as Address,
  });

  const [text, setText] = useState();
  const { openConnectModal } = useConnectModal();
  const [mintInitialized, setMintInitialized] = useState(false);
  const result = useBalance({
    address: address,
  });
  const genOPImage = async () => {
    setLoading(true);
    if (!prompt || !address) return;
    const data = JSON.stringify({
      prompt: prompt,
      seed: "0",
    });
    try {
      const res = await axios.post("https://olm.7007.ai/olm", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.data.status === "OK") {
        setText(res.data.response);
        dialogRef.current?.showModal();
      } else {
        setErrorMessage("Error generating prompt");
        throw new Error("Error generating prompt");
      }
    } catch (error) {
      console.error("error:", error);
    } finally {
      setLoading(false);
    }
  };
  const onMint = async () => {
    if (!isConnected) {
      openConnectModal?.();
      return;
    }
    if (Number(result.data?.formatted) < Number(totalFee)) {
      toast.error("Insufficient balance");
      return;
    }

    if (!title || !prompt || !text || !address || !modelData) {
      return;
    }
    setMintInitialized(true);
    mintAIGC(
      {
        address: modelData.NFTContract as Address,
        args: [address, prompt, "", title, BigInt(0)],
        value: totalFee,
      },
      {
        onError(error: any) {
          console.error("Error minting AIGC:", error);
          setMintInitialized(false);
        },
      }
    );
  };

  useEffect(() => {
    if (mintResult.isSuccess) {
      setMintInitialized(false);
      setMinted(true);
    }
  }, [mintResult.isSuccess]);

  return (
    <>
      <div className="flex flex-col gap-[30px]">
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
          <p className="pl-2">Prompt</p>
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
          <p className="pl-2">Model</p>
          <input
            type="text"
            name="modelName" // Provide a name attribute to identify the input field
            id="modelName"
            className="bg-grey h-16 pl-10"
            defaultValue={modelData?.modelName}
            readOnly
            placeholder="Model name +"
          />
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
              {/* <div>estimate mint cost</div> */}
              {/* <div>~ 0.05 eth</div> */}
            </div>
          </div>
          <div className="flex justify-between w-full gap-12">
            <a className="max-w-[502px]">
              Each set of prompts relate to unique result, inferences are non
              fungible.
            </a>
            {!isConnected ? (
              <button
                className={`w-[260px] h-[58px] bg-white/40 border flex items-center justify-center gap-2 border-white rounded`}
                disabled={!openConnectModal}
                onClick={() => openConnectModal?.()}
              >
                Connect
              </button>
            ) : (
              <button
                className={`w-[260px] h-[58px] bg-white/40 border flex items-center justify-center gap-2 border-white rounded ${loading || !title ? "cursor-not-allowed opacity-40" : ""}`}
                disabled={loading || !prompt || !title}
                onClick={() => genOPImage()}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner" />
                    loading
                  </>
                ) : (
                  `${submitText}`
                )}
              </button>
            )}
          </div>
        </div>
      </div>
      <dialog ref={dialogRef} className="modal">
        {!minted ? (
          <div className="modal-box flex flex-col p-4 items-center gap-4">
            {text ? (
              <div className="bg-black w-full rounded h-full p-2">
                <a className="text-white/90">{text}</a>
              </div>
            ) : (
              // <img
              //   src={`https://cloudflare-ipfs.com/ipfs/${image}`}
              //   alt="Image"
              //   className="size-[500px]"
              // />
              <div className="flex gap-2 size-[200px] justify-center items-center">
                <span className="loading loading-spinner text-black" />
                <a className="text-black">loading</a>
              </div>
            )}
            <div className="flex justify-between w-full gap-4 h-[45px]">
              <button
                className="z-20 bg-transparent cursor-pointer text-black border border-black font-bold transition-all flex justify-center items-center p-1 rounded w-full"
                disabled={mintInitialized}
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
                    <span className="loading loading-spinner cursor-pointer"></span>
                    Minting
                  </div>
                ) : (
                  "Mint"
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="modal-box max-w-[424px] bg-white">
            <div className="flex flex-col justify-center items-center gap-10">
              <Image
                src="/check.svg"
                alt="NFT listed"
                width={120}
                height={120}
              />
              <div className="px-4 text-center">
                <h2 className="heading-md">
                  Your NFT was minted successfully!
                </h2>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <button
                  type="button"
                  className="btn btn-secondary w-full"
                  onClick={() => {
                    (
                      dialogRef as RefObject<HTMLDialogElement>
                    )?.current?.close();
                  }}
                >
                  Done
                </button>
                <button
                  type="button"
                  className="btn btn-secondary w-full"
                  onClick={() => {
                    router.push("/account/created");
                  }}
                >
                  Go to your NFT
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
};

export default PromptFormOP;
