import { SubmitHandler, useForm } from "react-hook-form";
import TextInput from "./textInput";
import { useRouter } from "next/router";
import {
  useAigcFactoryCreateAigc,
  usePrepareAigcFactoryCreateAigc,
} from "@/generated";
import { useState } from "react";
import { TransactionExecutionError, zeroAddress } from "viem";
import { AIGC_FACTORY_CONTRACT_ADDRESS } from "@/constants";

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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareAigcFactoryCreateAigc({
    address: AIGC_FACTORY_CONTRACT_ADDRESS,
    // uint256 _modelIndex, string memory _modelName, string memory _modelSymbol, uint256 _tokenPrice, uint256 _costToken, bytes32 _aiModelVm, address _opmlLib
    args: [
      BigInt(1),
      "Modal A",
      "MODA",
      BigInt(1),
      BigInt(1),
      `0x0000000000000000000000000000000000000000000000000000000000000000`,
      zeroAddress,
    ],
  });
  const { data, writeAsync, isLoading, isSuccess, isError, error } =
    useAigcFactoryCreateAigc(config);

  const { register, handleSubmit } = useForm<IFormModelInput>();
  const onSubmit: SubmitHandler<IFormModelInput> = async (data) => {
    setIsSubmitting(true);
    setIsGenerating(true);
    console.log(data);

    if (!writeAsync) {
      setIsSubmitting(false);
      setIsGenerating(false);
      return;
    }

    try {
      const data = await writeAsync();
      console.log(data);
      // await writeAsync({
      //   args: []
      // });
    } catch (e) {
      if (e instanceof TransactionExecutionError) {
        console.error(e.shortMessage);
      }

      setIsSubmitting(false);
      setIsGenerating(false);
    }

    // TODO: replace with call to mint model
    // Ideally we listen to event, and get the AIGC
    setTimeout(() => {
      router.push("/model/1/detail");
    }, 5000);
  };

  console.log("isError", isError, error);

  if (isSuccess) {
    router.push("/");
  }

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
        <button
          disabled={isLoading || isSubmitting || !writeAsync}
          className="btn btn-primary"
        >
          {isSubmitting ? (
            <>
              <span className="loading loading-spinner"></span>
              loading
            </>
          ) : (
            "Publish"
          )}
        </button>
        {isPrepareError && <div>Error: {prepareError?.message}</div>}
        {isError && <div>Error: {error?.message}</div>}
      </div>
    </form>
  );
}
