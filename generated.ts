import {
  useContractRead,
  UseContractReadConfig,
  useContractWrite,
  UseContractWriteConfig,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
  useContractEvent,
  UseContractEventConfig,
} from 'wagmi'
import {
  ReadContractResult,
  WriteContractMode,
  PrepareWriteContractResult,
} from 'wagmi/actions'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AIGC
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const aigcABI = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
  {
    type: 'error',
    inputs: [
      { name: 'numerator', internalType: 'uint256', type: 'uint256' },
      { name: 'denominator', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC2981InvalidDefaultRoyalty',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC2981InvalidDefaultRoyaltyReceiver',
  },
  {
    type: 'error',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'numerator', internalType: 'uint256', type: 'uint256' },
      { name: 'denominator', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC2981InvalidTokenRoyalty',
  },
  {
    type: 'error',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'receiver', internalType: 'address', type: 'address' },
    ],
    name: 'ERC2981InvalidTokenRoyaltyReceiver',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'ERC721IncorrectOwner',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC721InsufficientApproval',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOperator',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ERC721NonexistentToken',
  },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_fromTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: '_toTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'BatchMetadataUpdate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false,
      },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'MetadataUpdate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'aiModelVm',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'costToken',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getModelIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'vals', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'vals2', internalType: 'string[]', type: 'string[]' },
      { name: 'vals3', internalType: 'address[]', type: 'address[]' },
      { name: '_aiModelVm', internalType: 'bytes32', type: 'bytes32' },
      { name: '_royalty', internalType: 'uint96', type: 'uint96' },
    ],
    name: 'initialize',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'ipOrgAddr',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_tokenURI', internalType: 'string', type: 'string' },
      { name: '_promptHash', internalType: 'bytes32', type: 'bytes32' },
      { name: '_opmlFinalState', internalType: 'bytes32', type: 'bytes32' },
      { name: '_ipAssetMediaUrl', internalType: 'string', type: 'string' },
    ],
    name: 'mint',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'modelIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'modelName',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'opmlLib',
    outputs: [{ name: '', internalType: 'contract IOpmlLib', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'salePrice', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'royaltyInfo',
    outputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'token',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'tokenId',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'verify',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AIGC_Factory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const aigcFactoryABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_aigcContractImpl', internalType: 'address', type: 'address' },
    ],
  },
  { type: 'error', inputs: [], name: 'ERC1167FailedCreateClone' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'aigcAddress',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'aigtAddress',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'AIGC_Created',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'aigcContractImpl',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_modelName', internalType: 'string', type: 'string' },
      { name: '_modelSymbol', internalType: 'string', type: 'string' },
      { name: '_tokenPrice', internalType: 'uint256', type: 'uint256' },
      { name: '_costToken', internalType: 'uint256', type: 'uint256' },
      { name: '_aiModelVm', internalType: 'bytes32', type: 'bytes32' },
      {
        name: '_ownerReservePercent',
        internalType: 'uint256',
        type: 'uint256',
      },
      { name: '_royalty', internalType: 'uint96', type: 'uint96' },
    ],
    name: 'createAIGC',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'deployedAIGCs',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'deployedAIGTs',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_modelIndex', internalType: 'uint256', type: 'uint256' }],
    name: 'getAIGC',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_modelIndex', internalType: 'uint256', type: 'uint256' }],
    name: 'getAIGT',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'modelIndexCurrent',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'modelIndexToIpOrgAddr',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AIGT
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const aigtABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_modelIndex', internalType: 'uint256', type: 'uint256' },
      { name: '_modelName', internalType: 'string', type: 'string' },
      { name: '_modelSymbol', internalType: 'string', type: 'string' },
      { name: '_tokenPrice', internalType: 'uint256', type: 'uint256' },
      { name: '_owner', internalType: 'address', type: 'address' },
      { name: '_maxSupply', internalType: 'uint256', type: 'uint256' },
      {
        name: '_ownerReservePercent',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
  },
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getModelIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getShare',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'maxSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [{ name: '_amount', internalType: 'uint256', type: 'uint256' }],
    name: 'mint',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'modelIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'tokenPrice',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'withdraw',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link aigcABI}__.
 */
export function useAigcRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof aigcABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof aigcABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({ abi: aigcABI, ...config } as UseContractReadConfig<
    typeof aigcABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link aigcABI}__ and `functionName` set to `"aiModelVm"`.
 */
export function useAigcAiModelVm<
  TFunctionName extends 'aiModelVm',
  TSelectData = ReadContractResult<typeof aigcABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof aigcABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: aigcABI,
    functionName: 'aiModelVm',
    ...config,
  } as UseContractReadConfig<typeof aigcABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link aigcABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useAigcBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof aigcABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof aigcABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: aigcABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof aigcABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link aigcABI}__ and `functionName` set to `"costToken"`.
 */
export function useAigcCostToken<
  TFunctionName extends 'costToken',
  TSelectData = ReadContractResult<typeof aigcABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof aigcABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: aigcABI,
    functionName: 'costToken',
    ...config,
  } as UseContractReadConfig<typeof aigcABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link aigcABI}__ and `functionName` set to `"getApproved"`.
 */
export function useAigcGetApproved<
  TFunctionName extends 'getApproved',
  TSelectData = ReadContractResult<typeof aigcABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof aigcABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: aigcABI,
    functionName: 'getApproved',
    ...config,
  } as UseContractReadConfig<typeof aigcABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link aigcABI}__ and `functionName` set to `"getModelIndex"`.
 */
export function useAigcGetModelIndex<
  TFunctionName extends 'getModelIndex',
  TSelectData = ReadContractResult<typeof aigcABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof aigcABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: aigcABI,
    functionName: 'getModelIndex',
    ...config,
  } as UseContractReadConfig<typeof aigcABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link aigcABI}__ and `functionName` set to `"ipOrgAddr"`.
 */
export function useAigcIpOrgAddr<
  TFunctionName extends 'ipOrgAddr',
  TSelectData = ReadContractResult<typeof aigcABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof aigcABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: aigcABI,
    functionName: 'ipOrgAddr',
    ...config,
  } as UseContractReadConfig<typeof aigcABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link aigcABI}__ and `functionName` set to `"isApprovedForAll"`.
 */
export function useAigcIsApprovedForAll<
  TFunctionName extends 'isApprovedForAll',
  TSelectData = ReadContractResult<typeof aigcABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof aigcABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: aigcABI,
    functionName: 'isApprovedForAll',
    ...config,
  } as UseContractReadConfig<typeof aigcABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link aigcABI}__ and `functionName` set to `"modelIndex"`.
 */
export function useAigcModelIndex<
  TFunctionName extends 'modelIndex',
  TSelectData = ReadContractResult<typeof aigcABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof aigcABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: aigcABI,
    functionName: 'modelIndex',
    ...config,
  } as UseContractReadConfig<typeof aigcABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link aigcABI}__ and `functionName` set to `"modelName"`.
 */
export function useAigcModelName<
  TFunctionName extends 'modelName',
  TSelectData = ReadContractResult<typeof aigcABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof aigcABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: aigcABI,
    functionName: 'modelName',
    ...config,
  } as UseContractReadConfig<typeof aigcABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link aigcABI}__ and `functionName` set to `"name"`.
 */
export function useAigcName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof aigcABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof aigcABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: aigcABI,
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof aigcABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link aigcABI}__ and `functionName` set to `"opmlLib"`.
 */
export function useAigcOpmlLib<
  TFunctionName extends 'opmlLib',
  TSelectData = ReadContractResult<typeof aigcABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof aigcABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: aigcABI,
    functionName: 'opmlLib',
    ...config,
  } as UseContractReadConfig<typeof aigcABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link aigcABI}__ and `functionName` set to `"ownerOf"`.
 */
export function useAigcOwnerOf<
  TFunctionName extends 'ownerOf',
  TSelectData = ReadContractResult<typeof aigcABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof aigcABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: aigcABI,
    functionName: 'ownerOf',
    ...config,
  } as UseContractReadConfig<typeof aigcABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link aigcABI}__ and `functionName` set to `"royaltyInfo"`.
 */
export function useAigcRoyaltyInfo<
  TFunctionName extends 'royaltyInfo',
  TSelectData = ReadContractResult<typeof aigcABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof aigcABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: aigcABI,
    functionName: 'royaltyInfo',
    ...config,
  } as UseContractReadConfig<typeof aigcABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link aigcABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useAigcSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof aigcABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof aigcABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: aigcABI,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<typeof aigcABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link aigcABI}__ and `functionName` set to `"symbol"`.
 */
export function useAigcSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof aigcABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof aigcABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: aigcABI,
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof aigcABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link aigcABI}__ and `functionName` set to `"token"`.
 */
export function useAigcToken<
  TFunctionName extends 'token',
  TSelectData = ReadContractResult<typeof aigcABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof aigcABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: aigcABI,
    functionName: 'token',
    ...config,
  } as UseContractReadConfig<typeof aigcABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link aigcABI}__ and `functionName` set to `"tokenId"`.
 */
export function useAigcTokenId<
  TFunctionName extends 'tokenId',
  TSelectData = ReadContractResult<typeof aigcABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof aigcABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: aigcABI,
    functionName: 'tokenId',
    ...config,
  } as UseContractReadConfig<typeof aigcABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link aigcABI}__ and `functionName` set to `"tokenURI"`.
 */
export function useAigcTokenUri<
  TFunctionName extends 'tokenURI',
  TSelectData = ReadContractResult<typeof aigcABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof aigcABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: aigcABI,
    functionName: 'tokenURI',
    ...config,
  } as UseContractReadConfig<typeof aigcABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link aigcABI}__.
 */
export function useAigcWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof aigcABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof aigcABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof aigcABI, TFunctionName, TMode>({
    abi: aigcABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link aigcABI}__ and `functionName` set to `"approve"`.
 */
export function useAigcApprove<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof aigcABI, 'approve'>['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof aigcABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof aigcABI, 'approve', TMode>({
    abi: aigcABI,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link aigcABI}__ and `functionName` set to `"initialize"`.
 */
export function useAigcInitialize<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof aigcABI,
          'initialize'
        >['request']['abi'],
        'initialize',
        TMode
      > & { functionName?: 'initialize' }
    : UseContractWriteConfig<typeof aigcABI, 'initialize', TMode> & {
        abi?: never
        functionName?: 'initialize'
      } = {} as any,
) {
  return useContractWrite<typeof aigcABI, 'initialize', TMode>({
    abi: aigcABI,
    functionName: 'initialize',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link aigcABI}__ and `functionName` set to `"mint"`.
 */
export function useAigcMint<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof aigcABI, 'mint'>['request']['abi'],
        'mint',
        TMode
      > & { functionName?: 'mint' }
    : UseContractWriteConfig<typeof aigcABI, 'mint', TMode> & {
        abi?: never
        functionName?: 'mint'
      } = {} as any,
) {
  return useContractWrite<typeof aigcABI, 'mint', TMode>({
    abi: aigcABI,
    functionName: 'mint',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link aigcABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function useAigcSafeTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof aigcABI,
          'safeTransferFrom'
        >['request']['abi'],
        'safeTransferFrom',
        TMode
      > & { functionName?: 'safeTransferFrom' }
    : UseContractWriteConfig<typeof aigcABI, 'safeTransferFrom', TMode> & {
        abi?: never
        functionName?: 'safeTransferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof aigcABI, 'safeTransferFrom', TMode>({
    abi: aigcABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link aigcABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function useAigcSetApprovalForAll<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof aigcABI,
          'setApprovalForAll'
        >['request']['abi'],
        'setApprovalForAll',
        TMode
      > & { functionName?: 'setApprovalForAll' }
    : UseContractWriteConfig<typeof aigcABI, 'setApprovalForAll', TMode> & {
        abi?: never
        functionName?: 'setApprovalForAll'
      } = {} as any,
) {
  return useContractWrite<typeof aigcABI, 'setApprovalForAll', TMode>({
    abi: aigcABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link aigcABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useAigcTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof aigcABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<typeof aigcABI, 'transferFrom', TMode> & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof aigcABI, 'transferFrom', TMode>({
    abi: aigcABI,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link aigcABI}__ and `functionName` set to `"verify"`.
 */
export function useAigcVerify<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof aigcABI, 'verify'>['request']['abi'],
        'verify',
        TMode
      > & { functionName?: 'verify' }
    : UseContractWriteConfig<typeof aigcABI, 'verify', TMode> & {
        abi?: never
        functionName?: 'verify'
      } = {} as any,
) {
  return useContractWrite<typeof aigcABI, 'verify', TMode>({
    abi: aigcABI,
    functionName: 'verify',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link aigcABI}__.
 */
export function usePrepareAigcWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof aigcABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: aigcABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof aigcABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link aigcABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareAigcApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof aigcABI, 'approve'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: aigcABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof aigcABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link aigcABI}__ and `functionName` set to `"initialize"`.
 */
export function usePrepareAigcInitialize(
  config: Omit<
    UsePrepareContractWriteConfig<typeof aigcABI, 'initialize'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: aigcABI,
    functionName: 'initialize',
    ...config,
  } as UsePrepareContractWriteConfig<typeof aigcABI, 'initialize'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link aigcABI}__ and `functionName` set to `"mint"`.
 */
export function usePrepareAigcMint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof aigcABI, 'mint'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: aigcABI,
    functionName: 'mint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof aigcABI, 'mint'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link aigcABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function usePrepareAigcSafeTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof aigcABI, 'safeTransferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: aigcABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof aigcABI, 'safeTransferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link aigcABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function usePrepareAigcSetApprovalForAll(
  config: Omit<
    UsePrepareContractWriteConfig<typeof aigcABI, 'setApprovalForAll'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: aigcABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as UsePrepareContractWriteConfig<typeof aigcABI, 'setApprovalForAll'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link aigcABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareAigcTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof aigcABI, 'transferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: aigcABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof aigcABI, 'transferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link aigcABI}__ and `functionName` set to `"verify"`.
 */
export function usePrepareAigcVerify(
  config: Omit<
    UsePrepareContractWriteConfig<typeof aigcABI, 'verify'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: aigcABI,
    functionName: 'verify',
    ...config,
  } as UsePrepareContractWriteConfig<typeof aigcABI, 'verify'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link aigcABI}__.
 */
export function useAigcEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof aigcABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({ abi: aigcABI, ...config } as UseContractEventConfig<
    typeof aigcABI,
    TEventName
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link aigcABI}__ and `eventName` set to `"Approval"`.
 */
export function useAigcApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof aigcABI, 'Approval'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: aigcABI,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof aigcABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link aigcABI}__ and `eventName` set to `"ApprovalForAll"`.
 */
export function useAigcApprovalForAllEvent(
  config: Omit<
    UseContractEventConfig<typeof aigcABI, 'ApprovalForAll'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: aigcABI,
    eventName: 'ApprovalForAll',
    ...config,
  } as UseContractEventConfig<typeof aigcABI, 'ApprovalForAll'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link aigcABI}__ and `eventName` set to `"BatchMetadataUpdate"`.
 */
export function useAigcBatchMetadataUpdateEvent(
  config: Omit<
    UseContractEventConfig<typeof aigcABI, 'BatchMetadataUpdate'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: aigcABI,
    eventName: 'BatchMetadataUpdate',
    ...config,
  } as UseContractEventConfig<typeof aigcABI, 'BatchMetadataUpdate'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link aigcABI}__ and `eventName` set to `"Initialized"`.
 */
export function useAigcInitializedEvent(
  config: Omit<
    UseContractEventConfig<typeof aigcABI, 'Initialized'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: aigcABI,
    eventName: 'Initialized',
    ...config,
  } as UseContractEventConfig<typeof aigcABI, 'Initialized'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link aigcABI}__ and `eventName` set to `"MetadataUpdate"`.
 */
export function useAigcMetadataUpdateEvent(
  config: Omit<
    UseContractEventConfig<typeof aigcABI, 'MetadataUpdate'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: aigcABI,
    eventName: 'MetadataUpdate',
    ...config,
  } as UseContractEventConfig<typeof aigcABI, 'MetadataUpdate'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link aigcABI}__ and `eventName` set to `"Transfer"`.
 */
export function useAigcTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof aigcABI, 'Transfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: aigcABI,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof aigcABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link aigcFactoryABI}__.
 */
export function useAigcFactoryRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof aigcFactoryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof aigcFactoryABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: aigcFactoryABI,
    ...config,
  } as UseContractReadConfig<typeof aigcFactoryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link aigcFactoryABI}__ and `functionName` set to `"aigcContractImpl"`.
 */
export function useAigcFactoryAigcContractImpl<
  TFunctionName extends 'aigcContractImpl',
  TSelectData = ReadContractResult<typeof aigcFactoryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof aigcFactoryABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: aigcFactoryABI,
    functionName: 'aigcContractImpl',
    ...config,
  } as UseContractReadConfig<typeof aigcFactoryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link aigcFactoryABI}__ and `functionName` set to `"deployedAIGCs"`.
 */
export function useAigcFactoryDeployedAigCs<
  TFunctionName extends 'deployedAIGCs',
  TSelectData = ReadContractResult<typeof aigcFactoryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof aigcFactoryABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: aigcFactoryABI,
    functionName: 'deployedAIGCs',
    ...config,
  } as UseContractReadConfig<typeof aigcFactoryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link aigcFactoryABI}__ and `functionName` set to `"deployedAIGTs"`.
 */
export function useAigcFactoryDeployedAigTs<
  TFunctionName extends 'deployedAIGTs',
  TSelectData = ReadContractResult<typeof aigcFactoryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof aigcFactoryABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: aigcFactoryABI,
    functionName: 'deployedAIGTs',
    ...config,
  } as UseContractReadConfig<typeof aigcFactoryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link aigcFactoryABI}__ and `functionName` set to `"getAIGC"`.
 */
export function useAigcFactoryGetAigc<
  TFunctionName extends 'getAIGC',
  TSelectData = ReadContractResult<typeof aigcFactoryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof aigcFactoryABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: aigcFactoryABI,
    functionName: 'getAIGC',
    ...config,
  } as UseContractReadConfig<typeof aigcFactoryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link aigcFactoryABI}__ and `functionName` set to `"getAIGT"`.
 */
export function useAigcFactoryGetAigt<
  TFunctionName extends 'getAIGT',
  TSelectData = ReadContractResult<typeof aigcFactoryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof aigcFactoryABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: aigcFactoryABI,
    functionName: 'getAIGT',
    ...config,
  } as UseContractReadConfig<typeof aigcFactoryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link aigcFactoryABI}__ and `functionName` set to `"modelIndexCurrent"`.
 */
export function useAigcFactoryModelIndexCurrent<
  TFunctionName extends 'modelIndexCurrent',
  TSelectData = ReadContractResult<typeof aigcFactoryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof aigcFactoryABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: aigcFactoryABI,
    functionName: 'modelIndexCurrent',
    ...config,
  } as UseContractReadConfig<typeof aigcFactoryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link aigcFactoryABI}__ and `functionName` set to `"modelIndexToIpOrgAddr"`.
 */
export function useAigcFactoryModelIndexToIpOrgAddr<
  TFunctionName extends 'modelIndexToIpOrgAddr',
  TSelectData = ReadContractResult<typeof aigcFactoryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof aigcFactoryABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: aigcFactoryABI,
    functionName: 'modelIndexToIpOrgAddr',
    ...config,
  } as UseContractReadConfig<typeof aigcFactoryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link aigcFactoryABI}__.
 */
export function useAigcFactoryWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof aigcFactoryABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof aigcFactoryABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof aigcFactoryABI, TFunctionName, TMode>({
    abi: aigcFactoryABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link aigcFactoryABI}__ and `functionName` set to `"createAIGC"`.
 */
export function useAigcFactoryCreateAigc<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof aigcFactoryABI,
          'createAIGC'
        >['request']['abi'],
        'createAIGC',
        TMode
      > & { functionName?: 'createAIGC' }
    : UseContractWriteConfig<typeof aigcFactoryABI, 'createAIGC', TMode> & {
        abi?: never
        functionName?: 'createAIGC'
      } = {} as any,
) {
  return useContractWrite<typeof aigcFactoryABI, 'createAIGC', TMode>({
    abi: aigcFactoryABI,
    functionName: 'createAIGC',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link aigcFactoryABI}__.
 */
export function usePrepareAigcFactoryWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof aigcFactoryABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: aigcFactoryABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof aigcFactoryABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link aigcFactoryABI}__ and `functionName` set to `"createAIGC"`.
 */
export function usePrepareAigcFactoryCreateAigc(
  config: Omit<
    UsePrepareContractWriteConfig<typeof aigcFactoryABI, 'createAIGC'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: aigcFactoryABI,
    functionName: 'createAIGC',
    ...config,
  } as UsePrepareContractWriteConfig<typeof aigcFactoryABI, 'createAIGC'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link aigcFactoryABI}__.
 */
export function useAigcFactoryEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof aigcFactoryABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: aigcFactoryABI,
    ...config,
  } as UseContractEventConfig<typeof aigcFactoryABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link aigcFactoryABI}__ and `eventName` set to `"AIGC_Created"`.
 */
export function useAigcFactoryAigcCreatedEvent(
  config: Omit<
    UseContractEventConfig<typeof aigcFactoryABI, 'AIGC_Created'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: aigcFactoryABI,
    eventName: 'AIGC_Created',
    ...config,
  } as UseContractEventConfig<typeof aigcFactoryABI, 'AIGC_Created'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link aigtABI}__.
 */
export function useAigtRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof aigtABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof aigtABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({ abi: aigtABI, ...config } as UseContractReadConfig<
    typeof aigtABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link aigtABI}__ and `functionName` set to `"allowance"`.
 */
export function useAigtAllowance<
  TFunctionName extends 'allowance',
  TSelectData = ReadContractResult<typeof aigtABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof aigtABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: aigtABI,
    functionName: 'allowance',
    ...config,
  } as UseContractReadConfig<typeof aigtABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link aigtABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useAigtBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof aigtABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof aigtABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: aigtABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof aigtABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link aigtABI}__ and `functionName` set to `"decimals"`.
 */
export function useAigtDecimals<
  TFunctionName extends 'decimals',
  TSelectData = ReadContractResult<typeof aigtABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof aigtABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: aigtABI,
    functionName: 'decimals',
    ...config,
  } as UseContractReadConfig<typeof aigtABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link aigtABI}__ and `functionName` set to `"getModelIndex"`.
 */
export function useAigtGetModelIndex<
  TFunctionName extends 'getModelIndex',
  TSelectData = ReadContractResult<typeof aigtABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof aigtABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: aigtABI,
    functionName: 'getModelIndex',
    ...config,
  } as UseContractReadConfig<typeof aigtABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link aigtABI}__ and `functionName` set to `"getShare"`.
 */
export function useAigtGetShare<
  TFunctionName extends 'getShare',
  TSelectData = ReadContractResult<typeof aigtABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof aigtABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: aigtABI,
    functionName: 'getShare',
    ...config,
  } as UseContractReadConfig<typeof aigtABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link aigtABI}__ and `functionName` set to `"maxSupply"`.
 */
export function useAigtMaxSupply<
  TFunctionName extends 'maxSupply',
  TSelectData = ReadContractResult<typeof aigtABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof aigtABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: aigtABI,
    functionName: 'maxSupply',
    ...config,
  } as UseContractReadConfig<typeof aigtABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link aigtABI}__ and `functionName` set to `"modelIndex"`.
 */
export function useAigtModelIndex<
  TFunctionName extends 'modelIndex',
  TSelectData = ReadContractResult<typeof aigtABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof aigtABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: aigtABI,
    functionName: 'modelIndex',
    ...config,
  } as UseContractReadConfig<typeof aigtABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link aigtABI}__ and `functionName` set to `"name"`.
 */
export function useAigtName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof aigtABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof aigtABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: aigtABI,
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof aigtABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link aigtABI}__ and `functionName` set to `"owner"`.
 */
export function useAigtOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof aigtABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof aigtABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: aigtABI,
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof aigtABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link aigtABI}__ and `functionName` set to `"symbol"`.
 */
export function useAigtSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof aigtABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof aigtABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: aigtABI,
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof aigtABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link aigtABI}__ and `functionName` set to `"tokenPrice"`.
 */
export function useAigtTokenPrice<
  TFunctionName extends 'tokenPrice',
  TSelectData = ReadContractResult<typeof aigtABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof aigtABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: aigtABI,
    functionName: 'tokenPrice',
    ...config,
  } as UseContractReadConfig<typeof aigtABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link aigtABI}__ and `functionName` set to `"totalSupply"`.
 */
export function useAigtTotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof aigtABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof aigtABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: aigtABI,
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<typeof aigtABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link aigtABI}__.
 */
export function useAigtWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof aigtABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof aigtABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof aigtABI, TFunctionName, TMode>({
    abi: aigtABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link aigtABI}__ and `functionName` set to `"approve"`.
 */
export function useAigtApprove<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof aigtABI, 'approve'>['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof aigtABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof aigtABI, 'approve', TMode>({
    abi: aigtABI,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link aigtABI}__ and `functionName` set to `"mint"`.
 */
export function useAigtMint<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof aigtABI, 'mint'>['request']['abi'],
        'mint',
        TMode
      > & { functionName?: 'mint' }
    : UseContractWriteConfig<typeof aigtABI, 'mint', TMode> & {
        abi?: never
        functionName?: 'mint'
      } = {} as any,
) {
  return useContractWrite<typeof aigtABI, 'mint', TMode>({
    abi: aigtABI,
    functionName: 'mint',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link aigtABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function useAigtRenounceOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof aigtABI,
          'renounceOwnership'
        >['request']['abi'],
        'renounceOwnership',
        TMode
      > & { functionName?: 'renounceOwnership' }
    : UseContractWriteConfig<typeof aigtABI, 'renounceOwnership', TMode> & {
        abi?: never
        functionName?: 'renounceOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof aigtABI, 'renounceOwnership', TMode>({
    abi: aigtABI,
    functionName: 'renounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link aigtABI}__ and `functionName` set to `"transfer"`.
 */
export function useAigtTransfer<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof aigtABI,
          'transfer'
        >['request']['abi'],
        'transfer',
        TMode
      > & { functionName?: 'transfer' }
    : UseContractWriteConfig<typeof aigtABI, 'transfer', TMode> & {
        abi?: never
        functionName?: 'transfer'
      } = {} as any,
) {
  return useContractWrite<typeof aigtABI, 'transfer', TMode>({
    abi: aigtABI,
    functionName: 'transfer',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link aigtABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useAigtTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof aigtABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<typeof aigtABI, 'transferFrom', TMode> & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof aigtABI, 'transferFrom', TMode>({
    abi: aigtABI,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link aigtABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function useAigtTransferOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof aigtABI,
          'transferOwnership'
        >['request']['abi'],
        'transferOwnership',
        TMode
      > & { functionName?: 'transferOwnership' }
    : UseContractWriteConfig<typeof aigtABI, 'transferOwnership', TMode> & {
        abi?: never
        functionName?: 'transferOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof aigtABI, 'transferOwnership', TMode>({
    abi: aigtABI,
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link aigtABI}__ and `functionName` set to `"withdraw"`.
 */
export function useAigtWithdraw<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof aigtABI,
          'withdraw'
        >['request']['abi'],
        'withdraw',
        TMode
      > & { functionName?: 'withdraw' }
    : UseContractWriteConfig<typeof aigtABI, 'withdraw', TMode> & {
        abi?: never
        functionName?: 'withdraw'
      } = {} as any,
) {
  return useContractWrite<typeof aigtABI, 'withdraw', TMode>({
    abi: aigtABI,
    functionName: 'withdraw',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link aigtABI}__.
 */
export function usePrepareAigtWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof aigtABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: aigtABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof aigtABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link aigtABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareAigtApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof aigtABI, 'approve'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: aigtABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof aigtABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link aigtABI}__ and `functionName` set to `"mint"`.
 */
export function usePrepareAigtMint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof aigtABI, 'mint'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: aigtABI,
    functionName: 'mint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof aigtABI, 'mint'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link aigtABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function usePrepareAigtRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof aigtABI, 'renounceOwnership'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: aigtABI,
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof aigtABI, 'renounceOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link aigtABI}__ and `functionName` set to `"transfer"`.
 */
export function usePrepareAigtTransfer(
  config: Omit<
    UsePrepareContractWriteConfig<typeof aigtABI, 'transfer'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: aigtABI,
    functionName: 'transfer',
    ...config,
  } as UsePrepareContractWriteConfig<typeof aigtABI, 'transfer'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link aigtABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareAigtTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof aigtABI, 'transferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: aigtABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof aigtABI, 'transferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link aigtABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function usePrepareAigtTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof aigtABI, 'transferOwnership'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: aigtABI,
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof aigtABI, 'transferOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link aigtABI}__ and `functionName` set to `"withdraw"`.
 */
export function usePrepareAigtWithdraw(
  config: Omit<
    UsePrepareContractWriteConfig<typeof aigtABI, 'withdraw'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: aigtABI,
    functionName: 'withdraw',
    ...config,
  } as UsePrepareContractWriteConfig<typeof aigtABI, 'withdraw'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link aigtABI}__.
 */
export function useAigtEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof aigtABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({ abi: aigtABI, ...config } as UseContractEventConfig<
    typeof aigtABI,
    TEventName
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link aigtABI}__ and `eventName` set to `"Approval"`.
 */
export function useAigtApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof aigtABI, 'Approval'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: aigtABI,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof aigtABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link aigtABI}__ and `eventName` set to `"OwnershipTransferred"`.
 */
export function useAigtOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof aigtABI, 'OwnershipTransferred'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: aigtABI,
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<typeof aigtABI, 'OwnershipTransferred'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link aigtABI}__ and `eventName` set to `"Transfer"`.
 */
export function useAigtTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof aigtABI, 'Transfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: aigtABI,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof aigtABI, 'Transfer'>)
}
