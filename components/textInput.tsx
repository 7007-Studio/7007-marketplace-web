import {
  FieldValues,
  Path,
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";
import { IFormAIGCInput } from "./formAIGC";

interface TextInputProps<T extends FieldValues> {
  label?: string;
  placeholder?: string;
  postfix?: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<IFormAIGCInput>;
  name: Path<T>;
}

export default function TextInput<T extends FieldValues>({
  label,
  placeholder,
  postfix,
  register,
  name,
  errors,
}: TextInputProps<T>) {
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
          className="pl-3 pr-8 py-2 border rounded w-full"
          placeholder={placeholder}
          {...register(name, { required: "prompt is required" })}
        />
        {postfix && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-400">{postfix}</span>
          </div>
        )}
      </div>
      <p className="text-red-600 text-left text-sm">{errors?.name?.message}</p>
    </label>
  );
}
