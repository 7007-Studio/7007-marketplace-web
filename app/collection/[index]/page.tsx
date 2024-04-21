"use client";

import { useParams } from "next/navigation";
import { useAccount } from "wagmi";

import useNftContract from "@/hooks/useNftContract";
import Hero from "./heroNoContract";
import Stats from "./statsNoContract";
import Collection from "@/components/collection";
import Progress from "./progressNoContract";
import { useEffect, useState } from "react";

export default function CollectionPage() {

  interface ModelInfoInterface {
    baseModel: string;
    modelAuthorID: string;
    modelName: string;
}


  const { index } = useParams<{ index: string }>();
  const [modelInfo, setModelInfo] = useState<ModelInfoInterface>();
  console.log('index', index)
  // const { chain } = useAccount();
  // const { nftContract } = useNftContract({
  //   modelIndex: index ? BigInt(index) : 1n,
  //   chainId: chain?.id,
  // });
  const fetchModelDetails = () => {

    const [modelID, modelAuthorID] = index.split("%26");

    let apiUrl = `https://f3593qhe00.execute-api.ap-northeast-1.amazonaws.com/dev/users/${modelAuthorID}/models/${modelID}`;

    fetch(apiUrl, {
        method: 'GET',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch');
        }
        return response.json();
    })
    .then(data => {
      setModelInfo(data)
      console.log(data)
    })
    .catch(error => {
        console.error('Error:', error);
    });

  }

  useEffect(() => {
    fetchModelDetails()
  }, [index])

  console.log(modelInfo?.modelName)

  return (
    <div className="w-[80%]">
      {modelInfo && <Hero modelName={modelInfo.modelName} />}
      <Progress modelInfos={modelInfo}/>
      <Stats />
      <Collection />
    </div>
  );
}
