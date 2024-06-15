"use client";

import { useEffect, useState } from "react";
import { Abi, zeroAddress } from "viem";
import { useAccount } from "wagmi";
import Menu, { MenuList } from "@/components/ui/menu";
import { CiSearch } from "react-icons/ci";
import CreateInput from "@/components/input/createInput";
import Image from "next/image";
import ImageUploader from "../../../components/input/imageUploader";
import Link from "next/link";
import JSZip from "jszip";
import { useGetImageStore } from "./store";
import { useRouter } from "next/navigation";
import DragInput from "@/components/input/dragInput";
import { toast } from "react-hot-toast";

const CreateCollection = () => {
  const menuOption = [
    { id: "1", label: "Your model", value: "All" },
    { id: "2", label: "text-to-text", value: "text-to-text" },
    { id: "3", label: "text-to-music", value: "text-to-music" },
    { id: "4", label: "Model 3", value: "Model 3" },
  ];
  const menuModelOption = [
    {
      id: "1",
      label: "animerge_v30",
      value: "animerge_v30.safetensors [0bb26698cd]",
    },
    {
      id: "2",
      label: "chilloutmix_NiPrunedFp32Fix",
      value: "chilloutmix_NiPrunedFp32Fix.safetensors [fc2511737a]",
    },
    {
      id: "3",
      label: "PE_OldCartoonStyle",
      value: "PE_OldCartoonStyle.safetensors [b1b2c54647]",
    },
    {
      id: "4",
      label: "revAnimated_v122EOL",
      value: "revAnimated_v122EOL.safetensors [4199bcdd14]",
    },
  ];
  const [modelName, setModelName] = useState<string>();
  const { uploadImages } = useGetImageStore();
  const { address } = useAccount();
  const [selectModel, setSelectModel] = useState<MenuList>(menuModelOption[0]);
  const [loading, setLoading] = useState<boolean>(false);
  const [select, setSelect] = useState<MenuList>(menuOption[0]);
  const [loadingToast, setLoadingToast] = useState<any>();

  const handleSelect = (option: MenuList) => {
    setSelect(option);
  };
  const router = useRouter();

  const handleSelectModel = (option: MenuList) => {
    setSelectModel(option);
  };

  const getPreSignedUrl = async () => {
    try {
      const response = await fetch(
        "https://v3ni1o3vi8.execute-api.ap-northeast-1.amazonaws.com/dev/preSignedURL",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "user-id": address,
          } as any,
        }
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error(`Failed to get presigned URL: ${response.status}`);
      }
    } catch (error) {
      console.error("Request error while getting presigned URL:", error);
    }
  };

  const zipAndUploadFiles = async () => {
    console.log(modelName, address, uploadImages, selectModel);
    if (
      !modelName ||
      !address ||
      !uploadImages ||
      uploadImages.length === 0 ||
      !selectModel
    )
      return;
    setLoading(true);
    const toastZip = toast.loading("Starting to zip files...");
    const zip = new JSZip();
    let count = 0;

    uploadImages.forEach((image: any) => {
      const reader = new FileReader();
      reader.onload = () => {
        zip.file(image.name, reader.result as any, { binary: true });
        count++;
        if (count === uploadImages.length) {
          zip
            .generateAsync({ type: "blob" })
            .then(async (content) => {
              const { preSignedUrl, modelID } = await getPreSignedUrl();
              toast.success("Finished zipping files", {
                id: toastZip,
              });
              uploadFileToS3UsingUrl(content, preSignedUrl, modelID);
            })
            .catch((error) => {
              console.error("Error during zip file generation:", error);
            });
        }
      };
      reader.readAsArrayBuffer(image);
    });
  };

  const uploadFileToS3UsingUrl = async (
    fileContent: any,
    presignedUrl: string,
    modelID: string
  ) => {
    try {
      const toastUpload = toast.loading("Preparing to upload...");

      const response = await fetch(presignedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/zip",
        },
        body: fileContent,
      });
      if (response.ok) {
        toast.success("Successfully uploaded zip file.", {
          id: toastUpload,
        });
        postModelName(modelID);
      } else {
        throw new Error(
          `Error during upload: ${response.status} ${response.statusText}`
        );
      }
    } catch (error) {
      console.error("XHR request error:", error);
      setLoading(false);
    }
  };

  const postModelName = async (modelID: string) => {
    if (!modelName || !address || !modelID || !selectModel) {
      console.error("Model name and User ID are required.");
      toast.error("Please enter a model name and User ID.");
      return;
    }

    let baseModel = selectModel.value;

    try {
      const toastCreate = toast.loading("Preparing to create model..");

      const response = await fetch(
        "https://v3ni1o3vi8.execute-api.ap-northeast-1.amazonaws.com/dev/model_train_task",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "user-id": address,
          },
          body: JSON.stringify({ modelName, modelID, baseModel }),
        }
      );
      if (response.ok) {
        toast.success("Successfully create model.", {
          id: toastCreate,
        });
        router.push("/account/models");
      } else {
        throw new Error(
          `Error during model name post: ${response.status} ${response.statusText}`
        );
      }
    } catch (error) {
      console.error("XHR request error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col pt-[100px] w-full items-center">
      <div className="flex w-[85%] items-start flex-col gap-5">
        <a className="text-[30px] font-bold">create an aigc collection</a>
        <a className="max-w-[718px]">
          {`First, you'll need to deploy a contract You'll need to deploy an ERC-721 contract onto the blockchain before you can create a drop. What is a contract?`}
        </a>
      </div>
      <div className="flex gap-[50px] pt-[45px] w-[85%]">
        <div className="flex flex-col w-[48%] gap-[45px]">
          <div className="space-y-2">
            <a className="pl-2">data upload</a>
            <div className="w-full h-[120px] bg-grey flex items-center">
              <DragInput />
            </div>
          </div>
          <div className="flex flex-col gap-2 h-full">
            <a className="pl-2">select a model</a>
            <div className="px-9 border border-white rounded-md pt-5">
              <div className="flex gap-2 w-full border-b border-grey pb-5 text-sm">
                <div className="w-1/2">Name</div>
                <div className="w-[15%] flex justify-center">Type</div>
                <div className="w-[15%] flex justify-center">Created</div>
                <div className="w-[16%] flex justify-center">Inferences</div>
              </div>
              <div className="flex gap-2 w-full py-5 font-bold items-center">
                <div className="w-1/2 flex gap-4">
                  <Menu
                    options={menuModelOption}
                    selected={selectModel}
                    onSelect={handleSelectModel}
                  />
                </div>
                <div className="w-[15%] flex justify-center">77</div>
                <div className="w-[15%] flex justify-center">77</div>
                <div className="w-[16%] flex justify-center">10,000</div>
              </div>
            </div>
            {/* <div className="w-full flex flex-col h-full border border-white rounded-lg mt-4">
              <div className="py-4 w-full flex items-center justify-between border-b border-white pr-6">
                <div className="flex items-center pl-9">
                  <a>Trending</a>
                  <div className="h-[30px] w-[1.5px] bg-grey mx-5" />
                  <a>Top</a>
                  <div className="h-[30px] w-[1.5px] bg-grey mx-5" />
                  <CiSearch
                    size={30}
                    color="white"
                    className="opacity-60 cursor-pointer"
                  />
                </div>
                <Menu
                  options={menuOption}
                  selected={select}
                  onSelect={handleSelect}
                />
              </div>
              <div className="px-9 flex flex-col py-6 h-full">
                <div className="flex gap-2 w-full border-b border-grey pb-5 text-sm">
                  <div className="w-[32%] flex gap-4">
                    <a className="">name</a>
                  </div>
                  <div className="w-[17%] flex justify-center">type</div>
                  <div className="w-[17%] flex justify-center">created</div>
                  <div className="w-[17%] flex justify-center">inferences</div>
                  <div className="w-[17%] flex justify-center">earing %</div>
                </div>
                <div className="flex gap-2 w-full py-5">
                  <div className="w-[32%] flex gap-4">
                    <a className="">model name</a>
                  </div>
                  <div className="w-[17%] flex justify-center">77</div>
                  <div className="w-[17%] flex justify-center">77</div>
                  <div className="w-[17%] flex justify-center">1,000</div>
                  <div className="w-[17%] flex justify-center">1,000</div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        <div className="flex flex-col w-[48%] gap-[30px]">
          <div className="gap-2 flex flex-col">
            <a className="pl-2">collection name</a>
            <input
              type="text"
              name="modelName"
              id="modelNameInput"
              className="bg-grey h-16 pl-10"
              value={modelName} // Bind the value to the state variable
              onChange={(e) => {
                const inputValue = e.target.value.trim(); // Remove leading and trailing spaces
                const formattedValue = inputValue.replace(/\s+/g, "-"); // Replace spaces with hyphens
                setModelName(formattedValue); // Update the state with the formatted value
              }}
              placeholder="name..."
            />
          </div>
          {/* <div className="gap-2 flex flex-col">
            <a className="pl-2">collection description</a>
            <CreateInput
              placeholder="description .."
              className="h-48 collection description"
            />
          </div>
          <div className="w-full flex gap-5">
            <div className="gap-2 flex flex-col w-full">
              <a className="pl-2">Total supply</a>
              <CreateInput placeholder="10 - 1,000" />
            </div>
            <div className="gap-2 flex flex-col w-full">
              <a className="pl-2">Creator earnings %</a>
              <CreateInput placeholder="10%" />
            </div>
          </div>
          <div className="w-full flex gap-5">
            <div className="gap-2 flex flex-col w-full">
              <a className="pl-2">Mint price</a>
              <CreateInput placeholder="0.0777" type="token" />
            </div>
            <div className="gap-2 flex flex-col w-full">
              <a className="pl-2">Token symbol</a>
              <CreateInput placeholder="1,000-10,000" />
            </div>
          </div>
          <div className="w-full flex gap-5">
            <div className="gap-2 flex flex-col w-full">
              <a className="pl-2">Launch date</a>
              <CreateInput placeholder="date picker" />
            </div>
            <div className="gap-2 flex flex-col w-full">
              <a className="pl-2">End date</a>
              <CreateInput placeholder="date picker" />
            </div>
          </div>
          <div className="gap-2 flex flex-col">
            <a className="pl-2">Positive Prompt</a>
            <CreateInput placeholder="Positive ..." className="h-24" />
          </div>
          <div className="gap-2 flex flex-col">
            <a className="pl-2">Negative Prompt</a>
            <CreateInput placeholder="Negative ..." className="h-24" />
          </div>
          <div className="gap-2 flex flex-col">
            <a className="pl-2">Banner image</a>
            <div className="w-full h-20 bg-grey p-10"></div>
          </div> */}
        </div>
      </div>
      <div className="flex w-[85%] items-start pt-[75px] flex-col gap-5">
        <div className="flex justify-between w-full">
          <Image
            src="/7007logo.svg"
            alt="7007 Studio"
            width={44}
            height={44}
            className="w-10 h-10 opacity-30"
          />
          <div className="flex justify-end text-end flex-col">
            {/* <div>estimate mint cost</div> */}
            {/* <div>~ 0.05 eth</div> */}
          </div>
        </div>
        <div className="flex justify-between w-full">
          <a className="max-w-[502px]">
            this is a function description a description this is function
            function description function
          </a>
          {/* <button 
            className="w-[260px] h-[58px] bg-white/40 border border-white rounded"
          >
            <Link href="/account/models">
              Prompt
            </Link>
          </button> */}
          <button
            className={`w-[260px] h-[58px] bg-white/40 border border-white rounded font-bold flex items-center justify-center gap-2 ${
              !modelName ||
              !address ||
              !uploadImages ||
              uploadImages.length === 0 ||
              !selectModel
                ? "opacity-40"
                : ""
            }`}
            disabled={
              !modelName ||
              !address ||
              !uploadImages ||
              uploadImages.length === 0 ||
              !selectModel
            }
            onClick={() => zipAndUploadFiles()}
          >
            {loading ? (
              <>
                <span className="loading loading-spinner" />
                loading
              </>
            ) : (
              "Create"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCollection;
