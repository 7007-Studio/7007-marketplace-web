import { useRouter } from "next/router";
import React from "react";

const Launched = ({ modelIndex }: { modelIndex: number | string }) => {
  const router = useRouter();
  const items = [
    "Current Total Participants",
    "Accumulated Staked",
    "Inference Time",
    "$eth Accumulated Reward",
  ];
  return (
    <div className="w-full max-w-[360px] 2xl:max-w-[533px] py-12 px-6 2xl:px-12 rounded-md bg-white">
      <h3 className="heading-md">Launched</h3>
      <div className="grid grid-cols-2 py-12 gap-x-8 gap-y-10">
        {items.map((i) => (
          <div key={i} className="flex flex-col">
            <h2 className="text-lg mb4-4">-</h2>
            <span className="text-neutral-200">{i}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <button
          className="btn btn-primary w-full"
          onClick={() => {
            router.push(`/model/${modelIndex}/aigc/generate`);
          }}
        >
          Generate AIGC NFT
        </button>
      </div>
    </div>
  );
};

export default Launched;
