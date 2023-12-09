import FormModelGenerate from "@/components/formModelGenerate";
import { useState } from "react";

export default function Generate() {
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
          <h1 className="text-2xl font-bold">
            Publish your model with 7007Lab
          </h1>
          <FormModelGenerate setIsGenerating={setIsGenerating} />
        </>
      )}
    </main>
  );
}
