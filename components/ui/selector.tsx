import React from "react";

export interface SelectorEntry {
  id: string;
  label: string;
  selected: boolean;
}

export interface SelectorProps {
  options: SelectorEntry[];
  onChange: (id: string) => void;
  single?: boolean;
}

const Selector = ({ options, onChange, single = false }: SelectorProps) => {
  return (
    <div className="w-full flex items-center gap-5 uppercase">
      {options?.map((option, index) => {
        if (option.label === "") return null;
        return (
          <div
            key={option.id}
            className={`cursor-pointer flex gap-5 items-center font-bold text-base ${
              option.selected ? "text-white" : "text-white/60"
            }`}
            onClick={() => onChange?.(option.id)}
          >
            {option.label}
            {!single && index !== options.length - 1 && (
              <div className="h-[30px] w-[1.5px] bg-grey" />
            )}
          </div>
        );
      })}
      <div className="flex-1 h-[1.5px] bg-grey" />
      <div className="gap-4 flex">
        {options?.map((option, index) => (
          <div
            key={index}
            className={`h-[10px] w-[2px] ${option.selected ? "bg-white" : "bg-grey"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Selector;
