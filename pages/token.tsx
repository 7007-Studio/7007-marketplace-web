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
} from "@/generated";
import { Address, useAccount } from "wagmi";
import {
  STAKE7007_CONTRACT_ADDRESS,
  TOKEN7007_CONTRACT_ADDRESS,
} from "@/constants";
import { formatUnits, parseUnits } from "viem";
import { useIsMounted } from "@/hooks/useIsMounted";

export default function Token() {
  const [mintAmount, setMintAmount] = useState("0");
  const [stakeAmount, setStakeAmount] = useState("0");
  const [stakingApproved, setStakingApproved] = useState(false);

  const { address } = useAccount();

  const { data: balance } = useToken7007BalanceOf({
    address: TOKEN7007_CONTRACT_ADDRESS as Address,
    args: address ? [address] : undefined,
  });

  const { data: decimals } = useToken7007Decimals({
    address: TOKEN7007_CONTRACT_ADDRESS as Address,
  });
  const { write: mint } = useToken7007Mint({
    address: TOKEN7007_CONTRACT_ADDRESS as Address,
  });
  const { write: approve } = useToken7007Approve({
    address: TOKEN7007_CONTRACT_ADDRESS as Address,
  });

  useToken7007ApprovalEvent({
    address: TOKEN7007_CONTRACT_ADDRESS as Address,
    listener(log) {
      // console.log(log);
      setStakingApproved(true);
    },
  });

  const { data: stakedAmount } = useStake7007StakedAmount({
    address: STAKE7007_CONTRACT_ADDRESS as Address,
    args: address ? [address] : undefined,
  });
  const { data: stakeStartTime } = useStake7007StakeStartTime({
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

  const { write: stake } = useStake7007Stake({
    address: STAKE7007_CONTRACT_ADDRESS as Address,
  });

  const isMounted = useIsMounted();
  if (!isMounted) return null;

  return (
    <div className="flex min-h-screen flex-col p-20 py-16 mx-auto w-[95vw] ">
      <h1 className="text-3xl font-bold text-white mb-4">7007 Token</h1>
      <div className="flex flex-col">
        <div className="w-1/2">
          <h2 className="text-2xl font-bold text-white mb-2">
            Mint 7007 Token
          </h2>
          <div>
            Mint 7007 tokens and stake them to earn inference points. Using
            model requires inference points.
          </div>
          {balance != undefined && decimals !== undefined && (
            <div>
              You currently have {formatUnits(balance, decimals)} 7007 tokens.
            </div>
          )}
          <div className="my-8">
            <input
              type="number"
              className="pl-3 pr-8 py-2 border rounded w-full mb-4"
              placeholder="Amount"
              onChange={(e) => setMintAmount(e.target.value)}
            />
            <button
              className="btn btn-primary"
              onClick={() => {
                if (!address || !decimals) return;

                mint({
                  args: [address, parseUnits(mintAmount, decimals)],
                });
              }}
            >
              Mint
            </button>
          </div>
        </div>
        <div className="w-1/2">
          <h2 className="text-2xl font-bold text-white mb-2">
            Stake 7007 Token
          </h2>
          {stakedAmount != undefined && decimals !== undefined && (
            <div>
              You currently have {formatUnits(stakedAmount, decimals)} 7007
              tokens staked from{" "}
              {new Date(Number(stakeStartTime) * 1000).toDateString()}
            </div>
          )}
          {inferencePoint != undefined &&
            consumedInferencePoint !== undefined &&
            decimals !== undefined && (
              <div>
                You have {formatUnits(inferencePoint, decimals)} inference
                points and have consumed{" "}
                {formatUnits(consumedInferencePoint, decimals)} inference points
              </div>
            )}
          <div className="my-8">
            <input
              type="number"
              className="pl-3 pr-8 py-2 border rounded w-full mb-4"
              placeholder="Amount"
              onChange={(e) => setStakeAmount(e.target.value)}
            />
            {!stakingApproved && (
              <button
                className="btn btn-primary"
                onClick={() => {
                  if (!decimals) return;

                  approve({
                    args: [
                      STAKE7007_CONTRACT_ADDRESS,
                      parseUnits(stakeAmount, decimals),
                    ],
                  });

                  stake({ args: [parseUnits(stakeAmount, decimals)] });
                }}
              >
                Approve Staking
              </button>
            )}

            {stakingApproved && (
              <button
                className="btn btn-primary"
                onClick={() => {
                  if (!decimals) return;

                  stake({ args: [parseUnits(stakeAmount, decimals)] });
                }}
              >
                Stake
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
