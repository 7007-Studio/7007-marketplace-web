import Image from "next/image";
import React, { useEffect, useRef } from "react";
// import { useModelInfoStore } from "../../stats/store"

const Hero = ({modelName} : any) => {

  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    heroRef.current.style.backgroundImage = `url('https://images.unsplash.com/photo-1608874973445-de098faf870f?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`;
  }, [heroRef]);

  return (
    <div
      ref={heroRef}
      className="bg-cover relative z-0 flex flex-col items-start justify-end h-[450px] w-full border border-white rounded-md"
    >
      <div className="absolute inset-0 h-full w-full bg-gradient-to-b from-black/20 from-20% to-black rounded-md" />
      <div className="gap-4 py-10 px-[45px] flex flex-col z-20">
        <a className="font-bold text-[30px]">{modelName}</a>
        <div className="flex gap-4 items-center">
          <Image src="/avatar.svg" alt="avatar" width={22} height={22} />
          {/* <span>{concatAddress(nftContract)}</span> */}
          <div className="flex justify-center items-center w-[200px] h-[28px] font-bold bg-white/30">
            Text-to-Text
          </div>
        </div>
        <div className="">
          Pilot of on-chain AI, fine tuned with Stable diffusion model by
          7007.Studio.
        </div>
      </div>
    </div>
  );
};

export default Hero;
