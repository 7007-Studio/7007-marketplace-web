import { useRouter } from "next/router";
import { AIGC_FACTORY_CONTRACT_ADDRESS } from "@/constants";
import { useAigcFactoryDeployedAigCs, useAigcTokenUri } from "@/generated";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useEffect, useState } from "react";
import useAudio from "@/hooks/useAudio";
import axios from "axios";
import { Metadata, MetadataAttribute } from "@/types";
import { concatAddress, openseaUrl } from "@/helpers";
import Image from "next/image";

export default function Detail() {
  const router = useRouter();
  const { index, tokenId } = router.query;

  const [metadata, setMetadata] = useState<Metadata>();
  const [audioUrl, setAudioUrl] = useState();
  const [isPlaying, setIsPlaying] = useAudio();

  const { data: aigcAddress } = useAigcFactoryDeployedAigCs({
    address: AIGC_FACTORY_CONTRACT_ADDRESS,
    args: index ? [BigInt(index as string)] : undefined,
  });

  const { data: tokenUri } = useAigcTokenUri({
    address: aigcAddress,
    args: tokenId ? [BigInt(tokenId as string)] : undefined,
  });

  useEffect(() => {
    if (!aigcAddress || !tokenUri) return;

    const fetchMetadata = async () => {
      const res = await axios.get(tokenUri);
      const metadata = res.data;

      setMetadata(res.data);

      const audioUrl = metadata.attributes.find(
        (a: MetadataAttribute) => a.trait_type === "Audio"
      )?.value;
      if (audioUrl) setAudioUrl(audioUrl);
    };

    fetchMetadata();
  }, [aigcAddress, tokenUri]);

  const isMounted = useIsMounted();
  if (!isMounted) return null;

  if (!metadata) return null;

  return (
    <div className=" mx-auto w-[85vw]">
      <div className="flex items-center justify-center flex-col my-10">
        {metadata && (
          <div className="flex flex-col shadow md:flex-row max-w-md md:max-w-2xl mx-auto self-center bg-[#191717]">
            <Image
              src={metadata.image}
              alt={metadata.name}
              width={512}
              height={512}
              className="object-cover w-full"
            />
            <div className="flex flex-col justify-between p-8">
              <h5 className="mb-2 md:text-2xl font-bold">{metadata.name}</h5>
              <p className="mb-5 font-normal">{metadata.description}</p>

              {aigcAddress && (
                <div className="flex flex-col md:flex-row md:items-center md:justify-between text-xs leading-5">
                  <h2>Contract Address</h2>
                  <a
                    href={`https://sepolia.etherscan.io/address/${aigcAddress}`}
                    className="text-blue-500 hover:text-blue-600 overflow-hidden"
                    target="_blank"
                  >
                    {concatAddress(aigcAddress)}
                  </a>
                </div>
              )}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between text-xs leading-5">
                <h2>Token ID</h2>
                <span>{tokenId}</span>
              </div>

              {aigcAddress && (
                <div className="flex flex-col md:flex-row md:items-center md:justify-between text-xs leading-5">
                  <a
                    href={openseaUrl(aigcAddress, tokenId as string)}
                    className="text-blue-500 hover:text-blue-600 overflow-hidden"
                    target="_blank"
                  >
                    View on OpenSea
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
