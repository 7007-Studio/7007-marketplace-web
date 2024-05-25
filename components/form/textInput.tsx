import { ReactNode } from "react";
import {
  FieldValues,
  Path,
  UseFormRegister,
  FieldErrors,
  RegisterOptions,
} from "react-hook-form";

interface TextInputProps<T extends FieldValues> {
  type?: string;
  label?: string;
  placeholder?: string;
  postfix?: string;
  required?: boolean;
  register: UseFormRegister<T>;
  errorMessage?: string;
  name: Path<T>;
  min?: number;
  max?: number;
  defaultValue?: string;
  value?: string;
  onChange: (valueName: string, value: any) => void;
}

export default function TextInput<T extends FieldValues>({
  type = "text",
  label,
  placeholder,
  postfix,
  required,
  register,
  name,
  errorMessage,
  min,
  max,
  value,
  defaultValue,
  onChange,
}: TextInputProps<T>) {
  const registerOptions: RegisterOptions = {};
  if (required) {
    registerOptions.required = "This field is required";
  }

  return (
    <label className="form-control w-full gap-2">
      {label && <span className="text-[18px] pl-3">{label}</span>}
      <div className="relative w-full text-white">
        <input
          type="text"
          className="input pl-6 py-2 rounded w-full bg-grey"
          placeholder={placeholder}
          min={min}
          max={max}
          value={value}
          {...register(name, registerOptions)}
          defaultValue={defaultValue}
          onChange={(e) => onChange(name, e.target.value)}
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
    </label>
  );
}
