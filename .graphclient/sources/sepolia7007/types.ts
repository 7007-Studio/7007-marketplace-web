// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace Sepolia7007Types {
  export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigDecimal: { input: any; output: any; }
  BigInt: { input: any; output: any; }
  Bytes: { input: any; output: any; }
  Int8: { input: any; output: any; }
  Timestamp: { input: any; output: any; }
};

export type AcceptedOffer = {
  id: Scalars['Bytes']['output'];
  offeror: Scalars['Bytes']['output'];
  offerId: Scalars['BigInt']['output'];
  assetContract: Scalars['Bytes']['output'];
  tokenId: Scalars['BigInt']['output'];
  seller: Scalars['Bytes']['output'];
  quantityBought: Scalars['BigInt']['output'];
  totalPricePaid: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type AcceptedOffer_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  offeror?: InputMaybe<Scalars['Bytes']['input']>;
  offeror_not?: InputMaybe<Scalars['Bytes']['input']>;
  offeror_gt?: InputMaybe<Scalars['Bytes']['input']>;
  offeror_lt?: InputMaybe<Scalars['Bytes']['input']>;
  offeror_gte?: InputMaybe<Scalars['Bytes']['input']>;
  offeror_lte?: InputMaybe<Scalars['Bytes']['input']>;
  offeror_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  offeror_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  offeror_contains?: InputMaybe<Scalars['Bytes']['input']>;
  offeror_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  offerId?: InputMaybe<Scalars['BigInt']['input']>;
  offerId_not?: InputMaybe<Scalars['BigInt']['input']>;
  offerId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  offerId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  offerId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  offerId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  offerId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  offerId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  assetContract?: InputMaybe<Scalars['Bytes']['input']>;
  assetContract_not?: InputMaybe<Scalars['Bytes']['input']>;
  assetContract_gt?: InputMaybe<Scalars['Bytes']['input']>;
  assetContract_lt?: InputMaybe<Scalars['Bytes']['input']>;
  assetContract_gte?: InputMaybe<Scalars['Bytes']['input']>;
  assetContract_lte?: InputMaybe<Scalars['Bytes']['input']>;
  assetContract_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  assetContract_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  assetContract_contains?: InputMaybe<Scalars['Bytes']['input']>;
  assetContract_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  tokenId?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  seller?: InputMaybe<Scalars['Bytes']['input']>;
  seller_not?: InputMaybe<Scalars['Bytes']['input']>;
  seller_gt?: InputMaybe<Scalars['Bytes']['input']>;
  seller_lt?: InputMaybe<Scalars['Bytes']['input']>;
  seller_gte?: InputMaybe<Scalars['Bytes']['input']>;
  seller_lte?: InputMaybe<Scalars['Bytes']['input']>;
  seller_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  seller_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  seller_contains?: InputMaybe<Scalars['Bytes']['input']>;
  seller_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  quantityBought?: InputMaybe<Scalars['BigInt']['input']>;
  quantityBought_not?: InputMaybe<Scalars['BigInt']['input']>;
  quantityBought_gt?: InputMaybe<Scalars['BigInt']['input']>;
  quantityBought_lt?: InputMaybe<Scalars['BigInt']['input']>;
  quantityBought_gte?: InputMaybe<Scalars['BigInt']['input']>;
  quantityBought_lte?: InputMaybe<Scalars['BigInt']['input']>;
  quantityBought_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  quantityBought_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalPricePaid?: InputMaybe<Scalars['BigInt']['input']>;
  totalPricePaid_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalPricePaid_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalPricePaid_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalPricePaid_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalPricePaid_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalPricePaid_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalPricePaid_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<AcceptedOffer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<AcceptedOffer_filter>>>;
};

export type AcceptedOffer_orderBy =
  | 'id'
  | 'offeror'
  | 'offerId'
  | 'assetContract'
  | 'tokenId'
  | 'seller'
  | 'quantityBought'
  | 'totalPricePaid'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type Aggregation_interval =
  | 'hour'
  | 'day';

export type AuctionClosed = {
  id: Scalars['Bytes']['output'];
  auctionId: Scalars['BigInt']['output'];
  assetContract: Scalars['Bytes']['output'];
  closer: Scalars['Bytes']['output'];
  tokenId: Scalars['BigInt']['output'];
  auctionCreator: Scalars['Bytes']['output'];
  winningBidder: Scalars['Bytes']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type AuctionClosed_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  auctionId?: InputMaybe<Scalars['BigInt']['input']>;
  auctionId_not?: InputMaybe<Scalars['BigInt']['input']>;
  auctionId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  auctionId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  auctionId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  auctionId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  auctionId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  auctionId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  assetContract?: InputMaybe<Scalars['Bytes']['input']>;
  assetContract_not?: InputMaybe<Scalars['Bytes']['input']>;
  assetContract_gt?: InputMaybe<Scalars['Bytes']['input']>;
  assetContract_lt?: InputMaybe<Scalars['Bytes']['input']>;
  assetContract_gte?: InputMaybe<Scalars['Bytes']['input']>;
  assetContract_lte?: InputMaybe<Scalars['Bytes']['input']>;
  assetContract_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  assetContract_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  assetContract_contains?: InputMaybe<Scalars['Bytes']['input']>;
  assetContract_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  closer?: InputMaybe<Scalars['Bytes']['input']>;
  closer_not?: InputMaybe<Scalars['Bytes']['input']>;
  closer_gt?: InputMaybe<Scalars['Bytes']['input']>;
  closer_lt?: InputMaybe<Scalars['Bytes']['input']>;
  closer_gte?: InputMaybe<Scalars['Bytes']['input']>;
  closer_lte?: InputMaybe<Scalars['Bytes']['input']>;
  closer_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  closer_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  closer_contains?: InputMaybe<Scalars['Bytes']['input']>;
  closer_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  tokenId?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  auctionCreator?: InputMaybe<Scalars['Bytes']['input']>;
  auctionCreator_not?: InputMaybe<Scalars['Bytes']['input']>;
  auctionCreator_gt?: InputMaybe<Scalars['Bytes']['input']>;
  auctionCreator_lt?: InputMaybe<Scalars['Bytes']['input']>;
  auctionCreator_gte?: InputMaybe<Scalars['Bytes']['input']>;
  auctionCreator_lte?: InputMaybe<Scalars['Bytes']['input']>;
  auctionCreator_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  auctionCreator_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  auctionCreator_contains?: InputMaybe<Scalars['Bytes']['input']>;
  auctionCreator_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  winningBidder?: InputMaybe<Scalars['Bytes']['input']>;
  winningBidder_not?: InputMaybe<Scalars['Bytes']['input']>;
  winningBidder_gt?: InputMaybe<Scalars['Bytes']['input']>;
  winningBidder_lt?: InputMaybe<Scalars['Bytes']['input']>;
  winningBidder_gte?: InputMaybe<Scalars['Bytes']['input']>;
  winningBidder_lte?: InputMaybe<Scalars['Bytes']['input']>;
  winningBidder_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  winningBidder_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  winningBidder_contains?: InputMaybe<Scalars['Bytes']['input']>;
  winningBidder_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<AuctionClosed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<AuctionClosed_filter>>>;
};

export type AuctionClosed_orderBy =
  | 'id'
  | 'auctionId'
  | 'assetContract'
  | 'closer'
  | 'tokenId'
  | 'auctionCreator'
  | 'winningBidder'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
};

export type BuyerApprovedForListing = {
  id: Scalars['Bytes']['output'];
  listingId: Scalars['BigInt']['output'];
  buyer: Scalars['Bytes']['output'];
  approved: Scalars['Boolean']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type BuyerApprovedForListing_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  listingId?: InputMaybe<Scalars['BigInt']['input']>;
  listingId_not?: InputMaybe<Scalars['BigInt']['input']>;
  listingId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  listingId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  listingId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  listingId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  listingId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  listingId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  buyer?: InputMaybe<Scalars['Bytes']['input']>;
  buyer_not?: InputMaybe<Scalars['Bytes']['input']>;
  buyer_gt?: InputMaybe<Scalars['Bytes']['input']>;
  buyer_lt?: InputMaybe<Scalars['Bytes']['input']>;
  buyer_gte?: InputMaybe<Scalars['Bytes']['input']>;
  buyer_lte?: InputMaybe<Scalars['Bytes']['input']>;
  buyer_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  buyer_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  buyer_contains?: InputMaybe<Scalars['Bytes']['input']>;
  buyer_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  approved?: InputMaybe<Scalars['Boolean']['input']>;
  approved_not?: InputMaybe<Scalars['Boolean']['input']>;
  approved_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  approved_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<BuyerApprovedForListing_filter>>>;
  or?: InputMaybe<Array<InputMaybe<BuyerApprovedForListing_filter>>>;
};

export type BuyerApprovedForListing_orderBy =
  | 'id'
  | 'listingId'
  | 'buyer'
  | 'approved'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type CancelledAuction = {
  id: Scalars['Bytes']['output'];
  auctionCreator: Scalars['Bytes']['output'];
  auctionId: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type CancelledAuction_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  auctionCreator?: InputMaybe<Scalars['Bytes']['input']>;
  auctionCreator_not?: InputMaybe<Scalars['Bytes']['input']>;
  auctionCreator_gt?: InputMaybe<Scalars['Bytes']['input']>;
  auctionCreator_lt?: InputMaybe<Scalars['Bytes']['input']>;
  auctionCreator_gte?: InputMaybe<Scalars['Bytes']['input']>;
  auctionCreator_lte?: InputMaybe<Scalars['Bytes']['input']>;
  auctionCreator_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  auctionCreator_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  auctionCreator_contains?: InputMaybe<Scalars['Bytes']['input']>;
  auctionCreator_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  auctionId?: InputMaybe<Scalars['BigInt']['input']>;
  auctionId_not?: InputMaybe<Scalars['BigInt']['input']>;
  auctionId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  auctionId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  auctionId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  auctionId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  auctionId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  auctionId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<CancelledAuction_filter>>>;
  or?: InputMaybe<Array<InputMaybe<CancelledAuction_filter>>>;
};

export type CancelledAuction_orderBy =
  | 'id'
  | 'auctionCreator'
  | 'auctionId'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type CancelledListing = {
  id: Scalars['Bytes']['output'];
  listingCreator: Scalars['Bytes']['output'];
  listingId: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type CancelledListing_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  listingCreator?: InputMaybe<Scalars['Bytes']['input']>;
  listingCreator_not?: InputMaybe<Scalars['Bytes']['input']>;
  listingCreator_gt?: InputMaybe<Scalars['Bytes']['input']>;
  listingCreator_lt?: InputMaybe<Scalars['Bytes']['input']>;
  listingCreator_gte?: InputMaybe<Scalars['Bytes']['input']>;
  listingCreator_lte?: InputMaybe<Scalars['Bytes']['input']>;
  listingCreator_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  listingCreator_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  listingCreator_contains?: InputMaybe<Scalars['Bytes']['input']>;
  listingCreator_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  listingId?: InputMaybe<Scalars['BigInt']['input']>;
  listingId_not?: InputMaybe<Scalars['BigInt']['input']>;
  listingId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  listingId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  listingId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  listingId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  listingId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  listingId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<CancelledListing_filter>>>;
  or?: InputMaybe<Array<InputMaybe<CancelledListing_filter>>>;
};

export type CancelledListing_orderBy =
  | 'id'
  | 'listingCreator'
  | 'listingId'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type CancelledOffer = {
  id: Scalars['Bytes']['output'];
  offeror: Scalars['Bytes']['output'];
  offerId: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type CancelledOffer_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  offeror?: InputMaybe<Scalars['Bytes']['input']>;
  offeror_not?: InputMaybe<Scalars['Bytes']['input']>;
  offeror_gt?: InputMaybe<Scalars['Bytes']['input']>;
  offeror_lt?: InputMaybe<Scalars['Bytes']['input']>;
  offeror_gte?: InputMaybe<Scalars['Bytes']['input']>;
  offeror_lte?: InputMaybe<Scalars['Bytes']['input']>;
  offeror_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  offeror_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  offeror_contains?: InputMaybe<Scalars['Bytes']['input']>;
  offeror_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  offerId?: InputMaybe<Scalars['BigInt']['input']>;
  offerId_not?: InputMaybe<Scalars['BigInt']['input']>;
  offerId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  offerId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  offerId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  offerId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  offerId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  offerId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<CancelledOffer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<CancelledOffer_filter>>>;
};

export type CancelledOffer_orderBy =
  | 'id'
  | 'offeror'
  | 'offerId'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type ContractURIUpdated = {
  id: Scalars['Bytes']['output'];
  prevURI: Scalars['String']['output'];
  newURI: Scalars['String']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type ContractURIUpdated_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  prevURI?: InputMaybe<Scalars['String']['input']>;
  prevURI_not?: InputMaybe<Scalars['String']['input']>;
  prevURI_gt?: InputMaybe<Scalars['String']['input']>;
  prevURI_lt?: InputMaybe<Scalars['String']['input']>;
  prevURI_gte?: InputMaybe<Scalars['String']['input']>;
  prevURI_lte?: InputMaybe<Scalars['String']['input']>;
  prevURI_in?: InputMaybe<Array<Scalars['String']['input']>>;
  prevURI_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  prevURI_contains?: InputMaybe<Scalars['String']['input']>;
  prevURI_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  prevURI_not_contains?: InputMaybe<Scalars['String']['input']>;
  prevURI_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  prevURI_starts_with?: InputMaybe<Scalars['String']['input']>;
  prevURI_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  prevURI_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  prevURI_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  prevURI_ends_with?: InputMaybe<Scalars['String']['input']>;
  prevURI_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  prevURI_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  prevURI_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  newURI?: InputMaybe<Scalars['String']['input']>;
  newURI_not?: InputMaybe<Scalars['String']['input']>;
  newURI_gt?: InputMaybe<Scalars['String']['input']>;
  newURI_lt?: InputMaybe<Scalars['String']['input']>;
  newURI_gte?: InputMaybe<Scalars['String']['input']>;
  newURI_lte?: InputMaybe<Scalars['String']['input']>;
  newURI_in?: InputMaybe<Array<Scalars['String']['input']>>;
  newURI_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  newURI_contains?: InputMaybe<Scalars['String']['input']>;
  newURI_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  newURI_not_contains?: InputMaybe<Scalars['String']['input']>;
  newURI_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  newURI_starts_with?: InputMaybe<Scalars['String']['input']>;
  newURI_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  newURI_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  newURI_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  newURI_ends_with?: InputMaybe<Scalars['String']['input']>;
  newURI_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  newURI_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  newURI_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ContractURIUpdated_filter>>>;
  or?: InputMaybe<Array<InputMaybe<ContractURIUpdated_filter>>>;
};

export type ContractURIUpdated_orderBy =
  | 'id'
  | 'prevURI'
  | 'newURI'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type CurrencyApprovedForListing = {
  id: Scalars['Bytes']['output'];
  listingId: Scalars['BigInt']['output'];
  currency: Scalars['Bytes']['output'];
  pricePerToken: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type CurrencyApprovedForListing_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  listingId?: InputMaybe<Scalars['BigInt']['input']>;
  listingId_not?: InputMaybe<Scalars['BigInt']['input']>;
  listingId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  listingId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  listingId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  listingId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  listingId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  listingId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  currency?: InputMaybe<Scalars['Bytes']['input']>;
  currency_not?: InputMaybe<Scalars['Bytes']['input']>;
  currency_gt?: InputMaybe<Scalars['Bytes']['input']>;
  currency_lt?: InputMaybe<Scalars['Bytes']['input']>;
  currency_gte?: InputMaybe<Scalars['Bytes']['input']>;
  currency_lte?: InputMaybe<Scalars['Bytes']['input']>;
  currency_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  currency_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  currency_contains?: InputMaybe<Scalars['Bytes']['input']>;
  currency_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  pricePerToken?: InputMaybe<Scalars['BigInt']['input']>;
  pricePerToken_not?: InputMaybe<Scalars['BigInt']['input']>;
  pricePerToken_gt?: InputMaybe<Scalars['BigInt']['input']>;
  pricePerToken_lt?: InputMaybe<Scalars['BigInt']['input']>;
  pricePerToken_gte?: InputMaybe<Scalars['BigInt']['input']>;
  pricePerToken_lte?: InputMaybe<Scalars['BigInt']['input']>;
  pricePerToken_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  pricePerToken_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<CurrencyApprovedForListing_filter>>>;
  or?: InputMaybe<Array<InputMaybe<CurrencyApprovedForListing_filter>>>;
};

export type CurrencyApprovedForListing_orderBy =
  | 'id'
  | 'listingId'
  | 'currency'
  | 'pricePerToken'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type ExtensionAdded = {
  id: Scalars['Bytes']['output'];
  name: Scalars['String']['output'];
  implementation: Scalars['Bytes']['output'];
  extension_metadata_name: Scalars['String']['output'];
  extension_metadata_metadataURI: Scalars['String']['output'];
  extension_metadata_implementation: Scalars['Bytes']['output'];
  extension_functions: Array<Scalars['Bytes']['output']>;
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type ExtensionAdded_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  implementation?: InputMaybe<Scalars['Bytes']['input']>;
  implementation_not?: InputMaybe<Scalars['Bytes']['input']>;
  implementation_gt?: InputMaybe<Scalars['Bytes']['input']>;
  implementation_lt?: InputMaybe<Scalars['Bytes']['input']>;
  implementation_gte?: InputMaybe<Scalars['Bytes']['input']>;
  implementation_lte?: InputMaybe<Scalars['Bytes']['input']>;
  implementation_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  implementation_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  implementation_contains?: InputMaybe<Scalars['Bytes']['input']>;
  implementation_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  extension_metadata_name?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_name_not?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_name_gt?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_name_lt?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_name_gte?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_name_lte?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  extension_metadata_name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  extension_metadata_name_contains?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_name_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_name_not_contains?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_name_starts_with?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_name_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_name_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_name_ends_with?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_name_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_name_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_metadataURI?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_metadataURI_not?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_metadataURI_gt?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_metadataURI_lt?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_metadataURI_gte?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_metadataURI_lte?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_metadataURI_in?: InputMaybe<Array<Scalars['String']['input']>>;
  extension_metadata_metadataURI_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  extension_metadata_metadataURI_contains?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_metadataURI_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_metadataURI_not_contains?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_metadataURI_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_metadataURI_starts_with?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_metadataURI_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_metadataURI_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_metadataURI_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_metadataURI_ends_with?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_metadataURI_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_metadataURI_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_metadataURI_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_implementation?: InputMaybe<Scalars['Bytes']['input']>;
  extension_metadata_implementation_not?: InputMaybe<Scalars['Bytes']['input']>;
  extension_metadata_implementation_gt?: InputMaybe<Scalars['Bytes']['input']>;
  extension_metadata_implementation_lt?: InputMaybe<Scalars['Bytes']['input']>;
  extension_metadata_implementation_gte?: InputMaybe<Scalars['Bytes']['input']>;
  extension_metadata_implementation_lte?: InputMaybe<Scalars['Bytes']['input']>;
  extension_metadata_implementation_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  extension_metadata_implementation_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  extension_metadata_implementation_contains?: InputMaybe<Scalars['Bytes']['input']>;
  extension_metadata_implementation_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  extension_functions?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  extension_functions_not?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  extension_functions_contains?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  extension_functions_contains_nocase?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  extension_functions_not_contains?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  extension_functions_not_contains_nocase?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ExtensionAdded_filter>>>;
  or?: InputMaybe<Array<InputMaybe<ExtensionAdded_filter>>>;
};

export type ExtensionAdded_orderBy =
  | 'id'
  | 'name'
  | 'implementation'
  | 'extension_metadata_name'
  | 'extension_metadata_metadataURI'
  | 'extension_metadata_implementation'
  | 'extension_functions'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type ExtensionRemoved = {
  id: Scalars['Bytes']['output'];
  name: Scalars['String']['output'];
  extension_metadata_name: Scalars['String']['output'];
  extension_metadata_metadataURI: Scalars['String']['output'];
  extension_metadata_implementation: Scalars['Bytes']['output'];
  extension_functions: Array<Scalars['Bytes']['output']>;
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type ExtensionRemoved_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_name?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_name_not?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_name_gt?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_name_lt?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_name_gte?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_name_lte?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  extension_metadata_name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  extension_metadata_name_contains?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_name_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_name_not_contains?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_name_starts_with?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_name_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_name_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_name_ends_with?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_name_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_name_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_metadataURI?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_metadataURI_not?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_metadataURI_gt?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_metadataURI_lt?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_metadataURI_gte?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_metadataURI_lte?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_metadataURI_in?: InputMaybe<Array<Scalars['String']['input']>>;
  extension_metadata_metadataURI_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  extension_metadata_metadataURI_contains?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_metadataURI_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_metadataURI_not_contains?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_metadataURI_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_metadataURI_starts_with?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_metadataURI_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_metadataURI_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_metadataURI_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_metadataURI_ends_with?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_metadataURI_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_metadataURI_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_metadataURI_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_implementation?: InputMaybe<Scalars['Bytes']['input']>;
  extension_metadata_implementation_not?: InputMaybe<Scalars['Bytes']['input']>;
  extension_metadata_implementation_gt?: InputMaybe<Scalars['Bytes']['input']>;
  extension_metadata_implementation_lt?: InputMaybe<Scalars['Bytes']['input']>;
  extension_metadata_implementation_gte?: InputMaybe<Scalars['Bytes']['input']>;
  extension_metadata_implementation_lte?: InputMaybe<Scalars['Bytes']['input']>;
  extension_metadata_implementation_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  extension_metadata_implementation_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  extension_metadata_implementation_contains?: InputMaybe<Scalars['Bytes']['input']>;
  extension_metadata_implementation_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  extension_functions?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  extension_functions_not?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  extension_functions_contains?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  extension_functions_contains_nocase?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  extension_functions_not_contains?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  extension_functions_not_contains_nocase?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ExtensionRemoved_filter>>>;
  or?: InputMaybe<Array<InputMaybe<ExtensionRemoved_filter>>>;
};

export type ExtensionRemoved_orderBy =
  | 'id'
  | 'name'
  | 'extension_metadata_name'
  | 'extension_metadata_metadataURI'
  | 'extension_metadata_implementation'
  | 'extension_functions'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type ExtensionReplaced = {
  id: Scalars['Bytes']['output'];
  name: Scalars['String']['output'];
  implementation: Scalars['Bytes']['output'];
  extension_metadata_name: Scalars['String']['output'];
  extension_metadata_metadataURI: Scalars['String']['output'];
  extension_metadata_implementation: Scalars['Bytes']['output'];
  extension_functions: Array<Scalars['Bytes']['output']>;
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type ExtensionReplaced_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  implementation?: InputMaybe<Scalars['Bytes']['input']>;
  implementation_not?: InputMaybe<Scalars['Bytes']['input']>;
  implementation_gt?: InputMaybe<Scalars['Bytes']['input']>;
  implementation_lt?: InputMaybe<Scalars['Bytes']['input']>;
  implementation_gte?: InputMaybe<Scalars['Bytes']['input']>;
  implementation_lte?: InputMaybe<Scalars['Bytes']['input']>;
  implementation_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  implementation_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  implementation_contains?: InputMaybe<Scalars['Bytes']['input']>;
  implementation_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  extension_metadata_name?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_name_not?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_name_gt?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_name_lt?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_name_gte?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_name_lte?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  extension_metadata_name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  extension_metadata_name_contains?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_name_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_name_not_contains?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_name_starts_with?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_name_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_name_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_name_ends_with?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_name_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_name_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_metadataURI?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_metadataURI_not?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_metadataURI_gt?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_metadataURI_lt?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_metadataURI_gte?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_metadataURI_lte?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_metadataURI_in?: InputMaybe<Array<Scalars['String']['input']>>;
  extension_metadata_metadataURI_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  extension_metadata_metadataURI_contains?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_metadataURI_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_metadataURI_not_contains?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_metadataURI_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_metadataURI_starts_with?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_metadataURI_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_metadataURI_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_metadataURI_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_metadataURI_ends_with?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_metadataURI_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_metadataURI_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_metadataURI_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  extension_metadata_implementation?: InputMaybe<Scalars['Bytes']['input']>;
  extension_metadata_implementation_not?: InputMaybe<Scalars['Bytes']['input']>;
  extension_metadata_implementation_gt?: InputMaybe<Scalars['Bytes']['input']>;
  extension_metadata_implementation_lt?: InputMaybe<Scalars['Bytes']['input']>;
  extension_metadata_implementation_gte?: InputMaybe<Scalars['Bytes']['input']>;
  extension_metadata_implementation_lte?: InputMaybe<Scalars['Bytes']['input']>;
  extension_metadata_implementation_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  extension_metadata_implementation_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  extension_metadata_implementation_contains?: InputMaybe<Scalars['Bytes']['input']>;
  extension_metadata_implementation_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  extension_functions?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  extension_functions_not?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  extension_functions_contains?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  extension_functions_contains_nocase?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  extension_functions_not_contains?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  extension_functions_not_contains_nocase?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ExtensionReplaced_filter>>>;
  or?: InputMaybe<Array<InputMaybe<ExtensionReplaced_filter>>>;
};

export type ExtensionReplaced_orderBy =
  | 'id'
  | 'name'
  | 'implementation'
  | 'extension_metadata_name'
  | 'extension_metadata_metadataURI'
  | 'extension_metadata_implementation'
  | 'extension_functions'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type FlatPlatformFeeUpdated = {
  id: Scalars['Bytes']['output'];
  platformFeeRecipient: Scalars['Bytes']['output'];
  flatFee: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type FlatPlatformFeeUpdated_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  platformFeeRecipient?: InputMaybe<Scalars['Bytes']['input']>;
  platformFeeRecipient_not?: InputMaybe<Scalars['Bytes']['input']>;
  platformFeeRecipient_gt?: InputMaybe<Scalars['Bytes']['input']>;
  platformFeeRecipient_lt?: InputMaybe<Scalars['Bytes']['input']>;
  platformFeeRecipient_gte?: InputMaybe<Scalars['Bytes']['input']>;
  platformFeeRecipient_lte?: InputMaybe<Scalars['Bytes']['input']>;
  platformFeeRecipient_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  platformFeeRecipient_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  platformFeeRecipient_contains?: InputMaybe<Scalars['Bytes']['input']>;
  platformFeeRecipient_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  flatFee?: InputMaybe<Scalars['BigInt']['input']>;
  flatFee_not?: InputMaybe<Scalars['BigInt']['input']>;
  flatFee_gt?: InputMaybe<Scalars['BigInt']['input']>;
  flatFee_lt?: InputMaybe<Scalars['BigInt']['input']>;
  flatFee_gte?: InputMaybe<Scalars['BigInt']['input']>;
  flatFee_lte?: InputMaybe<Scalars['BigInt']['input']>;
  flatFee_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  flatFee_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<FlatPlatformFeeUpdated_filter>>>;
  or?: InputMaybe<Array<InputMaybe<FlatPlatformFeeUpdated_filter>>>;
};

export type FlatPlatformFeeUpdated_orderBy =
  | 'id'
  | 'platformFeeRecipient'
  | 'flatFee'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type FunctionDisabled = {
  id: Scalars['Bytes']['output'];
  name: Scalars['String']['output'];
  functionSelector: Scalars['Bytes']['output'];
  extMetadata_name: Scalars['String']['output'];
  extMetadata_metadataURI: Scalars['String']['output'];
  extMetadata_implementation: Scalars['Bytes']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type FunctionDisabled_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  functionSelector?: InputMaybe<Scalars['Bytes']['input']>;
  functionSelector_not?: InputMaybe<Scalars['Bytes']['input']>;
  functionSelector_gt?: InputMaybe<Scalars['Bytes']['input']>;
  functionSelector_lt?: InputMaybe<Scalars['Bytes']['input']>;
  functionSelector_gte?: InputMaybe<Scalars['Bytes']['input']>;
  functionSelector_lte?: InputMaybe<Scalars['Bytes']['input']>;
  functionSelector_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  functionSelector_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  functionSelector_contains?: InputMaybe<Scalars['Bytes']['input']>;
  functionSelector_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  extMetadata_name?: InputMaybe<Scalars['String']['input']>;
  extMetadata_name_not?: InputMaybe<Scalars['String']['input']>;
  extMetadata_name_gt?: InputMaybe<Scalars['String']['input']>;
  extMetadata_name_lt?: InputMaybe<Scalars['String']['input']>;
  extMetadata_name_gte?: InputMaybe<Scalars['String']['input']>;
  extMetadata_name_lte?: InputMaybe<Scalars['String']['input']>;
  extMetadata_name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  extMetadata_name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  extMetadata_name_contains?: InputMaybe<Scalars['String']['input']>;
  extMetadata_name_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  extMetadata_name_not_contains?: InputMaybe<Scalars['String']['input']>;
  extMetadata_name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  extMetadata_name_starts_with?: InputMaybe<Scalars['String']['input']>;
  extMetadata_name_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  extMetadata_name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  extMetadata_name_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  extMetadata_name_ends_with?: InputMaybe<Scalars['String']['input']>;
  extMetadata_name_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  extMetadata_name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  extMetadata_name_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  extMetadata_metadataURI?: InputMaybe<Scalars['String']['input']>;
  extMetadata_metadataURI_not?: InputMaybe<Scalars['String']['input']>;
  extMetadata_metadataURI_gt?: InputMaybe<Scalars['String']['input']>;
  extMetadata_metadataURI_lt?: InputMaybe<Scalars['String']['input']>;
  extMetadata_metadataURI_gte?: InputMaybe<Scalars['String']['input']>;
  extMetadata_metadataURI_lte?: InputMaybe<Scalars['String']['input']>;
  extMetadata_metadataURI_in?: InputMaybe<Array<Scalars['String']['input']>>;
  extMetadata_metadataURI_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  extMetadata_metadataURI_contains?: InputMaybe<Scalars['String']['input']>;
  extMetadata_metadataURI_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  extMetadata_metadataURI_not_contains?: InputMaybe<Scalars['String']['input']>;
  extMetadata_metadataURI_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  extMetadata_metadataURI_starts_with?: InputMaybe<Scalars['String']['input']>;
  extMetadata_metadataURI_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  extMetadata_metadataURI_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  extMetadata_metadataURI_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  extMetadata_metadataURI_ends_with?: InputMaybe<Scalars['String']['input']>;
  extMetadata_metadataURI_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  extMetadata_metadataURI_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  extMetadata_metadataURI_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  extMetadata_implementation?: InputMaybe<Scalars['Bytes']['input']>;
  extMetadata_implementation_not?: InputMaybe<Scalars['Bytes']['input']>;
  extMetadata_implementation_gt?: InputMaybe<Scalars['Bytes']['input']>;
  extMetadata_implementation_lt?: InputMaybe<Scalars['Bytes']['input']>;
  extMetadata_implementation_gte?: InputMaybe<Scalars['Bytes']['input']>;
  extMetadata_implementation_lte?: InputMaybe<Scalars['Bytes']['input']>;
  extMetadata_implementation_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  extMetadata_implementation_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  extMetadata_implementation_contains?: InputMaybe<Scalars['Bytes']['input']>;
  extMetadata_implementation_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<FunctionDisabled_filter>>>;
  or?: InputMaybe<Array<InputMaybe<FunctionDisabled_filter>>>;
};

export type FunctionDisabled_orderBy =
  | 'id'
  | 'name'
  | 'functionSelector'
  | 'extMetadata_name'
  | 'extMetadata_metadataURI'
  | 'extMetadata_implementation'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type FunctionEnabled = {
  id: Scalars['Bytes']['output'];
  name: Scalars['String']['output'];
  functionSelector: Scalars['Bytes']['output'];
  extFunction_functionSelector: Scalars['Bytes']['output'];
  extFunction_functionSignature: Scalars['String']['output'];
  extMetadata_name: Scalars['String']['output'];
  extMetadata_metadataURI: Scalars['String']['output'];
  extMetadata_implementation: Scalars['Bytes']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type FunctionEnabled_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  functionSelector?: InputMaybe<Scalars['Bytes']['input']>;
  functionSelector_not?: InputMaybe<Scalars['Bytes']['input']>;
  functionSelector_gt?: InputMaybe<Scalars['Bytes']['input']>;
  functionSelector_lt?: InputMaybe<Scalars['Bytes']['input']>;
  functionSelector_gte?: InputMaybe<Scalars['Bytes']['input']>;
  functionSelector_lte?: InputMaybe<Scalars['Bytes']['input']>;
  functionSelector_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  functionSelector_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  functionSelector_contains?: InputMaybe<Scalars['Bytes']['input']>;
  functionSelector_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  extFunction_functionSelector?: InputMaybe<Scalars['Bytes']['input']>;
  extFunction_functionSelector_not?: InputMaybe<Scalars['Bytes']['input']>;
  extFunction_functionSelector_gt?: InputMaybe<Scalars['Bytes']['input']>;
  extFunction_functionSelector_lt?: InputMaybe<Scalars['Bytes']['input']>;
  extFunction_functionSelector_gte?: InputMaybe<Scalars['Bytes']['input']>;
  extFunction_functionSelector_lte?: InputMaybe<Scalars['Bytes']['input']>;
  extFunction_functionSelector_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  extFunction_functionSelector_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  extFunction_functionSelector_contains?: InputMaybe<Scalars['Bytes']['input']>;
  extFunction_functionSelector_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  extFunction_functionSignature?: InputMaybe<Scalars['String']['input']>;
  extFunction_functionSignature_not?: InputMaybe<Scalars['String']['input']>;
  extFunction_functionSignature_gt?: InputMaybe<Scalars['String']['input']>;
  extFunction_functionSignature_lt?: InputMaybe<Scalars['String']['input']>;
  extFunction_functionSignature_gte?: InputMaybe<Scalars['String']['input']>;
  extFunction_functionSignature_lte?: InputMaybe<Scalars['String']['input']>;
  extFunction_functionSignature_in?: InputMaybe<Array<Scalars['String']['input']>>;
  extFunction_functionSignature_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  extFunction_functionSignature_contains?: InputMaybe<Scalars['String']['input']>;
  extFunction_functionSignature_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  extFunction_functionSignature_not_contains?: InputMaybe<Scalars['String']['input']>;
  extFunction_functionSignature_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  extFunction_functionSignature_starts_with?: InputMaybe<Scalars['String']['input']>;
  extFunction_functionSignature_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  extFunction_functionSignature_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  extFunction_functionSignature_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  extFunction_functionSignature_ends_with?: InputMaybe<Scalars['String']['input']>;
  extFunction_functionSignature_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  extFunction_functionSignature_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  extFunction_functionSignature_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  extMetadata_name?: InputMaybe<Scalars['String']['input']>;
  extMetadata_name_not?: InputMaybe<Scalars['String']['input']>;
  extMetadata_name_gt?: InputMaybe<Scalars['String']['input']>;
  extMetadata_name_lt?: InputMaybe<Scalars['String']['input']>;
  extMetadata_name_gte?: InputMaybe<Scalars['String']['input']>;
  extMetadata_name_lte?: InputMaybe<Scalars['String']['input']>;
  extMetadata_name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  extMetadata_name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  extMetadata_name_contains?: InputMaybe<Scalars['String']['input']>;
  extMetadata_name_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  extMetadata_name_not_contains?: InputMaybe<Scalars['String']['input']>;
  extMetadata_name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  extMetadata_name_starts_with?: InputMaybe<Scalars['String']['input']>;
  extMetadata_name_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  extMetadata_name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  extMetadata_name_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  extMetadata_name_ends_with?: InputMaybe<Scalars['String']['input']>;
  extMetadata_name_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  extMetadata_name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  extMetadata_name_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  extMetadata_metadataURI?: InputMaybe<Scalars['String']['input']>;
  extMetadata_metadataURI_not?: InputMaybe<Scalars['String']['input']>;
  extMetadata_metadataURI_gt?: InputMaybe<Scalars['String']['input']>;
  extMetadata_metadataURI_lt?: InputMaybe<Scalars['String']['input']>;
  extMetadata_metadataURI_gte?: InputMaybe<Scalars['String']['input']>;
  extMetadata_metadataURI_lte?: InputMaybe<Scalars['String']['input']>;
  extMetadata_metadataURI_in?: InputMaybe<Array<Scalars['String']['input']>>;
  extMetadata_metadataURI_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  extMetadata_metadataURI_contains?: InputMaybe<Scalars['String']['input']>;
  extMetadata_metadataURI_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  extMetadata_metadataURI_not_contains?: InputMaybe<Scalars['String']['input']>;
  extMetadata_metadataURI_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  extMetadata_metadataURI_starts_with?: InputMaybe<Scalars['String']['input']>;
  extMetadata_metadataURI_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  extMetadata_metadataURI_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  extMetadata_metadataURI_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  extMetadata_metadataURI_ends_with?: InputMaybe<Scalars['String']['input']>;
  extMetadata_metadataURI_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  extMetadata_metadataURI_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  extMetadata_metadataURI_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  extMetadata_implementation?: InputMaybe<Scalars['Bytes']['input']>;
  extMetadata_implementation_not?: InputMaybe<Scalars['Bytes']['input']>;
  extMetadata_implementation_gt?: InputMaybe<Scalars['Bytes']['input']>;
  extMetadata_implementation_lt?: InputMaybe<Scalars['Bytes']['input']>;
  extMetadata_implementation_gte?: InputMaybe<Scalars['Bytes']['input']>;
  extMetadata_implementation_lte?: InputMaybe<Scalars['Bytes']['input']>;
  extMetadata_implementation_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  extMetadata_implementation_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  extMetadata_implementation_contains?: InputMaybe<Scalars['Bytes']['input']>;
  extMetadata_implementation_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<FunctionEnabled_filter>>>;
  or?: InputMaybe<Array<InputMaybe<FunctionEnabled_filter>>>;
};

export type FunctionEnabled_orderBy =
  | 'id'
  | 'name'
  | 'functionSelector'
  | 'extFunction_functionSelector'
  | 'extFunction_functionSignature'
  | 'extMetadata_name'
  | 'extMetadata_metadataURI'
  | 'extMetadata_implementation'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type Initialized = {
  id: Scalars['Bytes']['output'];
  version: Scalars['Int']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type Initialized_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  version?: InputMaybe<Scalars['Int']['input']>;
  version_not?: InputMaybe<Scalars['Int']['input']>;
  version_gt?: InputMaybe<Scalars['Int']['input']>;
  version_lt?: InputMaybe<Scalars['Int']['input']>;
  version_gte?: InputMaybe<Scalars['Int']['input']>;
  version_lte?: InputMaybe<Scalars['Int']['input']>;
  version_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  version_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Initialized_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Initialized_filter>>>;
};

export type Initialized_orderBy =
  | 'id'
  | 'version'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type NewAuction = {
  id: Scalars['Bytes']['output'];
  auctionCreator: Scalars['Bytes']['output'];
  auctionId: Scalars['BigInt']['output'];
  assetContract: Scalars['Bytes']['output'];
  auction_auctionId: Scalars['BigInt']['output'];
  auction_tokenId: Scalars['BigInt']['output'];
  auction_quantity: Scalars['BigInt']['output'];
  auction_minimumBidAmount: Scalars['BigInt']['output'];
  auction_buyoutBidAmount: Scalars['BigInt']['output'];
  auction_timeBufferInSeconds: Scalars['BigInt']['output'];
  auction_bidBufferBps: Scalars['BigInt']['output'];
  auction_startTimestamp: Scalars['BigInt']['output'];
  auction_endTimestamp: Scalars['BigInt']['output'];
  auction_auctionCreator: Scalars['Bytes']['output'];
  auction_assetContract: Scalars['Bytes']['output'];
  auction_currency: Scalars['Bytes']['output'];
  auction_tokenType: Scalars['Int']['output'];
  auction_status: Scalars['Int']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type NewAuction_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  auctionCreator?: InputMaybe<Scalars['Bytes']['input']>;
  auctionCreator_not?: InputMaybe<Scalars['Bytes']['input']>;
  auctionCreator_gt?: InputMaybe<Scalars['Bytes']['input']>;
  auctionCreator_lt?: InputMaybe<Scalars['Bytes']['input']>;
  auctionCreator_gte?: InputMaybe<Scalars['Bytes']['input']>;
  auctionCreator_lte?: InputMaybe<Scalars['Bytes']['input']>;
  auctionCreator_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  auctionCreator_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  auctionCreator_contains?: InputMaybe<Scalars['Bytes']['input']>;
  auctionCreator_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  auctionId?: InputMaybe<Scalars['BigInt']['input']>;
  auctionId_not?: InputMaybe<Scalars['BigInt']['input']>;
  auctionId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  auctionId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  auctionId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  auctionId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  auctionId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  auctionId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  assetContract?: InputMaybe<Scalars['Bytes']['input']>;
  assetContract_not?: InputMaybe<Scalars['Bytes']['input']>;
  assetContract_gt?: InputMaybe<Scalars['Bytes']['input']>;
  assetContract_lt?: InputMaybe<Scalars['Bytes']['input']>;
  assetContract_gte?: InputMaybe<Scalars['Bytes']['input']>;
  assetContract_lte?: InputMaybe<Scalars['Bytes']['input']>;
  assetContract_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  assetContract_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  assetContract_contains?: InputMaybe<Scalars['Bytes']['input']>;
  assetContract_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  auction_auctionId?: InputMaybe<Scalars['BigInt']['input']>;
  auction_auctionId_not?: InputMaybe<Scalars['BigInt']['input']>;
  auction_auctionId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  auction_auctionId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  auction_auctionId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  auction_auctionId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  auction_auctionId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  auction_auctionId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  auction_tokenId?: InputMaybe<Scalars['BigInt']['input']>;
  auction_tokenId_not?: InputMaybe<Scalars['BigInt']['input']>;
  auction_tokenId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  auction_tokenId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  auction_tokenId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  auction_tokenId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  auction_tokenId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  auction_tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  auction_quantity?: InputMaybe<Scalars['BigInt']['input']>;
  auction_quantity_not?: InputMaybe<Scalars['BigInt']['input']>;
  auction_quantity_gt?: InputMaybe<Scalars['BigInt']['input']>;
  auction_quantity_lt?: InputMaybe<Scalars['BigInt']['input']>;
  auction_quantity_gte?: InputMaybe<Scalars['BigInt']['input']>;
  auction_quantity_lte?: InputMaybe<Scalars['BigInt']['input']>;
  auction_quantity_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  auction_quantity_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  auction_minimumBidAmount?: InputMaybe<Scalars['BigInt']['input']>;
  auction_minimumBidAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  auction_minimumBidAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  auction_minimumBidAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  auction_minimumBidAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  auction_minimumBidAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  auction_minimumBidAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  auction_minimumBidAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  auction_buyoutBidAmount?: InputMaybe<Scalars['BigInt']['input']>;
  auction_buyoutBidAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  auction_buyoutBidAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  auction_buyoutBidAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  auction_buyoutBidAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  auction_buyoutBidAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  auction_buyoutBidAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  auction_buyoutBidAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  auction_timeBufferInSeconds?: InputMaybe<Scalars['BigInt']['input']>;
  auction_timeBufferInSeconds_not?: InputMaybe<Scalars['BigInt']['input']>;
  auction_timeBufferInSeconds_gt?: InputMaybe<Scalars['BigInt']['input']>;
  auction_timeBufferInSeconds_lt?: InputMaybe<Scalars['BigInt']['input']>;
  auction_timeBufferInSeconds_gte?: InputMaybe<Scalars['BigInt']['input']>;
  auction_timeBufferInSeconds_lte?: InputMaybe<Scalars['BigInt']['input']>;
  auction_timeBufferInSeconds_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  auction_timeBufferInSeconds_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  auction_bidBufferBps?: InputMaybe<Scalars['BigInt']['input']>;
  auction_bidBufferBps_not?: InputMaybe<Scalars['BigInt']['input']>;
  auction_bidBufferBps_gt?: InputMaybe<Scalars['BigInt']['input']>;
  auction_bidBufferBps_lt?: InputMaybe<Scalars['BigInt']['input']>;
  auction_bidBufferBps_gte?: InputMaybe<Scalars['BigInt']['input']>;
  auction_bidBufferBps_lte?: InputMaybe<Scalars['BigInt']['input']>;
  auction_bidBufferBps_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  auction_bidBufferBps_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  auction_startTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  auction_startTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  auction_startTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  auction_startTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  auction_startTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  auction_startTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  auction_startTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  auction_startTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  auction_endTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  auction_endTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  auction_endTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  auction_endTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  auction_endTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  auction_endTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  auction_endTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  auction_endTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  auction_auctionCreator?: InputMaybe<Scalars['Bytes']['input']>;
  auction_auctionCreator_not?: InputMaybe<Scalars['Bytes']['input']>;
  auction_auctionCreator_gt?: InputMaybe<Scalars['Bytes']['input']>;
  auction_auctionCreator_lt?: InputMaybe<Scalars['Bytes']['input']>;
  auction_auctionCreator_gte?: InputMaybe<Scalars['Bytes']['input']>;
  auction_auctionCreator_lte?: InputMaybe<Scalars['Bytes']['input']>;
  auction_auctionCreator_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  auction_auctionCreator_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  auction_auctionCreator_contains?: InputMaybe<Scalars['Bytes']['input']>;
  auction_auctionCreator_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  auction_assetContract?: InputMaybe<Scalars['Bytes']['input']>;
  auction_assetContract_not?: InputMaybe<Scalars['Bytes']['input']>;
  auction_assetContract_gt?: InputMaybe<Scalars['Bytes']['input']>;
  auction_assetContract_lt?: InputMaybe<Scalars['Bytes']['input']>;
  auction_assetContract_gte?: InputMaybe<Scalars['Bytes']['input']>;
  auction_assetContract_lte?: InputMaybe<Scalars['Bytes']['input']>;
  auction_assetContract_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  auction_assetContract_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  auction_assetContract_contains?: InputMaybe<Scalars['Bytes']['input']>;
  auction_assetContract_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  auction_currency?: InputMaybe<Scalars['Bytes']['input']>;
  auction_currency_not?: InputMaybe<Scalars['Bytes']['input']>;
  auction_currency_gt?: InputMaybe<Scalars['Bytes']['input']>;
  auction_currency_lt?: InputMaybe<Scalars['Bytes']['input']>;
  auction_currency_gte?: InputMaybe<Scalars['Bytes']['input']>;
  auction_currency_lte?: InputMaybe<Scalars['Bytes']['input']>;
  auction_currency_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  auction_currency_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  auction_currency_contains?: InputMaybe<Scalars['Bytes']['input']>;
  auction_currency_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  auction_tokenType?: InputMaybe<Scalars['Int']['input']>;
  auction_tokenType_not?: InputMaybe<Scalars['Int']['input']>;
  auction_tokenType_gt?: InputMaybe<Scalars['Int']['input']>;
  auction_tokenType_lt?: InputMaybe<Scalars['Int']['input']>;
  auction_tokenType_gte?: InputMaybe<Scalars['Int']['input']>;
  auction_tokenType_lte?: InputMaybe<Scalars['Int']['input']>;
  auction_tokenType_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  auction_tokenType_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  auction_status?: InputMaybe<Scalars['Int']['input']>;
  auction_status_not?: InputMaybe<Scalars['Int']['input']>;
  auction_status_gt?: InputMaybe<Scalars['Int']['input']>;
  auction_status_lt?: InputMaybe<Scalars['Int']['input']>;
  auction_status_gte?: InputMaybe<Scalars['Int']['input']>;
  auction_status_lte?: InputMaybe<Scalars['Int']['input']>;
  auction_status_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  auction_status_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<NewAuction_filter>>>;
  or?: InputMaybe<Array<InputMaybe<NewAuction_filter>>>;
};

export type NewAuction_orderBy =
  | 'id'
  | 'auctionCreator'
  | 'auctionId'
  | 'assetContract'
  | 'auction_auctionId'
  | 'auction_tokenId'
  | 'auction_quantity'
  | 'auction_minimumBidAmount'
  | 'auction_buyoutBidAmount'
  | 'auction_timeBufferInSeconds'
  | 'auction_bidBufferBps'
  | 'auction_startTimestamp'
  | 'auction_endTimestamp'
  | 'auction_auctionCreator'
  | 'auction_assetContract'
  | 'auction_currency'
  | 'auction_tokenType'
  | 'auction_status'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type NewBid = {
  id: Scalars['Bytes']['output'];
  auctionId: Scalars['BigInt']['output'];
  bidder: Scalars['Bytes']['output'];
  assetContract: Scalars['Bytes']['output'];
  bidAmount: Scalars['BigInt']['output'];
  auction_auctionId: Scalars['BigInt']['output'];
  auction_tokenId: Scalars['BigInt']['output'];
  auction_quantity: Scalars['BigInt']['output'];
  auction_minimumBidAmount: Scalars['BigInt']['output'];
  auction_buyoutBidAmount: Scalars['BigInt']['output'];
  auction_timeBufferInSeconds: Scalars['BigInt']['output'];
  auction_bidBufferBps: Scalars['BigInt']['output'];
  auction_startTimestamp: Scalars['BigInt']['output'];
  auction_endTimestamp: Scalars['BigInt']['output'];
  auction_auctionCreator: Scalars['Bytes']['output'];
  auction_assetContract: Scalars['Bytes']['output'];
  auction_currency: Scalars['Bytes']['output'];
  auction_tokenType: Scalars['Int']['output'];
  auction_status: Scalars['Int']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type NewBid_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  auctionId?: InputMaybe<Scalars['BigInt']['input']>;
  auctionId_not?: InputMaybe<Scalars['BigInt']['input']>;
  auctionId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  auctionId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  auctionId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  auctionId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  auctionId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  auctionId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  bidder?: InputMaybe<Scalars['Bytes']['input']>;
  bidder_not?: InputMaybe<Scalars['Bytes']['input']>;
  bidder_gt?: InputMaybe<Scalars['Bytes']['input']>;
  bidder_lt?: InputMaybe<Scalars['Bytes']['input']>;
  bidder_gte?: InputMaybe<Scalars['Bytes']['input']>;
  bidder_lte?: InputMaybe<Scalars['Bytes']['input']>;
  bidder_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  bidder_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  bidder_contains?: InputMaybe<Scalars['Bytes']['input']>;
  bidder_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  assetContract?: InputMaybe<Scalars['Bytes']['input']>;
  assetContract_not?: InputMaybe<Scalars['Bytes']['input']>;
  assetContract_gt?: InputMaybe<Scalars['Bytes']['input']>;
  assetContract_lt?: InputMaybe<Scalars['Bytes']['input']>;
  assetContract_gte?: InputMaybe<Scalars['Bytes']['input']>;
  assetContract_lte?: InputMaybe<Scalars['Bytes']['input']>;
  assetContract_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  assetContract_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  assetContract_contains?: InputMaybe<Scalars['Bytes']['input']>;
  assetContract_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  bidAmount?: InputMaybe<Scalars['BigInt']['input']>;
  bidAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  bidAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  bidAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  bidAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  bidAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  bidAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  bidAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  auction_auctionId?: InputMaybe<Scalars['BigInt']['input']>;
  auction_auctionId_not?: InputMaybe<Scalars['BigInt']['input']>;
  auction_auctionId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  auction_auctionId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  auction_auctionId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  auction_auctionId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  auction_auctionId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  auction_auctionId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  auction_tokenId?: InputMaybe<Scalars['BigInt']['input']>;
  auction_tokenId_not?: InputMaybe<Scalars['BigInt']['input']>;
  auction_tokenId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  auction_tokenId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  auction_tokenId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  auction_tokenId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  auction_tokenId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  auction_tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  auction_quantity?: InputMaybe<Scalars['BigInt']['input']>;
  auction_quantity_not?: InputMaybe<Scalars['BigInt']['input']>;
  auction_quantity_gt?: InputMaybe<Scalars['BigInt']['input']>;
  auction_quantity_lt?: InputMaybe<Scalars['BigInt']['input']>;
  auction_quantity_gte?: InputMaybe<Scalars['BigInt']['input']>;
  auction_quantity_lte?: InputMaybe<Scalars['BigInt']['input']>;
  auction_quantity_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  auction_quantity_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  auction_minimumBidAmount?: InputMaybe<Scalars['BigInt']['input']>;
  auction_minimumBidAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  auction_minimumBidAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  auction_minimumBidAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  auction_minimumBidAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  auction_minimumBidAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  auction_minimumBidAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  auction_minimumBidAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  auction_buyoutBidAmount?: InputMaybe<Scalars['BigInt']['input']>;
  auction_buyoutBidAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  auction_buyoutBidAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  auction_buyoutBidAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  auction_buyoutBidAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  auction_buyoutBidAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  auction_buyoutBidAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  auction_buyoutBidAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  auction_timeBufferInSeconds?: InputMaybe<Scalars['BigInt']['input']>;
  auction_timeBufferInSeconds_not?: InputMaybe<Scalars['BigInt']['input']>;
  auction_timeBufferInSeconds_gt?: InputMaybe<Scalars['BigInt']['input']>;
  auction_timeBufferInSeconds_lt?: InputMaybe<Scalars['BigInt']['input']>;
  auction_timeBufferInSeconds_gte?: InputMaybe<Scalars['BigInt']['input']>;
  auction_timeBufferInSeconds_lte?: InputMaybe<Scalars['BigInt']['input']>;
  auction_timeBufferInSeconds_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  auction_timeBufferInSeconds_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  auction_bidBufferBps?: InputMaybe<Scalars['BigInt']['input']>;
  auction_bidBufferBps_not?: InputMaybe<Scalars['BigInt']['input']>;
  auction_bidBufferBps_gt?: InputMaybe<Scalars['BigInt']['input']>;
  auction_bidBufferBps_lt?: InputMaybe<Scalars['BigInt']['input']>;
  auction_bidBufferBps_gte?: InputMaybe<Scalars['BigInt']['input']>;
  auction_bidBufferBps_lte?: InputMaybe<Scalars['BigInt']['input']>;
  auction_bidBufferBps_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  auction_bidBufferBps_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  auction_startTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  auction_startTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  auction_startTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  auction_startTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  auction_startTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  auction_startTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  auction_startTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  auction_startTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  auction_endTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  auction_endTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  auction_endTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  auction_endTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  auction_endTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  auction_endTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  auction_endTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  auction_endTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  auction_auctionCreator?: InputMaybe<Scalars['Bytes']['input']>;
  auction_auctionCreator_not?: InputMaybe<Scalars['Bytes']['input']>;
  auction_auctionCreator_gt?: InputMaybe<Scalars['Bytes']['input']>;
  auction_auctionCreator_lt?: InputMaybe<Scalars['Bytes']['input']>;
  auction_auctionCreator_gte?: InputMaybe<Scalars['Bytes']['input']>;
  auction_auctionCreator_lte?: InputMaybe<Scalars['Bytes']['input']>;
  auction_auctionCreator_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  auction_auctionCreator_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  auction_auctionCreator_contains?: InputMaybe<Scalars['Bytes']['input']>;
  auction_auctionCreator_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  auction_assetContract?: InputMaybe<Scalars['Bytes']['input']>;
  auction_assetContract_not?: InputMaybe<Scalars['Bytes']['input']>;
  auction_assetContract_gt?: InputMaybe<Scalars['Bytes']['input']>;
  auction_assetContract_lt?: InputMaybe<Scalars['Bytes']['input']>;
  auction_assetContract_gte?: InputMaybe<Scalars['Bytes']['input']>;
  auction_assetContract_lte?: InputMaybe<Scalars['Bytes']['input']>;
  auction_assetContract_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  auction_assetContract_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  auction_assetContract_contains?: InputMaybe<Scalars['Bytes']['input']>;
  auction_assetContract_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  auction_currency?: InputMaybe<Scalars['Bytes']['input']>;
  auction_currency_not?: InputMaybe<Scalars['Bytes']['input']>;
  auction_currency_gt?: InputMaybe<Scalars['Bytes']['input']>;
  auction_currency_lt?: InputMaybe<Scalars['Bytes']['input']>;
  auction_currency_gte?: InputMaybe<Scalars['Bytes']['input']>;
  auction_currency_lte?: InputMaybe<Scalars['Bytes']['input']>;
  auction_currency_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  auction_currency_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  auction_currency_contains?: InputMaybe<Scalars['Bytes']['input']>;
  auction_currency_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  auction_tokenType?: InputMaybe<Scalars['Int']['input']>;
  auction_tokenType_not?: InputMaybe<Scalars['Int']['input']>;
  auction_tokenType_gt?: InputMaybe<Scalars['Int']['input']>;
  auction_tokenType_lt?: InputMaybe<Scalars['Int']['input']>;
  auction_tokenType_gte?: InputMaybe<Scalars['Int']['input']>;
  auction_tokenType_lte?: InputMaybe<Scalars['Int']['input']>;
  auction_tokenType_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  auction_tokenType_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  auction_status?: InputMaybe<Scalars['Int']['input']>;
  auction_status_not?: InputMaybe<Scalars['Int']['input']>;
  auction_status_gt?: InputMaybe<Scalars['Int']['input']>;
  auction_status_lt?: InputMaybe<Scalars['Int']['input']>;
  auction_status_gte?: InputMaybe<Scalars['Int']['input']>;
  auction_status_lte?: InputMaybe<Scalars['Int']['input']>;
  auction_status_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  auction_status_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<NewBid_filter>>>;
  or?: InputMaybe<Array<InputMaybe<NewBid_filter>>>;
};

export type NewBid_orderBy =
  | 'id'
  | 'auctionId'
  | 'bidder'
  | 'assetContract'
  | 'bidAmount'
  | 'auction_auctionId'
  | 'auction_tokenId'
  | 'auction_quantity'
  | 'auction_minimumBidAmount'
  | 'auction_buyoutBidAmount'
  | 'auction_timeBufferInSeconds'
  | 'auction_bidBufferBps'
  | 'auction_startTimestamp'
  | 'auction_endTimestamp'
  | 'auction_auctionCreator'
  | 'auction_assetContract'
  | 'auction_currency'
  | 'auction_tokenType'
  | 'auction_status'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type NewListing = {
  id: Scalars['Bytes']['output'];
  listingCreator: Scalars['Bytes']['output'];
  listingId: Scalars['BigInt']['output'];
  assetContract: Scalars['Bytes']['output'];
  listing_listingId: Scalars['BigInt']['output'];
  listing_tokenId: Scalars['BigInt']['output'];
  listing_quantity: Scalars['BigInt']['output'];
  listing_pricePerToken: Scalars['BigInt']['output'];
  listing_startTimestamp: Scalars['BigInt']['output'];
  listing_endTimestamp: Scalars['BigInt']['output'];
  listing_listingCreator: Scalars['Bytes']['output'];
  listing_assetContract: Scalars['Bytes']['output'];
  listing_currency: Scalars['Bytes']['output'];
  listing_tokenType: Scalars['Int']['output'];
  listing_status: Scalars['Int']['output'];
  listing_reserved: Scalars['Boolean']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type NewListing_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  listingCreator?: InputMaybe<Scalars['Bytes']['input']>;
  listingCreator_not?: InputMaybe<Scalars['Bytes']['input']>;
  listingCreator_gt?: InputMaybe<Scalars['Bytes']['input']>;
  listingCreator_lt?: InputMaybe<Scalars['Bytes']['input']>;
  listingCreator_gte?: InputMaybe<Scalars['Bytes']['input']>;
  listingCreator_lte?: InputMaybe<Scalars['Bytes']['input']>;
  listingCreator_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  listingCreator_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  listingCreator_contains?: InputMaybe<Scalars['Bytes']['input']>;
  listingCreator_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  listingId?: InputMaybe<Scalars['BigInt']['input']>;
  listingId_not?: InputMaybe<Scalars['BigInt']['input']>;
  listingId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  listingId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  listingId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  listingId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  listingId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  listingId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  assetContract?: InputMaybe<Scalars['Bytes']['input']>;
  assetContract_not?: InputMaybe<Scalars['Bytes']['input']>;
  assetContract_gt?: InputMaybe<Scalars['Bytes']['input']>;
  assetContract_lt?: InputMaybe<Scalars['Bytes']['input']>;
  assetContract_gte?: InputMaybe<Scalars['Bytes']['input']>;
  assetContract_lte?: InputMaybe<Scalars['Bytes']['input']>;
  assetContract_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  assetContract_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  assetContract_contains?: InputMaybe<Scalars['Bytes']['input']>;
  assetContract_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  listing_listingId?: InputMaybe<Scalars['BigInt']['input']>;
  listing_listingId_not?: InputMaybe<Scalars['BigInt']['input']>;
  listing_listingId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  listing_listingId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  listing_listingId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  listing_listingId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  listing_listingId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  listing_listingId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  listing_tokenId?: InputMaybe<Scalars['BigInt']['input']>;
  listing_tokenId_not?: InputMaybe<Scalars['BigInt']['input']>;
  listing_tokenId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  listing_tokenId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  listing_tokenId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  listing_tokenId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  listing_tokenId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  listing_tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  listing_quantity?: InputMaybe<Scalars['BigInt']['input']>;
  listing_quantity_not?: InputMaybe<Scalars['BigInt']['input']>;
  listing_quantity_gt?: InputMaybe<Scalars['BigInt']['input']>;
  listing_quantity_lt?: InputMaybe<Scalars['BigInt']['input']>;
  listing_quantity_gte?: InputMaybe<Scalars['BigInt']['input']>;
  listing_quantity_lte?: InputMaybe<Scalars['BigInt']['input']>;
  listing_quantity_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  listing_quantity_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  listing_pricePerToken?: InputMaybe<Scalars['BigInt']['input']>;
  listing_pricePerToken_not?: InputMaybe<Scalars['BigInt']['input']>;
  listing_pricePerToken_gt?: InputMaybe<Scalars['BigInt']['input']>;
  listing_pricePerToken_lt?: InputMaybe<Scalars['BigInt']['input']>;
  listing_pricePerToken_gte?: InputMaybe<Scalars['BigInt']['input']>;
  listing_pricePerToken_lte?: InputMaybe<Scalars['BigInt']['input']>;
  listing_pricePerToken_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  listing_pricePerToken_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  listing_startTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  listing_startTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  listing_startTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  listing_startTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  listing_startTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  listing_startTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  listing_startTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  listing_startTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  listing_endTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  listing_endTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  listing_endTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  listing_endTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  listing_endTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  listing_endTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  listing_endTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  listing_endTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  listing_listingCreator?: InputMaybe<Scalars['Bytes']['input']>;
  listing_listingCreator_not?: InputMaybe<Scalars['Bytes']['input']>;
  listing_listingCreator_gt?: InputMaybe<Scalars['Bytes']['input']>;
  listing_listingCreator_lt?: InputMaybe<Scalars['Bytes']['input']>;
  listing_listingCreator_gte?: InputMaybe<Scalars['Bytes']['input']>;
  listing_listingCreator_lte?: InputMaybe<Scalars['Bytes']['input']>;
  listing_listingCreator_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  listing_listingCreator_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  listing_listingCreator_contains?: InputMaybe<Scalars['Bytes']['input']>;
  listing_listingCreator_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  listing_assetContract?: InputMaybe<Scalars['Bytes']['input']>;
  listing_assetContract_not?: InputMaybe<Scalars['Bytes']['input']>;
  listing_assetContract_gt?: InputMaybe<Scalars['Bytes']['input']>;
  listing_assetContract_lt?: InputMaybe<Scalars['Bytes']['input']>;
  listing_assetContract_gte?: InputMaybe<Scalars['Bytes']['input']>;
  listing_assetContract_lte?: InputMaybe<Scalars['Bytes']['input']>;
  listing_assetContract_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  listing_assetContract_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  listing_assetContract_contains?: InputMaybe<Scalars['Bytes']['input']>;
  listing_assetContract_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  listing_currency?: InputMaybe<Scalars['Bytes']['input']>;
  listing_currency_not?: InputMaybe<Scalars['Bytes']['input']>;
  listing_currency_gt?: InputMaybe<Scalars['Bytes']['input']>;
  listing_currency_lt?: InputMaybe<Scalars['Bytes']['input']>;
  listing_currency_gte?: InputMaybe<Scalars['Bytes']['input']>;
  listing_currency_lte?: InputMaybe<Scalars['Bytes']['input']>;
  listing_currency_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  listing_currency_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  listing_currency_contains?: InputMaybe<Scalars['Bytes']['input']>;
  listing_currency_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  listing_tokenType?: InputMaybe<Scalars['Int']['input']>;
  listing_tokenType_not?: InputMaybe<Scalars['Int']['input']>;
  listing_tokenType_gt?: InputMaybe<Scalars['Int']['input']>;
  listing_tokenType_lt?: InputMaybe<Scalars['Int']['input']>;
  listing_tokenType_gte?: InputMaybe<Scalars['Int']['input']>;
  listing_tokenType_lte?: InputMaybe<Scalars['Int']['input']>;
  listing_tokenType_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  listing_tokenType_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  listing_status?: InputMaybe<Scalars['Int']['input']>;
  listing_status_not?: InputMaybe<Scalars['Int']['input']>;
  listing_status_gt?: InputMaybe<Scalars['Int']['input']>;
  listing_status_lt?: InputMaybe<Scalars['Int']['input']>;
  listing_status_gte?: InputMaybe<Scalars['Int']['input']>;
  listing_status_lte?: InputMaybe<Scalars['Int']['input']>;
  listing_status_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  listing_status_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  listing_reserved?: InputMaybe<Scalars['Boolean']['input']>;
  listing_reserved_not?: InputMaybe<Scalars['Boolean']['input']>;
  listing_reserved_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  listing_reserved_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<NewListing_filter>>>;
  or?: InputMaybe<Array<InputMaybe<NewListing_filter>>>;
};

export type NewListing_orderBy =
  | 'id'
  | 'listingCreator'
  | 'listingId'
  | 'assetContract'
  | 'listing_listingId'
  | 'listing_tokenId'
  | 'listing_quantity'
  | 'listing_pricePerToken'
  | 'listing_startTimestamp'
  | 'listing_endTimestamp'
  | 'listing_listingCreator'
  | 'listing_assetContract'
  | 'listing_currency'
  | 'listing_tokenType'
  | 'listing_status'
  | 'listing_reserved'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type NewOffer = {
  id: Scalars['Bytes']['output'];
  offeror: Scalars['Bytes']['output'];
  offerId: Scalars['BigInt']['output'];
  assetContract: Scalars['Bytes']['output'];
  offer_offerId: Scalars['BigInt']['output'];
  offer_tokenId: Scalars['BigInt']['output'];
  offer_quantity: Scalars['BigInt']['output'];
  offer_totalPrice: Scalars['BigInt']['output'];
  offer_expirationTimestamp: Scalars['BigInt']['output'];
  offer_offeror: Scalars['Bytes']['output'];
  offer_assetContract: Scalars['Bytes']['output'];
  offer_currency: Scalars['Bytes']['output'];
  offer_tokenType: Scalars['Int']['output'];
  offer_status: Scalars['Int']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type NewOffer_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  offeror?: InputMaybe<Scalars['Bytes']['input']>;
  offeror_not?: InputMaybe<Scalars['Bytes']['input']>;
  offeror_gt?: InputMaybe<Scalars['Bytes']['input']>;
  offeror_lt?: InputMaybe<Scalars['Bytes']['input']>;
  offeror_gte?: InputMaybe<Scalars['Bytes']['input']>;
  offeror_lte?: InputMaybe<Scalars['Bytes']['input']>;
  offeror_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  offeror_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  offeror_contains?: InputMaybe<Scalars['Bytes']['input']>;
  offeror_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  offerId?: InputMaybe<Scalars['BigInt']['input']>;
  offerId_not?: InputMaybe<Scalars['BigInt']['input']>;
  offerId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  offerId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  offerId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  offerId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  offerId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  offerId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  assetContract?: InputMaybe<Scalars['Bytes']['input']>;
  assetContract_not?: InputMaybe<Scalars['Bytes']['input']>;
  assetContract_gt?: InputMaybe<Scalars['Bytes']['input']>;
  assetContract_lt?: InputMaybe<Scalars['Bytes']['input']>;
  assetContract_gte?: InputMaybe<Scalars['Bytes']['input']>;
  assetContract_lte?: InputMaybe<Scalars['Bytes']['input']>;
  assetContract_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  assetContract_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  assetContract_contains?: InputMaybe<Scalars['Bytes']['input']>;
  assetContract_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  offer_offerId?: InputMaybe<Scalars['BigInt']['input']>;
  offer_offerId_not?: InputMaybe<Scalars['BigInt']['input']>;
  offer_offerId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  offer_offerId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  offer_offerId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  offer_offerId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  offer_offerId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  offer_offerId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  offer_tokenId?: InputMaybe<Scalars['BigInt']['input']>;
  offer_tokenId_not?: InputMaybe<Scalars['BigInt']['input']>;
  offer_tokenId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  offer_tokenId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  offer_tokenId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  offer_tokenId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  offer_tokenId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  offer_tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  offer_quantity?: InputMaybe<Scalars['BigInt']['input']>;
  offer_quantity_not?: InputMaybe<Scalars['BigInt']['input']>;
  offer_quantity_gt?: InputMaybe<Scalars['BigInt']['input']>;
  offer_quantity_lt?: InputMaybe<Scalars['BigInt']['input']>;
  offer_quantity_gte?: InputMaybe<Scalars['BigInt']['input']>;
  offer_quantity_lte?: InputMaybe<Scalars['BigInt']['input']>;
  offer_quantity_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  offer_quantity_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  offer_totalPrice?: InputMaybe<Scalars['BigInt']['input']>;
  offer_totalPrice_not?: InputMaybe<Scalars['BigInt']['input']>;
  offer_totalPrice_gt?: InputMaybe<Scalars['BigInt']['input']>;
  offer_totalPrice_lt?: InputMaybe<Scalars['BigInt']['input']>;
  offer_totalPrice_gte?: InputMaybe<Scalars['BigInt']['input']>;
  offer_totalPrice_lte?: InputMaybe<Scalars['BigInt']['input']>;
  offer_totalPrice_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  offer_totalPrice_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  offer_expirationTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  offer_expirationTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  offer_expirationTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  offer_expirationTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  offer_expirationTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  offer_expirationTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  offer_expirationTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  offer_expirationTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  offer_offeror?: InputMaybe<Scalars['Bytes']['input']>;
  offer_offeror_not?: InputMaybe<Scalars['Bytes']['input']>;
  offer_offeror_gt?: InputMaybe<Scalars['Bytes']['input']>;
  offer_offeror_lt?: InputMaybe<Scalars['Bytes']['input']>;
  offer_offeror_gte?: InputMaybe<Scalars['Bytes']['input']>;
  offer_offeror_lte?: InputMaybe<Scalars['Bytes']['input']>;
  offer_offeror_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  offer_offeror_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  offer_offeror_contains?: InputMaybe<Scalars['Bytes']['input']>;
  offer_offeror_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  offer_assetContract?: InputMaybe<Scalars['Bytes']['input']>;
  offer_assetContract_not?: InputMaybe<Scalars['Bytes']['input']>;
  offer_assetContract_gt?: InputMaybe<Scalars['Bytes']['input']>;
  offer_assetContract_lt?: InputMaybe<Scalars['Bytes']['input']>;
  offer_assetContract_gte?: InputMaybe<Scalars['Bytes']['input']>;
  offer_assetContract_lte?: InputMaybe<Scalars['Bytes']['input']>;
  offer_assetContract_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  offer_assetContract_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  offer_assetContract_contains?: InputMaybe<Scalars['Bytes']['input']>;
  offer_assetContract_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  offer_currency?: InputMaybe<Scalars['Bytes']['input']>;
  offer_currency_not?: InputMaybe<Scalars['Bytes']['input']>;
  offer_currency_gt?: InputMaybe<Scalars['Bytes']['input']>;
  offer_currency_lt?: InputMaybe<Scalars['Bytes']['input']>;
  offer_currency_gte?: InputMaybe<Scalars['Bytes']['input']>;
  offer_currency_lte?: InputMaybe<Scalars['Bytes']['input']>;
  offer_currency_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  offer_currency_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  offer_currency_contains?: InputMaybe<Scalars['Bytes']['input']>;
  offer_currency_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  offer_tokenType?: InputMaybe<Scalars['Int']['input']>;
  offer_tokenType_not?: InputMaybe<Scalars['Int']['input']>;
  offer_tokenType_gt?: InputMaybe<Scalars['Int']['input']>;
  offer_tokenType_lt?: InputMaybe<Scalars['Int']['input']>;
  offer_tokenType_gte?: InputMaybe<Scalars['Int']['input']>;
  offer_tokenType_lte?: InputMaybe<Scalars['Int']['input']>;
  offer_tokenType_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  offer_tokenType_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  offer_status?: InputMaybe<Scalars['Int']['input']>;
  offer_status_not?: InputMaybe<Scalars['Int']['input']>;
  offer_status_gt?: InputMaybe<Scalars['Int']['input']>;
  offer_status_lt?: InputMaybe<Scalars['Int']['input']>;
  offer_status_gte?: InputMaybe<Scalars['Int']['input']>;
  offer_status_lte?: InputMaybe<Scalars['Int']['input']>;
  offer_status_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  offer_status_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<NewOffer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<NewOffer_filter>>>;
};

export type NewOffer_orderBy =
  | 'id'
  | 'offeror'
  | 'offerId'
  | 'assetContract'
  | 'offer_offerId'
  | 'offer_tokenId'
  | 'offer_quantity'
  | 'offer_totalPrice'
  | 'offer_expirationTimestamp'
  | 'offer_offeror'
  | 'offer_assetContract'
  | 'offer_currency'
  | 'offer_tokenType'
  | 'offer_status'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type NewSale = {
  id: Scalars['Bytes']['output'];
  listingCreator: Scalars['Bytes']['output'];
  listingId: Scalars['BigInt']['output'];
  assetContract: Scalars['Bytes']['output'];
  tokenId: Scalars['BigInt']['output'];
  buyer: Scalars['Bytes']['output'];
  quantityBought: Scalars['BigInt']['output'];
  totalPricePaid: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type NewSale_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  listingCreator?: InputMaybe<Scalars['Bytes']['input']>;
  listingCreator_not?: InputMaybe<Scalars['Bytes']['input']>;
  listingCreator_gt?: InputMaybe<Scalars['Bytes']['input']>;
  listingCreator_lt?: InputMaybe<Scalars['Bytes']['input']>;
  listingCreator_gte?: InputMaybe<Scalars['Bytes']['input']>;
  listingCreator_lte?: InputMaybe<Scalars['Bytes']['input']>;
  listingCreator_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  listingCreator_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  listingCreator_contains?: InputMaybe<Scalars['Bytes']['input']>;
  listingCreator_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  listingId?: InputMaybe<Scalars['BigInt']['input']>;
  listingId_not?: InputMaybe<Scalars['BigInt']['input']>;
  listingId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  listingId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  listingId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  listingId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  listingId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  listingId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  assetContract?: InputMaybe<Scalars['Bytes']['input']>;
  assetContract_not?: InputMaybe<Scalars['Bytes']['input']>;
  assetContract_gt?: InputMaybe<Scalars['Bytes']['input']>;
  assetContract_lt?: InputMaybe<Scalars['Bytes']['input']>;
  assetContract_gte?: InputMaybe<Scalars['Bytes']['input']>;
  assetContract_lte?: InputMaybe<Scalars['Bytes']['input']>;
  assetContract_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  assetContract_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  assetContract_contains?: InputMaybe<Scalars['Bytes']['input']>;
  assetContract_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  tokenId?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  buyer?: InputMaybe<Scalars['Bytes']['input']>;
  buyer_not?: InputMaybe<Scalars['Bytes']['input']>;
  buyer_gt?: InputMaybe<Scalars['Bytes']['input']>;
  buyer_lt?: InputMaybe<Scalars['Bytes']['input']>;
  buyer_gte?: InputMaybe<Scalars['Bytes']['input']>;
  buyer_lte?: InputMaybe<Scalars['Bytes']['input']>;
  buyer_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  buyer_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  buyer_contains?: InputMaybe<Scalars['Bytes']['input']>;
  buyer_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  quantityBought?: InputMaybe<Scalars['BigInt']['input']>;
  quantityBought_not?: InputMaybe<Scalars['BigInt']['input']>;
  quantityBought_gt?: InputMaybe<Scalars['BigInt']['input']>;
  quantityBought_lt?: InputMaybe<Scalars['BigInt']['input']>;
  quantityBought_gte?: InputMaybe<Scalars['BigInt']['input']>;
  quantityBought_lte?: InputMaybe<Scalars['BigInt']['input']>;
  quantityBought_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  quantityBought_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalPricePaid?: InputMaybe<Scalars['BigInt']['input']>;
  totalPricePaid_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalPricePaid_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalPricePaid_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalPricePaid_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalPricePaid_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalPricePaid_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalPricePaid_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<NewSale_filter>>>;
  or?: InputMaybe<Array<InputMaybe<NewSale_filter>>>;
};

export type NewSale_orderBy =
  | 'id'
  | 'listingCreator'
  | 'listingId'
  | 'assetContract'
  | 'tokenId'
  | 'buyer'
  | 'quantityBought'
  | 'totalPricePaid'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type PlatformFeeInfoUpdated = {
  id: Scalars['Bytes']['output'];
  platformFeeRecipient: Scalars['Bytes']['output'];
  platformFeeBps: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type PlatformFeeInfoUpdated_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  platformFeeRecipient?: InputMaybe<Scalars['Bytes']['input']>;
  platformFeeRecipient_not?: InputMaybe<Scalars['Bytes']['input']>;
  platformFeeRecipient_gt?: InputMaybe<Scalars['Bytes']['input']>;
  platformFeeRecipient_lt?: InputMaybe<Scalars['Bytes']['input']>;
  platformFeeRecipient_gte?: InputMaybe<Scalars['Bytes']['input']>;
  platformFeeRecipient_lte?: InputMaybe<Scalars['Bytes']['input']>;
  platformFeeRecipient_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  platformFeeRecipient_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  platformFeeRecipient_contains?: InputMaybe<Scalars['Bytes']['input']>;
  platformFeeRecipient_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  platformFeeBps?: InputMaybe<Scalars['BigInt']['input']>;
  platformFeeBps_not?: InputMaybe<Scalars['BigInt']['input']>;
  platformFeeBps_gt?: InputMaybe<Scalars['BigInt']['input']>;
  platformFeeBps_lt?: InputMaybe<Scalars['BigInt']['input']>;
  platformFeeBps_gte?: InputMaybe<Scalars['BigInt']['input']>;
  platformFeeBps_lte?: InputMaybe<Scalars['BigInt']['input']>;
  platformFeeBps_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  platformFeeBps_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<PlatformFeeInfoUpdated_filter>>>;
  or?: InputMaybe<Array<InputMaybe<PlatformFeeInfoUpdated_filter>>>;
};

export type PlatformFeeInfoUpdated_orderBy =
  | 'id'
  | 'platformFeeRecipient'
  | 'platformFeeBps'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type PlatformFeeTypeUpdated = {
  id: Scalars['Bytes']['output'];
  feeType: Scalars['Int']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type PlatformFeeTypeUpdated_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  feeType?: InputMaybe<Scalars['Int']['input']>;
  feeType_not?: InputMaybe<Scalars['Int']['input']>;
  feeType_gt?: InputMaybe<Scalars['Int']['input']>;
  feeType_lt?: InputMaybe<Scalars['Int']['input']>;
  feeType_gte?: InputMaybe<Scalars['Int']['input']>;
  feeType_lte?: InputMaybe<Scalars['Int']['input']>;
  feeType_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  feeType_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<PlatformFeeTypeUpdated_filter>>>;
  or?: InputMaybe<Array<InputMaybe<PlatformFeeTypeUpdated_filter>>>;
};

export type PlatformFeeTypeUpdated_orderBy =
  | 'id'
  | 'feeType'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type Query = {
  buyerApprovedForListing?: Maybe<BuyerApprovedForListing>;
  buyerApprovedForListings: Array<BuyerApprovedForListing>;
  cancelledListing?: Maybe<CancelledListing>;
  cancelledListings: Array<CancelledListing>;
  currencyApprovedForListing?: Maybe<CurrencyApprovedForListing>;
  currencyApprovedForListings: Array<CurrencyApprovedForListing>;
  newListing?: Maybe<NewListing>;
  newListings: Array<NewListing>;
  newSale?: Maybe<NewSale>;
  newSales: Array<NewSale>;
  updatedListing?: Maybe<UpdatedListing>;
  updatedListings: Array<UpdatedListing>;
  auctionClosed?: Maybe<AuctionClosed>;
  auctionCloseds: Array<AuctionClosed>;
  cancelledAuction?: Maybe<CancelledAuction>;
  cancelledAuctions: Array<CancelledAuction>;
  newAuction?: Maybe<NewAuction>;
  newAuctions: Array<NewAuction>;
  newBid?: Maybe<NewBid>;
  newBids: Array<NewBid>;
  acceptedOffer?: Maybe<AcceptedOffer>;
  acceptedOffers: Array<AcceptedOffer>;
  cancelledOffer?: Maybe<CancelledOffer>;
  cancelledOffers: Array<CancelledOffer>;
  newOffer?: Maybe<NewOffer>;
  newOffers: Array<NewOffer>;
  contractURIUpdated?: Maybe<ContractURIUpdated>;
  contractURIUpdateds: Array<ContractURIUpdated>;
  extensionAdded?: Maybe<ExtensionAdded>;
  extensionAddeds: Array<ExtensionAdded>;
  extensionRemoved?: Maybe<ExtensionRemoved>;
  extensionRemoveds: Array<ExtensionRemoved>;
  extensionReplaced?: Maybe<ExtensionReplaced>;
  extensionReplaceds: Array<ExtensionReplaced>;
  flatPlatformFeeUpdated?: Maybe<FlatPlatformFeeUpdated>;
  flatPlatformFeeUpdateds: Array<FlatPlatformFeeUpdated>;
  functionDisabled?: Maybe<FunctionDisabled>;
  functionDisableds: Array<FunctionDisabled>;
  functionEnabled?: Maybe<FunctionEnabled>;
  functionEnableds: Array<FunctionEnabled>;
  initialized?: Maybe<Initialized>;
  initializeds: Array<Initialized>;
  platformFeeInfoUpdated?: Maybe<PlatformFeeInfoUpdated>;
  platformFeeInfoUpdateds: Array<PlatformFeeInfoUpdated>;
  platformFeeTypeUpdated?: Maybe<PlatformFeeTypeUpdated>;
  platformFeeTypeUpdateds: Array<PlatformFeeTypeUpdated>;
  roleAdminChanged?: Maybe<RoleAdminChanged>;
  roleAdminChangeds: Array<RoleAdminChanged>;
  roleGranted?: Maybe<RoleGranted>;
  roleGranteds: Array<RoleGranted>;
  roleRevoked?: Maybe<RoleRevoked>;
  roleRevokeds: Array<RoleRevoked>;
  royaltyEngineUpdated?: Maybe<RoyaltyEngineUpdated>;
  royaltyEngineUpdateds: Array<RoyaltyEngineUpdated>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QuerybuyerApprovedForListingArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybuyerApprovedForListingsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BuyerApprovedForListing_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<BuyerApprovedForListing_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycancelledListingArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycancelledListingsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<CancelledListing_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<CancelledListing_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycurrencyApprovedForListingArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycurrencyApprovedForListingsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<CurrencyApprovedForListing_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<CurrencyApprovedForListing_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerynewListingArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerynewListingsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<NewListing_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NewListing_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerynewSaleArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerynewSalesArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<NewSale_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NewSale_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryupdatedListingArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryupdatedListingsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<UpdatedListing_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<UpdatedListing_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryauctionClosedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryauctionClosedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AuctionClosed_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<AuctionClosed_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycancelledAuctionArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycancelledAuctionsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<CancelledAuction_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<CancelledAuction_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerynewAuctionArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerynewAuctionsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<NewAuction_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NewAuction_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerynewBidArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerynewBidsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<NewBid_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NewBid_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryacceptedOfferArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryacceptedOffersArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AcceptedOffer_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<AcceptedOffer_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycancelledOfferArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycancelledOffersArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<CancelledOffer_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<CancelledOffer_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerynewOfferArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerynewOffersArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<NewOffer_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NewOffer_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycontractURIUpdatedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycontractURIUpdatedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ContractURIUpdated_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ContractURIUpdated_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryextensionAddedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryextensionAddedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ExtensionAdded_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ExtensionAdded_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryextensionRemovedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryextensionRemovedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ExtensionRemoved_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ExtensionRemoved_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryextensionReplacedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryextensionReplacedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ExtensionReplaced_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ExtensionReplaced_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryflatPlatformFeeUpdatedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryflatPlatformFeeUpdatedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<FlatPlatformFeeUpdated_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<FlatPlatformFeeUpdated_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryfunctionDisabledArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryfunctionDisabledsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<FunctionDisabled_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<FunctionDisabled_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryfunctionEnabledArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryfunctionEnabledsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<FunctionEnabled_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<FunctionEnabled_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryinitializedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryinitializedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Initialized_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Initialized_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryplatformFeeInfoUpdatedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryplatformFeeInfoUpdatedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PlatformFeeInfoUpdated_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PlatformFeeInfoUpdated_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryplatformFeeTypeUpdatedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryplatformFeeTypeUpdatedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PlatformFeeTypeUpdated_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PlatformFeeTypeUpdated_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryroleAdminChangedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryroleAdminChangedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RoleAdminChanged_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<RoleAdminChanged_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryroleGrantedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryroleGrantedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RoleGranted_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<RoleGranted_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryroleRevokedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryroleRevokedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RoleRevoked_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<RoleRevoked_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryroyaltyEngineUpdatedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryroyaltyEngineUpdatedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RoyaltyEngineUpdated_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<RoyaltyEngineUpdated_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type RoleAdminChanged = {
  id: Scalars['Bytes']['output'];
  role: Scalars['Bytes']['output'];
  previousAdminRole: Scalars['Bytes']['output'];
  newAdminRole: Scalars['Bytes']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type RoleAdminChanged_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  role?: InputMaybe<Scalars['Bytes']['input']>;
  role_not?: InputMaybe<Scalars['Bytes']['input']>;
  role_gt?: InputMaybe<Scalars['Bytes']['input']>;
  role_lt?: InputMaybe<Scalars['Bytes']['input']>;
  role_gte?: InputMaybe<Scalars['Bytes']['input']>;
  role_lte?: InputMaybe<Scalars['Bytes']['input']>;
  role_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  role_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  role_contains?: InputMaybe<Scalars['Bytes']['input']>;
  role_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  previousAdminRole?: InputMaybe<Scalars['Bytes']['input']>;
  previousAdminRole_not?: InputMaybe<Scalars['Bytes']['input']>;
  previousAdminRole_gt?: InputMaybe<Scalars['Bytes']['input']>;
  previousAdminRole_lt?: InputMaybe<Scalars['Bytes']['input']>;
  previousAdminRole_gte?: InputMaybe<Scalars['Bytes']['input']>;
  previousAdminRole_lte?: InputMaybe<Scalars['Bytes']['input']>;
  previousAdminRole_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  previousAdminRole_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  previousAdminRole_contains?: InputMaybe<Scalars['Bytes']['input']>;
  previousAdminRole_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  newAdminRole?: InputMaybe<Scalars['Bytes']['input']>;
  newAdminRole_not?: InputMaybe<Scalars['Bytes']['input']>;
  newAdminRole_gt?: InputMaybe<Scalars['Bytes']['input']>;
  newAdminRole_lt?: InputMaybe<Scalars['Bytes']['input']>;
  newAdminRole_gte?: InputMaybe<Scalars['Bytes']['input']>;
  newAdminRole_lte?: InputMaybe<Scalars['Bytes']['input']>;
  newAdminRole_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  newAdminRole_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  newAdminRole_contains?: InputMaybe<Scalars['Bytes']['input']>;
  newAdminRole_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<RoleAdminChanged_filter>>>;
  or?: InputMaybe<Array<InputMaybe<RoleAdminChanged_filter>>>;
};

export type RoleAdminChanged_orderBy =
  | 'id'
  | 'role'
  | 'previousAdminRole'
  | 'newAdminRole'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type RoleGranted = {
  id: Scalars['Bytes']['output'];
  role: Scalars['Bytes']['output'];
  account: Scalars['Bytes']['output'];
  sender: Scalars['Bytes']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type RoleGranted_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  role?: InputMaybe<Scalars['Bytes']['input']>;
  role_not?: InputMaybe<Scalars['Bytes']['input']>;
  role_gt?: InputMaybe<Scalars['Bytes']['input']>;
  role_lt?: InputMaybe<Scalars['Bytes']['input']>;
  role_gte?: InputMaybe<Scalars['Bytes']['input']>;
  role_lte?: InputMaybe<Scalars['Bytes']['input']>;
  role_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  role_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  role_contains?: InputMaybe<Scalars['Bytes']['input']>;
  role_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  account?: InputMaybe<Scalars['Bytes']['input']>;
  account_not?: InputMaybe<Scalars['Bytes']['input']>;
  account_gt?: InputMaybe<Scalars['Bytes']['input']>;
  account_lt?: InputMaybe<Scalars['Bytes']['input']>;
  account_gte?: InputMaybe<Scalars['Bytes']['input']>;
  account_lte?: InputMaybe<Scalars['Bytes']['input']>;
  account_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  account_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  account_contains?: InputMaybe<Scalars['Bytes']['input']>;
  account_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  sender?: InputMaybe<Scalars['Bytes']['input']>;
  sender_not?: InputMaybe<Scalars['Bytes']['input']>;
  sender_gt?: InputMaybe<Scalars['Bytes']['input']>;
  sender_lt?: InputMaybe<Scalars['Bytes']['input']>;
  sender_gte?: InputMaybe<Scalars['Bytes']['input']>;
  sender_lte?: InputMaybe<Scalars['Bytes']['input']>;
  sender_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  sender_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  sender_contains?: InputMaybe<Scalars['Bytes']['input']>;
  sender_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<RoleGranted_filter>>>;
  or?: InputMaybe<Array<InputMaybe<RoleGranted_filter>>>;
};

export type RoleGranted_orderBy =
  | 'id'
  | 'role'
  | 'account'
  | 'sender'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type RoleRevoked = {
  id: Scalars['Bytes']['output'];
  role: Scalars['Bytes']['output'];
  account: Scalars['Bytes']['output'];
  sender: Scalars['Bytes']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type RoleRevoked_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  role?: InputMaybe<Scalars['Bytes']['input']>;
  role_not?: InputMaybe<Scalars['Bytes']['input']>;
  role_gt?: InputMaybe<Scalars['Bytes']['input']>;
  role_lt?: InputMaybe<Scalars['Bytes']['input']>;
  role_gte?: InputMaybe<Scalars['Bytes']['input']>;
  role_lte?: InputMaybe<Scalars['Bytes']['input']>;
  role_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  role_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  role_contains?: InputMaybe<Scalars['Bytes']['input']>;
  role_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  account?: InputMaybe<Scalars['Bytes']['input']>;
  account_not?: InputMaybe<Scalars['Bytes']['input']>;
  account_gt?: InputMaybe<Scalars['Bytes']['input']>;
  account_lt?: InputMaybe<Scalars['Bytes']['input']>;
  account_gte?: InputMaybe<Scalars['Bytes']['input']>;
  account_lte?: InputMaybe<Scalars['Bytes']['input']>;
  account_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  account_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  account_contains?: InputMaybe<Scalars['Bytes']['input']>;
  account_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  sender?: InputMaybe<Scalars['Bytes']['input']>;
  sender_not?: InputMaybe<Scalars['Bytes']['input']>;
  sender_gt?: InputMaybe<Scalars['Bytes']['input']>;
  sender_lt?: InputMaybe<Scalars['Bytes']['input']>;
  sender_gte?: InputMaybe<Scalars['Bytes']['input']>;
  sender_lte?: InputMaybe<Scalars['Bytes']['input']>;
  sender_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  sender_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  sender_contains?: InputMaybe<Scalars['Bytes']['input']>;
  sender_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<RoleRevoked_filter>>>;
  or?: InputMaybe<Array<InputMaybe<RoleRevoked_filter>>>;
};

export type RoleRevoked_orderBy =
  | 'id'
  | 'role'
  | 'account'
  | 'sender'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type RoyaltyEngineUpdated = {
  id: Scalars['Bytes']['output'];
  previousAddress: Scalars['Bytes']['output'];
  newAddress: Scalars['Bytes']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type RoyaltyEngineUpdated_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  previousAddress?: InputMaybe<Scalars['Bytes']['input']>;
  previousAddress_not?: InputMaybe<Scalars['Bytes']['input']>;
  previousAddress_gt?: InputMaybe<Scalars['Bytes']['input']>;
  previousAddress_lt?: InputMaybe<Scalars['Bytes']['input']>;
  previousAddress_gte?: InputMaybe<Scalars['Bytes']['input']>;
  previousAddress_lte?: InputMaybe<Scalars['Bytes']['input']>;
  previousAddress_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  previousAddress_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  previousAddress_contains?: InputMaybe<Scalars['Bytes']['input']>;
  previousAddress_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  newAddress?: InputMaybe<Scalars['Bytes']['input']>;
  newAddress_not?: InputMaybe<Scalars['Bytes']['input']>;
  newAddress_gt?: InputMaybe<Scalars['Bytes']['input']>;
  newAddress_lt?: InputMaybe<Scalars['Bytes']['input']>;
  newAddress_gte?: InputMaybe<Scalars['Bytes']['input']>;
  newAddress_lte?: InputMaybe<Scalars['Bytes']['input']>;
  newAddress_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  newAddress_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  newAddress_contains?: InputMaybe<Scalars['Bytes']['input']>;
  newAddress_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<RoyaltyEngineUpdated_filter>>>;
  or?: InputMaybe<Array<InputMaybe<RoyaltyEngineUpdated_filter>>>;
};

export type RoyaltyEngineUpdated_orderBy =
  | 'id'
  | 'previousAddress'
  | 'newAddress'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type Subscription = {
  buyerApprovedForListing?: Maybe<BuyerApprovedForListing>;
  buyerApprovedForListings: Array<BuyerApprovedForListing>;
  cancelledListing?: Maybe<CancelledListing>;
  cancelledListings: Array<CancelledListing>;
  currencyApprovedForListing?: Maybe<CurrencyApprovedForListing>;
  currencyApprovedForListings: Array<CurrencyApprovedForListing>;
  newListing?: Maybe<NewListing>;
  newListings: Array<NewListing>;
  newSale?: Maybe<NewSale>;
  newSales: Array<NewSale>;
  updatedListing?: Maybe<UpdatedListing>;
  updatedListings: Array<UpdatedListing>;
  auctionClosed?: Maybe<AuctionClosed>;
  auctionCloseds: Array<AuctionClosed>;
  cancelledAuction?: Maybe<CancelledAuction>;
  cancelledAuctions: Array<CancelledAuction>;
  newAuction?: Maybe<NewAuction>;
  newAuctions: Array<NewAuction>;
  newBid?: Maybe<NewBid>;
  newBids: Array<NewBid>;
  acceptedOffer?: Maybe<AcceptedOffer>;
  acceptedOffers: Array<AcceptedOffer>;
  cancelledOffer?: Maybe<CancelledOffer>;
  cancelledOffers: Array<CancelledOffer>;
  newOffer?: Maybe<NewOffer>;
  newOffers: Array<NewOffer>;
  contractURIUpdated?: Maybe<ContractURIUpdated>;
  contractURIUpdateds: Array<ContractURIUpdated>;
  extensionAdded?: Maybe<ExtensionAdded>;
  extensionAddeds: Array<ExtensionAdded>;
  extensionRemoved?: Maybe<ExtensionRemoved>;
  extensionRemoveds: Array<ExtensionRemoved>;
  extensionReplaced?: Maybe<ExtensionReplaced>;
  extensionReplaceds: Array<ExtensionReplaced>;
  flatPlatformFeeUpdated?: Maybe<FlatPlatformFeeUpdated>;
  flatPlatformFeeUpdateds: Array<FlatPlatformFeeUpdated>;
  functionDisabled?: Maybe<FunctionDisabled>;
  functionDisableds: Array<FunctionDisabled>;
  functionEnabled?: Maybe<FunctionEnabled>;
  functionEnableds: Array<FunctionEnabled>;
  initialized?: Maybe<Initialized>;
  initializeds: Array<Initialized>;
  platformFeeInfoUpdated?: Maybe<PlatformFeeInfoUpdated>;
  platformFeeInfoUpdateds: Array<PlatformFeeInfoUpdated>;
  platformFeeTypeUpdated?: Maybe<PlatformFeeTypeUpdated>;
  platformFeeTypeUpdateds: Array<PlatformFeeTypeUpdated>;
  roleAdminChanged?: Maybe<RoleAdminChanged>;
  roleAdminChangeds: Array<RoleAdminChanged>;
  roleGranted?: Maybe<RoleGranted>;
  roleGranteds: Array<RoleGranted>;
  roleRevoked?: Maybe<RoleRevoked>;
  roleRevokeds: Array<RoleRevoked>;
  royaltyEngineUpdated?: Maybe<RoyaltyEngineUpdated>;
  royaltyEngineUpdateds: Array<RoyaltyEngineUpdated>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type SubscriptionbuyerApprovedForListingArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionbuyerApprovedForListingsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BuyerApprovedForListing_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<BuyerApprovedForListing_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioncancelledListingArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioncancelledListingsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<CancelledListing_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<CancelledListing_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioncurrencyApprovedForListingArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioncurrencyApprovedForListingsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<CurrencyApprovedForListing_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<CurrencyApprovedForListing_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionnewListingArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionnewListingsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<NewListing_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NewListing_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionnewSaleArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionnewSalesArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<NewSale_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NewSale_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionupdatedListingArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionupdatedListingsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<UpdatedListing_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<UpdatedListing_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionauctionClosedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionauctionClosedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AuctionClosed_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<AuctionClosed_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioncancelledAuctionArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioncancelledAuctionsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<CancelledAuction_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<CancelledAuction_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionnewAuctionArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionnewAuctionsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<NewAuction_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NewAuction_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionnewBidArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionnewBidsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<NewBid_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NewBid_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionacceptedOfferArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionacceptedOffersArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AcceptedOffer_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<AcceptedOffer_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioncancelledOfferArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioncancelledOffersArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<CancelledOffer_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<CancelledOffer_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionnewOfferArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionnewOffersArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<NewOffer_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NewOffer_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioncontractURIUpdatedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioncontractURIUpdatedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ContractURIUpdated_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ContractURIUpdated_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionextensionAddedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionextensionAddedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ExtensionAdded_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ExtensionAdded_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionextensionRemovedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionextensionRemovedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ExtensionRemoved_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ExtensionRemoved_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionextensionReplacedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionextensionReplacedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ExtensionReplaced_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ExtensionReplaced_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionflatPlatformFeeUpdatedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionflatPlatformFeeUpdatedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<FlatPlatformFeeUpdated_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<FlatPlatformFeeUpdated_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionfunctionDisabledArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionfunctionDisabledsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<FunctionDisabled_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<FunctionDisabled_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionfunctionEnabledArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionfunctionEnabledsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<FunctionEnabled_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<FunctionEnabled_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioninitializedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioninitializedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Initialized_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Initialized_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionplatformFeeInfoUpdatedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionplatformFeeInfoUpdatedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PlatformFeeInfoUpdated_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PlatformFeeInfoUpdated_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionplatformFeeTypeUpdatedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionplatformFeeTypeUpdatedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PlatformFeeTypeUpdated_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PlatformFeeTypeUpdated_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionroleAdminChangedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionroleAdminChangedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RoleAdminChanged_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<RoleAdminChanged_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionroleGrantedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionroleGrantedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RoleGranted_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<RoleGranted_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionroleRevokedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionroleRevokedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RoleRevoked_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<RoleRevoked_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionroyaltyEngineUpdatedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionroyaltyEngineUpdatedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RoyaltyEngineUpdated_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<RoyaltyEngineUpdated_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type UpdatedListing = {
  id: Scalars['Bytes']['output'];
  listingCreator: Scalars['Bytes']['output'];
  listingId: Scalars['BigInt']['output'];
  assetContract: Scalars['Bytes']['output'];
  listing_listingId: Scalars['BigInt']['output'];
  listing_tokenId: Scalars['BigInt']['output'];
  listing_quantity: Scalars['BigInt']['output'];
  listing_pricePerToken: Scalars['BigInt']['output'];
  listing_startTimestamp: Scalars['BigInt']['output'];
  listing_endTimestamp: Scalars['BigInt']['output'];
  listing_listingCreator: Scalars['Bytes']['output'];
  listing_assetContract: Scalars['Bytes']['output'];
  listing_currency: Scalars['Bytes']['output'];
  listing_tokenType: Scalars['Int']['output'];
  listing_status: Scalars['Int']['output'];
  listing_reserved: Scalars['Boolean']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type UpdatedListing_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  listingCreator?: InputMaybe<Scalars['Bytes']['input']>;
  listingCreator_not?: InputMaybe<Scalars['Bytes']['input']>;
  listingCreator_gt?: InputMaybe<Scalars['Bytes']['input']>;
  listingCreator_lt?: InputMaybe<Scalars['Bytes']['input']>;
  listingCreator_gte?: InputMaybe<Scalars['Bytes']['input']>;
  listingCreator_lte?: InputMaybe<Scalars['Bytes']['input']>;
  listingCreator_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  listingCreator_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  listingCreator_contains?: InputMaybe<Scalars['Bytes']['input']>;
  listingCreator_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  listingId?: InputMaybe<Scalars['BigInt']['input']>;
  listingId_not?: InputMaybe<Scalars['BigInt']['input']>;
  listingId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  listingId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  listingId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  listingId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  listingId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  listingId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  assetContract?: InputMaybe<Scalars['Bytes']['input']>;
  assetContract_not?: InputMaybe<Scalars['Bytes']['input']>;
  assetContract_gt?: InputMaybe<Scalars['Bytes']['input']>;
  assetContract_lt?: InputMaybe<Scalars['Bytes']['input']>;
  assetContract_gte?: InputMaybe<Scalars['Bytes']['input']>;
  assetContract_lte?: InputMaybe<Scalars['Bytes']['input']>;
  assetContract_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  assetContract_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  assetContract_contains?: InputMaybe<Scalars['Bytes']['input']>;
  assetContract_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  listing_listingId?: InputMaybe<Scalars['BigInt']['input']>;
  listing_listingId_not?: InputMaybe<Scalars['BigInt']['input']>;
  listing_listingId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  listing_listingId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  listing_listingId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  listing_listingId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  listing_listingId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  listing_listingId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  listing_tokenId?: InputMaybe<Scalars['BigInt']['input']>;
  listing_tokenId_not?: InputMaybe<Scalars['BigInt']['input']>;
  listing_tokenId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  listing_tokenId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  listing_tokenId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  listing_tokenId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  listing_tokenId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  listing_tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  listing_quantity?: InputMaybe<Scalars['BigInt']['input']>;
  listing_quantity_not?: InputMaybe<Scalars['BigInt']['input']>;
  listing_quantity_gt?: InputMaybe<Scalars['BigInt']['input']>;
  listing_quantity_lt?: InputMaybe<Scalars['BigInt']['input']>;
  listing_quantity_gte?: InputMaybe<Scalars['BigInt']['input']>;
  listing_quantity_lte?: InputMaybe<Scalars['BigInt']['input']>;
  listing_quantity_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  listing_quantity_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  listing_pricePerToken?: InputMaybe<Scalars['BigInt']['input']>;
  listing_pricePerToken_not?: InputMaybe<Scalars['BigInt']['input']>;
  listing_pricePerToken_gt?: InputMaybe<Scalars['BigInt']['input']>;
  listing_pricePerToken_lt?: InputMaybe<Scalars['BigInt']['input']>;
  listing_pricePerToken_gte?: InputMaybe<Scalars['BigInt']['input']>;
  listing_pricePerToken_lte?: InputMaybe<Scalars['BigInt']['input']>;
  listing_pricePerToken_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  listing_pricePerToken_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  listing_startTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  listing_startTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  listing_startTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  listing_startTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  listing_startTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  listing_startTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  listing_startTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  listing_startTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  listing_endTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  listing_endTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  listing_endTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  listing_endTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  listing_endTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  listing_endTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  listing_endTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  listing_endTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  listing_listingCreator?: InputMaybe<Scalars['Bytes']['input']>;
  listing_listingCreator_not?: InputMaybe<Scalars['Bytes']['input']>;
  listing_listingCreator_gt?: InputMaybe<Scalars['Bytes']['input']>;
  listing_listingCreator_lt?: InputMaybe<Scalars['Bytes']['input']>;
  listing_listingCreator_gte?: InputMaybe<Scalars['Bytes']['input']>;
  listing_listingCreator_lte?: InputMaybe<Scalars['Bytes']['input']>;
  listing_listingCreator_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  listing_listingCreator_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  listing_listingCreator_contains?: InputMaybe<Scalars['Bytes']['input']>;
  listing_listingCreator_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  listing_assetContract?: InputMaybe<Scalars['Bytes']['input']>;
  listing_assetContract_not?: InputMaybe<Scalars['Bytes']['input']>;
  listing_assetContract_gt?: InputMaybe<Scalars['Bytes']['input']>;
  listing_assetContract_lt?: InputMaybe<Scalars['Bytes']['input']>;
  listing_assetContract_gte?: InputMaybe<Scalars['Bytes']['input']>;
  listing_assetContract_lte?: InputMaybe<Scalars['Bytes']['input']>;
  listing_assetContract_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  listing_assetContract_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  listing_assetContract_contains?: InputMaybe<Scalars['Bytes']['input']>;
  listing_assetContract_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  listing_currency?: InputMaybe<Scalars['Bytes']['input']>;
  listing_currency_not?: InputMaybe<Scalars['Bytes']['input']>;
  listing_currency_gt?: InputMaybe<Scalars['Bytes']['input']>;
  listing_currency_lt?: InputMaybe<Scalars['Bytes']['input']>;
  listing_currency_gte?: InputMaybe<Scalars['Bytes']['input']>;
  listing_currency_lte?: InputMaybe<Scalars['Bytes']['input']>;
  listing_currency_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  listing_currency_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  listing_currency_contains?: InputMaybe<Scalars['Bytes']['input']>;
  listing_currency_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  listing_tokenType?: InputMaybe<Scalars['Int']['input']>;
  listing_tokenType_not?: InputMaybe<Scalars['Int']['input']>;
  listing_tokenType_gt?: InputMaybe<Scalars['Int']['input']>;
  listing_tokenType_lt?: InputMaybe<Scalars['Int']['input']>;
  listing_tokenType_gte?: InputMaybe<Scalars['Int']['input']>;
  listing_tokenType_lte?: InputMaybe<Scalars['Int']['input']>;
  listing_tokenType_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  listing_tokenType_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  listing_status?: InputMaybe<Scalars['Int']['input']>;
  listing_status_not?: InputMaybe<Scalars['Int']['input']>;
  listing_status_gt?: InputMaybe<Scalars['Int']['input']>;
  listing_status_lt?: InputMaybe<Scalars['Int']['input']>;
  listing_status_gte?: InputMaybe<Scalars['Int']['input']>;
  listing_status_lte?: InputMaybe<Scalars['Int']['input']>;
  listing_status_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  listing_status_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  listing_reserved?: InputMaybe<Scalars['Boolean']['input']>;
  listing_reserved_not?: InputMaybe<Scalars['Boolean']['input']>;
  listing_reserved_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  listing_reserved_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<UpdatedListing_filter>>>;
  or?: InputMaybe<Array<InputMaybe<UpdatedListing_filter>>>;
};

export type UpdatedListing_orderBy =
  | 'id'
  | 'listingCreator'
  | 'listingId'
  | 'assetContract'
  | 'listing_listingId'
  | 'listing_tokenId'
  | 'listing_quantity'
  | 'listing_pricePerToken'
  | 'listing_startTimestamp'
  | 'listing_endTimestamp'
  | 'listing_listingCreator'
  | 'listing_assetContract'
  | 'listing_currency'
  | 'listing_tokenType'
  | 'listing_status'
  | 'listing_reserved'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']['output']>;
  /** The block number */
  number: Scalars['Int']['output'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']['output']>;
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars['Bytes']['output']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String']['output'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']['output'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

  export type QuerySdk = {
      /** null **/
  buyerApprovedForListing: InContextSdkMethod<Query['buyerApprovedForListing'], QuerybuyerApprovedForListingArgs, MeshContext>,
  /** null **/
  buyerApprovedForListings: InContextSdkMethod<Query['buyerApprovedForListings'], QuerybuyerApprovedForListingsArgs, MeshContext>,
  /** null **/
  cancelledListing: InContextSdkMethod<Query['cancelledListing'], QuerycancelledListingArgs, MeshContext>,
  /** null **/
  cancelledListings: InContextSdkMethod<Query['cancelledListings'], QuerycancelledListingsArgs, MeshContext>,
  /** null **/
  currencyApprovedForListing: InContextSdkMethod<Query['currencyApprovedForListing'], QuerycurrencyApprovedForListingArgs, MeshContext>,
  /** null **/
  currencyApprovedForListings: InContextSdkMethod<Query['currencyApprovedForListings'], QuerycurrencyApprovedForListingsArgs, MeshContext>,
  /** null **/
  newListing: InContextSdkMethod<Query['newListing'], QuerynewListingArgs, MeshContext>,
  /** null **/
  newListings: InContextSdkMethod<Query['newListings'], QuerynewListingsArgs, MeshContext>,
  /** null **/
  newSale: InContextSdkMethod<Query['newSale'], QuerynewSaleArgs, MeshContext>,
  /** null **/
  newSales: InContextSdkMethod<Query['newSales'], QuerynewSalesArgs, MeshContext>,
  /** null **/
  updatedListing: InContextSdkMethod<Query['updatedListing'], QueryupdatedListingArgs, MeshContext>,
  /** null **/
  updatedListings: InContextSdkMethod<Query['updatedListings'], QueryupdatedListingsArgs, MeshContext>,
  /** null **/
  auctionClosed: InContextSdkMethod<Query['auctionClosed'], QueryauctionClosedArgs, MeshContext>,
  /** null **/
  auctionCloseds: InContextSdkMethod<Query['auctionCloseds'], QueryauctionClosedsArgs, MeshContext>,
  /** null **/
  cancelledAuction: InContextSdkMethod<Query['cancelledAuction'], QuerycancelledAuctionArgs, MeshContext>,
  /** null **/
  cancelledAuctions: InContextSdkMethod<Query['cancelledAuctions'], QuerycancelledAuctionsArgs, MeshContext>,
  /** null **/
  newAuction: InContextSdkMethod<Query['newAuction'], QuerynewAuctionArgs, MeshContext>,
  /** null **/
  newAuctions: InContextSdkMethod<Query['newAuctions'], QuerynewAuctionsArgs, MeshContext>,
  /** null **/
  newBid: InContextSdkMethod<Query['newBid'], QuerynewBidArgs, MeshContext>,
  /** null **/
  newBids: InContextSdkMethod<Query['newBids'], QuerynewBidsArgs, MeshContext>,
  /** null **/
  acceptedOffer: InContextSdkMethod<Query['acceptedOffer'], QueryacceptedOfferArgs, MeshContext>,
  /** null **/
  acceptedOffers: InContextSdkMethod<Query['acceptedOffers'], QueryacceptedOffersArgs, MeshContext>,
  /** null **/
  cancelledOffer: InContextSdkMethod<Query['cancelledOffer'], QuerycancelledOfferArgs, MeshContext>,
  /** null **/
  cancelledOffers: InContextSdkMethod<Query['cancelledOffers'], QuerycancelledOffersArgs, MeshContext>,
  /** null **/
  newOffer: InContextSdkMethod<Query['newOffer'], QuerynewOfferArgs, MeshContext>,
  /** null **/
  newOffers: InContextSdkMethod<Query['newOffers'], QuerynewOffersArgs, MeshContext>,
  /** null **/
  contractURIUpdated: InContextSdkMethod<Query['contractURIUpdated'], QuerycontractURIUpdatedArgs, MeshContext>,
  /** null **/
  contractURIUpdateds: InContextSdkMethod<Query['contractURIUpdateds'], QuerycontractURIUpdatedsArgs, MeshContext>,
  /** null **/
  extensionAdded: InContextSdkMethod<Query['extensionAdded'], QueryextensionAddedArgs, MeshContext>,
  /** null **/
  extensionAddeds: InContextSdkMethod<Query['extensionAddeds'], QueryextensionAddedsArgs, MeshContext>,
  /** null **/
  extensionRemoved: InContextSdkMethod<Query['extensionRemoved'], QueryextensionRemovedArgs, MeshContext>,
  /** null **/
  extensionRemoveds: InContextSdkMethod<Query['extensionRemoveds'], QueryextensionRemovedsArgs, MeshContext>,
  /** null **/
  extensionReplaced: InContextSdkMethod<Query['extensionReplaced'], QueryextensionReplacedArgs, MeshContext>,
  /** null **/
  extensionReplaceds: InContextSdkMethod<Query['extensionReplaceds'], QueryextensionReplacedsArgs, MeshContext>,
  /** null **/
  flatPlatformFeeUpdated: InContextSdkMethod<Query['flatPlatformFeeUpdated'], QueryflatPlatformFeeUpdatedArgs, MeshContext>,
  /** null **/
  flatPlatformFeeUpdateds: InContextSdkMethod<Query['flatPlatformFeeUpdateds'], QueryflatPlatformFeeUpdatedsArgs, MeshContext>,
  /** null **/
  functionDisabled: InContextSdkMethod<Query['functionDisabled'], QueryfunctionDisabledArgs, MeshContext>,
  /** null **/
  functionDisableds: InContextSdkMethod<Query['functionDisableds'], QueryfunctionDisabledsArgs, MeshContext>,
  /** null **/
  functionEnabled: InContextSdkMethod<Query['functionEnabled'], QueryfunctionEnabledArgs, MeshContext>,
  /** null **/
  functionEnableds: InContextSdkMethod<Query['functionEnableds'], QueryfunctionEnabledsArgs, MeshContext>,
  /** null **/
  initialized: InContextSdkMethod<Query['initialized'], QueryinitializedArgs, MeshContext>,
  /** null **/
  initializeds: InContextSdkMethod<Query['initializeds'], QueryinitializedsArgs, MeshContext>,
  /** null **/
  platformFeeInfoUpdated: InContextSdkMethod<Query['platformFeeInfoUpdated'], QueryplatformFeeInfoUpdatedArgs, MeshContext>,
  /** null **/
  platformFeeInfoUpdateds: InContextSdkMethod<Query['platformFeeInfoUpdateds'], QueryplatformFeeInfoUpdatedsArgs, MeshContext>,
  /** null **/
  platformFeeTypeUpdated: InContextSdkMethod<Query['platformFeeTypeUpdated'], QueryplatformFeeTypeUpdatedArgs, MeshContext>,
  /** null **/
  platformFeeTypeUpdateds: InContextSdkMethod<Query['platformFeeTypeUpdateds'], QueryplatformFeeTypeUpdatedsArgs, MeshContext>,
  /** null **/
  roleAdminChanged: InContextSdkMethod<Query['roleAdminChanged'], QueryroleAdminChangedArgs, MeshContext>,
  /** null **/
  roleAdminChangeds: InContextSdkMethod<Query['roleAdminChangeds'], QueryroleAdminChangedsArgs, MeshContext>,
  /** null **/
  roleGranted: InContextSdkMethod<Query['roleGranted'], QueryroleGrantedArgs, MeshContext>,
  /** null **/
  roleGranteds: InContextSdkMethod<Query['roleGranteds'], QueryroleGrantedsArgs, MeshContext>,
  /** null **/
  roleRevoked: InContextSdkMethod<Query['roleRevoked'], QueryroleRevokedArgs, MeshContext>,
  /** null **/
  roleRevokeds: InContextSdkMethod<Query['roleRevokeds'], QueryroleRevokedsArgs, MeshContext>,
  /** null **/
  royaltyEngineUpdated: InContextSdkMethod<Query['royaltyEngineUpdated'], QueryroyaltyEngineUpdatedArgs, MeshContext>,
  /** null **/
  royaltyEngineUpdateds: InContextSdkMethod<Query['royaltyEngineUpdateds'], QueryroyaltyEngineUpdatedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Query['_meta'], Query_metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  buyerApprovedForListing: InContextSdkMethod<Subscription['buyerApprovedForListing'], SubscriptionbuyerApprovedForListingArgs, MeshContext>,
  /** null **/
  buyerApprovedForListings: InContextSdkMethod<Subscription['buyerApprovedForListings'], SubscriptionbuyerApprovedForListingsArgs, MeshContext>,
  /** null **/
  cancelledListing: InContextSdkMethod<Subscription['cancelledListing'], SubscriptioncancelledListingArgs, MeshContext>,
  /** null **/
  cancelledListings: InContextSdkMethod<Subscription['cancelledListings'], SubscriptioncancelledListingsArgs, MeshContext>,
  /** null **/
  currencyApprovedForListing: InContextSdkMethod<Subscription['currencyApprovedForListing'], SubscriptioncurrencyApprovedForListingArgs, MeshContext>,
  /** null **/
  currencyApprovedForListings: InContextSdkMethod<Subscription['currencyApprovedForListings'], SubscriptioncurrencyApprovedForListingsArgs, MeshContext>,
  /** null **/
  newListing: InContextSdkMethod<Subscription['newListing'], SubscriptionnewListingArgs, MeshContext>,
  /** null **/
  newListings: InContextSdkMethod<Subscription['newListings'], SubscriptionnewListingsArgs, MeshContext>,
  /** null **/
  newSale: InContextSdkMethod<Subscription['newSale'], SubscriptionnewSaleArgs, MeshContext>,
  /** null **/
  newSales: InContextSdkMethod<Subscription['newSales'], SubscriptionnewSalesArgs, MeshContext>,
  /** null **/
  updatedListing: InContextSdkMethod<Subscription['updatedListing'], SubscriptionupdatedListingArgs, MeshContext>,
  /** null **/
  updatedListings: InContextSdkMethod<Subscription['updatedListings'], SubscriptionupdatedListingsArgs, MeshContext>,
  /** null **/
  auctionClosed: InContextSdkMethod<Subscription['auctionClosed'], SubscriptionauctionClosedArgs, MeshContext>,
  /** null **/
  auctionCloseds: InContextSdkMethod<Subscription['auctionCloseds'], SubscriptionauctionClosedsArgs, MeshContext>,
  /** null **/
  cancelledAuction: InContextSdkMethod<Subscription['cancelledAuction'], SubscriptioncancelledAuctionArgs, MeshContext>,
  /** null **/
  cancelledAuctions: InContextSdkMethod<Subscription['cancelledAuctions'], SubscriptioncancelledAuctionsArgs, MeshContext>,
  /** null **/
  newAuction: InContextSdkMethod<Subscription['newAuction'], SubscriptionnewAuctionArgs, MeshContext>,
  /** null **/
  newAuctions: InContextSdkMethod<Subscription['newAuctions'], SubscriptionnewAuctionsArgs, MeshContext>,
  /** null **/
  newBid: InContextSdkMethod<Subscription['newBid'], SubscriptionnewBidArgs, MeshContext>,
  /** null **/
  newBids: InContextSdkMethod<Subscription['newBids'], SubscriptionnewBidsArgs, MeshContext>,
  /** null **/
  acceptedOffer: InContextSdkMethod<Subscription['acceptedOffer'], SubscriptionacceptedOfferArgs, MeshContext>,
  /** null **/
  acceptedOffers: InContextSdkMethod<Subscription['acceptedOffers'], SubscriptionacceptedOffersArgs, MeshContext>,
  /** null **/
  cancelledOffer: InContextSdkMethod<Subscription['cancelledOffer'], SubscriptioncancelledOfferArgs, MeshContext>,
  /** null **/
  cancelledOffers: InContextSdkMethod<Subscription['cancelledOffers'], SubscriptioncancelledOffersArgs, MeshContext>,
  /** null **/
  newOffer: InContextSdkMethod<Subscription['newOffer'], SubscriptionnewOfferArgs, MeshContext>,
  /** null **/
  newOffers: InContextSdkMethod<Subscription['newOffers'], SubscriptionnewOffersArgs, MeshContext>,
  /** null **/
  contractURIUpdated: InContextSdkMethod<Subscription['contractURIUpdated'], SubscriptioncontractURIUpdatedArgs, MeshContext>,
  /** null **/
  contractURIUpdateds: InContextSdkMethod<Subscription['contractURIUpdateds'], SubscriptioncontractURIUpdatedsArgs, MeshContext>,
  /** null **/
  extensionAdded: InContextSdkMethod<Subscription['extensionAdded'], SubscriptionextensionAddedArgs, MeshContext>,
  /** null **/
  extensionAddeds: InContextSdkMethod<Subscription['extensionAddeds'], SubscriptionextensionAddedsArgs, MeshContext>,
  /** null **/
  extensionRemoved: InContextSdkMethod<Subscription['extensionRemoved'], SubscriptionextensionRemovedArgs, MeshContext>,
  /** null **/
  extensionRemoveds: InContextSdkMethod<Subscription['extensionRemoveds'], SubscriptionextensionRemovedsArgs, MeshContext>,
  /** null **/
  extensionReplaced: InContextSdkMethod<Subscription['extensionReplaced'], SubscriptionextensionReplacedArgs, MeshContext>,
  /** null **/
  extensionReplaceds: InContextSdkMethod<Subscription['extensionReplaceds'], SubscriptionextensionReplacedsArgs, MeshContext>,
  /** null **/
  flatPlatformFeeUpdated: InContextSdkMethod<Subscription['flatPlatformFeeUpdated'], SubscriptionflatPlatformFeeUpdatedArgs, MeshContext>,
  /** null **/
  flatPlatformFeeUpdateds: InContextSdkMethod<Subscription['flatPlatformFeeUpdateds'], SubscriptionflatPlatformFeeUpdatedsArgs, MeshContext>,
  /** null **/
  functionDisabled: InContextSdkMethod<Subscription['functionDisabled'], SubscriptionfunctionDisabledArgs, MeshContext>,
  /** null **/
  functionDisableds: InContextSdkMethod<Subscription['functionDisableds'], SubscriptionfunctionDisabledsArgs, MeshContext>,
  /** null **/
  functionEnabled: InContextSdkMethod<Subscription['functionEnabled'], SubscriptionfunctionEnabledArgs, MeshContext>,
  /** null **/
  functionEnableds: InContextSdkMethod<Subscription['functionEnableds'], SubscriptionfunctionEnabledsArgs, MeshContext>,
  /** null **/
  initialized: InContextSdkMethod<Subscription['initialized'], SubscriptioninitializedArgs, MeshContext>,
  /** null **/
  initializeds: InContextSdkMethod<Subscription['initializeds'], SubscriptioninitializedsArgs, MeshContext>,
  /** null **/
  platformFeeInfoUpdated: InContextSdkMethod<Subscription['platformFeeInfoUpdated'], SubscriptionplatformFeeInfoUpdatedArgs, MeshContext>,
  /** null **/
  platformFeeInfoUpdateds: InContextSdkMethod<Subscription['platformFeeInfoUpdateds'], SubscriptionplatformFeeInfoUpdatedsArgs, MeshContext>,
  /** null **/
  platformFeeTypeUpdated: InContextSdkMethod<Subscription['platformFeeTypeUpdated'], SubscriptionplatformFeeTypeUpdatedArgs, MeshContext>,
  /** null **/
  platformFeeTypeUpdateds: InContextSdkMethod<Subscription['platformFeeTypeUpdateds'], SubscriptionplatformFeeTypeUpdatedsArgs, MeshContext>,
  /** null **/
  roleAdminChanged: InContextSdkMethod<Subscription['roleAdminChanged'], SubscriptionroleAdminChangedArgs, MeshContext>,
  /** null **/
  roleAdminChangeds: InContextSdkMethod<Subscription['roleAdminChangeds'], SubscriptionroleAdminChangedsArgs, MeshContext>,
  /** null **/
  roleGranted: InContextSdkMethod<Subscription['roleGranted'], SubscriptionroleGrantedArgs, MeshContext>,
  /** null **/
  roleGranteds: InContextSdkMethod<Subscription['roleGranteds'], SubscriptionroleGrantedsArgs, MeshContext>,
  /** null **/
  roleRevoked: InContextSdkMethod<Subscription['roleRevoked'], SubscriptionroleRevokedArgs, MeshContext>,
  /** null **/
  roleRevokeds: InContextSdkMethod<Subscription['roleRevokeds'], SubscriptionroleRevokedsArgs, MeshContext>,
  /** null **/
  royaltyEngineUpdated: InContextSdkMethod<Subscription['royaltyEngineUpdated'], SubscriptionroyaltyEngineUpdatedArgs, MeshContext>,
  /** null **/
  royaltyEngineUpdateds: InContextSdkMethod<Subscription['royaltyEngineUpdateds'], SubscriptionroyaltyEngineUpdatedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Subscription['_meta'], Subscription_metaArgs, MeshContext>
  };

  export type Context = {
      ["sepolia7007"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
