import React, { useState } from "react";

export interface FilterEntry {
  id: string;
  label: string;
  checked: boolean;
}

export interface FilterProps {
  title: string;
  options: FilterEntry[];
  onChange: (id: string) => void;
}

const Filter = ({ title, options, onChange }: FilterProps) => {
  return (
    <div className="flex flex-col">
      <div className="p-4 text-neutral-700 bg-neutral-50">{title}</div>
      {options.map((checkbox) => (
        <label key={checkbox.id} className="flex py-3 px-4 justify-between">
          {checkbox.label}
          <input
            type="checkbox"
            className="checkbox"
            checked={checkbox.checked}
            onChange={() => onChange(checkbox.id)}
          />
        </label>
      ))}
    </div>
  );
};

export default Filter;
