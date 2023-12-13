import FormAIGC from "@/components/formAIGC";
import { useIsMounted } from "@/hooks/useIsMounted";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { clsx } from "clsx";
import { useRouter } from "next/router";
import { useState } from "react";
import { keccak256, toHex } from "viem";
import { useAccount } from "wagmi";

export default function GenerateAIGC() {
  const router = useRouter();
  const { index, aigcAddress } = router.query;

  const [isGenerating, setIsGenerating] = useState(false);
  const isMounted = useIsMounted();
  const { isConnected } = useAccount();

  if (!isMounted) return null;

  if (!isConnected) {
    return (
      <div className="container mx-auto flex flex-col items-center justify-center pt-12 gap-4">
        <div>Please connect your wallet first</div>
        <ConnectButton />
      </div>
    );
  }

  return (
    <div className="container mx-auto md:max-w-2xl flex min-h-screen flex-col p-4">
      <h1 className="text-3xl font-bold mb-4">
        Generate your AIGC music and art with 7007 Studio
      </h1>
      <FormAIGC
        setIsGenerating={setIsGenerating}
        aigtAddress={index as string}
        aigcAddress={aigcAddress as string}
      />
    </div>
  );
}
