import FormAIGC from "@/components/formAIGC";
import { useIsMounted } from "@/hooks/useIsMounted";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import { useAccount } from "wagmi";

export default function GenerateAIGC() {
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
      {isGenerating ? (
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <h3 className="text-xl">Generating in progress...</h3>
          <span>It may take a few minutes</span>

          <span className="loading loading-dots loading-lg"></span>
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-4">
            Generate your AIGC music and art with 7007 Studio
          </h1>
          <FormAIGC setIsGenerating={setIsGenerating} />
        </>
      )}
    </div>
  );
}
