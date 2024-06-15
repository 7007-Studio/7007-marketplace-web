import { RefObject, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useAccount, useBalance, useWaitForTransactionReceipt } from "wagmi";
import { useRouter } from "next/navigation";
import { ModelDetail } from "@/types";
import axios from "axios";
import { useReadAigcEstimateTotalFee, useWriteAigcMint } from "@/generated";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { Address, formatEther, parseEther } from "viem";
import { toast } from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";

const PromptFormLora = ({
  submitText = "Generate",
  modelData,
}: {
  submitText?: string;
  modelData: ModelDetail;
}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [minted, setMinted] = useState(false);
  const [title, setTitle] = useState("");
  const [positivePrompt, setPositivePrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [seed, setSeed] = useState("0");
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
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

  const [image, setImage] = useState();
  const { openConnectModal } = useConnectModal();
  const [mintInitialized, setMintInitialized] = useState(false);
  const result = useBalance({
    address: address,
  });

  const [userId, setUserId] = useState("");
  const [modelId, setModelId] = useState("");
  const [prompt, setPrompt] = useState("");
  const [modelAuthorID, setModelAuthorID] = useState("");

  const handleSubmit = async () => {
    const data = JSON.stringify({
      modelID: modelId,
      prompt: prompt,
      modelAuthorID: modelAuthorID,
    });

    try {
      const res = await axios.post(
        "https://v3ni1o3vi8.execute-api.ap-northeast-1.amazonaws.com/dev/model_inference_task",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            "user-id": userId,
          },
        }
      );
      console.log(res.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const initializeFn = () => {
    setMinted(false);
    setMintInitialized(false);
    setTitle("");
    setPositivePrompt("");
    setNegativePrompt("");
    setSeed("");
    setImage(undefined);
    setRecaptchaToken(null); // Reset reCAPTCHA token
  };

  const genSDImage = async () => {
    if (!positivePrompt || !seed || !address || !recaptchaToken) return;
    setLoading(true);
    const prompt = positivePrompt + "---" + negativePrompt;
    const data = JSON.stringify({
      prompt: prompt,
      seed: seed,
    });
    try {
      const res = await axios.post("https://ai.7007.ai/gen", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setImage(res.data);
      dialogRef.current?.showModal();
      // handleFetchData();
    } catch (error) {
      console.error("error:", error);
      toast.error("Too many requests, please try again later");
    } finally {
      setLoading(false);
    }
  };

  const onMint = async () => {
    if (!isConnected) {
      openConnectModal?.();
      return;
    }

    if (
      !title ||
      !positivePrompt ||
      // !negativePrompt ||
      !seed ||
      !image ||
      !address ||
      !modelData ||
      !totalFee
    ) {
      return;
    }
    if (Number(result.data?.formatted) < Number(formatEther(totalFee))) {
      toast.error("Insufficient balance");
      return;
    }
    setMintInitialized(true);

    mintAIGC(
      {
        address: modelData.NFTContract as Address,
        args: [address, positivePrompt, negativePrompt, title, BigInt(seed)],
        value: totalFee,
      },
      {
        onError(error: any) {
          console.error("Error minting AIGC:", error.message);
          toast.error(
            "This prompt and seed may have been minted already. Try with another seed."
          );
          setMintInitialized(false);
        },
      }
    );
  };

  useEffect(() => {
    if (mintResult.isSuccess) {
      setMintInitialized(false);
      setMinted(true);
      setImage(undefined);
    }
  }, [mintResult.isSuccess]);

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  return (
    <>
      <div className="flex flex-col gap-[30px]">
        {/* {errorMessage && (
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
        )} */}
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
          <textarea
            onChange={(e: any) => setPositivePrompt(e.target.value)}
            className="bg-grey h-32 pl-10 pt-4 flex items-center resize-y overflow-auto placeholder:top-1/2 placeholder:absolute placeholder:-translate-y-1/2"
            placeholder="Enter your prompt"
            value={positivePrompt}
          />
        </div>
        <div className="flex flex-col w-full gap-3">
          <p className="pl-2">Negative prompt (optional)</p>
          <textarea
            onChange={(e: any) => setNegativePrompt(e.target.value)}
            className="bg-grey h-32 pl-10 pt-4 flex items-center resize-y overflow-auto placeholder:top-1/2 placeholder:absolute placeholder:-translate-y-1/2"
            placeholder="Enter your prompt"
            value={negativePrompt}
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
              value={seed}
              onChange={(e: any) => {
                const regex = /^(0|[1-9]\d*)$/;
                if (e.target.value === "" || regex.test(e.target.value)) {
                  setSeed(e.target.value);
                }
              }} // Update the input value directly
              placeholder="Enter Seed +"
            />
          </div>
          <div className="flex flex-col w-1/2 gap-3">
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
        </div>

        <div className="flex w-full items-start pt-[60px] flex-col gap-5">
          <div className="flex w-full justify-end">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
              onChange={handleRecaptchaChange}
            />
          </div>
          <div className="flex justify-between w-full">
            <Image
              src="/7007logo.svg"
              alt="7007 Studio"
              width={44}
              height={44}
              className="w-10 h-10 opacity-30"
            />
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
                className={`w-[260px] h-[58px] bg-white/40 border flex items-center justify-center gap-2 border-white rounded ${
                  loading ||
                  !positivePrompt ||
                  !seed ||
                  !title ||
                  !recaptchaToken
                    ? "cursor-not-allowed opacity-40"
                    : ""
                }`}
                disabled={
                  loading || !positivePrompt || !title || !recaptchaToken
                }
                onClick={() => genSDImage()}
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
                className={`z-20 bg-transparent text-black border border-black font-bold transition-all flex justify-center items-center p-1 rounded w-full ${
                  mintInitialized
                    ? "opacity-40 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
                disabled={mintInitialized}
                onClick={() => {
                  setImage(undefined);
                  dialogRef.current?.close();
                }}
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
                    initializeFn();
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

export default PromptFormLora;
