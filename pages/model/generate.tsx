import { useState } from "react";
import FormModel from "@/components/formModel";

export default function GenerateModel() {
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <main className="flex min-h-screen flex-col p-4 md:p-48">
      {isGenerating ? (
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <h3 className="text-xl">Generating in progress...</h3>
          <span>It may take a few minutes</span>

          <span className="loading loading-dots loading-lg"></span>
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-4">
            Publish your model with 7007Lab
          </h1>
          <FormModel setIsGenerating={setIsGenerating} />
        </>
      )}
    </main>
  );
}
