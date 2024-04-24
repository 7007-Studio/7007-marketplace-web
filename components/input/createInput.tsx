"use client";

import clsx from "clsx";

interface CreateInputProps {
  placeholder: string;
  type?: "token" | "text";
  className?: string;
  inputClassName?: string;
}

const CreateInput = ({
  placeholder,
  type = "text",
  className,
  inputClassName,
}: CreateInputProps) => {
  return (
    <div className={clsx(`w-full flex`, className)}>
      <input
        type={type === "text" ? "text" : "number"}
        className={clsx(
          `bg-grey py-5 px-9 text-white placeholder-white/40 outline-none w-full h-full flex`,
          inputClassName
        )}
        placeholder={placeholder}
      />
    </div>
  );
};

export default CreateInput;
