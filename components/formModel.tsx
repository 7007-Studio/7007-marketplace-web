import { SubmitHandler, useForm } from "react-hook-form";
import TextInput from "./textInput";
import { useRouter } from "next/router";

export interface IFormModelInput {
  name: string;
  description: string;
  tokenSymbol: string;
  tokenTotalSupply: number;
  tokenInitialPrice: number;
  tokenRoyaltyShare: number;
  tokenOwnerReservePercentage: number;
}

interface FormModelProps {
  setIsGenerating: (isGenerating: boolean) => void;
}

export default function FormModel({ setIsGenerating }: FormModelProps) {
  const router = useRouter();
  const { register, handleSubmit } = useForm<IFormModelInput>();
  const onSubmit: SubmitHandler<IFormModelInput> = (data) => {
    setIsGenerating(true);
    console.log(data);

    // TODO: replace with call to mint model
    setTimeout(() => {
      router.push("/");
    }, 5000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <TextInput
        label="Name of Model"
        placeholder="Model Name"
        name="name"
        register={register}
      />

      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Description</span>
        </div>
        <textarea
          className="textarea textarea-bordered h-24"
          placeholder="Describe your model"
          {...register("description")}
        ></textarea>
      </label>

      {/* <label>Upload your model file to 7007</label>
        <input {...register("modelFile")} /> */}
      <div className="grid md:grid-cols-2 gap-4">
        <TextInput
          label="Token Symbol"
          name="tokenSymbol"
          register={register}
        />
        <TextInput
          label="Total Supply"
          name="tokenTotalSupply"
          register={register}
        />
        <TextInput
          label="Initial Price"
          name="tokenInitialPrice"
          register={register}
        />
        <TextInput
          label="Royalty Share"
          name="tokenRoyaltyShare"
          register={register}
        />
        <TextInput
          label="Owner Reserve Percentage"
          name="tokenOwnerReservePercentage"
          register={register}
        />
      </div>

      <div>
        <input type="submit" value="Publish" className="btn" />
      </div>
    </form>
  );
}
