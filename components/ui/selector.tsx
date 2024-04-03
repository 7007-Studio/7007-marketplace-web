import React from "react";

export interface FilterEntry {
  id: string;
  label: string;
  checked: boolean;
}

export interface FilterProps {
  title?: string;
  options?: FilterEntry[];
  onChange?: (id: string) => void;
}

const Selector = ({ title, options, onChange }: FilterProps) => {
  return (
    <div className="w-full flex items-center gap-5">
      <div className="cursor-pointer font-bold text-base text-white hover:text-white/60">
        All
      </div>
      <div className="h-[30px] w-[1.5px] bg-grey" />
      <div className="cursor-pointer font-bold text-base text-white hover:text-white/60">
        text-to-text
      </div>
      <div className="h-[30px] w-[1.5px] bg-grey" />
      <div className="cursor-pointer font-bold text-base text-white hover:text-white/60">
        text-to-music
      </div>
      <div className="h-[30px] w-[1.5px] bg-grey" />
      <div className="cursor-pointer font-bold text-base text-white hover:text-white/60">
        T2V
      </div>
      <div className="flex-1 h-[1.5px] bg-grey" />
      <div className="gap-4 flex">
        <div className="h-[10px] w-[2px] bg-grey" />
        <div className="h-[10px] w-[2px] bg-grey" />
        <div className="h-[10px] w-[2px] bg-grey" />
        <div className="h-[10px] w-[2px] bg-grey" />
      </div>
    </div>
  );
};

export default Selector;
