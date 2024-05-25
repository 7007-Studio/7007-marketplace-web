"use client";

import clsx from "clsx";

interface CreateInputProps {
  placeholder: string;
  type?: "token" | "text";
  className?: string;
  inputClassName?: string;
  postfix?: string;
  value: any;
  label?: string;
  valueName: string;
  errorMessage?: string;
  onChange: (valueName: string, value: any) => void;
}

const OfferInput = ({
  placeholder,
  type = "text",
  className,
  value,
  inputClassName,
  postfix,
  label,
  valueName,
  errorMessage,
  onChange,
}: CreateInputProps) => {
  return (
    <div className={clsx(`w-full flex flex-col`, className)}>
      {label && <span className="text-[18px] pl-3">{label}</span>}
      <div className="relative w-full text-white">
        <input
          value={value}
          type={type === "text" ? "text" : "number"}
          className={clsx(
            `bg-grey py-5 px-9 text-white placeholder-white/40 outline-none w-full h-full flex`,
            inputClassName
          )}
          placeholder={placeholder}
          onChange={(e) => onChange(valueName, e.target.value)}
        />
        {postfix && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-400">{postfix}</span>
          </div>
        )}
      </div>
      {errorMessage && (
        <span className="text-downRed text-[12px] pl-3 pt-1">
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default OfferInput;
