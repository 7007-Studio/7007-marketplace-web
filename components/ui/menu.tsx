"use client";

import { useState } from "react";
import { MdArrowDropDown } from "react-icons/md";

export interface MenuList {
  id: string;
  label: string;
  value: string;
}

interface MenuProps {
  options: MenuList[];
  selected: MenuList;
  onSelect: (option: MenuList) => void;
}

export default function Menu({ options, onSelect, selected }: MenuProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="relative w-fit">
      <button
        className="font-bold cursor-pointer w-[239px] h-10 flex items-center justify-center gap-3 bg-grey"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected.label}
        <MdArrowDropDown
          size={20}
          className={`${
            isOpen ? "-rotate-180" : "rotate-0"
          } transition-all duration-500`}
        />
      </button>

      <div
        className={`${
          isOpen
            ? "h-fit cursor-pointer opacity-100"
            : "pointer-events-none h-0 opacity-0"
        } absolute top-[45px] z-50 min-w-[239px] rounded-md bg-grey py-2 shadow-2xl transition-all`}
      >
        {options.map((option, index) => (
          <div
            key={index}
            className="flex h-fit w-full flex-col items-start gap-2 pb-2 px-3 transition-all duration-500"
            onClick={() => {
              onSelect(option);
              setIsOpen(false);
            }}
          >
            <p className="text-base">{option.label}</p>
            {index !== options.length - 1 && (
              <div className="h-[1px] w-full bg-white/40" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
