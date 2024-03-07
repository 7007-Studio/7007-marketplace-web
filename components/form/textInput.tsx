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
  errors?: FieldErrors<T>;
  name: Path<T>;
  min?: number;
  max?: number;
}

export default function TextInput<T extends FieldValues>({
  type = "text",
  label,
  placeholder,
  postfix,
  required,
  register,
  name,
  errors,
  min,
  max,
}: TextInputProps<T>) {
  const registerOptions: RegisterOptions = {};
  if (required) {
    registerOptions.required = "This field is required";
  }
  return (
    <label className="form-control w-full">
      {label && (
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
      )}
      <div className="relative w-full">
        <input
          type="text"
          className="input pl-3 pr-8 py-2 border rounded w-full"
          placeholder={placeholder}
          min={min}
          max={max}
          {...register(name, registerOptions)}
        />
        {postfix && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-400">{postfix}</span>
          </div>
        )}
      </div>
      {errors && (
        <p className="text-red-600 text-left text-sm">
          {errors.name?.message as ReactNode}
        </p>
      )}
    </label>
  );
}
