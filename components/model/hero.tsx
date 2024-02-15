import React, { useEffect, useRef } from "react";
import { Address } from "viem";

interface HeroProps {
  aigtAddress?: Address;
  modelName?: string;
}

const Hero = ({ aigtAddress, modelName }: HeroProps) => {
  const heroRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!heroRef.current) return;

    heroRef.current.style.backgroundImage = `url('https://images.unsplash.com/photo-1608874973445-de098faf870f?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`;
  }, [heroRef]);
  return (
    <div ref={heroRef} className="py-16 px-20 bg-cover relative z-0">
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white to-transparent opacity-60 -z-10"></div>
      <div className="flex flex-row gap-x-4">
        <div className="flex-grow">
          <h2 className="text-lg mb-4">{modelName}</h2>
          <div>{aigtAddress}</div>
          <div className="flex gap-2">
            <span className="badge">Launched</span>
            <span className="badge">Text-to-Music</span>
          </div>
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
        <div>
          <button className="btn btn-secondary">Contribute Data</button>
        </div>
        <div>
          <button className="btn btn-primary">Collect Reward</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
