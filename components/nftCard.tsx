import { useEffect, useState } from "react";
import useAudio from "@/hooks/useAudio";
import {
  useAigcApprovalEvent,
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
import { concatAddress } from "@/helpers";
import { Metadata, MetadataAttribute } from "@/types";
import {
  AIGC_FACTORY_CONTRACT_ADDRESS,
  NFT_MARKETPLACE_ADDRESS,
} from "@/constants";
import { parseEther } from "viem";
import { useConnectModal } from "@rainbow-me/rainbowkit";
export interface NFTCardProps {
  modelIndex: number;
  tokenId: string;
}

const NFTCard: React.FC<NFTCardProps> = ({ modelIndex, tokenId }) => {
  const { isConnected, address } = useAccount();
  const { openConnectModal } = useConnectModal();

  const [isCollapsed, setIsCollapsed] = useState(true);
  const [metadata, setMetadata] = useState<Metadata>();
  const [audioUrl, setAudioUrl] = useState();
  const [isPlaying, setIsPlaying] = useAudio(audioUrl);

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
    <div className="card w-full max-w-full h-fit bg-black text-white shadow-lg overflow-hidden hover:scale-[1.02] hover:outline outline-pink-500 outline-2 transition">
      <div className="flex justify-between items-center">
        <h2 className="card-title p-4">{metadata.name}</h2>
        <div className="badge badge-secondary m-4">Genesis Model</div>
      </div>

      <figure>
        <img
          src={metadata.image}
          alt={metadata.name}
          className="w-full object-cover min-h-[300px]"
        />
      </figure>
      <button
        onClick={() => {
          setIsPlaying(!isPlaying);
        }}
        className="ml-5 -mt-5"
      >
        {isPlaying ? (
          <svg
            className="ml-1 bg-black outline  outline-1 outline-primary h-12 w-12 p-3 "
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
          </svg>
        ) : (
          <svg
            className="ml-1 bg-black outline  outline-1 outline-primary h-12 w-12 p-2 "
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="#22d3ee"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      <div className="card-body flex-initial">
        <h2 className="text-2xl mb-4 font-bold">{metadata.name}</h2>
        <p className="mb-4 text-zinc-400">{metadata.description}</p>
        {/* detail */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center justify-between -mx-2 px-2 py-2 bg-black text-white rounded hover:bg-gray-800 transition duration-300 "
        >
          <span>Collapse</span>
          <svg
            className="w-4 h-4 transform"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
            viewBox="0 0 24 24"
            stroke="currentColor"
            style={{
              transform: isCollapsed ? "rotate(0)" : "rotate(-90deg)",
              color: "rgb(0, 188, 212)",
              transition: "all 0.25s ease-in-out ",
            }}
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
        {/* <audio src="">sdsdfsdfs</audio> */}
        <div
          className={`${
            isCollapsed
              ? "opacity-0 max-h-0 hidden"
              : "opacity-100 transition-opacity ease-in-out duration-500"
          } `}
        >
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
                href={`https://testnets.opensea.io/assets/sepolia/${aigcAddress}/${tokenId}`}
                className="text-blue-500 hover:text-blue-600 overflow-hidden"
                target="_blank"
              >
                View on OpenSea
              </a>
            </div>
          )}
        </div>
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
            className="btn btn-secondary"
          >
            {buyInitialized ? (
              <>
                <span className="loading loading-spinner"></span>
                loading
              </>
            ) : (
              "Buy"
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
              "Sell"
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default NFTCard;
