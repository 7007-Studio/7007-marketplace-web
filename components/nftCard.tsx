import { useEffect, useState } from "react";
import {
  useAigcApprove,
  useAigcFactoryDeployedAigCs,
  useAigcOwnerOf,
  useAigcTokenUri,
  useNftMarketplaceBuy,
  useNftMarketplaceIsListed,
  useNftMarketplaceList,
} from "@/generated";
import { useAccount, useWaitForTransaction } from "wagmi";
import axios from "axios";
import { Metadata, MetadataAttribute } from "@/types";
import {
  AIGC_FACTORY_CONTRACT_ADDRESS,
  NFT_MARKETPLACE_ADDRESS,
} from "@/constants";
import { parseEther } from "viem";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Card from "./card";
import { concatAddress } from "@/helpers";
import HeadingMedium from "./text/headingMedium";
export interface NFTCardProps {
  modelIndex: string | number;
  tokenId: string | number;
}

const NFTCard: React.FC<NFTCardProps> = ({ modelIndex, tokenId }) => {
  const { isConnected, address } = useAccount();
  const { openConnectModal } = useConnectModal();

  const [isCollapsed, setIsCollapsed] = useState(true);
  const [metadata, setMetadata] = useState<Metadata>();
  const [audioUrl, setAudioUrl] = useState();

  const [listInitialized, setListInitialized] = useState(false);
  const [buyInitialized, setBuyInitialized] = useState(false);
  const [approvedListing, setApprovedListing] = useState(false);

  // read contracts
  const { data: aigcAddress } = useAigcFactoryDeployedAigCs({
    address: AIGC_FACTORY_CONTRACT_ADDRESS,
    args: [BigInt(modelIndex)],
  });

  const { data: owner, refetch: refetchOwner } = useAigcOwnerOf({
    address: aigcAddress,
    args: [BigInt(tokenId)],
  });

  const { data: tokenUri } = useAigcTokenUri({
    address: aigcAddress,
    args: [BigInt(tokenId)],
  });

  const { data: isListed, refetch: refetchIsListed } =
    useNftMarketplaceIsListed({
      address: NFT_MARKETPLACE_ADDRESS,
      args: aigcAddress ? [aigcAddress, BigInt(tokenId)] : undefined,
    });

  // write contracts
  const { write: approveListing, data: approveTx } = useAigcApprove({
    address: aigcAddress,
    args: [NFT_MARKETPLACE_ADDRESS, BigInt(tokenId)],
    onError(error) {
      setListInitialized(false);
    },
  });

  const { write: listNft, data: listNftTx } = useNftMarketplaceList({
    address: NFT_MARKETPLACE_ADDRESS,
    args: aigcAddress ? [aigcAddress, BigInt(tokenId)] : undefined,
    onError(error) {
      setListInitialized(false);
    },
  });

  const { write: buyNft, data: buyNftTx } = useNftMarketplaceBuy({
    address: NFT_MARKETPLACE_ADDRESS,
    value: parseEther("0.001"), // default price
    args: aigcAddress ? [aigcAddress, BigInt(tokenId)] : undefined,
    onError(error) {
      setBuyInitialized(false);
    },
  });

  // wait for transactions
  useWaitForTransaction({
    hash: approveTx?.hash,
    onSuccess(data) {
      setApprovedListing(true);
      listNft();
    },
  });

  useWaitForTransaction({
    hash: listNftTx?.hash,
    onSuccess(data) {
      refetchOwner();
      refetchIsListed();

      setApprovedListing(false);
      setListInitialized(false);
    },
  });

  useWaitForTransaction({
    hash: buyNftTx?.hash,
    onSuccess(data) {
      refetchOwner();
      refetchIsListed();

      setBuyInitialized(false);
    },
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

  if (!metadata) return;

  return (
    <Card className="max-w-[258px]">
      <div className="flex py-4 px-6 justify-between items-center">
        <span>DATE</span>
        <span>Genesis Model</span>
      </div>

      <figure>
        <Image
          src={metadata.image}
          alt={metadata.name}
          width={512}
          height={512}
          className="w-full object-cover aspect-square"
        />
      </figure>

      <div className="card-body flex-initial">
        <HeadingMedium>{metadata.name}</HeadingMedium>
        <p className="mb-4 text-zinc-400">{metadata.description}</p>

        {isListed && (
          <button
            onClick={() => {
              if (!isConnected) {
                openConnectModal?.();
                return;
              }
              setBuyInitialized(true);
              buyNft();
            }}
            disabled={buyInitialized}
            className="btn btn-primary"
          >
            {buyInitialized ? (
              <>
                <span className="loading loading-spinner"></span>
                loading
              </>
            ) : (
              "Buy Now"
            )}
          </button>
        )}
        {address === owner && (
          <button
            onClick={() => {
              if (!isConnected) {
                openConnectModal?.();
                return;
              }
              setListInitialized(true);
              if (!approvedListing) {
                approveListing();
              } else {
                listNft({
                  args: aigcAddress
                    ? [aigcAddress, BigInt(tokenId)]
                    : undefined,
                });
              }
            }}
            disabled={listInitialized}
            className="btn btn-primary"
          >
            {listInitialized ? (
              <>
                <span className="loading loading-spinner"></span>
                loading
              </>
            ) : (
              "List"
            )}
          </button>
        )}

        <button
          className="flex flex-row justify-between items-center"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <div>{isCollapsed ? "View more" : "Collapse"}</div>
          <svg
            className="w-4 h-4 transform text-primary"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
            viewBox="0 0 24 24"
            stroke="currentColor"
            style={{
              transform: isCollapsed ? "rotate(0)" : "rotate(-90deg)",
              transition: "all 0.25s ease-in-out ",
            }}
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <div
          className={`${
            isCollapsed
              ? "opacity-0 max-h-0 hidden"
              : "opacity-100 transition-opacity ease-in-out duration-500"
          } `}
        >
          {aigcAddress && (
            <div className="flex flex-col md:flex-row md:items-center md:justify-between text-sm leading-5">
              <div>Contract Address</div>
              <a
                href={`https://sepolia.etherscan.io/address/${aigcAddress}`}
                className="text-blue-500 hover:text-blue-600 overflow-hidden"
                target="_blank"
              >
                {concatAddress(aigcAddress)}
              </a>
            </div>
          )}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between text-sm leading-5">
            <div>Token ID</div>
            <div>{tokenId}</div>
          </div>

          {aigcAddress && (
            <div className="flex flex-col md:flex-row md:items-center md:justify-between text-sm leading-5">
              <div>Link</div>
              <a
                href={`https://testnets.opensea.io/assets/sepolia/${aigcAddress}/${tokenId}`}
                className="text-blue-500 hover:text-blue-600 overflow-hidden"
                target="_blank"
              >
                View on OpenSea
              </a>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default NFTCard;
