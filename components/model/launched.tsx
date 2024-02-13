import React from "react";
import HeadingMedium from "../text/headingMedium";
import HeadingLarge from "../text/headingLarge";

const Launched = () => {
  const items = [
    "Current Total Participants",
    "Accumulated Staked",
    "Inference Time",
    "$eth Accumulated Reward",
  ];
  return (
    <div className="w-full min-w-[533px] py-12 px-12 rounded-md bg-white">
      <HeadingMedium>Launched</HeadingMedium>
      <div className="grid grid-cols-2 py-12 gap-y-10">
        {items.map((i) => (
          <div key={i} className="flex flex-col">
            <HeadingLarge>-</HeadingLarge>
            <span className="text-neutral-200">{i}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <button className="btn btn-primary w-full">Generate AIGC NFT</button>
        <button className="btn btn-secondary w-full">Trade Model Tokens</button>
      </div>
    </div>
  );
};

export default Launched;
