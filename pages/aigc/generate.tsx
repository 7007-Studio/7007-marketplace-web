import FormAIGC from "@/components/formAIGC";
import { useState } from "react";

export default function GenerateAIGC() {
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <main className="flex min-h-screen flex-col p-48">
      {isGenerating ? (
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <h3 className="text-xl">Generating in progress...</h3>
          <span>It may take a few minutes</span>

          <span className="loading loading-dots loading-lg"></span>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">
            Generate your AIGC music and art with 7007 Studio
          </h1>
          <FormAIGC setIsGenerating={setIsGenerating} />
        </>
      )}
    </main>
  );
}
