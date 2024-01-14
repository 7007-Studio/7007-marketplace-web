import { useState } from "react";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { formatEther, parseEther } from "viem";
import {
  useAigcFactoryDeployedAigTs,
  useAigtMaxSupply,
  useAigtMint,
  useAigtName,
  useAigtTokenPrice,
  useAigtTotalSupply,
} from "@/generated";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useIsMounted } from "@/hooks/useIsMounted";
import { AIGC_FACTORY_CONTRACT_ADDRESS } from "@/constants";

export default function MintModelToken() {
  const router = useRouter();
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { index } = router.query;

  const [numberOfToken, setNumberOfToken] = useState("1");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isMounted = useIsMounted();

  const { data: aigtAddress } = useAigcFactoryDeployedAigTs({
    address: AIGC_FACTORY_CONTRACT_ADDRESS,
    args: index ? [BigInt(index as string)] : undefined,
  });

  const { data: modelName } = useAigtName({
    address: aigtAddress,
  });
  const { data: tokenPrice } = useAigtTokenPrice({
    address: aigtAddress,
  });

  const { data: totalSupply } = useAigtTotalSupply({
    address: aigtAddress,
  });
  const { data: maxSupply } = useAigtMaxSupply({
    address: aigtAddress,
  });

  const {
    data: mintAIGTTransactionReceipt,
    write: mintAIGT,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useAigtMint({
    address: aigtAddress,
  });

  const totalPrice = () => {
    if (!tokenPrice) {
      return "0";
    }
    return formatEther(tokenPrice * BigInt(numberOfToken));
  };

  const handleSubmit = async () => {
    if (!isConnected) {
      openConnectModal?.();
      return;
    }

    setIsSubmitting(true);
    if (mintAIGT) {
      mintAIGT({
        args: [BigInt(numberOfToken)],
        value: parseEther(totalPrice()),
      });
    }
  };

  if (!isMounted) return null;

  if (isSuccess) {
    return (
      <div className="container mx-auto md:max-w-2xl flex min-h-screen flex-col p-4">
        <h1 className="text-3xl font-bold mb-4">
          Your model token was minted successfully!
        </h1>
        <div>
          Transaction:{" "}
          <a
            href={`https://sepolia.etherscan.io/tx/${mintAIGTTransactionReceipt?.hash}`}
          >
            {mintAIGTTransactionReceipt?.hash}
          </a>
        </div>

        <div className="flex justify-between">
          <button
            className="btn"
            onClick={() => router.push(`/model/${index}/aigc/detail`)}
          >
            View Model Details
          </button>
          <button
            className="btn btn-primary"
            onClick={() => router.push(`/model/${index}/governance`)}
          >
            View Governance
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto md:max-w-2xl flex min-h-screen flex-col p-4">
      <h1 className="text-3xl font-bold mb-4">Mint Your Model Token</h1>
      <h2 className="text-2xl mb-2">{modelName}</h2>
      <div className="flex flex-col gap-4">
        <div>
          Price:{" "}
          <span className="text-primary">
            {formatEther(tokenPrice ? tokenPrice : BigInt("0"))} ETH
          </span>{" "}
          per token
        </div>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Number of token to mint</span>
          </div>
          <input
            type="number"
            value={numberOfToken}
            className="input input-bordered"
            onChange={(e) => setNumberOfToken(e.target.value)}
          />
        </label>
        <div>
          <button
            className="btn btn-primary"
            disabled={
              isLoading ||
              isSubmitting ||
              BigInt(numberOfToken) <= 0 ||
              !mintAIGT
            }
            onClick={handleSubmit}
          >
            {isSubmitting ? (
              <>
                <span className="loading loading-spinner"></span>
                loading
              </>
            ) : (
              `Mint for ${totalPrice()} ETH`
            )}
          </button>
          {isError && <div>Error: {error?.message}</div>}
        </div>

        <div>
          <span className="text-primary">
            {totalSupply?.toString()}/{maxSupply?.toString()}
          </span>{" "}
          tokens have been minted under this model.
        </div>
      </div>
    </div>
  );
}
