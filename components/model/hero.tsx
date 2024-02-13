import React from "react";
import { Address } from "viem";

interface HeroProps {
  aigtAddress?: Address;
  modelName?: string;
}

const Hero = ({ aigtAddress, modelName }: HeroProps) => {
  return (
    <div className="mt-10 py-16 px-20">
      <h2 className="text-lg mb-4">{modelName}</h2>
      <div>{aigtAddress}</div>
      <div>labels...</div>
      <div>Description...</div>
      <div className="flex flex-row gap-x-20">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex flex-col">
            <span>Token Name</span>
            <span className="text-lg">#test</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
