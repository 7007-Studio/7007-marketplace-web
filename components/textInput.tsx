import { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface TextInputProps<T extends FieldValues> {
  label?: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  name: Path<T>;
}

export default function TextInput<T extends FieldValues>({
  label,
  placeholder,
  register,
  name,
}: TextInputProps<T>) {
  return (
    <label className="form-control w-full">
      {label && (
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
      )}
      <input
        type="text"
        placeholder={placeholder}
        className="input input-bordered w-full"
        {...register(name)}
      />
    </label>
  );
}
