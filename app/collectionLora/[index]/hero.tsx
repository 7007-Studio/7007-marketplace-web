import { concatAddress } from "@/helpers";
import useReadAigcContracts from "@/hooks/useReadAigcContracts";
import { ModelDetail } from "@/types";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { Address, zeroAddress } from "viem";
interface HeroProps {
  nftContract?: Address;
  modelData?: ModelDetail;
}

const Hero = ({ nftContract = zeroAddress, modelData }: HeroProps) => {
  // const { name = "" } = useReadAigcContracts({ nftContract });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    heroRef.current.style.backgroundImage = `url(${modelData?.banner})`;
  }, [heroRef]);

  return (
    <div
      ref={heroRef}
      className="bg-cover bg-center bg-no-repeat relative z-0 flex flex-col items-start justify-end h-[450px] w-full border border-white rounded-md"
    >
      <div className="absolute inset-0 h-full w-full bg-gradient-to-b from-black/20 from-20% to-black rounded-md" />
      <div className="gap-4 py-10 px-[45px] flex flex-col z-20">
        <a className="font-bold text-[30px]">{modelData?.modelName}</a>
        <div className="flex gap-4 items-center">
          <Image src="/avatar.svg" alt="avatar" width={22} height={22} />
          {/* <span>{concatAddress(nftContract)}</span> */}
          <div className="flex justify-center items-center w-[200px] h-[28px] font-bold bg-white/30">
            {modelData?.type}
          </div>
        </div>
        <div className="">{modelData?.description}</div>
      </div>
    </div>
  );
};

export default Hero;
