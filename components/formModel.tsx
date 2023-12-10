"use client";

import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import {
  useAigcFactoryAigcCreatedEvent,
  useAigcFactoryCreateAigc,
} from "@/generated";
import { AIGC_FACTORY_CONTRACT_ADDRESS } from "@/constants";
import TextInput from "./textInput";

export interface IFormModelInput {
  name: string;
  description: string;
  tokenSymbol: string;
  tokenTotalSupply: number;
  tokenInitialPrice: number;
  tokenRoyaltyShare: number;
  tokenOwnerReservePercentage: number;
  file: File[];
}

interface FormModelProps {
  setIsGenerating: (isGenerating: boolean) => void;
}

export default function FormModel({ setIsGenerating }: FormModelProps) {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { write, isLoading, isError, error } = useAigcFactoryCreateAigc({
    address: AIGC_FACTORY_CONTRACT_ADDRESS,
  });

  useAigcFactoryAigcCreatedEvent({
    address: AIGC_FACTORY_CONTRACT_ADDRESS,
    listener: (log) => {
      // aigcAddress, aigtAddress
      debugger;
      router.push(
        `/model/${log[0].args.aigtAddress}/aigc/${log[0].args.aigcAddress}/detail`
      );
    },
  });

  const { control, register, handleSubmit, watch } = useForm<IFormModelInput>();
  const fileInputRef = React.useRef<HTMLInputElement>();
  const selectedFile = watch("file");
  const onSubmit: SubmitHandler<IFormModelInput> = async (data) => {
    setIsSubmitting(true);
    setIsGenerating(true);

    write({
      args: [
        data.name,
        data.tokenSymbol,
        BigInt(data.tokenInitialPrice),
        BigInt(1),
        "0x7465787400000000000000000000000000000000000000000000000000000000",
        "0xfEBfdE43561Bc74e4F982cdEB40A29966708E035",
        BigInt(data.tokenTotalSupply),
        BigInt(data.tokenOwnerReservePercentage),
        BigInt(data.tokenRoyaltyShare),
        // "Stable Diffusion",
        // "SD",
        // BigInt(0),
        // BigInt(1),
        // "0x7465787400000000000000000000000000000000000000000000000000000000",
        // "0xfEBfdE43561Bc74e4F982cdEB40A29966708E035",
        // BigInt(1000),
        // BigInt(10),
        // BigInt(10),
      ],
    });
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

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Controller
            name="file"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <>
                <input
                  ref={(e) => {
                    field.ref(e);
                    if (e) {
                      fileInputRef.current = e;
                    }
                  }}
                  type="file"
                  hidden
                  onChange={(e) => field.onChange(e.target.files)}
                />
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">
                      Upload your model file to 7007
                    </span>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Upload File
                  </button>
                </label>
              </>
            )}
          />
          {selectedFile && selectedFile.length > 0 && (
            <div>Selected file: {selectedFile[0].name}</div>
          )}
        </div>
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
          postfix="ETH"
          name="tokenInitialPrice"
          register={register}
        />
        <TextInput
          label="Royalty Share"
          postfix="%"
          name="tokenRoyaltyShare"
          register={register}
        />
        <TextInput
          label="Owner Reserve Percentage"
          postfix="%"
          name="tokenOwnerReservePercentage"
          register={register}
        />
      </div>

      <div>
        <button
          disabled={isLoading || isSubmitting}
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
        {isError && <div>Error: {error?.message}</div>}
      </div>
    </form>
  );
}
