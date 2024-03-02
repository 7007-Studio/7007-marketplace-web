import { useEffect, useMemo, useState } from "react";
import { useAccount, useReadContracts } from "wagmi";
import axios from "axios";
import { Listing, Metadata } from "@/types";
import {
  Address,
  erc20Abi,
  erc721Abi,
  formatEther,
  formatUnits,
  isAddressEqual,
} from "viem";
import SPLicenseRegistry from "@/abis/SPLicenseRegistry.json";
import Card from "./card";
import {
  concatAddress,
  formatDaysLeft,
  is7007Token,
  isSPLicenseRegistry,
  openseaUrl,
} from "@/helpers";
import { ListingNFT } from "./modal/listingNFTModal";
import { useReadAigcModelName } from "@/generated";
import { useRouter } from "next/navigation";
import BuyButton from "./buy-button";

function NFTCoverAsset({ metadata }: { metadata?: Metadata }) {
  if (!metadata) {
    return (
      <div className="flex w-full h-[258px] justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (metadata?.animation_url) {
    return (
      <div className="max-h-[258px] overflow-hidden">
        <iframe src={metadata.animation_url} width={258} height={258} />
      </div>
    );
  }

  if (metadata?.image) {
    return (
      <img
        src={metadata.image}
        alt={metadata?.name}
        className="w-full object-cover aspect-square"
      />
    );
  }

  return <div className="flex w-[258px] h-[258px]"></div>;
}
export interface NFTCardProps {
  nftContract: Address;
  tokenId: bigint;
  listing?: Listing;
  onListingNFT?: ({ tokenId, metadata }: ListingNFT) => void;
  onConnectToSP?: () => void;
}

const NFTCard: React.FC<NFTCardProps> = ({
  nftContract,
  tokenId,
  listing,
  onListingNFT,
  onConnectToSP,
}) => {
  const router = useRouter();
  const { address: connectedWallet, chainId } = useAccount();

  const [isCollapsed, setIsCollapsed] = useState(true);
  const [metadata, setMetadata] = useState<Metadata>();

  const { data: modelName } = useReadAigcModelName({
    address: nftContract,
  });

  const erc721Results = useReadContracts({
    contracts: [
      {
        address: nftContract,
        abi: erc721Abi,
        functionName: "ownerOf",
        args: [tokenId],
      },
      {
        address: nftContract,
        abi: erc721Abi,
        functionName: "tokenURI",
        args: [tokenId],
      },
    ],
  });
  const [isErc721, ownerOf, tokenURI] = useMemo(() => {
    if (!erc721Results?.isFetched || !erc721Results?.data) {
      return [];
    }

    return (
      [
        !erc721Results.data[0].error,
        ...(erc721Results.data.map((d) => d.result) as [Address, string]),
      ] || []
    );
  }, [erc721Results.isFetched, erc721Results.data]);

  const erc1155Results = useReadContracts({
    contracts: [
      {
        address: nftContract,
        abi: SPLicenseRegistry,
        functionName: "name",
      },
      {
        address: nftContract,
        abi: SPLicenseRegistry,
        functionName: "balanceOf",
        args: [connectedWallet, tokenId],
      },
      {
        address: nftContract,
        abi: SPLicenseRegistry,
        functionName: "imageUrl",
      },
      {
        address: nftContract,
        abi: SPLicenseRegistry,
        functionName: "uri",
        args: [tokenId],
      },
    ],
  });
  const [isErc1155, erc1155Name, balanceOf, imageUrl, uri] = useMemo(() => {
    if (!erc1155Results?.isFetched || !erc1155Results?.data) {
      return [];
    }
    return (
      [
        !erc1155Results.data[0].error,
        ...(erc1155Results.data.map((d) => d.result) as [
          string,
          bigint,
          string,
          string,
        ]),
      ] || []
    );
  }, [erc1155Results.isFetched, erc1155Results.data]);

  const { data: listingData } = useReadContracts({
    contracts: [
      {
        address: listing?.currency,
        abi: erc20Abi,
        functionName: "decimals",
      },
      {
        address: listing?.currency,
        abi: erc20Abi,
        functionName: "symbol",
      },
    ],
  });
  const [decimals, symbol] = listingData || [];

  const isOwner =
    ownerOf && connectedWallet && isAddressEqual(ownerOf, connectedWallet);

  useEffect(() => {
    if (!nftContract) return;

    if (isErc721 && tokenURI) {
      const fetchMetadata = async () => {
        try {
          const res = await axios.get(tokenURI);
          setMetadata(res.data);
        } catch (error) {
          console.error("Error fetching metadata via:", tokenURI);
        }
      };

      fetchMetadata();
    }

    if (isErc1155 && uri) {
      const parseURI = () => {
        try {
          const decodedURI = atob(
            uri.replace("data:application/json;base64,", "")
          );
          const parsedMetadata = JSON.parse(decodedURI);
          setMetadata(parsedMetadata);
        } catch (error) {
          console.error("Error parsing URI:", error);
        }
      };

      parseURI();
    }
  }, [nftContract, isErc721, tokenURI, isErc1155, uri]);

  // hiding broken AIGC NFT
  if (
    nftContract === "0x0B89f60136A91f3B36557F9414cbd157d0ada7bc" &&
    String(tokenId) === "1"
  ) {
    return null;
  }

  return (
    <Card className="w-[258px]">
      <div
        className="hover:cursor-pointer"
        onClick={() => router.push(`/assets/${nftContract}/${tokenId}/new`)}
      >
        <div className="flex py-4 px-6 justify-between items-center">
          {is7007Token(nftContract) && <span>7007 Genesis NFT</span>}
          {!is7007Token(nftContract) && <span>&nbsp;</span>}
          {modelName && (
            <span className="badge badge-lg text-[#FF78F1] bg-[#FF78F1]/[0.12]">
              {modelName}
            </span>
          )}
          {isSPLicenseRegistry(nftContract, chainId) && (
            <span className="badge badge-lg text-[#CC33CC] bg-[#CC33CC]/[0.12]">
              License
            </span>
          )}
        </div>

        <figure>
          <NFTCoverAsset metadata={metadata} />
        </figure>

        <div className="card-body flex-grow gap-2">
          <h3 className="heading-md">{metadata?.name}</h3>
          <p className="pb-4">{metadata?.description}</p>

          {listing && !isOwner && (
            <>
              <div className="pb-2 flex flex-row justify-between items-baseline">
                <span className="heading-md">
                  {decimals?.result
                    ? formatUnits(listing.pricePerToken, decimals.result)
                    : formatEther(listing.pricePerToken)}{" "}
                  {symbol?.result ? symbol.result : "ETH"}
                </span>
                <span className="text-sm">
                  {formatDaysLeft(Number(listing.endTimestamp) * 1000)}
                </span>
              </div>
              <BuyButton listing={listing} />
            </>
          )}
          {isOwner && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onListingNFT?.({ address: nftContract, tokenId, metadata });
              }}
              className="btn btn-primary"
              disabled={!!listing}
            >
              {!!listing ? "Listed" : "List"}
            </button>
          )}

          <button
            className="pt-8 flex flex-row justify-between items-center"
            onClick={(e) => {
              e.stopPropagation();
              setIsCollapsed(!isCollapsed);
            }}
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
            <div className="flex flex-col md:flex-row md:items-center md:justify-between text-sm leading-5">
              <div>Contract Address</div>
              <a
                href={`https://sepolia.etherscan.io/address/${nftContract}`}
                className="text-primary overflow-hidden"
                target="_blank"
              >
                {concatAddress(nftContract)}
              </a>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between text-sm leading-5">
              <div>Token ID</div>
              <div>{tokenId.toString()}</div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between text-sm leading-5">
              <div>Link</div>
              <a
                href={openseaUrl(nftContract, tokenId.toString())}
                className="text-primary overflow-hidden"
                target="_blank"
              >
                View on OpenSea
              </a>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default NFTCard;
