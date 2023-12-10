import { useState } from "react";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { Address, formatEther, parseEther } from "viem";
import {
  useAigtMaxSupply,
  useAigtMint,
  useAigtName,
  useAigtTokenPrice,
  useAigtTotalSupply,
} from "@/generated";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useIsMounted } from "@/hooks/useIsMounted";

export default function MintModelToken() {
  const router = useRouter();
  const { index } = router.query;
  console.log(index);

  const [numberOfToken, setNumberOfToken] = useState("1");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isMounted = useIsMounted();
  const { isConnected } = useAccount();

  const { data: modelName } = useAigtName({
    address: index as Address,
  });
  const { data: tokenPrice } = useAigtTokenPrice({
    address: index as Address,
  });
  const { data: totalSupply } = useAigtTotalSupply({
    address: index as Address,
  });
  const { data: maxSupply } = useAigtMaxSupply({
    address: index as Address,
  });

  const { data, write, isLoading, isSuccess, isError, error } = useAigtMint({
    address: index as Address,
  });

  const totalPrice = () => {
    if (!tokenPrice) {
      return "0";
    }
    return formatEther(tokenPrice * BigInt(numberOfToken));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    if (write) {
      write({
        args: [BigInt(numberOfToken)],
        value: parseEther(totalPrice()),
      });
    }
  };

  if (!isMounted) return null;

  if (!isConnected) {
    return (
      <div className="container mx-auto flex flex-col items-center justify-center pt-12 gap-4">
        <div>Please connect your wallet first</div>
        <ConnectButton />
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="container mx-auto md:max-w-2xl flex min-h-screen flex-col p-4">
        <h1 className="text-3xl font-bold mb-4">
          Your model token was minted successfully!
        </h1>
        <div>Transaction: {data?.hash}</div>

        <div className="flex justify-between">
          <button
            className="btn"
            onClick={() => router.push(`/model/${index}/aigc/1/detail`)}
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
          Aliquet pulvinar sit amet id. Venenatis auctor vel turpis quis integer
          at risus. Venenatis auctor vel turpis quis integer at risus.
        </div>
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
              isLoading || isSubmitting || BigInt(numberOfToken) <= 0 || !write
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
