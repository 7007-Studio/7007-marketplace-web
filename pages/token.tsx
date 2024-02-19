import { useEffect, useState } from "react";
import {
  useReadStake7007ConsumedInferencePoint,
  useReadStake7007GetInferencePoint,
  useWriteStake7007Stake,
  useReadStake7007StakeStartTime,
  useReadStake7007StakedAmount,
  useWatchToken7007ApprovalEvent,
  useWriteToken7007Approve,
  useReadToken7007BalanceOf,
  useReadToken7007Decimals,
  useWriteToken7007Mint,
  useWatchToken7007TransferEvent,
} from "@/generated";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import {
  STAKE7007_CONTRACT_ADDRESS,
  TOKEN7007_CONTRACT_ADDRESS,
} from "@/constants";
import { Address, formatUnits, parseUnits } from "viem";
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
  const { data: balance, refetch: refetchBalance } = useReadToken7007BalanceOf({
    address: TOKEN7007_CONTRACT_ADDRESS as Address,
    args: address ? [address] : undefined,
  });
  const { data: decimals } = useReadToken7007Decimals({
    address: TOKEN7007_CONTRACT_ADDRESS as Address,
  });
  const { data: stakedAmount, refetch: refetchStakedAmount } =
    useReadStake7007StakedAmount({
      address: STAKE7007_CONTRACT_ADDRESS as Address,
      args: address ? [address] : undefined,
    });
  const { data: stakeStartTime, refetch: refetchStakeStartTime } =
    useReadStake7007StakeStartTime({
      address: STAKE7007_CONTRACT_ADDRESS as Address,
      args: address ? [address] : undefined,
    });
  const { data: inferencePoint, refetch: refetchInferencePoint } =
    useReadStake7007GetInferencePoint({
      address: STAKE7007_CONTRACT_ADDRESS as Address,
      args: address ? [address] : undefined,
    });
  const {
    data: consumedInferencePoint,
    refetch: refetchConsumedInferencePoint,
  } = useReadStake7007ConsumedInferencePoint({
    address: STAKE7007_CONTRACT_ADDRESS as Address,
    args: address ? [address] : undefined,
  });

  // write contracts
  const { writeContract: mint, data: mintTx } = useWriteToken7007Mint();
  const { writeContract: approve, data: approveTx } = useWriteToken7007Approve();
  const { writeContract: stake, data: stakeTx } = useWriteStake7007Stake();

  // contract events
  useWatchToken7007TransferEvent({
    address: TOKEN7007_CONTRACT_ADDRESS,
    onLogs(log) {
      // console.log(log);
      refetchBalance();
    },
  });
  useWatchToken7007ApprovalEvent({
    address: TOKEN7007_CONTRACT_ADDRESS,
    onLogs(log) {
      // console.log(log);
      setStakingApproved(true);
    },
  });

  // wait for tx confirmation
  const mintResult = useWaitForTransactionReceipt({
    hash: mintTx
  });
  if (mintResult.isSuccess) {
    setMintInitialized(false);
    setMintAmount("");
  }
  const approveResult = useWaitForTransactionReceipt({
    hash: approveTx,
  });
  if (approveResult.isSuccess) {
    setApproveInitialized(false);
  }
  const stakeResult = useWaitForTransactionReceipt({
    hash: stakeTx,
  });
  if (stakeResult.isSuccess) {
    setStakeInitialized(false);
    refetchStakedAmount();
    refetchStakeStartTime();
    setStakeAmount("");
  }

  useEffect(() => {
    const timer = setInterval(() => {
      refetchInferencePoint();
      refetchConsumedInferencePoint();
    }, 10000);
    // clearing interval
    return () => clearInterval(timer);
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
                  address: TOKEN7007_CONTRACT_ADDRESS,
                  args: [address, parseUnits(mintAmount, decimals)],
                }, {
                  onError(error) {
                    setMintInitialized(false);
                  },
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
              7007 tokens staked
              {stakeStartTime !== undefined && stakeStartTime > 0 && (
                <>
                  from {new Date(Number(stakeStartTime) * 1000).toDateString()}
                </>
              )}
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
                    address: TOKEN7007_CONTRACT_ADDRESS,
                    args: [
                      STAKE7007_CONTRACT_ADDRESS,
                      parseUnits(stakeAmount, decimals),
                    ],
                  }, {
                    onError(error) {
                      setApproveInitialized(false);
                    },
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

                  stake({ address: STAKE7007_CONTRACT_ADDRESS, args: [parseUnits(stakeAmount, decimals)] }, {
                    onError(error) {
                      setStakeInitialized(false);
                    },
                  });
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
