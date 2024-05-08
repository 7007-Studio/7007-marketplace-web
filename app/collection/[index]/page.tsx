"use client";

import { useParams } from "next/navigation";
import { useAccount } from "wagmi";
import useNftContract from "@/hooks/useNftContract";
import Stats from "./stats";
import Collection from "@/components/collection";
import { ModelInfo } from "@/types";
import { useEffect, useState } from "react";
import Hero from "./hero";
import Progress from "./progress";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { getBuiltGraphSDK, GraphQueryQuery } from "@/.graphclient";

export default function CollectionPage() {
  const { index } = useParams<{ index: string }>();
  const [modelInfo, setModelInfo] = useState<ModelInfo>();
  const sdk = getBuiltGraphSDK();
  const result = useQuery({
    queryKey: ["GraphQuery"],
    queryFn: () => sdk.GraphQuery(),
  });
  const { data, isLoading, error, refetch } = result;

  // const { chain } = useAccount();
  // const { nftContract } = useNftContract({
  //   modelIndex: index ? BigInt(index) : 1n,
  //   chainId: chain?.id,
  // });

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
      <Hero modelName={modelInfo?.modelName} />
      <Progress modelIndex={index} />
      <Stats NFTData={isLoading ? undefined : (data as GraphQueryQuery)} />
      {/* <Collection /> */}
    </div>
  );
}
