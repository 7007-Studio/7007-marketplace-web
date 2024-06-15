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

export default function CollectionPage() {
  const { index } = useParams<{ index: string }>();
  const { chainId } = useAccount();
  const modelInfo: ModelDetail[] | undefined = getModelsData(chainId);
  const [owners, setOwners] = useState(0);
  const { chain } = useAccount();
  const sdk = getBuiltGraphSDK();
  const SDresult = useQuery({
    queryKey: ["StableDiffusionQuery"],
    queryFn: () => sdk.StableDiffusionQuery(),
  });
  const OPresult = useQuery({
    queryKey: ["OpmlQuery"],
    queryFn: () => sdk.OpmlQuery(),
  });
  const SDSepoliaResult = useQuery({
    queryKey: ["StableDiffusionSepoliaQuery"],
    queryFn: () => sdk.StableDiffusionSepoliaQuery(),
  });
  const OPSepoliaResult = useQuery({
    queryKey: ["OpmlSepoliaQuery"],
    queryFn: () => sdk.OpmlSepoliaQuery(),
  });
  const graphResult: GraphResult = {
    [mainnet.id]: [
      {
        data: SDresult.data as StableDiffusionQueryQuery,
        isLoading: SDresult.isLoading,
        error: SDresult.error,
      },
      {
        data: OPresult.data as OpmlQueryQuery,
        isLoading: OPresult.isLoading,
        error: OPresult.error,
      },
    ],
    [sepolia.id]: [
      {
        data: SDSepoliaResult.data as StableDiffusionQueryQuery,
        isLoading: SDSepoliaResult.isLoading,
        error: SDSepoliaResult.error,
      },
      {
        data: OPSepoliaResult.data as OpmlQueryQuery,
        isLoading: OPSepoliaResult.isLoading,
        error: OPSepoliaResult.error,
      },
    ],
  };
  const getCurrentResult = () => {
    if (!chainId) return;
    if (graphResult[chainId][Number(index)].isLoading) return;
    return graphResult[chainId][Number(index)].data;
  };

  const { listings } = useValidListings({
    chainId: chain?.id,
    assetContract:
      modelInfo && (modelInfo[Number(index)].NFTContract as Address),
  });
  const floorPrice = listings?.length
    ? listings.reduce((acc: number, listing: Listing) => {
        const price = Number(listing.pricePerToken);
        return price < acc ? price : acc;
      }, Number(listings[0].pricePerToken)) // 确保初始值类型一致
    : 0;

  const { data: totalSupply } = useReadContract({
    address: modelInfo && (modelInfo[Number(index)].NFTContract as Address),
    abi: aigcAbi,
    functionName: "totalSupply",
  });
  // const fetchModelDetails = async () => {
  //   const [modelID, modelAuthorID] = index.split("%26");

  //   const apiUrl = `https://v3ni1o3vi8.execute-api.ap-northeast-1.amazonaws.com/dev/users/${modelAuthorID}/models/${modelID}`;

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
  const openseaTestNetURL = `https://testnets-api.opensea.io/api/v2/collections/${
    modelInfo ? modelInfo[Number(index)].openSeaName : ""
  }/stats`;
  const openseaMainNetURL = `https://api.opensea.io/api/v2/collections/${
    modelInfo ? modelInfo[Number(index)].openSeaName : ""
  }/stats`;
  const fetchCollectionData = async () => {
    try {
      const response = await axios.get(
        chain === mainnet ? openseaMainNetURL : openseaTestNetURL,
        {
          headers: {
            Accept: "application/json",
            "X-API-KEY": process.env.NEXT_PUBLIC_OPENSEA_API_KEY,
          },
        }
      );
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
          index && modelInfo
            ? (modelInfo[Number(index)] as ModelDetail)
            : undefined
        }
      />
      <Progress modelIndex={index} />
      <Stats
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
      )}
    </div>
  );
}
