import { UseFormRegister } from "react-hook-form";
import { IFormModelGenerateInput } from "./formModelGenerate";

interface TextInputProps {
  label: string;
  placeholder?: string;
  register: UseFormRegister<IFormModelGenerateInput>;
  name: keyof IFormModelGenerateInput;
}

export default function TextInput({
  label,
  placeholder,
  register,
  name,
}: TextInputProps) {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        type="text"
        placeholder={placeholder}
        className="input input-bordered w-full"
        {...register(name)}
      />
    </label>
  );
}
