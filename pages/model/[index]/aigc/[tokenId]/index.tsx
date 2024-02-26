import { useRouter } from "next/router";
import { AIGC_FACTORY_CONTRACT_ADDRESS } from "@/constants";
import {
  useReadAigcFactoryDeployedAigCs,
  useReadAigcModelName,
  useReadAigcOwnerOf,
  useReadAigcTokenUri,
  useReadErc20Decimals,
  useReadErc20Symbol,
  useWriteMarketplaceV3BuyFromListing,
} from "@/generated";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useEffect, useState } from "react";
import useAudio from "@/hooks/useAudio";
import axios from "axios";
import { Metadata, MetadataAttribute } from "@/types";
import { concatAddress, openseaUrl } from "@/helpers";
import Image from "next/image";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";

export default function Detail() {
  const router = useRouter();
  const { index, tokenId } = router.query;

  const { isConnected, address: connectedWallet } = useAccount();
  const { openConnectModal } = useConnectModal();

  const [isCollapsed, setIsCollapsed] = useState(true);
  const [metadata, setMetadata] = useState<Metadata>();
  const [audioUrl, setAudioUrl] = useState();

  const [buyInitialized, setBuyInitialized] = useState(false);

  // read contracts
  const { data: aigcAddress } = useReadAigcFactoryDeployedAigCs({
    address: AIGC_FACTORY_CONTRACT_ADDRESS,
    args: index ? [BigInt(index as string)] : undefined,
  });

  const { data: modelName } = useReadAigcModelName({
    address: aigcAddress,
  });

  const { data: owner, refetch: refetchOwner } = useReadAigcOwnerOf({
    address: aigcAddress,
    args: tokenId ? [BigInt(tokenId as string)] : undefined,
  });

  const { data: tokenUri } = useReadAigcTokenUri({
    address: aigcAddress,
    args: tokenId ? [BigInt(tokenId as string)] : undefined,
  });

  // const { data: decimals } = useReadErc20Decimals({
  //   address: listing?.currency,
  // });
  // const { data: symbol } = useReadErc20Symbol({
  //   address: listing?.currency,
  // });

  // write contracts
  const { writeContract: buyNft, data: buyNftTx } =
    useWriteMarketplaceV3BuyFromListing();

  const buyResult = useWaitForTransactionReceipt({
    hash: buyNftTx,
  });
  useEffect(() => {
    console.debug("buyResult changed");
    if (buyResult.isSuccess) {
      // refetchOwner();
      // refetchIsListed();

      setBuyInitialized(false);
    }
  }, [buyResult]);

  // TODO: find creator of the token

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

  if (!metadata) return;

  return (
    <div className="grid grid-cols-3 gap-4">
      <div>
        <figure>
          <Image
            src={metadata.image}
            alt={metadata.name}
            width={512}
            height={512}
            className="w-full object-cover aspect-square"
          />
        </figure>

        <div>
          <h3 className="text-lg">Description</h3>
          <p className="pb-4">{metadata.description}</p>
        </div>
        <div>
          <h3 className="text-lg">Details</h3>
          <div className="opacity-100 transition-opacity ease-in-out duration-500">
            {aigcAddress && (
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>Contract Address</div>
                <a
                  href={`https://sepolia.etherscan.io/address/${aigcAddress}`}
                  className="text-primary overflow-hidden"
                  target="_blank"
                >
                  {concatAddress(aigcAddress)}
                </a>
              </div>
            )}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>Token ID</div>
              <div>{tokenId}</div>
            </div>

            {aigcAddress && (
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>Link</div>
                <a
                  href={openseaUrl(aigcAddress, tokenId as string)}
                  className="text-primary overflow-hidden"
                  target="_blank"
                >
                  View on OpenSea
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="grid-cols-subgrid col-span-2 flex flex-col">
        <h2 className="heading-lg">{modelName}</h2>
        <h3 className="heading-md">{metadata.name}</h3>
        <p>Owned by ...</p>
      </div>
    </div>
  );
}
