// @ts-nocheck
import { GraphQLResolveInfo, SelectionSetNode, FieldNode, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { gql } from '@graphql-mesh/utils';

import type { GetMeshOptions } from '@graphql-mesh/runtime';
import type { YamlConfig } from '@graphql-mesh/types';
import { PubSub } from '@graphql-mesh/utils';
import { DefaultLogger } from '@graphql-mesh/utils';
import MeshCache from "@graphql-mesh/cache-localforage";
import { fetch as fetchFn } from '@whatwg-node/fetch';

import { MeshResolvedSource } from '@graphql-mesh/runtime';
import { MeshTransform, MeshPlugin } from '@graphql-mesh/types';
import GraphqlHandler from "@graphql-mesh/graphql"
import BareMerger from "@graphql-mesh/merger-bare";
import { printWithCache } from '@graphql-mesh/utils';
import { usePersistedOperations } from '@graphql-yoga/plugin-persisted-operations';
import { createMeshHTTPHandler, MeshHTTPHandler } from '@graphql-mesh/http';
import { getMesh, ExecuteMeshFn, SubscribeMeshFn, MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { ImportFn } from '@graphql-mesh/types';
import type { New7007Types } from './sources/new7007/types';
import * as importedModule$0 from "./sources/new7007/introspectionSchema";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };



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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode);
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AcceptedOffer: ResolverTypeWrapper<AcceptedOffer>;
  AcceptedOffer_filter: AcceptedOffer_filter;
  AcceptedOffer_orderBy: AcceptedOffer_orderBy;
  Aggregation_interval: Aggregation_interval;
  AuctionClosed: ResolverTypeWrapper<AuctionClosed>;
  AuctionClosed_filter: AuctionClosed_filter;
  AuctionClosed_orderBy: AuctionClosed_orderBy;
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']['output']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']['output']>;
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  BuyerApprovedForListing: ResolverTypeWrapper<BuyerApprovedForListing>;
  BuyerApprovedForListing_filter: BuyerApprovedForListing_filter;
  BuyerApprovedForListing_orderBy: BuyerApprovedForListing_orderBy;
  Bytes: ResolverTypeWrapper<Scalars['Bytes']['output']>;
  CancelledAuction: ResolverTypeWrapper<CancelledAuction>;
  CancelledAuction_filter: CancelledAuction_filter;
  CancelledAuction_orderBy: CancelledAuction_orderBy;
  CancelledListing: ResolverTypeWrapper<CancelledListing>;
  CancelledListing_filter: CancelledListing_filter;
  CancelledListing_orderBy: CancelledListing_orderBy;
  CancelledOffer: ResolverTypeWrapper<CancelledOffer>;
  CancelledOffer_filter: CancelledOffer_filter;
  CancelledOffer_orderBy: CancelledOffer_orderBy;
  ContractURIUpdated: ResolverTypeWrapper<ContractURIUpdated>;
  ContractURIUpdated_filter: ContractURIUpdated_filter;
  ContractURIUpdated_orderBy: ContractURIUpdated_orderBy;
  CurrencyApprovedForListing: ResolverTypeWrapper<CurrencyApprovedForListing>;
  CurrencyApprovedForListing_filter: CurrencyApprovedForListing_filter;
  CurrencyApprovedForListing_orderBy: CurrencyApprovedForListing_orderBy;
  ExtensionAdded: ResolverTypeWrapper<ExtensionAdded>;
  ExtensionAdded_filter: ExtensionAdded_filter;
  ExtensionAdded_orderBy: ExtensionAdded_orderBy;
  ExtensionRemoved: ResolverTypeWrapper<ExtensionRemoved>;
  ExtensionRemoved_filter: ExtensionRemoved_filter;
  ExtensionRemoved_orderBy: ExtensionRemoved_orderBy;
  ExtensionReplaced: ResolverTypeWrapper<ExtensionReplaced>;
  ExtensionReplaced_filter: ExtensionReplaced_filter;
  ExtensionReplaced_orderBy: ExtensionReplaced_orderBy;
  FlatPlatformFeeUpdated: ResolverTypeWrapper<FlatPlatformFeeUpdated>;
  FlatPlatformFeeUpdated_filter: FlatPlatformFeeUpdated_filter;
  FlatPlatformFeeUpdated_orderBy: FlatPlatformFeeUpdated_orderBy;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  FunctionDisabled: ResolverTypeWrapper<FunctionDisabled>;
  FunctionDisabled_filter: FunctionDisabled_filter;
  FunctionDisabled_orderBy: FunctionDisabled_orderBy;
  FunctionEnabled: ResolverTypeWrapper<FunctionEnabled>;
  FunctionEnabled_filter: FunctionEnabled_filter;
  FunctionEnabled_orderBy: FunctionEnabled_orderBy;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Initialized: ResolverTypeWrapper<Initialized>;
  Initialized_filter: Initialized_filter;
  Initialized_orderBy: Initialized_orderBy;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Int8: ResolverTypeWrapper<Scalars['Int8']['output']>;
  NewAuction: ResolverTypeWrapper<NewAuction>;
  NewAuction_filter: NewAuction_filter;
  NewAuction_orderBy: NewAuction_orderBy;
  NewBid: ResolverTypeWrapper<NewBid>;
  NewBid_filter: NewBid_filter;
  NewBid_orderBy: NewBid_orderBy;
  NewListing: ResolverTypeWrapper<NewListing>;
  NewListing_filter: NewListing_filter;
  NewListing_orderBy: NewListing_orderBy;
  NewOffer: ResolverTypeWrapper<NewOffer>;
  NewOffer_filter: NewOffer_filter;
  NewOffer_orderBy: NewOffer_orderBy;
  NewSale: ResolverTypeWrapper<NewSale>;
  NewSale_filter: NewSale_filter;
  NewSale_orderBy: NewSale_orderBy;
  OrderDirection: OrderDirection;
  PlatformFeeInfoUpdated: ResolverTypeWrapper<PlatformFeeInfoUpdated>;
  PlatformFeeInfoUpdated_filter: PlatformFeeInfoUpdated_filter;
  PlatformFeeInfoUpdated_orderBy: PlatformFeeInfoUpdated_orderBy;
  PlatformFeeTypeUpdated: ResolverTypeWrapper<PlatformFeeTypeUpdated>;
  PlatformFeeTypeUpdated_filter: PlatformFeeTypeUpdated_filter;
  PlatformFeeTypeUpdated_orderBy: PlatformFeeTypeUpdated_orderBy;
  Query: ResolverTypeWrapper<{}>;
  RoleAdminChanged: ResolverTypeWrapper<RoleAdminChanged>;
  RoleAdminChanged_filter: RoleAdminChanged_filter;
  RoleAdminChanged_orderBy: RoleAdminChanged_orderBy;
  RoleGranted: ResolverTypeWrapper<RoleGranted>;
  RoleGranted_filter: RoleGranted_filter;
  RoleGranted_orderBy: RoleGranted_orderBy;
  RoleRevoked: ResolverTypeWrapper<RoleRevoked>;
  RoleRevoked_filter: RoleRevoked_filter;
  RoleRevoked_orderBy: RoleRevoked_orderBy;
  RoyaltyEngineUpdated: ResolverTypeWrapper<RoyaltyEngineUpdated>;
  RoyaltyEngineUpdated_filter: RoyaltyEngineUpdated_filter;
  RoyaltyEngineUpdated_orderBy: RoyaltyEngineUpdated_orderBy;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subscription: ResolverTypeWrapper<{}>;
  Timestamp: ResolverTypeWrapper<Scalars['Timestamp']['output']>;
  UpdatedListing: ResolverTypeWrapper<UpdatedListing>;
  UpdatedListing_filter: UpdatedListing_filter;
  UpdatedListing_orderBy: UpdatedListing_orderBy;
  _Block_: ResolverTypeWrapper<_Block_>;
  _Meta_: ResolverTypeWrapper<_Meta_>;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AcceptedOffer: AcceptedOffer;
  AcceptedOffer_filter: AcceptedOffer_filter;
  AuctionClosed: AuctionClosed;
  AuctionClosed_filter: AuctionClosed_filter;
  BigDecimal: Scalars['BigDecimal']['output'];
  BigInt: Scalars['BigInt']['output'];
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: Scalars['Boolean']['output'];
  BuyerApprovedForListing: BuyerApprovedForListing;
  BuyerApprovedForListing_filter: BuyerApprovedForListing_filter;
  Bytes: Scalars['Bytes']['output'];
  CancelledAuction: CancelledAuction;
  CancelledAuction_filter: CancelledAuction_filter;
  CancelledListing: CancelledListing;
  CancelledListing_filter: CancelledListing_filter;
  CancelledOffer: CancelledOffer;
  CancelledOffer_filter: CancelledOffer_filter;
  ContractURIUpdated: ContractURIUpdated;
  ContractURIUpdated_filter: ContractURIUpdated_filter;
  CurrencyApprovedForListing: CurrencyApprovedForListing;
  CurrencyApprovedForListing_filter: CurrencyApprovedForListing_filter;
  ExtensionAdded: ExtensionAdded;
  ExtensionAdded_filter: ExtensionAdded_filter;
  ExtensionRemoved: ExtensionRemoved;
  ExtensionRemoved_filter: ExtensionRemoved_filter;
  ExtensionReplaced: ExtensionReplaced;
  ExtensionReplaced_filter: ExtensionReplaced_filter;
  FlatPlatformFeeUpdated: FlatPlatformFeeUpdated;
  FlatPlatformFeeUpdated_filter: FlatPlatformFeeUpdated_filter;
  Float: Scalars['Float']['output'];
  FunctionDisabled: FunctionDisabled;
  FunctionDisabled_filter: FunctionDisabled_filter;
  FunctionEnabled: FunctionEnabled;
  FunctionEnabled_filter: FunctionEnabled_filter;
  ID: Scalars['ID']['output'];
  Initialized: Initialized;
  Initialized_filter: Initialized_filter;
  Int: Scalars['Int']['output'];
  Int8: Scalars['Int8']['output'];
  NewAuction: NewAuction;
  NewAuction_filter: NewAuction_filter;
  NewBid: NewBid;
  NewBid_filter: NewBid_filter;
  NewListing: NewListing;
  NewListing_filter: NewListing_filter;
  NewOffer: NewOffer;
  NewOffer_filter: NewOffer_filter;
  NewSale: NewSale;
  NewSale_filter: NewSale_filter;
  PlatformFeeInfoUpdated: PlatformFeeInfoUpdated;
  PlatformFeeInfoUpdated_filter: PlatformFeeInfoUpdated_filter;
  PlatformFeeTypeUpdated: PlatformFeeTypeUpdated;
  PlatformFeeTypeUpdated_filter: PlatformFeeTypeUpdated_filter;
  Query: {};
  RoleAdminChanged: RoleAdminChanged;
  RoleAdminChanged_filter: RoleAdminChanged_filter;
  RoleGranted: RoleGranted;
  RoleGranted_filter: RoleGranted_filter;
  RoleRevoked: RoleRevoked;
  RoleRevoked_filter: RoleRevoked_filter;
  RoyaltyEngineUpdated: RoyaltyEngineUpdated;
  RoyaltyEngineUpdated_filter: RoyaltyEngineUpdated_filter;
  String: Scalars['String']['output'];
  Subscription: {};
  Timestamp: Scalars['Timestamp']['output'];
  UpdatedListing: UpdatedListing;
  UpdatedListing_filter: UpdatedListing_filter;
  _Block_: _Block_;
  _Meta_: _Meta_;
}>;

export type entityDirectiveArgs = { };

export type entityDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = entityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type subgraphIdDirectiveArgs = {
  id: Scalars['String']['input'];
};

export type subgraphIdDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = subgraphIdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type derivedFromDirectiveArgs = {
  field: Scalars['String']['input'];
};

export type derivedFromDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = derivedFromDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AcceptedOfferResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['AcceptedOffer'] = ResolversParentTypes['AcceptedOffer']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  offeror?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  offerId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  assetContract?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  tokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  seller?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  quantityBought?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalPricePaid?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AuctionClosedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['AuctionClosed'] = ResolversParentTypes['AuctionClosed']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  auctionId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  assetContract?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  closer?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  tokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  auctionCreator?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  winningBidder?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
  name: 'BigDecimal';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export type BuyerApprovedForListingResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['BuyerApprovedForListing'] = ResolversParentTypes['BuyerApprovedForListing']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  listingId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  buyer?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  approved?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
  name: 'Bytes';
}

export type CancelledAuctionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['CancelledAuction'] = ResolversParentTypes['CancelledAuction']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  auctionCreator?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  auctionId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CancelledListingResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['CancelledListing'] = ResolversParentTypes['CancelledListing']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  listingCreator?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  listingId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CancelledOfferResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['CancelledOffer'] = ResolversParentTypes['CancelledOffer']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  offeror?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  offerId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ContractURIUpdatedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ContractURIUpdated'] = ResolversParentTypes['ContractURIUpdated']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  prevURI?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  newURI?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CurrencyApprovedForListingResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['CurrencyApprovedForListing'] = ResolversParentTypes['CurrencyApprovedForListing']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  listingId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  pricePerToken?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ExtensionAddedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ExtensionAdded'] = ResolversParentTypes['ExtensionAdded']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  implementation?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  extension_metadata_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  extension_metadata_metadataURI?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  extension_metadata_implementation?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  extension_functions?: Resolver<Array<ResolversTypes['Bytes']>, ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ExtensionRemovedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ExtensionRemoved'] = ResolversParentTypes['ExtensionRemoved']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  extension_metadata_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  extension_metadata_metadataURI?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  extension_metadata_implementation?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  extension_functions?: Resolver<Array<ResolversTypes['Bytes']>, ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ExtensionReplacedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ExtensionReplaced'] = ResolversParentTypes['ExtensionReplaced']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  implementation?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  extension_metadata_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  extension_metadata_metadataURI?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  extension_metadata_implementation?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  extension_functions?: Resolver<Array<ResolversTypes['Bytes']>, ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FlatPlatformFeeUpdatedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['FlatPlatformFeeUpdated'] = ResolversParentTypes['FlatPlatformFeeUpdated']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  platformFeeRecipient?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  flatFee?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FunctionDisabledResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['FunctionDisabled'] = ResolversParentTypes['FunctionDisabled']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  functionSelector?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  extMetadata_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  extMetadata_metadataURI?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  extMetadata_implementation?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FunctionEnabledResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['FunctionEnabled'] = ResolversParentTypes['FunctionEnabled']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  functionSelector?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  extFunction_functionSelector?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  extFunction_functionSignature?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  extMetadata_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  extMetadata_metadataURI?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  extMetadata_implementation?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type InitializedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Initialized'] = ResolversParentTypes['Initialized']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  version?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface Int8ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Int8'], any> {
  name: 'Int8';
}

export type NewAuctionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['NewAuction'] = ResolversParentTypes['NewAuction']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  auctionCreator?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  auctionId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  assetContract?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  auction_auctionId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  auction_tokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  auction_quantity?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  auction_minimumBidAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  auction_buyoutBidAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  auction_timeBufferInSeconds?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  auction_bidBufferBps?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  auction_startTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  auction_endTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  auction_auctionCreator?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  auction_assetContract?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  auction_currency?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  auction_tokenType?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  auction_status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type NewBidResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['NewBid'] = ResolversParentTypes['NewBid']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  auctionId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  bidder?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  assetContract?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  bidAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  auction_auctionId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  auction_tokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  auction_quantity?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  auction_minimumBidAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  auction_buyoutBidAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  auction_timeBufferInSeconds?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  auction_bidBufferBps?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  auction_startTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  auction_endTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  auction_auctionCreator?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  auction_assetContract?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  auction_currency?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  auction_tokenType?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  auction_status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type NewListingResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['NewListing'] = ResolversParentTypes['NewListing']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  listingCreator?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  listingId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  assetContract?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  listing_listingId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  listing_tokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  listing_quantity?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  listing_pricePerToken?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  listing_startTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  listing_endTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  listing_listingCreator?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  listing_assetContract?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  listing_currency?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  listing_tokenType?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  listing_status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  listing_reserved?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type NewOfferResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['NewOffer'] = ResolversParentTypes['NewOffer']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  offeror?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  offerId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  assetContract?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  offer_offerId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  offer_tokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  offer_quantity?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  offer_totalPrice?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  offer_expirationTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  offer_offeror?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  offer_assetContract?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  offer_currency?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  offer_tokenType?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  offer_status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type NewSaleResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['NewSale'] = ResolversParentTypes['NewSale']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  listingCreator?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  listingId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  assetContract?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  tokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  buyer?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  quantityBought?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalPricePaid?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PlatformFeeInfoUpdatedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['PlatformFeeInfoUpdated'] = ResolversParentTypes['PlatformFeeInfoUpdated']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  platformFeeRecipient?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  platformFeeBps?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PlatformFeeTypeUpdatedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['PlatformFeeTypeUpdated'] = ResolversParentTypes['PlatformFeeTypeUpdated']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  feeType?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  buyerApprovedForListing?: Resolver<Maybe<ResolversTypes['BuyerApprovedForListing']>, ParentType, ContextType, RequireFields<QuerybuyerApprovedForListingArgs, 'id' | 'subgraphError'>>;
  buyerApprovedForListings?: Resolver<Array<ResolversTypes['BuyerApprovedForListing']>, ParentType, ContextType, RequireFields<QuerybuyerApprovedForListingsArgs, 'skip' | 'first' | 'subgraphError'>>;
  cancelledListing?: Resolver<Maybe<ResolversTypes['CancelledListing']>, ParentType, ContextType, RequireFields<QuerycancelledListingArgs, 'id' | 'subgraphError'>>;
  cancelledListings?: Resolver<Array<ResolversTypes['CancelledListing']>, ParentType, ContextType, RequireFields<QuerycancelledListingsArgs, 'skip' | 'first' | 'subgraphError'>>;
  currencyApprovedForListing?: Resolver<Maybe<ResolversTypes['CurrencyApprovedForListing']>, ParentType, ContextType, RequireFields<QuerycurrencyApprovedForListingArgs, 'id' | 'subgraphError'>>;
  currencyApprovedForListings?: Resolver<Array<ResolversTypes['CurrencyApprovedForListing']>, ParentType, ContextType, RequireFields<QuerycurrencyApprovedForListingsArgs, 'skip' | 'first' | 'subgraphError'>>;
  newListing?: Resolver<Maybe<ResolversTypes['NewListing']>, ParentType, ContextType, RequireFields<QuerynewListingArgs, 'id' | 'subgraphError'>>;
  newListings?: Resolver<Array<ResolversTypes['NewListing']>, ParentType, ContextType, RequireFields<QuerynewListingsArgs, 'skip' | 'first' | 'subgraphError'>>;
  newSale?: Resolver<Maybe<ResolversTypes['NewSale']>, ParentType, ContextType, RequireFields<QuerynewSaleArgs, 'id' | 'subgraphError'>>;
  newSales?: Resolver<Array<ResolversTypes['NewSale']>, ParentType, ContextType, RequireFields<QuerynewSalesArgs, 'skip' | 'first' | 'subgraphError'>>;
  updatedListing?: Resolver<Maybe<ResolversTypes['UpdatedListing']>, ParentType, ContextType, RequireFields<QueryupdatedListingArgs, 'id' | 'subgraphError'>>;
  updatedListings?: Resolver<Array<ResolversTypes['UpdatedListing']>, ParentType, ContextType, RequireFields<QueryupdatedListingsArgs, 'skip' | 'first' | 'subgraphError'>>;
  auctionClosed?: Resolver<Maybe<ResolversTypes['AuctionClosed']>, ParentType, ContextType, RequireFields<QueryauctionClosedArgs, 'id' | 'subgraphError'>>;
  auctionCloseds?: Resolver<Array<ResolversTypes['AuctionClosed']>, ParentType, ContextType, RequireFields<QueryauctionClosedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  cancelledAuction?: Resolver<Maybe<ResolversTypes['CancelledAuction']>, ParentType, ContextType, RequireFields<QuerycancelledAuctionArgs, 'id' | 'subgraphError'>>;
  cancelledAuctions?: Resolver<Array<ResolversTypes['CancelledAuction']>, ParentType, ContextType, RequireFields<QuerycancelledAuctionsArgs, 'skip' | 'first' | 'subgraphError'>>;
  newAuction?: Resolver<Maybe<ResolversTypes['NewAuction']>, ParentType, ContextType, RequireFields<QuerynewAuctionArgs, 'id' | 'subgraphError'>>;
  newAuctions?: Resolver<Array<ResolversTypes['NewAuction']>, ParentType, ContextType, RequireFields<QuerynewAuctionsArgs, 'skip' | 'first' | 'subgraphError'>>;
  newBid?: Resolver<Maybe<ResolversTypes['NewBid']>, ParentType, ContextType, RequireFields<QuerynewBidArgs, 'id' | 'subgraphError'>>;
  newBids?: Resolver<Array<ResolversTypes['NewBid']>, ParentType, ContextType, RequireFields<QuerynewBidsArgs, 'skip' | 'first' | 'subgraphError'>>;
  acceptedOffer?: Resolver<Maybe<ResolversTypes['AcceptedOffer']>, ParentType, ContextType, RequireFields<QueryacceptedOfferArgs, 'id' | 'subgraphError'>>;
  acceptedOffers?: Resolver<Array<ResolversTypes['AcceptedOffer']>, ParentType, ContextType, RequireFields<QueryacceptedOffersArgs, 'skip' | 'first' | 'subgraphError'>>;
  cancelledOffer?: Resolver<Maybe<ResolversTypes['CancelledOffer']>, ParentType, ContextType, RequireFields<QuerycancelledOfferArgs, 'id' | 'subgraphError'>>;
  cancelledOffers?: Resolver<Array<ResolversTypes['CancelledOffer']>, ParentType, ContextType, RequireFields<QuerycancelledOffersArgs, 'skip' | 'first' | 'subgraphError'>>;
  newOffer?: Resolver<Maybe<ResolversTypes['NewOffer']>, ParentType, ContextType, RequireFields<QuerynewOfferArgs, 'id' | 'subgraphError'>>;
  newOffers?: Resolver<Array<ResolversTypes['NewOffer']>, ParentType, ContextType, RequireFields<QuerynewOffersArgs, 'skip' | 'first' | 'subgraphError'>>;
  contractURIUpdated?: Resolver<Maybe<ResolversTypes['ContractURIUpdated']>, ParentType, ContextType, RequireFields<QuerycontractURIUpdatedArgs, 'id' | 'subgraphError'>>;
  contractURIUpdateds?: Resolver<Array<ResolversTypes['ContractURIUpdated']>, ParentType, ContextType, RequireFields<QuerycontractURIUpdatedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  extensionAdded?: Resolver<Maybe<ResolversTypes['ExtensionAdded']>, ParentType, ContextType, RequireFields<QueryextensionAddedArgs, 'id' | 'subgraphError'>>;
  extensionAddeds?: Resolver<Array<ResolversTypes['ExtensionAdded']>, ParentType, ContextType, RequireFields<QueryextensionAddedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  extensionRemoved?: Resolver<Maybe<ResolversTypes['ExtensionRemoved']>, ParentType, ContextType, RequireFields<QueryextensionRemovedArgs, 'id' | 'subgraphError'>>;
  extensionRemoveds?: Resolver<Array<ResolversTypes['ExtensionRemoved']>, ParentType, ContextType, RequireFields<QueryextensionRemovedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  extensionReplaced?: Resolver<Maybe<ResolversTypes['ExtensionReplaced']>, ParentType, ContextType, RequireFields<QueryextensionReplacedArgs, 'id' | 'subgraphError'>>;
  extensionReplaceds?: Resolver<Array<ResolversTypes['ExtensionReplaced']>, ParentType, ContextType, RequireFields<QueryextensionReplacedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  flatPlatformFeeUpdated?: Resolver<Maybe<ResolversTypes['FlatPlatformFeeUpdated']>, ParentType, ContextType, RequireFields<QueryflatPlatformFeeUpdatedArgs, 'id' | 'subgraphError'>>;
  flatPlatformFeeUpdateds?: Resolver<Array<ResolversTypes['FlatPlatformFeeUpdated']>, ParentType, ContextType, RequireFields<QueryflatPlatformFeeUpdatedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  functionDisabled?: Resolver<Maybe<ResolversTypes['FunctionDisabled']>, ParentType, ContextType, RequireFields<QueryfunctionDisabledArgs, 'id' | 'subgraphError'>>;
  functionDisableds?: Resolver<Array<ResolversTypes['FunctionDisabled']>, ParentType, ContextType, RequireFields<QueryfunctionDisabledsArgs, 'skip' | 'first' | 'subgraphError'>>;
  functionEnabled?: Resolver<Maybe<ResolversTypes['FunctionEnabled']>, ParentType, ContextType, RequireFields<QueryfunctionEnabledArgs, 'id' | 'subgraphError'>>;
  functionEnableds?: Resolver<Array<ResolversTypes['FunctionEnabled']>, ParentType, ContextType, RequireFields<QueryfunctionEnabledsArgs, 'skip' | 'first' | 'subgraphError'>>;
  initialized?: Resolver<Maybe<ResolversTypes['Initialized']>, ParentType, ContextType, RequireFields<QueryinitializedArgs, 'id' | 'subgraphError'>>;
  initializeds?: Resolver<Array<ResolversTypes['Initialized']>, ParentType, ContextType, RequireFields<QueryinitializedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  platformFeeInfoUpdated?: Resolver<Maybe<ResolversTypes['PlatformFeeInfoUpdated']>, ParentType, ContextType, RequireFields<QueryplatformFeeInfoUpdatedArgs, 'id' | 'subgraphError'>>;
  platformFeeInfoUpdateds?: Resolver<Array<ResolversTypes['PlatformFeeInfoUpdated']>, ParentType, ContextType, RequireFields<QueryplatformFeeInfoUpdatedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  platformFeeTypeUpdated?: Resolver<Maybe<ResolversTypes['PlatformFeeTypeUpdated']>, ParentType, ContextType, RequireFields<QueryplatformFeeTypeUpdatedArgs, 'id' | 'subgraphError'>>;
  platformFeeTypeUpdateds?: Resolver<Array<ResolversTypes['PlatformFeeTypeUpdated']>, ParentType, ContextType, RequireFields<QueryplatformFeeTypeUpdatedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  roleAdminChanged?: Resolver<Maybe<ResolversTypes['RoleAdminChanged']>, ParentType, ContextType, RequireFields<QueryroleAdminChangedArgs, 'id' | 'subgraphError'>>;
  roleAdminChangeds?: Resolver<Array<ResolversTypes['RoleAdminChanged']>, ParentType, ContextType, RequireFields<QueryroleAdminChangedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  roleGranted?: Resolver<Maybe<ResolversTypes['RoleGranted']>, ParentType, ContextType, RequireFields<QueryroleGrantedArgs, 'id' | 'subgraphError'>>;
  roleGranteds?: Resolver<Array<ResolversTypes['RoleGranted']>, ParentType, ContextType, RequireFields<QueryroleGrantedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  roleRevoked?: Resolver<Maybe<ResolversTypes['RoleRevoked']>, ParentType, ContextType, RequireFields<QueryroleRevokedArgs, 'id' | 'subgraphError'>>;
  roleRevokeds?: Resolver<Array<ResolversTypes['RoleRevoked']>, ParentType, ContextType, RequireFields<QueryroleRevokedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  royaltyEngineUpdated?: Resolver<Maybe<ResolversTypes['RoyaltyEngineUpdated']>, ParentType, ContextType, RequireFields<QueryroyaltyEngineUpdatedArgs, 'id' | 'subgraphError'>>;
  royaltyEngineUpdateds?: Resolver<Array<ResolversTypes['RoyaltyEngineUpdated']>, ParentType, ContextType, RequireFields<QueryroyaltyEngineUpdatedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Query_metaArgs>>;
}>;

export type RoleAdminChangedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['RoleAdminChanged'] = ResolversParentTypes['RoleAdminChanged']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  previousAdminRole?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  newAdminRole?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RoleGrantedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['RoleGranted'] = ResolversParentTypes['RoleGranted']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  account?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  sender?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RoleRevokedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['RoleRevoked'] = ResolversParentTypes['RoleRevoked']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  account?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  sender?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RoyaltyEngineUpdatedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['RoyaltyEngineUpdated'] = ResolversParentTypes['RoyaltyEngineUpdated']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  previousAddress?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  newAddress?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubscriptionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  buyerApprovedForListing?: SubscriptionResolver<Maybe<ResolversTypes['BuyerApprovedForListing']>, "buyerApprovedForListing", ParentType, ContextType, RequireFields<SubscriptionbuyerApprovedForListingArgs, 'id' | 'subgraphError'>>;
  buyerApprovedForListings?: SubscriptionResolver<Array<ResolversTypes['BuyerApprovedForListing']>, "buyerApprovedForListings", ParentType, ContextType, RequireFields<SubscriptionbuyerApprovedForListingsArgs, 'skip' | 'first' | 'subgraphError'>>;
  cancelledListing?: SubscriptionResolver<Maybe<ResolversTypes['CancelledListing']>, "cancelledListing", ParentType, ContextType, RequireFields<SubscriptioncancelledListingArgs, 'id' | 'subgraphError'>>;
  cancelledListings?: SubscriptionResolver<Array<ResolversTypes['CancelledListing']>, "cancelledListings", ParentType, ContextType, RequireFields<SubscriptioncancelledListingsArgs, 'skip' | 'first' | 'subgraphError'>>;
  currencyApprovedForListing?: SubscriptionResolver<Maybe<ResolversTypes['CurrencyApprovedForListing']>, "currencyApprovedForListing", ParentType, ContextType, RequireFields<SubscriptioncurrencyApprovedForListingArgs, 'id' | 'subgraphError'>>;
  currencyApprovedForListings?: SubscriptionResolver<Array<ResolversTypes['CurrencyApprovedForListing']>, "currencyApprovedForListings", ParentType, ContextType, RequireFields<SubscriptioncurrencyApprovedForListingsArgs, 'skip' | 'first' | 'subgraphError'>>;
  newListing?: SubscriptionResolver<Maybe<ResolversTypes['NewListing']>, "newListing", ParentType, ContextType, RequireFields<SubscriptionnewListingArgs, 'id' | 'subgraphError'>>;
  newListings?: SubscriptionResolver<Array<ResolversTypes['NewListing']>, "newListings", ParentType, ContextType, RequireFields<SubscriptionnewListingsArgs, 'skip' | 'first' | 'subgraphError'>>;
  newSale?: SubscriptionResolver<Maybe<ResolversTypes['NewSale']>, "newSale", ParentType, ContextType, RequireFields<SubscriptionnewSaleArgs, 'id' | 'subgraphError'>>;
  newSales?: SubscriptionResolver<Array<ResolversTypes['NewSale']>, "newSales", ParentType, ContextType, RequireFields<SubscriptionnewSalesArgs, 'skip' | 'first' | 'subgraphError'>>;
  updatedListing?: SubscriptionResolver<Maybe<ResolversTypes['UpdatedListing']>, "updatedListing", ParentType, ContextType, RequireFields<SubscriptionupdatedListingArgs, 'id' | 'subgraphError'>>;
  updatedListings?: SubscriptionResolver<Array<ResolversTypes['UpdatedListing']>, "updatedListings", ParentType, ContextType, RequireFields<SubscriptionupdatedListingsArgs, 'skip' | 'first' | 'subgraphError'>>;
  auctionClosed?: SubscriptionResolver<Maybe<ResolversTypes['AuctionClosed']>, "auctionClosed", ParentType, ContextType, RequireFields<SubscriptionauctionClosedArgs, 'id' | 'subgraphError'>>;
  auctionCloseds?: SubscriptionResolver<Array<ResolversTypes['AuctionClosed']>, "auctionCloseds", ParentType, ContextType, RequireFields<SubscriptionauctionClosedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  cancelledAuction?: SubscriptionResolver<Maybe<ResolversTypes['CancelledAuction']>, "cancelledAuction", ParentType, ContextType, RequireFields<SubscriptioncancelledAuctionArgs, 'id' | 'subgraphError'>>;
  cancelledAuctions?: SubscriptionResolver<Array<ResolversTypes['CancelledAuction']>, "cancelledAuctions", ParentType, ContextType, RequireFields<SubscriptioncancelledAuctionsArgs, 'skip' | 'first' | 'subgraphError'>>;
  newAuction?: SubscriptionResolver<Maybe<ResolversTypes['NewAuction']>, "newAuction", ParentType, ContextType, RequireFields<SubscriptionnewAuctionArgs, 'id' | 'subgraphError'>>;
  newAuctions?: SubscriptionResolver<Array<ResolversTypes['NewAuction']>, "newAuctions", ParentType, ContextType, RequireFields<SubscriptionnewAuctionsArgs, 'skip' | 'first' | 'subgraphError'>>;
  newBid?: SubscriptionResolver<Maybe<ResolversTypes['NewBid']>, "newBid", ParentType, ContextType, RequireFields<SubscriptionnewBidArgs, 'id' | 'subgraphError'>>;
  newBids?: SubscriptionResolver<Array<ResolversTypes['NewBid']>, "newBids", ParentType, ContextType, RequireFields<SubscriptionnewBidsArgs, 'skip' | 'first' | 'subgraphError'>>;
  acceptedOffer?: SubscriptionResolver<Maybe<ResolversTypes['AcceptedOffer']>, "acceptedOffer", ParentType, ContextType, RequireFields<SubscriptionacceptedOfferArgs, 'id' | 'subgraphError'>>;
  acceptedOffers?: SubscriptionResolver<Array<ResolversTypes['AcceptedOffer']>, "acceptedOffers", ParentType, ContextType, RequireFields<SubscriptionacceptedOffersArgs, 'skip' | 'first' | 'subgraphError'>>;
  cancelledOffer?: SubscriptionResolver<Maybe<ResolversTypes['CancelledOffer']>, "cancelledOffer", ParentType, ContextType, RequireFields<SubscriptioncancelledOfferArgs, 'id' | 'subgraphError'>>;
  cancelledOffers?: SubscriptionResolver<Array<ResolversTypes['CancelledOffer']>, "cancelledOffers", ParentType, ContextType, RequireFields<SubscriptioncancelledOffersArgs, 'skip' | 'first' | 'subgraphError'>>;
  newOffer?: SubscriptionResolver<Maybe<ResolversTypes['NewOffer']>, "newOffer", ParentType, ContextType, RequireFields<SubscriptionnewOfferArgs, 'id' | 'subgraphError'>>;
  newOffers?: SubscriptionResolver<Array<ResolversTypes['NewOffer']>, "newOffers", ParentType, ContextType, RequireFields<SubscriptionnewOffersArgs, 'skip' | 'first' | 'subgraphError'>>;
  contractURIUpdated?: SubscriptionResolver<Maybe<ResolversTypes['ContractURIUpdated']>, "contractURIUpdated", ParentType, ContextType, RequireFields<SubscriptioncontractURIUpdatedArgs, 'id' | 'subgraphError'>>;
  contractURIUpdateds?: SubscriptionResolver<Array<ResolversTypes['ContractURIUpdated']>, "contractURIUpdateds", ParentType, ContextType, RequireFields<SubscriptioncontractURIUpdatedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  extensionAdded?: SubscriptionResolver<Maybe<ResolversTypes['ExtensionAdded']>, "extensionAdded", ParentType, ContextType, RequireFields<SubscriptionextensionAddedArgs, 'id' | 'subgraphError'>>;
  extensionAddeds?: SubscriptionResolver<Array<ResolversTypes['ExtensionAdded']>, "extensionAddeds", ParentType, ContextType, RequireFields<SubscriptionextensionAddedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  extensionRemoved?: SubscriptionResolver<Maybe<ResolversTypes['ExtensionRemoved']>, "extensionRemoved", ParentType, ContextType, RequireFields<SubscriptionextensionRemovedArgs, 'id' | 'subgraphError'>>;
  extensionRemoveds?: SubscriptionResolver<Array<ResolversTypes['ExtensionRemoved']>, "extensionRemoveds", ParentType, ContextType, RequireFields<SubscriptionextensionRemovedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  extensionReplaced?: SubscriptionResolver<Maybe<ResolversTypes['ExtensionReplaced']>, "extensionReplaced", ParentType, ContextType, RequireFields<SubscriptionextensionReplacedArgs, 'id' | 'subgraphError'>>;
  extensionReplaceds?: SubscriptionResolver<Array<ResolversTypes['ExtensionReplaced']>, "extensionReplaceds", ParentType, ContextType, RequireFields<SubscriptionextensionReplacedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  flatPlatformFeeUpdated?: SubscriptionResolver<Maybe<ResolversTypes['FlatPlatformFeeUpdated']>, "flatPlatformFeeUpdated", ParentType, ContextType, RequireFields<SubscriptionflatPlatformFeeUpdatedArgs, 'id' | 'subgraphError'>>;
  flatPlatformFeeUpdateds?: SubscriptionResolver<Array<ResolversTypes['FlatPlatformFeeUpdated']>, "flatPlatformFeeUpdateds", ParentType, ContextType, RequireFields<SubscriptionflatPlatformFeeUpdatedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  functionDisabled?: SubscriptionResolver<Maybe<ResolversTypes['FunctionDisabled']>, "functionDisabled", ParentType, ContextType, RequireFields<SubscriptionfunctionDisabledArgs, 'id' | 'subgraphError'>>;
  functionDisableds?: SubscriptionResolver<Array<ResolversTypes['FunctionDisabled']>, "functionDisableds", ParentType, ContextType, RequireFields<SubscriptionfunctionDisabledsArgs, 'skip' | 'first' | 'subgraphError'>>;
  functionEnabled?: SubscriptionResolver<Maybe<ResolversTypes['FunctionEnabled']>, "functionEnabled", ParentType, ContextType, RequireFields<SubscriptionfunctionEnabledArgs, 'id' | 'subgraphError'>>;
  functionEnableds?: SubscriptionResolver<Array<ResolversTypes['FunctionEnabled']>, "functionEnableds", ParentType, ContextType, RequireFields<SubscriptionfunctionEnabledsArgs, 'skip' | 'first' | 'subgraphError'>>;
  initialized?: SubscriptionResolver<Maybe<ResolversTypes['Initialized']>, "initialized", ParentType, ContextType, RequireFields<SubscriptioninitializedArgs, 'id' | 'subgraphError'>>;
  initializeds?: SubscriptionResolver<Array<ResolversTypes['Initialized']>, "initializeds", ParentType, ContextType, RequireFields<SubscriptioninitializedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  platformFeeInfoUpdated?: SubscriptionResolver<Maybe<ResolversTypes['PlatformFeeInfoUpdated']>, "platformFeeInfoUpdated", ParentType, ContextType, RequireFields<SubscriptionplatformFeeInfoUpdatedArgs, 'id' | 'subgraphError'>>;
  platformFeeInfoUpdateds?: SubscriptionResolver<Array<ResolversTypes['PlatformFeeInfoUpdated']>, "platformFeeInfoUpdateds", ParentType, ContextType, RequireFields<SubscriptionplatformFeeInfoUpdatedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  platformFeeTypeUpdated?: SubscriptionResolver<Maybe<ResolversTypes['PlatformFeeTypeUpdated']>, "platformFeeTypeUpdated", ParentType, ContextType, RequireFields<SubscriptionplatformFeeTypeUpdatedArgs, 'id' | 'subgraphError'>>;
  platformFeeTypeUpdateds?: SubscriptionResolver<Array<ResolversTypes['PlatformFeeTypeUpdated']>, "platformFeeTypeUpdateds", ParentType, ContextType, RequireFields<SubscriptionplatformFeeTypeUpdatedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  roleAdminChanged?: SubscriptionResolver<Maybe<ResolversTypes['RoleAdminChanged']>, "roleAdminChanged", ParentType, ContextType, RequireFields<SubscriptionroleAdminChangedArgs, 'id' | 'subgraphError'>>;
  roleAdminChangeds?: SubscriptionResolver<Array<ResolversTypes['RoleAdminChanged']>, "roleAdminChangeds", ParentType, ContextType, RequireFields<SubscriptionroleAdminChangedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  roleGranted?: SubscriptionResolver<Maybe<ResolversTypes['RoleGranted']>, "roleGranted", ParentType, ContextType, RequireFields<SubscriptionroleGrantedArgs, 'id' | 'subgraphError'>>;
  roleGranteds?: SubscriptionResolver<Array<ResolversTypes['RoleGranted']>, "roleGranteds", ParentType, ContextType, RequireFields<SubscriptionroleGrantedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  roleRevoked?: SubscriptionResolver<Maybe<ResolversTypes['RoleRevoked']>, "roleRevoked", ParentType, ContextType, RequireFields<SubscriptionroleRevokedArgs, 'id' | 'subgraphError'>>;
  roleRevokeds?: SubscriptionResolver<Array<ResolversTypes['RoleRevoked']>, "roleRevokeds", ParentType, ContextType, RequireFields<SubscriptionroleRevokedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  royaltyEngineUpdated?: SubscriptionResolver<Maybe<ResolversTypes['RoyaltyEngineUpdated']>, "royaltyEngineUpdated", ParentType, ContextType, RequireFields<SubscriptionroyaltyEngineUpdatedArgs, 'id' | 'subgraphError'>>;
  royaltyEngineUpdateds?: SubscriptionResolver<Array<ResolversTypes['RoyaltyEngineUpdated']>, "royaltyEngineUpdateds", ParentType, ContextType, RequireFields<SubscriptionroyaltyEngineUpdatedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: SubscriptionResolver<Maybe<ResolversTypes['_Meta_']>, "_meta", ParentType, ContextType, Partial<Subscription_metaArgs>>;
}>;

export interface TimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Timestamp'], any> {
  name: 'Timestamp';
}

export type UpdatedListingResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['UpdatedListing'] = ResolversParentTypes['UpdatedListing']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  listingCreator?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  listingId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  assetContract?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  listing_listingId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  listing_tokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  listing_quantity?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  listing_pricePerToken?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  listing_startTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  listing_endTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  listing_listingCreator?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  listing_assetContract?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  listing_currency?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  listing_tokenType?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  listing_status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  listing_reserved?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  parentHash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  AcceptedOffer?: AcceptedOfferResolvers<ContextType>;
  AuctionClosed?: AuctionClosedResolvers<ContextType>;
  BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  BuyerApprovedForListing?: BuyerApprovedForListingResolvers<ContextType>;
  Bytes?: GraphQLScalarType;
  CancelledAuction?: CancelledAuctionResolvers<ContextType>;
  CancelledListing?: CancelledListingResolvers<ContextType>;
  CancelledOffer?: CancelledOfferResolvers<ContextType>;
  ContractURIUpdated?: ContractURIUpdatedResolvers<ContextType>;
  CurrencyApprovedForListing?: CurrencyApprovedForListingResolvers<ContextType>;
  ExtensionAdded?: ExtensionAddedResolvers<ContextType>;
  ExtensionRemoved?: ExtensionRemovedResolvers<ContextType>;
  ExtensionReplaced?: ExtensionReplacedResolvers<ContextType>;
  FlatPlatformFeeUpdated?: FlatPlatformFeeUpdatedResolvers<ContextType>;
  FunctionDisabled?: FunctionDisabledResolvers<ContextType>;
  FunctionEnabled?: FunctionEnabledResolvers<ContextType>;
  Initialized?: InitializedResolvers<ContextType>;
  Int8?: GraphQLScalarType;
  NewAuction?: NewAuctionResolvers<ContextType>;
  NewBid?: NewBidResolvers<ContextType>;
  NewListing?: NewListingResolvers<ContextType>;
  NewOffer?: NewOfferResolvers<ContextType>;
  NewSale?: NewSaleResolvers<ContextType>;
  PlatformFeeInfoUpdated?: PlatformFeeInfoUpdatedResolvers<ContextType>;
  PlatformFeeTypeUpdated?: PlatformFeeTypeUpdatedResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RoleAdminChanged?: RoleAdminChangedResolvers<ContextType>;
  RoleGranted?: RoleGrantedResolvers<ContextType>;
  RoleRevoked?: RoleRevokedResolvers<ContextType>;
  RoyaltyEngineUpdated?: RoyaltyEngineUpdatedResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Timestamp?: GraphQLScalarType;
  UpdatedListing?: UpdatedListingResolvers<ContextType>;
  _Block_?: _Block_Resolvers<ContextType>;
  _Meta_?: _Meta_Resolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = MeshContext> = ResolversObject<{
  entity?: entityDirectiveResolver<any, any, ContextType>;
  subgraphId?: subgraphIdDirectiveResolver<any, any, ContextType>;
  derivedFrom?: derivedFromDirectiveResolver<any, any, ContextType>;
}>;

export type MeshContext = New7007Types.Context & BaseMeshContext;


import { fileURLToPath } from '@graphql-mesh/utils';
const baseDir = pathModule.join(pathModule.dirname(fileURLToPath(import.meta.url)), '..');

const importFn: ImportFn = <T>(moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  switch(relativeModuleId) {
    case ".graphclient/sources/new7007/introspectionSchema":
      return Promise.resolve(importedModule$0) as T;
    
    default:
      return Promise.reject(new Error(`Cannot find module '${relativeModuleId}'.`));
  }
};

const rootStore = new MeshStore('.graphclient', new FsStoreStorageAdapter({
  cwd: baseDir,
  importFn,
  fileType: "ts",
}), {
  readonly: true,
  validate: false
});

export const rawServeConfig: YamlConfig.Config['serve'] = undefined as any
export async function getMeshOptions(): Promise<GetMeshOptions> {
const pubsub = new PubSub();
const sourcesStore = rootStore.child('sources');
const logger = new DefaultLogger("GraphClient");
const cache = new (MeshCache as any)({
      ...({} as any),
      importFn,
      store: rootStore.child('cache'),
      pubsub,
      logger,
    } as any)

const sources: MeshResolvedSource[] = [];
const transforms: MeshTransform[] = [];
const additionalEnvelopPlugins: MeshPlugin<any>[] = [];
const new7007Transforms = [];
const additionalTypeDefs = [] as any[];
const new7007Handler = new GraphqlHandler({
              name: "new7007",
              config: {"endpoint":"https://api.studio.thegraph.com/query/72917/7007new/v0.0.2"},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("new7007"),
              logger: logger.child("new7007"),
              importFn,
            });
sources[0] = {
          name: 'new7007',
          handler: new7007Handler,
          transforms: new7007Transforms
        }
const additionalResolvers = [] as any[]
const merger = new(BareMerger as any)({
        cache,
        pubsub,
        logger: logger.child('bareMerger'),
        store: rootStore.child('bareMerger')
      })
const documentHashMap = {
        "90e4622826996dac3fc60b10368302abb6ddd4a83812c9054a7041c13b9cd221": StableDiffusionQueryDocument,
"90e4622826996dac3fc60b10368302abb6ddd4a83812c9054a7041c13b9cd221": OpmlQueryDocument
      }
additionalEnvelopPlugins.push(usePersistedOperations({
        getPersistedOperation(key) {
          return documentHashMap[key];
        },
        ...{}
      }))

  return {
    sources,
    transforms,
    additionalTypeDefs,
    additionalResolvers,
    cache,
    pubsub,
    merger,
    logger,
    additionalEnvelopPlugins,
    get documents() {
      return [
      {
        document: StableDiffusionQueryDocument,
        get rawSDL() {
          return printWithCache(StableDiffusionQueryDocument);
        },
        location: 'StableDiffusionQueryDocument.graphql',
        sha256Hash: '90e4622826996dac3fc60b10368302abb6ddd4a83812c9054a7041c13b9cd221'
      },{
        document: OpmlQueryDocument,
        get rawSDL() {
          return printWithCache(OpmlQueryDocument);
        },
        location: 'OpmlQueryDocument.graphql',
        sha256Hash: '90e4622826996dac3fc60b10368302abb6ddd4a83812c9054a7041c13b9cd221'
      }
    ];
    },
    fetchFn,
  };
}

export function createBuiltMeshHTTPHandler<TServerContext = {}>(): MeshHTTPHandler<TServerContext> {
  return createMeshHTTPHandler<TServerContext>({
    baseDir,
    getBuiltMesh: getBuiltGraphClient,
    rawServeConfig: undefined,
  })
}


let meshInstance$: Promise<MeshInstance> | undefined;

export const pollingInterval = null;

export function getBuiltGraphClient(): Promise<MeshInstance> {
  if (meshInstance$ == null) {
    if (pollingInterval) {
      setInterval(() => {
        getMeshOptions()
        .then(meshOptions => getMesh(meshOptions))
        .then(newMesh =>
          meshInstance$.then(oldMesh => {
            oldMesh.destroy()
            meshInstance$ = Promise.resolve(newMesh)
          })
        ).catch(err => {
          console.error("Mesh polling failed so the existing version will be used:", err);
        });
      }, pollingInterval)
    }
    meshInstance$ = getMeshOptions().then(meshOptions => getMesh(meshOptions)).then(mesh => {
      const id = mesh.pubsub.subscribe('destroy', () => {
        meshInstance$ = undefined;
        mesh.pubsub.unsubscribe(id);
      });
      return mesh;
    });
  }
  return meshInstance$;
}

export const execute: ExecuteMeshFn = (...args) => getBuiltGraphClient().then(({ execute }) => execute(...args));

export const subscribe: SubscribeMeshFn = (...args) => getBuiltGraphClient().then(({ subscribe }) => subscribe(...args));
export function getBuiltGraphSDK<TGlobalContext = any, TOperationContext = any>(globalContext?: TGlobalContext) {
  const sdkRequester$ = getBuiltGraphClient().then(({ sdkRequesterFactory }) => sdkRequesterFactory(globalContext));
  return getSdk<TOperationContext, TGlobalContext>((...args) => sdkRequester$.then(sdkRequester => sdkRequester(...args)));
}
export type StableDiffusionQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type StableDiffusionQueryQuery = { newListings: Array<Pick<NewListing, 'listingId' | 'listingCreator' | 'listing_tokenId' | 'listing_status' | 'listing_quantity' | 'listing_pricePerToken' | 'listing_currency' | 'listing_startTimestamp' | 'listing_tokenType' | 'listing_reserved' | 'listing_endTimestamp' | 'listing_assetContract'>>, newSales: Array<Pick<NewSale, 'buyer' | 'listingCreator' | 'listingId' | 'tokenId' | 'totalPricePaid' | 'assetContract' | 'quantityBought'>>, newOffers: Array<Pick<NewOffer, 'offerId' | 'offeror' | 'offer_tokenType' | 'offer_totalPrice' | 'offer_tokenId' | 'offer_status' | 'offer_quantity' | 'offer_offeror' | 'offer_expirationTimestamp' | 'offer_currency' | 'offer_assetContract'>> };

export type OpmlQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type OpmlQueryQuery = { newListings: Array<Pick<NewListing, 'listingId' | 'listingCreator' | 'listing_tokenId' | 'listing_status' | 'listing_quantity' | 'listing_pricePerToken' | 'listing_currency' | 'listing_startTimestamp' | 'listing_tokenType' | 'listing_reserved' | 'listing_endTimestamp' | 'listing_assetContract'>>, newSales: Array<Pick<NewSale, 'buyer' | 'listingCreator' | 'listingId' | 'tokenId' | 'totalPricePaid' | 'assetContract' | 'quantityBought'>>, newOffers: Array<Pick<NewOffer, 'offerId' | 'offeror' | 'offer_tokenType' | 'offer_totalPrice' | 'offer_tokenId' | 'offer_status' | 'offer_quantity' | 'offer_offeror' | 'offer_expirationTimestamp' | 'offer_currency' | 'offer_assetContract'>> };


export const StableDiffusionQueryDocument = gql`
    query StableDiffusionQuery {
  newListings(
    orderBy: listing_listingId
    where: {assetContract_contains: "0x9E35A4c1894697EB93BC781c0C5581c4E97b82A2"}
  ) {
    listingId
    listingCreator
    listing_tokenId
    listing_status
    listing_quantity
    listing_pricePerToken
    listing_currency
    listing_startTimestamp
    listing_tokenType
    listing_reserved
    listing_endTimestamp
    listing_assetContract
  }
  newSales(
    orderBy: listingId
    where: {assetContract_contains: "0x9E35A4c1894697EB93BC781c0C5581c4E97b82A2"}
  ) {
    buyer
    listingCreator
    listingId
    tokenId
    totalPricePaid
    assetContract
    quantityBought
  }
  newOffers(
    orderBy: offerId
    where: {assetContract_contains: "0x9E35A4c1894697EB93BC781c0C5581c4E97b82A2"}
  ) {
    offerId
    offeror
    offer_tokenType
    offer_totalPrice
    offer_tokenId
    offer_status
    offer_quantity
    offer_offeror
    offer_expirationTimestamp
    offer_currency
    offer_assetContract
  }
}
    ` as unknown as DocumentNode<StableDiffusionQueryQuery, StableDiffusionQueryQueryVariables>;
export const OpmlQueryDocument = gql`
    query OpmlQuery {
  newListings(
    orderBy: listing_listingId
    where: {assetContract_contains: "0x491fA4D0B6eDdE8EC8252a32367093C25a9fd14b"}
  ) {
    listingId
    listingCreator
    listing_tokenId
    listing_status
    listing_quantity
    listing_pricePerToken
    listing_currency
    listing_startTimestamp
    listing_tokenType
    listing_reserved
    listing_endTimestamp
    listing_assetContract
  }
  newSales(
    orderBy: listingId
    where: {assetContract_contains: "0x491fA4D0B6eDdE8EC8252a32367093C25a9fd14b"}
  ) {
    buyer
    listingCreator
    listingId
    tokenId
    totalPricePaid
    assetContract
    quantityBought
  }
  newOffers(
    orderBy: offerId
    where: {assetContract_contains: "0x491fA4D0B6eDdE8EC8252a32367093C25a9fd14b"}
  ) {
    offerId
    offeror
    offer_tokenType
    offer_totalPrice
    offer_tokenId
    offer_status
    offer_quantity
    offer_offeror
    offer_expirationTimestamp
    offer_currency
    offer_assetContract
  }
}
    ` as unknown as DocumentNode<OpmlQueryQuery, OpmlQueryQueryVariables>;



export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    StableDiffusionQuery(variables?: StableDiffusionQueryQueryVariables, options?: C): Promise<StableDiffusionQueryQuery> {
      return requester<StableDiffusionQueryQuery, StableDiffusionQueryQueryVariables>(StableDiffusionQueryDocument, variables, options) as Promise<StableDiffusionQueryQuery>;
    },
    OpmlQuery(variables?: OpmlQueryQueryVariables, options?: C): Promise<OpmlQueryQuery> {
      return requester<OpmlQueryQuery, OpmlQueryQueryVariables>(OpmlQueryDocument, variables, options) as Promise<OpmlQueryQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;