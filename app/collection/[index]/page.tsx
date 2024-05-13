"use client";

import { useParams } from "next/navigation";
import { useAccount, useReadContract } from "wagmi";
import Stats from "./stats";
import Collection from "@/components/collection";
import { ModelDetail } from "@/types";
import { useEffect, useState } from "react";
import Hero from "./hero";
import Progress from "./progress";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { getBuiltGraphSDK, StableDiffusionQueryQuery } from "@/.graphclient";
import useValidListings from "@/hooks/useValidListings";
import { Address } from "viem";
import { aigcAbi } from "@/generated";
import { modelData } from "@/constants/constants";

export default function CollectionPage() {
  const { index } = useParams<{ index: string }>();
  // const [modelInfo, setModelInfo] = useState<ModelInfo>();
  const modelInfo: ModelDetail[] = modelData;
  const [owners, setOwners] = useState(0);
  const { chain } = useAccount();
  const sdk = getBuiltGraphSDK();
  const result = useQuery({
    queryKey: ["GraphQuery"],
    queryFn: () => sdk.StableDiffusionQuery(),
  });
  const { data, isLoading, error, refetch } = result;
  const { listings } = useValidListings({
    chainId: chain?.id,
  });

  const { data: totalSupply } = useReadContract({
    address: modelInfo[Number(index)].NFTContract as Address,
    abi: aigcAbi,
    functionName: "totalSupply",
  });
  // const fetchModelDetails = async () => {
  //   const [modelID, modelAuthorID] = index.split("%26");

  //   const apiUrl = `https://f3593qhe00.execute-api.ap-northeast-1.amazonaws.com/dev/users/${modelAuthorID}/models/${modelID}`;

  //   try {
  //     const response = await axios.get(apiUrl);
  //     if (response.status !== 200) {
  //       throw new Error("Failed to fetch");
  //     }
  //     const data = response.data;
  //     setModelInfo(data);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };
  const openseaTestNetURL =
    "https://testnets-api.opensea.io/api/v2/collections/stable-diffusion-19/stats";
  const openseaMainNetURL =
    "https://api.opensea.io/api/v2/collections/stable-diffusion-19/stats";
  const fetchCollectionData = async () => {
    try {
      const response = await axios.get(openseaTestNetURL);
      if (response.status !== 200) {
        throw new Error("Failed to fetch");
      }
      const data = response.data;
      setOwners(data.total.num_owners);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    // fetchModelDetails();
    fetchCollectionData();
  }, [index]);
  return (
    <div className="w-[80%]">
      <Hero
        modelData={
          index ? (modelInfo[Number(index)] as ModelDetail) : undefined
        }
      />
      <Progress modelIndex={index} />
      <Stats
        NFTData={isLoading ? undefined : (data as StableDiffusionQueryQuery)}
        totalListings={listings && listings.length}
        totalSupply={totalSupply ? String(totalSupply) : "0"}
        owners={owners}
      />
      <Collection
        NFTAddress={modelInfo[Number(index)].NFTContract as Address}
      />
    </div>
  );
}
