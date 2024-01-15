import { STAKE7007_CONTRACT_ADDRESS } from "@/constants";
import type { NextApiRequest, NextApiResponse } from "next";

import { createPublicClient, createWalletClient, http, parseUnits } from "viem";
import { sepolia } from "viem/chains";
import Stake7007 from "@/abis/Stake7007.json";
import { privateKeyToAccount } from "viem/accounts";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { user } = req.body;

  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(),
  });

  const account = privateKeyToAccount(
    `0x${process.env.SEPOLIA_PRIVATE_KEY as string}`
  );
  const walletClient = createWalletClient({
    account,
    chain: sepolia,
    transport: http(),
  });

  const { request } = await publicClient.simulateContract({
    account,
    address: STAKE7007_CONTRACT_ADDRESS,
    abi: Stake7007.abi,
    functionName: "consumeInferencePoint",
    args: [user, parseUnits("100", 18)],
  });
  await walletClient.writeContract(request);

  res.status(200).json({ success: true });
}
