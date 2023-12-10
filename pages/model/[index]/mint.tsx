import { useAigtMint, usePrepareAigtMint } from "@/generated";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/router";
import { useState } from "react";
import { Address, formatEther, parseEther } from "viem";

export default function MintModelToken() {
  const router = useRouter();
  const modelContractAddress = router.query.slug;

  const [ethPerToken, setEthPerToken] = useState(parseEther("0.1"));
  const [numberOfToken, setNumberOfToken] = useState("1");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { isConnected } = useAccount();

  const { config, error, isError } = usePrepareAigtMint({
    address: modelContractAddress as Address,
  });
  const { data, write, isLoading, isSuccess } = useAigtMint(config);

  const totalPrice = () => {
    return formatEther(ethPerToken * BigInt(numberOfToken));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    if (write) {
      write();
    }
  };

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
      </div>
    );
  }

  return (
    <div className="container mx-auto md:max-w-2xl flex min-h-screen flex-col p-4">
      <h1 className="text-3xl font-bold mb-4">Mint Your Model Token</h1>
      <h2 className="text-2xl mb-2">Model Name</h2>
      <div className="flex flex-col gap-4">
        <div>
          Aliquet pulvinar sit amet id. Venenatis auctor vel turpis quis integer
          at risus. Venenatis auctor vel turpis quis integer at risus.
        </div>
        <div>
          Price:{" "}
          <span className="text-primary">{formatEther(ethPerToken)} ETH</span>{" "}
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
          <span className="text-primary">20/10000</span> tokens have been minted
          under this model.
        </div>
      </div>
    </div>
  );
}
