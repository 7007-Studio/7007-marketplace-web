import { concatAddress } from "@/helpers";
import useReadAigcContracts from "@/hooks/useReadAigcContracts";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { Address, zeroAddress } from "viem";

interface HeroProps {
  nftContract?: Address;
}

const Hero = ({ nftContract = zeroAddress }: HeroProps) => {
  const { name = "" } = useReadAigcContracts({ nftContract });
  const heroRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!heroRef.current) return;

    heroRef.current.style.backgroundImage = `url('https://images.unsplash.com/photo-1608874973445-de098faf870f?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`;
  }, [heroRef]);
  return (
    <div ref={heroRef} className="py-16 px-20 bg-cover relative z-0">
      <div className="absolute inset-0 bg-gradient-to-r from-white from-20% via-white opacity-80 -z-10"></div>
      <div className="grid grid-cols-3 items-center">
        <div className="col-span-2">
          <h2 className="heading-lg mb-4">{name}</h2>
          <div>Launched date: 2024-03-03</div>
          <div className="pb-8 flex flex-row align-center gap-x-2">
            <Image
              src="/icon-7007.svg"
              alt="7007 studio"
              width={24}
              height={24}
            />
            <span>{concatAddress(nftContract)}</span>
            <Image src="/x.svg" alt="X" width={16} height={16} />
          </div>
          <div className="pb-6 flex gap-2">
            <span className="py-[6px] px-[12px] badge border-none text-sm text-[#8550F6] bg-[#8550F6]/[.12] gap-2">
              <Image
                src="/badge-check.svg"
                alt="launched"
                width={16}
                height={16}
              />{" "}
              Launched
            </span>
            <span className="py-[6px] px-[12px] badge text-sm">
              Text-to-Text
            </span>
          </div>
          <div className="pb-16">
            Pilot of on-chain AI, fine tuned with Stable diffusion model by
            7007.Studio.
          </div>
        </div>

        <div>
          <div className="flex flex-row justify-between">
            <div>70% minted</div>
            <div>70 / 90</div>
          </div>
          <progress className="progress w-full" value="70" max="100"></progress>
        </div>
      </div>
    </div>
  );
};

export default Hero;
