import { useState } from "react";
import {
  useStake7007ConsumedInferencePoint,
  useStake7007GetInferencePoint,
  useStake7007Stake,
  useStake7007StakeStartTime,
  useStake7007StakedAmount,
  useToken7007ApprovalEvent,
  useToken7007Approve,
  useToken7007BalanceOf,
  useToken7007Decimals,
  useToken7007Mint,
  useToken7007TransferEvent,
} from "@/generated";
import { Address, useAccount, useWaitForTransaction } from "wagmi";
import {
  STAKE7007_CONTRACT_ADDRESS,
  TOKEN7007_CONTRACT_ADDRESS,
} from "@/constants";
import { formatUnits, parseUnits } from "viem";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useConnectModal } from "@rainbow-me/rainbowkit";

export default function Token() {
  const { isConnected, address } = useAccount();
  const { openConnectModal } = useConnectModal();

  const [mintAmount, setMintAmount] = useState("");
  const [stakeAmount, setStakeAmount] = useState("");
  const [stakingApproved, setStakingApproved] = useState(false);

  const [mintInitialized, setMintInitialized] = useState(false);
  const [approveInitialized, setApproveInitialized] = useState(false);
  const [stakeInitialized, setStakeInitialized] = useState(false);

  // read contracts
  const { data: balance, refetch: refetchBalance } = useToken7007BalanceOf({
    address: TOKEN7007_CONTRACT_ADDRESS as Address,
    args: address ? [address] : undefined,
  });
  const { data: decimals } = useToken7007Decimals({
    address: TOKEN7007_CONTRACT_ADDRESS as Address,
  });
  const { data: stakedAmount, refetch: refetchStakedAmount } =
    useStake7007StakedAmount({
      address: STAKE7007_CONTRACT_ADDRESS as Address,
      args: address ? [address] : undefined,
    });
  const { data: stakeStartTime, refetch: refetchStakeStartTime } =
    useStake7007StakeStartTime({
      address: STAKE7007_CONTRACT_ADDRESS as Address,
      args: address ? [address] : undefined,
    });
  const { data: inferencePoint } = useStake7007GetInferencePoint({
    address: STAKE7007_CONTRACT_ADDRESS as Address,
    args: address ? [address] : undefined,
  });
  const { data: consumedInferencePoint } = useStake7007ConsumedInferencePoint({
    address: STAKE7007_CONTRACT_ADDRESS as Address,
    args: address ? [address] : undefined,
  });

  // write contracts
  const { write: mint, data: mintTx } = useToken7007Mint({
    address: TOKEN7007_CONTRACT_ADDRESS as Address,
    onError(error) {
      setMintInitialized(false);
    },
  });
  const { write: approve, data: approveTx } = useToken7007Approve({
    address: TOKEN7007_CONTRACT_ADDRESS as Address,
    onError(error) {
      setApproveInitialized(false);
    },
  });
  const { write: stake, data: stakeTx } = useStake7007Stake({
    address: STAKE7007_CONTRACT_ADDRESS as Address,
    onError(error) {
      setStakeInitialized(false);
    },
  });

  // contract events
  useToken7007TransferEvent({
    address: TOKEN7007_CONTRACT_ADDRESS as Address,
    listener(log) {
      // console.log(log);
      refetchBalance();
    },
  });
  useToken7007ApprovalEvent({
    address: TOKEN7007_CONTRACT_ADDRESS as Address,
    listener(log) {
      // console.log(log);
      setStakingApproved(true);
    },
  });

  // wait for tx confirmation
  useWaitForTransaction({
    hash: mintTx?.hash,
    onSuccess(data) {
      setMintInitialized(false);
      setMintAmount("");
    },
  });
  useWaitForTransaction({
    hash: approveTx?.hash,
    onSuccess(data) {
      setApproveInitialized(false);
    },
  });
  useWaitForTransaction({
    hash: stakeTx?.hash,
    onSuccess(data) {
      setStakeInitialized(false);
      refetchStakedAmount();
      refetchStakeStartTime();
      setStakeAmount("");
    },
  });

  const isMounted = useIsMounted();
  if (!isMounted) return null;

  return (
    <div className="flex min-h-screen flex-col p-4 lg:p-20 py-16 mx-auto w-[95vw] ">
      <h1 className="text-3xl font-bold text-white mb-4">7007 Token</h1>
      <div className="flex flex-col">
        <div className="lg:w-1/2">
          <h2 className="text-2xl font-bold text-white mb-2">
            Mint 7007 Token
          </h2>
          <div>
            Mint 7007 tokens and stake them to earn inference points. Using
            model requires inference points.
          </div>
          {balance != undefined && decimals !== undefined && (
            <div>
              You currently have{" "}
              <span className="font-bold">
                {formatUnits(balance, decimals)}
              </span>{" "}
              7007 tokens.
            </div>
          )}
          <div className="my-8">
            <input
              type="number"
              className="pl-3 pr-8 py-2 border rounded w-full mb-4"
              placeholder="Amount"
              value={mintAmount}
              onChange={(e) => setMintAmount(e.target.value)}
            />
            <button
              className="btn btn-primary"
              disabled={mintAmount === "" || mintInitialized}
              onClick={() => {
                if (!isConnected) {
                  openConnectModal?.();
                  return;
                }

                if (mintAmount === "") return;

                if (!address || !decimals) return;
                setMintInitialized(true);

                mint({
                  args: [address, parseUnits(mintAmount, decimals)],
                });
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
          </div>
        </div>
        <div className="lg:w-1/2">
          <h2 className="text-2xl font-bold text-white mb-2">
            Stake 7007 Token
          </h2>
          {stakedAmount != undefined && decimals !== undefined && (
            <div>
              You currently have{" "}
              <span className="font-bold">
                {formatUnits(stakedAmount, decimals)}
              </span>{" "}
              7007 tokens staked from{" "}
              {new Date(Number(stakeStartTime) * 1000).toDateString()}
            </div>
          )}
          {inferencePoint != undefined &&
            consumedInferencePoint !== undefined && (
              <div>
                You have{" "}
                <span className="font-bold">
                  {formatUnits(inferencePoint, 0)}
                </span>{" "}
                inference points and have consumed{" "}
                <span className="font-bold">
                  {formatUnits(consumedInferencePoint, 0)}
                </span>{" "}
                inference points
              </div>
            )}
          <div className="my-8">
            <input
              type="number"
              className="pl-3 pr-8 py-2 border rounded w-full mb-4"
              placeholder="Amount"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
            />
            {!stakingApproved && (
              <button
                className="btn btn-primary"
                disabled={stakeAmount === "" || approveInitialized}
                onClick={() => {
                  if (!isConnected) {
                    openConnectModal?.();
                    return;
                  }

                  if (stakeAmount === "") return;

                  if (!decimals) return;
                  setApproveInitialized(true);

                  approve({
                    args: [
                      STAKE7007_CONTRACT_ADDRESS,
                      parseUnits(stakeAmount, decimals),
                    ],
                  });
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

            {stakingApproved && (
              <button
                className="btn btn-primary"
                disabled={stakeInitialized}
                onClick={() => {
                  if (!isConnected) {
                    openConnectModal?.();
                    return;
                  }

                  if (!decimals) return;
                  setStakeInitialized(true);

                  stake({ args: [parseUnits(stakeAmount, decimals)] });
                }}
              >
                {stakeInitialized ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    loading
                  </>
                ) : (
                  "Stake"
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
