import { MODEL_TOKEN_CONTRACT_ADDRESS } from "@/constants";
import { useAigtMint } from "@/generated";
import { useState } from "react";
import { formatEther, parseEther } from "viem";
import { erc20ABI, useContractWrite } from "wagmi";

export default function MintModelToken() {
  const [ethPerToken, setEthPerToken] = useState(parseEther("0.1"));
  const [numberOfToken, setNumberOfToken] = useState("1");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data, write, isLoading, isSuccess } = useAigtMint({
    address: MODEL_TOKEN_CONTRACT_ADDRESS,
  });

  const totalPrice = () => {
    return formatEther(ethPerToken * BigInt(numberOfToken));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    write();
  };

  return (
    <main className="flex min-h-screen flex-col p-4 md:p-48">
      <h1 className="text-2xl font-bold mb-4">Mint Your Model Token</h1>
      <h2>Model Name</h2>
      <p>
        Aliquet pulvinar sit amet id. Venenatis auctor vel turpis quis integer
        at risus. Venenatis auctor vel turpis quis integer at risus.
      </p>
      <span>Price: {formatEther(ethPerToken)} ETH per token</span>

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
      <button
        className="btn btn-primary"
        disabled={isLoading || isSubmitting || BigInt(numberOfToken) <= 0}
        onClick={handleSubmit}
      >
        Mint for {totalPrice()} ETH
      </button>

      <div>
        <span>20/10000</span> tokens have been minted under this model.
      </div>
    </main>
  );
}
