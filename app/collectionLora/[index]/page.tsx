"use client";

import { useParams } from "next/navigation";
import { useAccount, useReadContract } from "wagmi";
import Stats from "./stats";
import Collection from "@/components/collection";
import { Listing, ModelDetail } from "@/types";
import { useEffect, useState } from "react";
import Hero from "./hero";
import Progress from "./progress";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  getBuiltGraphSDK,
  OpmlQueryQuery,
  StableDiffusionQueryQuery,
} from "@/.graphclient";
import useValidListings from "@/hooks/useValidListings";
import { Address } from "viem";
import { aigcAbi } from "@/generated";
import { getModelsData } from "@/helpers";
import { mainnet, sepolia } from "viem/chains";

interface IContractsIndex {
  data: StableDiffusionQueryQuery | OpmlQueryQuery;
  isLoading: boolean;
  error: any;
}
interface GraphResult {
  [key: number]: IContractsIndex[];
}

export default function CollectionLoraPage() {
  const { index } = useParams<{ index: string }>();
  const [modelInfo, setModelInfo] = useState<ModelDetail | undefined>(
    undefined
  );
  const fetchModelDetails = async () => {
    const [modelID, modelAuthorID] = index.split("%26");

    const apiUrl = `https://f3593qhe00.execute-api.ap-northeast-1.amazonaws.com/dev/users/${modelAuthorID}/models/${modelID}`;

    try {
      const response = await axios.get(apiUrl);
      if (response.status !== 200) {
        throw new Error("Failed to fetch");
      }
      const data = response.data;
      setModelInfo(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchModelDetails();
  }, [index]);

  return (
    <div className="w-[80%]">
      {/* <Hero
        modelData={
          index && modelInfo
            ? (modelInfo[Number(index)] as ModelDetail)
            : undefined
        }
      /> */}
      <Progress modelIndex={index} />
      {/* <Stats
        NFTData={getCurrentResult()}
        totalListings={listings && listings.length}
        totalSupply={totalSupply ? String(totalSupply) : "0"}
        floorPrice={floorPrice}
        owners={owners}
      />
      {modelInfo && (
        <Collection
          NFTAddress={modelInfo[Number(index)].NFTContract as Address}
        />
      )} */}
    </div>
  );
}
