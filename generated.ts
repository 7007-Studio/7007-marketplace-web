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
    stateMutability: 'payable',
    type: 'function',
    inputs: [{ name: '_tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'buy',
    outputs: [],
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
// DirectListings
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const directListingsABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_nativeTokenWrapper', internalType: 'address', type: 'address' },
    ],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'listingId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'buyer',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'BuyerApprovedForListing',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'listingCreator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'listingId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'CancelledListing',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'listingId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'currency',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'pricePerToken',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'CurrencyApprovedForListing',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'listingCreator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'listingId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'assetContract',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'listing',
        internalType: 'struct IDirectListings.Listing',
        type: 'tuple',
        components: [
          { name: 'listingId', internalType: 'uint256', type: 'uint256' },
          { name: 'listingCreator', internalType: 'address', type: 'address' },
          { name: 'assetContract', internalType: 'address', type: 'address' },
          { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'quantity', internalType: 'uint256', type: 'uint256' },
          { name: 'currency', internalType: 'address', type: 'address' },
          { name: 'pricePerToken', internalType: 'uint256', type: 'uint256' },
          { name: 'startTimestamp', internalType: 'uint128', type: 'uint128' },
          { name: 'endTimestamp', internalType: 'uint128', type: 'uint128' },
          { name: 'reserved', internalType: 'bool', type: 'bool' },
          {
            name: 'tokenType',
            internalType: 'enum IDirectListings.TokenType',
            type: 'uint8',
          },
          {
            name: 'status',
            internalType: 'enum IDirectListings.Status',
            type: 'uint8',
          },
        ],
        indexed: false,
      },
    ],
    name: 'NewListing',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'listingCreator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'listingId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'assetContract',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'buyer',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'quantityBought',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'totalPricePaid',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'NewSale',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'listingCreator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'listingId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'assetContract',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'listing',
        internalType: 'struct IDirectListings.Listing',
        type: 'tuple',
        components: [
          { name: 'listingId', internalType: 'uint256', type: 'uint256' },
          { name: 'listingCreator', internalType: 'address', type: 'address' },
          { name: 'assetContract', internalType: 'address', type: 'address' },
          { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'quantity', internalType: 'uint256', type: 'uint256' },
          { name: 'currency', internalType: 'address', type: 'address' },
          { name: 'pricePerToken', internalType: 'uint256', type: 'uint256' },
          { name: 'startTimestamp', internalType: 'uint128', type: 'uint128' },
          { name: 'endTimestamp', internalType: 'uint128', type: 'uint128' },
          { name: 'reserved', internalType: 'bool', type: 'bool' },
          {
            name: 'tokenType',
            internalType: 'enum IDirectListings.TokenType',
            type: 'uint8',
          },
          {
            name: 'status',
            internalType: 'enum IDirectListings.Status',
            type: 'uint8',
          },
        ],
        indexed: false,
      },
    ],
    name: 'UpdatedListing',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: '_msgData',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: '_msgSender',
    outputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_listingId', internalType: 'uint256', type: 'uint256' },
      { name: '_buyer', internalType: 'address', type: 'address' },
      { name: '_toApprove', internalType: 'bool', type: 'bool' },
    ],
    name: 'approveBuyerForListing',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_listingId', internalType: 'uint256', type: 'uint256' },
      { name: '_currency', internalType: 'address', type: 'address' },
      {
        name: '_pricePerTokenInCurrency',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    name: 'approveCurrencyForListing',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: '_listingId', internalType: 'uint256', type: 'uint256' },
      { name: '_buyFor', internalType: 'address', type: 'address' },
      { name: '_quantity', internalType: 'uint256', type: 'uint256' },
      { name: '_currency', internalType: 'address', type: 'address' },
      { name: '_expectedTotalPrice', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'buyFromListing',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_listingId', internalType: 'uint256', type: 'uint256' }],
    name: 'cancelListing',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_params',
        internalType: 'struct IDirectListings.ListingParameters',
        type: 'tuple',
        components: [
          { name: 'assetContract', internalType: 'address', type: 'address' },
          { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'quantity', internalType: 'uint256', type: 'uint256' },
          { name: 'currency', internalType: 'address', type: 'address' },
          { name: 'pricePerToken', internalType: 'uint256', type: 'uint256' },
          { name: 'startTimestamp', internalType: 'uint128', type: 'uint128' },
          { name: 'endTimestamp', internalType: 'uint128', type: 'uint128' },
          { name: 'reserved', internalType: 'bool', type: 'bool' },
        ],
      },
    ],
    name: 'createListing',
    outputs: [{ name: 'listingId', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_listingId', internalType: 'uint256', type: 'uint256' },
      { name: '_currency', internalType: 'address', type: 'address' },
    ],
    name: 'currencyPriceForListing',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_startId', internalType: 'uint256', type: 'uint256' },
      { name: '_endId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getAllListings',
    outputs: [
      {
        name: '_allListings',
        internalType: 'struct IDirectListings.Listing[]',
        type: 'tuple[]',
        components: [
          { name: 'listingId', internalType: 'uint256', type: 'uint256' },
          { name: 'listingCreator', internalType: 'address', type: 'address' },
          { name: 'assetContract', internalType: 'address', type: 'address' },
          { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'quantity', internalType: 'uint256', type: 'uint256' },
          { name: 'currency', internalType: 'address', type: 'address' },
          { name: 'pricePerToken', internalType: 'uint256', type: 'uint256' },
          { name: 'startTimestamp', internalType: 'uint128', type: 'uint128' },
          { name: 'endTimestamp', internalType: 'uint128', type: 'uint128' },
          { name: 'reserved', internalType: 'bool', type: 'bool' },
          {
            name: 'tokenType',
            internalType: 'enum IDirectListings.TokenType',
            type: 'uint8',
          },
          {
            name: 'status',
            internalType: 'enum IDirectListings.Status',
            type: 'uint8',
          },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_startId', internalType: 'uint256', type: 'uint256' },
      { name: '_endId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getAllValidListings',
    outputs: [
      {
        name: '_validListings',
        internalType: 'struct IDirectListings.Listing[]',
        type: 'tuple[]',
        components: [
          { name: 'listingId', internalType: 'uint256', type: 'uint256' },
          { name: 'listingCreator', internalType: 'address', type: 'address' },
          { name: 'assetContract', internalType: 'address', type: 'address' },
          { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'quantity', internalType: 'uint256', type: 'uint256' },
          { name: 'currency', internalType: 'address', type: 'address' },
          { name: 'pricePerToken', internalType: 'uint256', type: 'uint256' },
          { name: 'startTimestamp', internalType: 'uint128', type: 'uint128' },
          { name: 'endTimestamp', internalType: 'uint128', type: 'uint128' },
          { name: 'reserved', internalType: 'bool', type: 'bool' },
          {
            name: 'tokenType',
            internalType: 'enum IDirectListings.TokenType',
            type: 'uint8',
          },
          {
            name: 'status',
            internalType: 'enum IDirectListings.Status',
            type: 'uint8',
          },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_listingId', internalType: 'uint256', type: 'uint256' }],
    name: 'getListing',
    outputs: [
      {
        name: 'listing',
        internalType: 'struct IDirectListings.Listing',
        type: 'tuple',
        components: [
          { name: 'listingId', internalType: 'uint256', type: 'uint256' },
          { name: 'listingCreator', internalType: 'address', type: 'address' },
          { name: 'assetContract', internalType: 'address', type: 'address' },
          { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'quantity', internalType: 'uint256', type: 'uint256' },
          { name: 'currency', internalType: 'address', type: 'address' },
          { name: 'pricePerToken', internalType: 'uint256', type: 'uint256' },
          { name: 'startTimestamp', internalType: 'uint128', type: 'uint128' },
          { name: 'endTimestamp', internalType: 'uint128', type: 'uint128' },
          { name: 'reserved', internalType: 'bool', type: 'bool' },
          {
            name: 'tokenType',
            internalType: 'enum IDirectListings.TokenType',
            type: 'uint8',
          },
          {
            name: 'status',
            internalType: 'enum IDirectListings.Status',
            type: 'uint8',
          },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_listingId', internalType: 'uint256', type: 'uint256' },
      { name: '_buyer', internalType: 'address', type: 'address' },
    ],
    name: 'isBuyerApprovedForListing',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_listingId', internalType: 'uint256', type: 'uint256' },
      { name: '_currency', internalType: 'address', type: 'address' },
    ],
    name: 'isCurrencyApprovedForListing',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalListings',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_listingId', internalType: 'uint256', type: 'uint256' },
      {
        name: '_params',
        internalType: 'struct IDirectListings.ListingParameters',
        type: 'tuple',
        components: [
          { name: 'assetContract', internalType: 'address', type: 'address' },
          { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'quantity', internalType: 'uint256', type: 'uint256' },
          { name: 'currency', internalType: 'address', type: 'address' },
          { name: 'pricePerToken', internalType: 'uint256', type: 'uint256' },
          { name: 'startTimestamp', internalType: 'uint128', type: 'uint128' },
          { name: 'endTimestamp', internalType: 'uint128', type: 'uint128' },
          { name: 'reserved', internalType: 'bool', type: 'bool' },
        ],
      },
    ],
    name: 'updateListing',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MarketplaceV3
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const marketplaceV3ABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [{ name: '_pluginMap', internalType: 'address', type: 'address' }],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'prevURI',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'newURI',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
    ],
    name: 'ContractURIUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'platformFeeRecipient',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'flatFee',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'FlatPlatformFeeUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'platformFeeRecipient',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'platformFeeBps',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'PlatformFeeInfoUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'feeType',
        internalType: 'enum IPlatformFee.PlatformFeeType',
        type: 'uint8',
        indexed: false,
      },
    ],
    name: 'PlatformFeeTypeUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'functionSelector',
        internalType: 'bytes4',
        type: 'bytes4',
        indexed: true,
      },
      {
        name: 'pluginAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'PluginAdded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'functionSelector',
        internalType: 'bytes4',
        type: 'bytes4',
        indexed: true,
      },
      {
        name: 'pluginAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'PluginRemoved',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'functionSelector',
        internalType: 'bytes4',
        type: 'bytes4',
        indexed: true,
      },
      {
        name: 'functionSignature',
        internalType: 'string',
        type: 'string',
        indexed: true,
      },
      {
        name: 'pluginAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'PluginSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'functionSelector',
        internalType: 'bytes4',
        type: 'bytes4',
        indexed: true,
      },
      {
        name: 'oldPluginAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newPluginAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'PluginUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'previousAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'newAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
    ],
    name: 'RoleAdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleGranted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleRevoked',
  },
  { stateMutability: 'payable', type: 'fallback' },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_plugin',
        internalType: 'struct IPluginMap.Plugin',
        type: 'tuple',
        components: [
          { name: 'functionSelector', internalType: 'bytes4', type: 'bytes4' },
          { name: 'functionSignature', internalType: 'string', type: 'string' },
          { name: 'pluginAddress', internalType: 'address', type: 'address' },
        ],
      },
    ],
    name: 'addPlugin',
    outputs: [],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [],
    name: 'contractType',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'contractURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [],
    name: 'contractVersion',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_pluginAddress', internalType: 'address', type: 'address' },
    ],
    name: 'getAllFunctionsOfPlugin',
    outputs: [
      { name: 'registered', internalType: 'bytes4[]', type: 'bytes4[]' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getAllPlugins',
    outputs: [
      {
        name: 'registered',
        internalType: 'struct IPluginMap.Plugin[]',
        type: 'tuple[]',
        components: [
          { name: 'functionSelector', internalType: 'bytes4', type: 'bytes4' },
          { name: 'functionSignature', internalType: 'string', type: 'string' },
          { name: 'pluginAddress', internalType: 'address', type: 'address' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getPlatformFeeInfo',
    outputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint16', type: 'uint16' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_selector', internalType: 'bytes4', type: 'bytes4' }],
    name: 'getPluginForFunction',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getRoleMember',
    outputs: [{ name: 'member', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleMemberCount',
    outputs: [{ name: 'count', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'grantRole',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'hasRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'hasRoleWithSwitch',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_defaultAdmin', internalType: 'address', type: 'address' },
      { name: '_contractURI', internalType: 'string', type: 'string' },
      {
        name: '_trustedForwarders',
        internalType: 'address[]',
        type: 'address[]',
      },
      {
        name: '_platformFeeRecipient',
        internalType: 'address',
        type: 'address',
      },
      { name: '_platformFeeBps', internalType: 'uint16', type: 'uint16' },
    ],
    name: 'initialize',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'forwarder', internalType: 'address', type: 'address' }],
    name: 'isTrustedForwarder',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes[]', type: 'bytes[]' }],
    name: 'multicall',
    outputs: [{ name: 'results', internalType: 'bytes[]', type: 'bytes[]' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC1155BatchReceived',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC1155Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC721Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'pluginMap',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_selector', internalType: 'bytes4', type: 'bytes4' }],
    name: 'removePlugin',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'renounceRole',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'revokeRole',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_uri', internalType: 'string', type: 'string' }],
    name: 'setContractURI',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_platformFeeRecipient',
        internalType: 'address',
        type: 'address',
      },
      { name: '_platformFeeBps', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setPlatformFeeInfo',
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
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_plugin',
        internalType: 'struct IPluginMap.Plugin',
        type: 'tuple',
        components: [
          { name: 'functionSelector', internalType: 'bytes4', type: 'bytes4' },
          { name: 'functionSignature', internalType: 'string', type: 'string' },
          { name: 'pluginAddress', internalType: 'address', type: 'address' },
        ],
      },
    ],
    name: 'updatePlugin',
    outputs: [],
  },
  { stateMutability: 'payable', type: 'receive' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// NFTMarketplace
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const nftMarketplaceABI = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'AddressInsufficientBalance',
  },
  { type: 'error', inputs: [], name: 'FailedInnerCall' },
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
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'nftContract', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'buy',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'isListed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'nftContract', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'list',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'nftOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
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
// Stake7007
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const stake7007ABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [{ name: 'tokenAddr', internalType: 'address', type: 'address' }],
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
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'consumeInferencePoint',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'consumedInferencePoint',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'getInferencePoint',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
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
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'stake',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'stakeStartTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'stakedAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'token',
    outputs: [
      { name: '', internalType: 'contract Token7007', type: 'address' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Token7007
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const token7007ABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: 'initialOwner', internalType: 'address', type: 'address' },
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
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
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
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link aigcABI}__ and `functionName` set to `"buy"`.
 */
export function useAigcBuy<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof aigcABI, 'buy'>['request']['abi'],
        'buy',
        TMode
      > & { functionName?: 'buy' }
    : UseContractWriteConfig<typeof aigcABI, 'buy', TMode> & {
        abi?: never
        functionName?: 'buy'
      } = {} as any,
) {
  return useContractWrite<typeof aigcABI, 'buy', TMode>({
    abi: aigcABI,
    functionName: 'buy',
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
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link aigcABI}__ and `functionName` set to `"buy"`.
 */
export function usePrepareAigcBuy(
  config: Omit<
    UsePrepareContractWriteConfig<typeof aigcABI, 'buy'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: aigcABI,
    functionName: 'buy',
    ...config,
  } as UsePrepareContractWriteConfig<typeof aigcABI, 'buy'>)
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

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link directListingsABI}__.
 */
export function useDirectListingsRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof directListingsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof directListingsABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: directListingsABI,
    ...config,
  } as UseContractReadConfig<
    typeof directListingsABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link directListingsABI}__ and `functionName` set to `"_msgData"`.
 */
export function useDirectListingsMsgData<
  TFunctionName extends '_msgData',
  TSelectData = ReadContractResult<typeof directListingsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof directListingsABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: directListingsABI,
    functionName: '_msgData',
    ...config,
  } as UseContractReadConfig<
    typeof directListingsABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link directListingsABI}__ and `functionName` set to `"_msgSender"`.
 */
export function useDirectListingsMsgSender<
  TFunctionName extends '_msgSender',
  TSelectData = ReadContractResult<typeof directListingsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof directListingsABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: directListingsABI,
    functionName: '_msgSender',
    ...config,
  } as UseContractReadConfig<
    typeof directListingsABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link directListingsABI}__ and `functionName` set to `"currencyPriceForListing"`.
 */
export function useDirectListingsCurrencyPriceForListing<
  TFunctionName extends 'currencyPriceForListing',
  TSelectData = ReadContractResult<typeof directListingsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof directListingsABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: directListingsABI,
    functionName: 'currencyPriceForListing',
    ...config,
  } as UseContractReadConfig<
    typeof directListingsABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link directListingsABI}__ and `functionName` set to `"getAllListings"`.
 */
export function useDirectListingsGetAllListings<
  TFunctionName extends 'getAllListings',
  TSelectData = ReadContractResult<typeof directListingsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof directListingsABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: directListingsABI,
    functionName: 'getAllListings',
    ...config,
  } as UseContractReadConfig<
    typeof directListingsABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link directListingsABI}__ and `functionName` set to `"getAllValidListings"`.
 */
export function useDirectListingsGetAllValidListings<
  TFunctionName extends 'getAllValidListings',
  TSelectData = ReadContractResult<typeof directListingsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof directListingsABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: directListingsABI,
    functionName: 'getAllValidListings',
    ...config,
  } as UseContractReadConfig<
    typeof directListingsABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link directListingsABI}__ and `functionName` set to `"getListing"`.
 */
export function useDirectListingsGetListing<
  TFunctionName extends 'getListing',
  TSelectData = ReadContractResult<typeof directListingsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof directListingsABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: directListingsABI,
    functionName: 'getListing',
    ...config,
  } as UseContractReadConfig<
    typeof directListingsABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link directListingsABI}__ and `functionName` set to `"isBuyerApprovedForListing"`.
 */
export function useDirectListingsIsBuyerApprovedForListing<
  TFunctionName extends 'isBuyerApprovedForListing',
  TSelectData = ReadContractResult<typeof directListingsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof directListingsABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: directListingsABI,
    functionName: 'isBuyerApprovedForListing',
    ...config,
  } as UseContractReadConfig<
    typeof directListingsABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link directListingsABI}__ and `functionName` set to `"isCurrencyApprovedForListing"`.
 */
export function useDirectListingsIsCurrencyApprovedForListing<
  TFunctionName extends 'isCurrencyApprovedForListing',
  TSelectData = ReadContractResult<typeof directListingsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof directListingsABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: directListingsABI,
    functionName: 'isCurrencyApprovedForListing',
    ...config,
  } as UseContractReadConfig<
    typeof directListingsABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link directListingsABI}__ and `functionName` set to `"totalListings"`.
 */
export function useDirectListingsTotalListings<
  TFunctionName extends 'totalListings',
  TSelectData = ReadContractResult<typeof directListingsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof directListingsABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: directListingsABI,
    functionName: 'totalListings',
    ...config,
  } as UseContractReadConfig<
    typeof directListingsABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link directListingsABI}__.
 */
export function useDirectListingsWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof directListingsABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof directListingsABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof directListingsABI, TFunctionName, TMode>({
    abi: directListingsABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link directListingsABI}__ and `functionName` set to `"approveBuyerForListing"`.
 */
export function useDirectListingsApproveBuyerForListing<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof directListingsABI,
          'approveBuyerForListing'
        >['request']['abi'],
        'approveBuyerForListing',
        TMode
      > & { functionName?: 'approveBuyerForListing' }
    : UseContractWriteConfig<
        typeof directListingsABI,
        'approveBuyerForListing',
        TMode
      > & {
        abi?: never
        functionName?: 'approveBuyerForListing'
      } = {} as any,
) {
  return useContractWrite<
    typeof directListingsABI,
    'approveBuyerForListing',
    TMode
  >({
    abi: directListingsABI,
    functionName: 'approveBuyerForListing',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link directListingsABI}__ and `functionName` set to `"approveCurrencyForListing"`.
 */
export function useDirectListingsApproveCurrencyForListing<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof directListingsABI,
          'approveCurrencyForListing'
        >['request']['abi'],
        'approveCurrencyForListing',
        TMode
      > & { functionName?: 'approveCurrencyForListing' }
    : UseContractWriteConfig<
        typeof directListingsABI,
        'approveCurrencyForListing',
        TMode
      > & {
        abi?: never
        functionName?: 'approveCurrencyForListing'
      } = {} as any,
) {
  return useContractWrite<
    typeof directListingsABI,
    'approveCurrencyForListing',
    TMode
  >({
    abi: directListingsABI,
    functionName: 'approveCurrencyForListing',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link directListingsABI}__ and `functionName` set to `"buyFromListing"`.
 */
export function useDirectListingsBuyFromListing<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof directListingsABI,
          'buyFromListing'
        >['request']['abi'],
        'buyFromListing',
        TMode
      > & { functionName?: 'buyFromListing' }
    : UseContractWriteConfig<
        typeof directListingsABI,
        'buyFromListing',
        TMode
      > & {
        abi?: never
        functionName?: 'buyFromListing'
      } = {} as any,
) {
  return useContractWrite<typeof directListingsABI, 'buyFromListing', TMode>({
    abi: directListingsABI,
    functionName: 'buyFromListing',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link directListingsABI}__ and `functionName` set to `"cancelListing"`.
 */
export function useDirectListingsCancelListing<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof directListingsABI,
          'cancelListing'
        >['request']['abi'],
        'cancelListing',
        TMode
      > & { functionName?: 'cancelListing' }
    : UseContractWriteConfig<
        typeof directListingsABI,
        'cancelListing',
        TMode
      > & {
        abi?: never
        functionName?: 'cancelListing'
      } = {} as any,
) {
  return useContractWrite<typeof directListingsABI, 'cancelListing', TMode>({
    abi: directListingsABI,
    functionName: 'cancelListing',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link directListingsABI}__ and `functionName` set to `"createListing"`.
 */
export function useDirectListingsCreateListing<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof directListingsABI,
          'createListing'
        >['request']['abi'],
        'createListing',
        TMode
      > & { functionName?: 'createListing' }
    : UseContractWriteConfig<
        typeof directListingsABI,
        'createListing',
        TMode
      > & {
        abi?: never
        functionName?: 'createListing'
      } = {} as any,
) {
  return useContractWrite<typeof directListingsABI, 'createListing', TMode>({
    abi: directListingsABI,
    functionName: 'createListing',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link directListingsABI}__ and `functionName` set to `"updateListing"`.
 */
export function useDirectListingsUpdateListing<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof directListingsABI,
          'updateListing'
        >['request']['abi'],
        'updateListing',
        TMode
      > & { functionName?: 'updateListing' }
    : UseContractWriteConfig<
        typeof directListingsABI,
        'updateListing',
        TMode
      > & {
        abi?: never
        functionName?: 'updateListing'
      } = {} as any,
) {
  return useContractWrite<typeof directListingsABI, 'updateListing', TMode>({
    abi: directListingsABI,
    functionName: 'updateListing',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link directListingsABI}__.
 */
export function usePrepareDirectListingsWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof directListingsABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: directListingsABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof directListingsABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link directListingsABI}__ and `functionName` set to `"approveBuyerForListing"`.
 */
export function usePrepareDirectListingsApproveBuyerForListing(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof directListingsABI,
      'approveBuyerForListing'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: directListingsABI,
    functionName: 'approveBuyerForListing',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof directListingsABI,
    'approveBuyerForListing'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link directListingsABI}__ and `functionName` set to `"approveCurrencyForListing"`.
 */
export function usePrepareDirectListingsApproveCurrencyForListing(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof directListingsABI,
      'approveCurrencyForListing'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: directListingsABI,
    functionName: 'approveCurrencyForListing',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof directListingsABI,
    'approveCurrencyForListing'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link directListingsABI}__ and `functionName` set to `"buyFromListing"`.
 */
export function usePrepareDirectListingsBuyFromListing(
  config: Omit<
    UsePrepareContractWriteConfig<typeof directListingsABI, 'buyFromListing'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: directListingsABI,
    functionName: 'buyFromListing',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof directListingsABI,
    'buyFromListing'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link directListingsABI}__ and `functionName` set to `"cancelListing"`.
 */
export function usePrepareDirectListingsCancelListing(
  config: Omit<
    UsePrepareContractWriteConfig<typeof directListingsABI, 'cancelListing'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: directListingsABI,
    functionName: 'cancelListing',
    ...config,
  } as UsePrepareContractWriteConfig<typeof directListingsABI, 'cancelListing'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link directListingsABI}__ and `functionName` set to `"createListing"`.
 */
export function usePrepareDirectListingsCreateListing(
  config: Omit<
    UsePrepareContractWriteConfig<typeof directListingsABI, 'createListing'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: directListingsABI,
    functionName: 'createListing',
    ...config,
  } as UsePrepareContractWriteConfig<typeof directListingsABI, 'createListing'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link directListingsABI}__ and `functionName` set to `"updateListing"`.
 */
export function usePrepareDirectListingsUpdateListing(
  config: Omit<
    UsePrepareContractWriteConfig<typeof directListingsABI, 'updateListing'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: directListingsABI,
    functionName: 'updateListing',
    ...config,
  } as UsePrepareContractWriteConfig<typeof directListingsABI, 'updateListing'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link directListingsABI}__.
 */
export function useDirectListingsEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof directListingsABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: directListingsABI,
    ...config,
  } as UseContractEventConfig<typeof directListingsABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link directListingsABI}__ and `eventName` set to `"BuyerApprovedForListing"`.
 */
export function useDirectListingsBuyerApprovedForListingEvent(
  config: Omit<
    UseContractEventConfig<typeof directListingsABI, 'BuyerApprovedForListing'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: directListingsABI,
    eventName: 'BuyerApprovedForListing',
    ...config,
  } as UseContractEventConfig<
    typeof directListingsABI,
    'BuyerApprovedForListing'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link directListingsABI}__ and `eventName` set to `"CancelledListing"`.
 */
export function useDirectListingsCancelledListingEvent(
  config: Omit<
    UseContractEventConfig<typeof directListingsABI, 'CancelledListing'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: directListingsABI,
    eventName: 'CancelledListing',
    ...config,
  } as UseContractEventConfig<typeof directListingsABI, 'CancelledListing'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link directListingsABI}__ and `eventName` set to `"CurrencyApprovedForListing"`.
 */
export function useDirectListingsCurrencyApprovedForListingEvent(
  config: Omit<
    UseContractEventConfig<
      typeof directListingsABI,
      'CurrencyApprovedForListing'
    >,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: directListingsABI,
    eventName: 'CurrencyApprovedForListing',
    ...config,
  } as UseContractEventConfig<
    typeof directListingsABI,
    'CurrencyApprovedForListing'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link directListingsABI}__ and `eventName` set to `"NewListing"`.
 */
export function useDirectListingsNewListingEvent(
  config: Omit<
    UseContractEventConfig<typeof directListingsABI, 'NewListing'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: directListingsABI,
    eventName: 'NewListing',
    ...config,
  } as UseContractEventConfig<typeof directListingsABI, 'NewListing'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link directListingsABI}__ and `eventName` set to `"NewSale"`.
 */
export function useDirectListingsNewSaleEvent(
  config: Omit<
    UseContractEventConfig<typeof directListingsABI, 'NewSale'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: directListingsABI,
    eventName: 'NewSale',
    ...config,
  } as UseContractEventConfig<typeof directListingsABI, 'NewSale'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link directListingsABI}__ and `eventName` set to `"UpdatedListing"`.
 */
export function useDirectListingsUpdatedListingEvent(
  config: Omit<
    UseContractEventConfig<typeof directListingsABI, 'UpdatedListing'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: directListingsABI,
    eventName: 'UpdatedListing',
    ...config,
  } as UseContractEventConfig<typeof directListingsABI, 'UpdatedListing'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link marketplaceV3ABI}__.
 */
export function useMarketplaceV3Read<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof marketplaceV3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof marketplaceV3ABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: marketplaceV3ABI,
    ...config,
  } as UseContractReadConfig<
    typeof marketplaceV3ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link marketplaceV3ABI}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`.
 */
export function useMarketplaceV3DefaultAdminRole<
  TFunctionName extends 'DEFAULT_ADMIN_ROLE',
  TSelectData = ReadContractResult<typeof marketplaceV3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof marketplaceV3ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: marketplaceV3ABI,
    functionName: 'DEFAULT_ADMIN_ROLE',
    ...config,
  } as UseContractReadConfig<
    typeof marketplaceV3ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link marketplaceV3ABI}__ and `functionName` set to `"contractType"`.
 */
export function useMarketplaceV3ContractType<
  TFunctionName extends 'contractType',
  TSelectData = ReadContractResult<typeof marketplaceV3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof marketplaceV3ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: marketplaceV3ABI,
    functionName: 'contractType',
    ...config,
  } as UseContractReadConfig<
    typeof marketplaceV3ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link marketplaceV3ABI}__ and `functionName` set to `"contractURI"`.
 */
export function useMarketplaceV3ContractUri<
  TFunctionName extends 'contractURI',
  TSelectData = ReadContractResult<typeof marketplaceV3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof marketplaceV3ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: marketplaceV3ABI,
    functionName: 'contractURI',
    ...config,
  } as UseContractReadConfig<
    typeof marketplaceV3ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link marketplaceV3ABI}__ and `functionName` set to `"contractVersion"`.
 */
export function useMarketplaceV3ContractVersion<
  TFunctionName extends 'contractVersion',
  TSelectData = ReadContractResult<typeof marketplaceV3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof marketplaceV3ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: marketplaceV3ABI,
    functionName: 'contractVersion',
    ...config,
  } as UseContractReadConfig<
    typeof marketplaceV3ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link marketplaceV3ABI}__ and `functionName` set to `"getAllFunctionsOfPlugin"`.
 */
export function useMarketplaceV3GetAllFunctionsOfPlugin<
  TFunctionName extends 'getAllFunctionsOfPlugin',
  TSelectData = ReadContractResult<typeof marketplaceV3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof marketplaceV3ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: marketplaceV3ABI,
    functionName: 'getAllFunctionsOfPlugin',
    ...config,
  } as UseContractReadConfig<
    typeof marketplaceV3ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link marketplaceV3ABI}__ and `functionName` set to `"getAllPlugins"`.
 */
export function useMarketplaceV3GetAllPlugins<
  TFunctionName extends 'getAllPlugins',
  TSelectData = ReadContractResult<typeof marketplaceV3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof marketplaceV3ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: marketplaceV3ABI,
    functionName: 'getAllPlugins',
    ...config,
  } as UseContractReadConfig<
    typeof marketplaceV3ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link marketplaceV3ABI}__ and `functionName` set to `"getPlatformFeeInfo"`.
 */
export function useMarketplaceV3GetPlatformFeeInfo<
  TFunctionName extends 'getPlatformFeeInfo',
  TSelectData = ReadContractResult<typeof marketplaceV3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof marketplaceV3ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: marketplaceV3ABI,
    functionName: 'getPlatformFeeInfo',
    ...config,
  } as UseContractReadConfig<
    typeof marketplaceV3ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link marketplaceV3ABI}__ and `functionName` set to `"getPluginForFunction"`.
 */
export function useMarketplaceV3GetPluginForFunction<
  TFunctionName extends 'getPluginForFunction',
  TSelectData = ReadContractResult<typeof marketplaceV3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof marketplaceV3ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: marketplaceV3ABI,
    functionName: 'getPluginForFunction',
    ...config,
  } as UseContractReadConfig<
    typeof marketplaceV3ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link marketplaceV3ABI}__ and `functionName` set to `"getRoleAdmin"`.
 */
export function useMarketplaceV3GetRoleAdmin<
  TFunctionName extends 'getRoleAdmin',
  TSelectData = ReadContractResult<typeof marketplaceV3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof marketplaceV3ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: marketplaceV3ABI,
    functionName: 'getRoleAdmin',
    ...config,
  } as UseContractReadConfig<
    typeof marketplaceV3ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link marketplaceV3ABI}__ and `functionName` set to `"getRoleMember"`.
 */
export function useMarketplaceV3GetRoleMember<
  TFunctionName extends 'getRoleMember',
  TSelectData = ReadContractResult<typeof marketplaceV3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof marketplaceV3ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: marketplaceV3ABI,
    functionName: 'getRoleMember',
    ...config,
  } as UseContractReadConfig<
    typeof marketplaceV3ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link marketplaceV3ABI}__ and `functionName` set to `"getRoleMemberCount"`.
 */
export function useMarketplaceV3GetRoleMemberCount<
  TFunctionName extends 'getRoleMemberCount',
  TSelectData = ReadContractResult<typeof marketplaceV3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof marketplaceV3ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: marketplaceV3ABI,
    functionName: 'getRoleMemberCount',
    ...config,
  } as UseContractReadConfig<
    typeof marketplaceV3ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link marketplaceV3ABI}__ and `functionName` set to `"hasRole"`.
 */
export function useMarketplaceV3HasRole<
  TFunctionName extends 'hasRole',
  TSelectData = ReadContractResult<typeof marketplaceV3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof marketplaceV3ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: marketplaceV3ABI,
    functionName: 'hasRole',
    ...config,
  } as UseContractReadConfig<
    typeof marketplaceV3ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link marketplaceV3ABI}__ and `functionName` set to `"hasRoleWithSwitch"`.
 */
export function useMarketplaceV3HasRoleWithSwitch<
  TFunctionName extends 'hasRoleWithSwitch',
  TSelectData = ReadContractResult<typeof marketplaceV3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof marketplaceV3ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: marketplaceV3ABI,
    functionName: 'hasRoleWithSwitch',
    ...config,
  } as UseContractReadConfig<
    typeof marketplaceV3ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link marketplaceV3ABI}__ and `functionName` set to `"isTrustedForwarder"`.
 */
export function useMarketplaceV3IsTrustedForwarder<
  TFunctionName extends 'isTrustedForwarder',
  TSelectData = ReadContractResult<typeof marketplaceV3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof marketplaceV3ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: marketplaceV3ABI,
    functionName: 'isTrustedForwarder',
    ...config,
  } as UseContractReadConfig<
    typeof marketplaceV3ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link marketplaceV3ABI}__ and `functionName` set to `"onERC721Received"`.
 */
export function useMarketplaceV3OnErc721Received<
  TFunctionName extends 'onERC721Received',
  TSelectData = ReadContractResult<typeof marketplaceV3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof marketplaceV3ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: marketplaceV3ABI,
    functionName: 'onERC721Received',
    ...config,
  } as UseContractReadConfig<
    typeof marketplaceV3ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link marketplaceV3ABI}__ and `functionName` set to `"pluginMap"`.
 */
export function useMarketplaceV3PluginMap<
  TFunctionName extends 'pluginMap',
  TSelectData = ReadContractResult<typeof marketplaceV3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof marketplaceV3ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: marketplaceV3ABI,
    functionName: 'pluginMap',
    ...config,
  } as UseContractReadConfig<
    typeof marketplaceV3ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link marketplaceV3ABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useMarketplaceV3SupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof marketplaceV3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof marketplaceV3ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: marketplaceV3ABI,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<
    typeof marketplaceV3ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link marketplaceV3ABI}__.
 */
export function useMarketplaceV3Write<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof marketplaceV3ABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof marketplaceV3ABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof marketplaceV3ABI, TFunctionName, TMode>({
    abi: marketplaceV3ABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link marketplaceV3ABI}__ and `functionName` set to `"addPlugin"`.
 */
export function useMarketplaceV3AddPlugin<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof marketplaceV3ABI,
          'addPlugin'
        >['request']['abi'],
        'addPlugin',
        TMode
      > & { functionName?: 'addPlugin' }
    : UseContractWriteConfig<typeof marketplaceV3ABI, 'addPlugin', TMode> & {
        abi?: never
        functionName?: 'addPlugin'
      } = {} as any,
) {
  return useContractWrite<typeof marketplaceV3ABI, 'addPlugin', TMode>({
    abi: marketplaceV3ABI,
    functionName: 'addPlugin',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link marketplaceV3ABI}__ and `functionName` set to `"grantRole"`.
 */
export function useMarketplaceV3GrantRole<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof marketplaceV3ABI,
          'grantRole'
        >['request']['abi'],
        'grantRole',
        TMode
      > & { functionName?: 'grantRole' }
    : UseContractWriteConfig<typeof marketplaceV3ABI, 'grantRole', TMode> & {
        abi?: never
        functionName?: 'grantRole'
      } = {} as any,
) {
  return useContractWrite<typeof marketplaceV3ABI, 'grantRole', TMode>({
    abi: marketplaceV3ABI,
    functionName: 'grantRole',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link marketplaceV3ABI}__ and `functionName` set to `"initialize"`.
 */
export function useMarketplaceV3Initialize<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof marketplaceV3ABI,
          'initialize'
        >['request']['abi'],
        'initialize',
        TMode
      > & { functionName?: 'initialize' }
    : UseContractWriteConfig<typeof marketplaceV3ABI, 'initialize', TMode> & {
        abi?: never
        functionName?: 'initialize'
      } = {} as any,
) {
  return useContractWrite<typeof marketplaceV3ABI, 'initialize', TMode>({
    abi: marketplaceV3ABI,
    functionName: 'initialize',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link marketplaceV3ABI}__ and `functionName` set to `"multicall"`.
 */
export function useMarketplaceV3Multicall<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof marketplaceV3ABI,
          'multicall'
        >['request']['abi'],
        'multicall',
        TMode
      > & { functionName?: 'multicall' }
    : UseContractWriteConfig<typeof marketplaceV3ABI, 'multicall', TMode> & {
        abi?: never
        functionName?: 'multicall'
      } = {} as any,
) {
  return useContractWrite<typeof marketplaceV3ABI, 'multicall', TMode>({
    abi: marketplaceV3ABI,
    functionName: 'multicall',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link marketplaceV3ABI}__ and `functionName` set to `"onERC1155BatchReceived"`.
 */
export function useMarketplaceV3OnErc1155BatchReceived<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof marketplaceV3ABI,
          'onERC1155BatchReceived'
        >['request']['abi'],
        'onERC1155BatchReceived',
        TMode
      > & { functionName?: 'onERC1155BatchReceived' }
    : UseContractWriteConfig<
        typeof marketplaceV3ABI,
        'onERC1155BatchReceived',
        TMode
      > & {
        abi?: never
        functionName?: 'onERC1155BatchReceived'
      } = {} as any,
) {
  return useContractWrite<
    typeof marketplaceV3ABI,
    'onERC1155BatchReceived',
    TMode
  >({
    abi: marketplaceV3ABI,
    functionName: 'onERC1155BatchReceived',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link marketplaceV3ABI}__ and `functionName` set to `"onERC1155Received"`.
 */
export function useMarketplaceV3OnErc1155Received<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof marketplaceV3ABI,
          'onERC1155Received'
        >['request']['abi'],
        'onERC1155Received',
        TMode
      > & { functionName?: 'onERC1155Received' }
    : UseContractWriteConfig<
        typeof marketplaceV3ABI,
        'onERC1155Received',
        TMode
      > & {
        abi?: never
        functionName?: 'onERC1155Received'
      } = {} as any,
) {
  return useContractWrite<typeof marketplaceV3ABI, 'onERC1155Received', TMode>({
    abi: marketplaceV3ABI,
    functionName: 'onERC1155Received',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link marketplaceV3ABI}__ and `functionName` set to `"removePlugin"`.
 */
export function useMarketplaceV3RemovePlugin<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof marketplaceV3ABI,
          'removePlugin'
        >['request']['abi'],
        'removePlugin',
        TMode
      > & { functionName?: 'removePlugin' }
    : UseContractWriteConfig<typeof marketplaceV3ABI, 'removePlugin', TMode> & {
        abi?: never
        functionName?: 'removePlugin'
      } = {} as any,
) {
  return useContractWrite<typeof marketplaceV3ABI, 'removePlugin', TMode>({
    abi: marketplaceV3ABI,
    functionName: 'removePlugin',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link marketplaceV3ABI}__ and `functionName` set to `"renounceRole"`.
 */
export function useMarketplaceV3RenounceRole<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof marketplaceV3ABI,
          'renounceRole'
        >['request']['abi'],
        'renounceRole',
        TMode
      > & { functionName?: 'renounceRole' }
    : UseContractWriteConfig<typeof marketplaceV3ABI, 'renounceRole', TMode> & {
        abi?: never
        functionName?: 'renounceRole'
      } = {} as any,
) {
  return useContractWrite<typeof marketplaceV3ABI, 'renounceRole', TMode>({
    abi: marketplaceV3ABI,
    functionName: 'renounceRole',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link marketplaceV3ABI}__ and `functionName` set to `"revokeRole"`.
 */
export function useMarketplaceV3RevokeRole<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof marketplaceV3ABI,
          'revokeRole'
        >['request']['abi'],
        'revokeRole',
        TMode
      > & { functionName?: 'revokeRole' }
    : UseContractWriteConfig<typeof marketplaceV3ABI, 'revokeRole', TMode> & {
        abi?: never
        functionName?: 'revokeRole'
      } = {} as any,
) {
  return useContractWrite<typeof marketplaceV3ABI, 'revokeRole', TMode>({
    abi: marketplaceV3ABI,
    functionName: 'revokeRole',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link marketplaceV3ABI}__ and `functionName` set to `"setContractURI"`.
 */
export function useMarketplaceV3SetContractUri<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof marketplaceV3ABI,
          'setContractURI'
        >['request']['abi'],
        'setContractURI',
        TMode
      > & { functionName?: 'setContractURI' }
    : UseContractWriteConfig<
        typeof marketplaceV3ABI,
        'setContractURI',
        TMode
      > & {
        abi?: never
        functionName?: 'setContractURI'
      } = {} as any,
) {
  return useContractWrite<typeof marketplaceV3ABI, 'setContractURI', TMode>({
    abi: marketplaceV3ABI,
    functionName: 'setContractURI',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link marketplaceV3ABI}__ and `functionName` set to `"setPlatformFeeInfo"`.
 */
export function useMarketplaceV3SetPlatformFeeInfo<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof marketplaceV3ABI,
          'setPlatformFeeInfo'
        >['request']['abi'],
        'setPlatformFeeInfo',
        TMode
      > & { functionName?: 'setPlatformFeeInfo' }
    : UseContractWriteConfig<
        typeof marketplaceV3ABI,
        'setPlatformFeeInfo',
        TMode
      > & {
        abi?: never
        functionName?: 'setPlatformFeeInfo'
      } = {} as any,
) {
  return useContractWrite<typeof marketplaceV3ABI, 'setPlatformFeeInfo', TMode>(
    {
      abi: marketplaceV3ABI,
      functionName: 'setPlatformFeeInfo',
      ...config,
    } as any,
  )
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link marketplaceV3ABI}__ and `functionName` set to `"updatePlugin"`.
 */
export function useMarketplaceV3UpdatePlugin<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof marketplaceV3ABI,
          'updatePlugin'
        >['request']['abi'],
        'updatePlugin',
        TMode
      > & { functionName?: 'updatePlugin' }
    : UseContractWriteConfig<typeof marketplaceV3ABI, 'updatePlugin', TMode> & {
        abi?: never
        functionName?: 'updatePlugin'
      } = {} as any,
) {
  return useContractWrite<typeof marketplaceV3ABI, 'updatePlugin', TMode>({
    abi: marketplaceV3ABI,
    functionName: 'updatePlugin',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link marketplaceV3ABI}__.
 */
export function usePrepareMarketplaceV3Write<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof marketplaceV3ABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: marketplaceV3ABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof marketplaceV3ABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link marketplaceV3ABI}__ and `functionName` set to `"addPlugin"`.
 */
export function usePrepareMarketplaceV3AddPlugin(
  config: Omit<
    UsePrepareContractWriteConfig<typeof marketplaceV3ABI, 'addPlugin'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: marketplaceV3ABI,
    functionName: 'addPlugin',
    ...config,
  } as UsePrepareContractWriteConfig<typeof marketplaceV3ABI, 'addPlugin'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link marketplaceV3ABI}__ and `functionName` set to `"grantRole"`.
 */
export function usePrepareMarketplaceV3GrantRole(
  config: Omit<
    UsePrepareContractWriteConfig<typeof marketplaceV3ABI, 'grantRole'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: marketplaceV3ABI,
    functionName: 'grantRole',
    ...config,
  } as UsePrepareContractWriteConfig<typeof marketplaceV3ABI, 'grantRole'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link marketplaceV3ABI}__ and `functionName` set to `"initialize"`.
 */
export function usePrepareMarketplaceV3Initialize(
  config: Omit<
    UsePrepareContractWriteConfig<typeof marketplaceV3ABI, 'initialize'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: marketplaceV3ABI,
    functionName: 'initialize',
    ...config,
  } as UsePrepareContractWriteConfig<typeof marketplaceV3ABI, 'initialize'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link marketplaceV3ABI}__ and `functionName` set to `"multicall"`.
 */
export function usePrepareMarketplaceV3Multicall(
  config: Omit<
    UsePrepareContractWriteConfig<typeof marketplaceV3ABI, 'multicall'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: marketplaceV3ABI,
    functionName: 'multicall',
    ...config,
  } as UsePrepareContractWriteConfig<typeof marketplaceV3ABI, 'multicall'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link marketplaceV3ABI}__ and `functionName` set to `"onERC1155BatchReceived"`.
 */
export function usePrepareMarketplaceV3OnErc1155BatchReceived(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof marketplaceV3ABI,
      'onERC1155BatchReceived'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: marketplaceV3ABI,
    functionName: 'onERC1155BatchReceived',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof marketplaceV3ABI,
    'onERC1155BatchReceived'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link marketplaceV3ABI}__ and `functionName` set to `"onERC1155Received"`.
 */
export function usePrepareMarketplaceV3OnErc1155Received(
  config: Omit<
    UsePrepareContractWriteConfig<typeof marketplaceV3ABI, 'onERC1155Received'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: marketplaceV3ABI,
    functionName: 'onERC1155Received',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof marketplaceV3ABI,
    'onERC1155Received'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link marketplaceV3ABI}__ and `functionName` set to `"removePlugin"`.
 */
export function usePrepareMarketplaceV3RemovePlugin(
  config: Omit<
    UsePrepareContractWriteConfig<typeof marketplaceV3ABI, 'removePlugin'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: marketplaceV3ABI,
    functionName: 'removePlugin',
    ...config,
  } as UsePrepareContractWriteConfig<typeof marketplaceV3ABI, 'removePlugin'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link marketplaceV3ABI}__ and `functionName` set to `"renounceRole"`.
 */
export function usePrepareMarketplaceV3RenounceRole(
  config: Omit<
    UsePrepareContractWriteConfig<typeof marketplaceV3ABI, 'renounceRole'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: marketplaceV3ABI,
    functionName: 'renounceRole',
    ...config,
  } as UsePrepareContractWriteConfig<typeof marketplaceV3ABI, 'renounceRole'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link marketplaceV3ABI}__ and `functionName` set to `"revokeRole"`.
 */
export function usePrepareMarketplaceV3RevokeRole(
  config: Omit<
    UsePrepareContractWriteConfig<typeof marketplaceV3ABI, 'revokeRole'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: marketplaceV3ABI,
    functionName: 'revokeRole',
    ...config,
  } as UsePrepareContractWriteConfig<typeof marketplaceV3ABI, 'revokeRole'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link marketplaceV3ABI}__ and `functionName` set to `"setContractURI"`.
 */
export function usePrepareMarketplaceV3SetContractUri(
  config: Omit<
    UsePrepareContractWriteConfig<typeof marketplaceV3ABI, 'setContractURI'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: marketplaceV3ABI,
    functionName: 'setContractURI',
    ...config,
  } as UsePrepareContractWriteConfig<typeof marketplaceV3ABI, 'setContractURI'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link marketplaceV3ABI}__ and `functionName` set to `"setPlatformFeeInfo"`.
 */
export function usePrepareMarketplaceV3SetPlatformFeeInfo(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof marketplaceV3ABI,
      'setPlatformFeeInfo'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: marketplaceV3ABI,
    functionName: 'setPlatformFeeInfo',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof marketplaceV3ABI,
    'setPlatformFeeInfo'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link marketplaceV3ABI}__ and `functionName` set to `"updatePlugin"`.
 */
export function usePrepareMarketplaceV3UpdatePlugin(
  config: Omit<
    UsePrepareContractWriteConfig<typeof marketplaceV3ABI, 'updatePlugin'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: marketplaceV3ABI,
    functionName: 'updatePlugin',
    ...config,
  } as UsePrepareContractWriteConfig<typeof marketplaceV3ABI, 'updatePlugin'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link marketplaceV3ABI}__.
 */
export function useMarketplaceV3Event<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof marketplaceV3ABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: marketplaceV3ABI,
    ...config,
  } as UseContractEventConfig<typeof marketplaceV3ABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link marketplaceV3ABI}__ and `eventName` set to `"ContractURIUpdated"`.
 */
export function useMarketplaceV3ContractUriUpdatedEvent(
  config: Omit<
    UseContractEventConfig<typeof marketplaceV3ABI, 'ContractURIUpdated'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: marketplaceV3ABI,
    eventName: 'ContractURIUpdated',
    ...config,
  } as UseContractEventConfig<typeof marketplaceV3ABI, 'ContractURIUpdated'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link marketplaceV3ABI}__ and `eventName` set to `"FlatPlatformFeeUpdated"`.
 */
export function useMarketplaceV3FlatPlatformFeeUpdatedEvent(
  config: Omit<
    UseContractEventConfig<typeof marketplaceV3ABI, 'FlatPlatformFeeUpdated'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: marketplaceV3ABI,
    eventName: 'FlatPlatformFeeUpdated',
    ...config,
  } as UseContractEventConfig<
    typeof marketplaceV3ABI,
    'FlatPlatformFeeUpdated'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link marketplaceV3ABI}__ and `eventName` set to `"PlatformFeeInfoUpdated"`.
 */
export function useMarketplaceV3PlatformFeeInfoUpdatedEvent(
  config: Omit<
    UseContractEventConfig<typeof marketplaceV3ABI, 'PlatformFeeInfoUpdated'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: marketplaceV3ABI,
    eventName: 'PlatformFeeInfoUpdated',
    ...config,
  } as UseContractEventConfig<
    typeof marketplaceV3ABI,
    'PlatformFeeInfoUpdated'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link marketplaceV3ABI}__ and `eventName` set to `"PlatformFeeTypeUpdated"`.
 */
export function useMarketplaceV3PlatformFeeTypeUpdatedEvent(
  config: Omit<
    UseContractEventConfig<typeof marketplaceV3ABI, 'PlatformFeeTypeUpdated'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: marketplaceV3ABI,
    eventName: 'PlatformFeeTypeUpdated',
    ...config,
  } as UseContractEventConfig<
    typeof marketplaceV3ABI,
    'PlatformFeeTypeUpdated'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link marketplaceV3ABI}__ and `eventName` set to `"PluginAdded"`.
 */
export function useMarketplaceV3PluginAddedEvent(
  config: Omit<
    UseContractEventConfig<typeof marketplaceV3ABI, 'PluginAdded'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: marketplaceV3ABI,
    eventName: 'PluginAdded',
    ...config,
  } as UseContractEventConfig<typeof marketplaceV3ABI, 'PluginAdded'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link marketplaceV3ABI}__ and `eventName` set to `"PluginRemoved"`.
 */
export function useMarketplaceV3PluginRemovedEvent(
  config: Omit<
    UseContractEventConfig<typeof marketplaceV3ABI, 'PluginRemoved'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: marketplaceV3ABI,
    eventName: 'PluginRemoved',
    ...config,
  } as UseContractEventConfig<typeof marketplaceV3ABI, 'PluginRemoved'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link marketplaceV3ABI}__ and `eventName` set to `"PluginSet"`.
 */
export function useMarketplaceV3PluginSetEvent(
  config: Omit<
    UseContractEventConfig<typeof marketplaceV3ABI, 'PluginSet'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: marketplaceV3ABI,
    eventName: 'PluginSet',
    ...config,
  } as UseContractEventConfig<typeof marketplaceV3ABI, 'PluginSet'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link marketplaceV3ABI}__ and `eventName` set to `"PluginUpdated"`.
 */
export function useMarketplaceV3PluginUpdatedEvent(
  config: Omit<
    UseContractEventConfig<typeof marketplaceV3ABI, 'PluginUpdated'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: marketplaceV3ABI,
    eventName: 'PluginUpdated',
    ...config,
  } as UseContractEventConfig<typeof marketplaceV3ABI, 'PluginUpdated'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link marketplaceV3ABI}__ and `eventName` set to `"RoleAdminChanged"`.
 */
export function useMarketplaceV3RoleAdminChangedEvent(
  config: Omit<
    UseContractEventConfig<typeof marketplaceV3ABI, 'RoleAdminChanged'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: marketplaceV3ABI,
    eventName: 'RoleAdminChanged',
    ...config,
  } as UseContractEventConfig<typeof marketplaceV3ABI, 'RoleAdminChanged'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link marketplaceV3ABI}__ and `eventName` set to `"RoleGranted"`.
 */
export function useMarketplaceV3RoleGrantedEvent(
  config: Omit<
    UseContractEventConfig<typeof marketplaceV3ABI, 'RoleGranted'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: marketplaceV3ABI,
    eventName: 'RoleGranted',
    ...config,
  } as UseContractEventConfig<typeof marketplaceV3ABI, 'RoleGranted'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link marketplaceV3ABI}__ and `eventName` set to `"RoleRevoked"`.
 */
export function useMarketplaceV3RoleRevokedEvent(
  config: Omit<
    UseContractEventConfig<typeof marketplaceV3ABI, 'RoleRevoked'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: marketplaceV3ABI,
    eventName: 'RoleRevoked',
    ...config,
  } as UseContractEventConfig<typeof marketplaceV3ABI, 'RoleRevoked'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link nftMarketplaceABI}__.
 */
export function useNftMarketplaceRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof nftMarketplaceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof nftMarketplaceABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: nftMarketplaceABI,
    ...config,
  } as UseContractReadConfig<
    typeof nftMarketplaceABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link nftMarketplaceABI}__ and `functionName` set to `"isListed"`.
 */
export function useNftMarketplaceIsListed<
  TFunctionName extends 'isListed',
  TSelectData = ReadContractResult<typeof nftMarketplaceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof nftMarketplaceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: nftMarketplaceABI,
    functionName: 'isListed',
    ...config,
  } as UseContractReadConfig<
    typeof nftMarketplaceABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link nftMarketplaceABI}__ and `functionName` set to `"nftOwner"`.
 */
export function useNftMarketplaceNftOwner<
  TFunctionName extends 'nftOwner',
  TSelectData = ReadContractResult<typeof nftMarketplaceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof nftMarketplaceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: nftMarketplaceABI,
    functionName: 'nftOwner',
    ...config,
  } as UseContractReadConfig<
    typeof nftMarketplaceABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link nftMarketplaceABI}__ and `functionName` set to `"owner"`.
 */
export function useNftMarketplaceOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof nftMarketplaceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof nftMarketplaceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: nftMarketplaceABI,
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<
    typeof nftMarketplaceABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link nftMarketplaceABI}__.
 */
export function useNftMarketplaceWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof nftMarketplaceABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof nftMarketplaceABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof nftMarketplaceABI, TFunctionName, TMode>({
    abi: nftMarketplaceABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link nftMarketplaceABI}__ and `functionName` set to `"buy"`.
 */
export function useNftMarketplaceBuy<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof nftMarketplaceABI,
          'buy'
        >['request']['abi'],
        'buy',
        TMode
      > & { functionName?: 'buy' }
    : UseContractWriteConfig<typeof nftMarketplaceABI, 'buy', TMode> & {
        abi?: never
        functionName?: 'buy'
      } = {} as any,
) {
  return useContractWrite<typeof nftMarketplaceABI, 'buy', TMode>({
    abi: nftMarketplaceABI,
    functionName: 'buy',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link nftMarketplaceABI}__ and `functionName` set to `"list"`.
 */
export function useNftMarketplaceList<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof nftMarketplaceABI,
          'list'
        >['request']['abi'],
        'list',
        TMode
      > & { functionName?: 'list' }
    : UseContractWriteConfig<typeof nftMarketplaceABI, 'list', TMode> & {
        abi?: never
        functionName?: 'list'
      } = {} as any,
) {
  return useContractWrite<typeof nftMarketplaceABI, 'list', TMode>({
    abi: nftMarketplaceABI,
    functionName: 'list',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link nftMarketplaceABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function useNftMarketplaceRenounceOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof nftMarketplaceABI,
          'renounceOwnership'
        >['request']['abi'],
        'renounceOwnership',
        TMode
      > & { functionName?: 'renounceOwnership' }
    : UseContractWriteConfig<
        typeof nftMarketplaceABI,
        'renounceOwnership',
        TMode
      > & {
        abi?: never
        functionName?: 'renounceOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof nftMarketplaceABI, 'renounceOwnership', TMode>(
    {
      abi: nftMarketplaceABI,
      functionName: 'renounceOwnership',
      ...config,
    } as any,
  )
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link nftMarketplaceABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function useNftMarketplaceTransferOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof nftMarketplaceABI,
          'transferOwnership'
        >['request']['abi'],
        'transferOwnership',
        TMode
      > & { functionName?: 'transferOwnership' }
    : UseContractWriteConfig<
        typeof nftMarketplaceABI,
        'transferOwnership',
        TMode
      > & {
        abi?: never
        functionName?: 'transferOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof nftMarketplaceABI, 'transferOwnership', TMode>(
    {
      abi: nftMarketplaceABI,
      functionName: 'transferOwnership',
      ...config,
    } as any,
  )
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link nftMarketplaceABI}__ and `functionName` set to `"withdraw"`.
 */
export function useNftMarketplaceWithdraw<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof nftMarketplaceABI,
          'withdraw'
        >['request']['abi'],
        'withdraw',
        TMode
      > & { functionName?: 'withdraw' }
    : UseContractWriteConfig<typeof nftMarketplaceABI, 'withdraw', TMode> & {
        abi?: never
        functionName?: 'withdraw'
      } = {} as any,
) {
  return useContractWrite<typeof nftMarketplaceABI, 'withdraw', TMode>({
    abi: nftMarketplaceABI,
    functionName: 'withdraw',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link nftMarketplaceABI}__.
 */
export function usePrepareNftMarketplaceWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof nftMarketplaceABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: nftMarketplaceABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof nftMarketplaceABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link nftMarketplaceABI}__ and `functionName` set to `"buy"`.
 */
export function usePrepareNftMarketplaceBuy(
  config: Omit<
    UsePrepareContractWriteConfig<typeof nftMarketplaceABI, 'buy'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: nftMarketplaceABI,
    functionName: 'buy',
    ...config,
  } as UsePrepareContractWriteConfig<typeof nftMarketplaceABI, 'buy'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link nftMarketplaceABI}__ and `functionName` set to `"list"`.
 */
export function usePrepareNftMarketplaceList(
  config: Omit<
    UsePrepareContractWriteConfig<typeof nftMarketplaceABI, 'list'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: nftMarketplaceABI,
    functionName: 'list',
    ...config,
  } as UsePrepareContractWriteConfig<typeof nftMarketplaceABI, 'list'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link nftMarketplaceABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function usePrepareNftMarketplaceRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof nftMarketplaceABI,
      'renounceOwnership'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: nftMarketplaceABI,
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof nftMarketplaceABI,
    'renounceOwnership'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link nftMarketplaceABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function usePrepareNftMarketplaceTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof nftMarketplaceABI,
      'transferOwnership'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: nftMarketplaceABI,
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof nftMarketplaceABI,
    'transferOwnership'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link nftMarketplaceABI}__ and `functionName` set to `"withdraw"`.
 */
export function usePrepareNftMarketplaceWithdraw(
  config: Omit<
    UsePrepareContractWriteConfig<typeof nftMarketplaceABI, 'withdraw'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: nftMarketplaceABI,
    functionName: 'withdraw',
    ...config,
  } as UsePrepareContractWriteConfig<typeof nftMarketplaceABI, 'withdraw'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link nftMarketplaceABI}__.
 */
export function useNftMarketplaceEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof nftMarketplaceABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: nftMarketplaceABI,
    ...config,
  } as UseContractEventConfig<typeof nftMarketplaceABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link nftMarketplaceABI}__ and `eventName` set to `"OwnershipTransferred"`.
 */
export function useNftMarketplaceOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof nftMarketplaceABI, 'OwnershipTransferred'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: nftMarketplaceABI,
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<typeof nftMarketplaceABI, 'OwnershipTransferred'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link stake7007ABI}__.
 */
export function useStake7007Read<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof stake7007ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof stake7007ABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: stake7007ABI,
    ...config,
  } as UseContractReadConfig<typeof stake7007ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link stake7007ABI}__ and `functionName` set to `"consumedInferencePoint"`.
 */
export function useStake7007ConsumedInferencePoint<
  TFunctionName extends 'consumedInferencePoint',
  TSelectData = ReadContractResult<typeof stake7007ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof stake7007ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: stake7007ABI,
    functionName: 'consumedInferencePoint',
    ...config,
  } as UseContractReadConfig<typeof stake7007ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link stake7007ABI}__ and `functionName` set to `"getInferencePoint"`.
 */
export function useStake7007GetInferencePoint<
  TFunctionName extends 'getInferencePoint',
  TSelectData = ReadContractResult<typeof stake7007ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof stake7007ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: stake7007ABI,
    functionName: 'getInferencePoint',
    ...config,
  } as UseContractReadConfig<typeof stake7007ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link stake7007ABI}__ and `functionName` set to `"owner"`.
 */
export function useStake7007Owner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof stake7007ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof stake7007ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: stake7007ABI,
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof stake7007ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link stake7007ABI}__ and `functionName` set to `"stakeStartTime"`.
 */
export function useStake7007StakeStartTime<
  TFunctionName extends 'stakeStartTime',
  TSelectData = ReadContractResult<typeof stake7007ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof stake7007ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: stake7007ABI,
    functionName: 'stakeStartTime',
    ...config,
  } as UseContractReadConfig<typeof stake7007ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link stake7007ABI}__ and `functionName` set to `"stakedAmount"`.
 */
export function useStake7007StakedAmount<
  TFunctionName extends 'stakedAmount',
  TSelectData = ReadContractResult<typeof stake7007ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof stake7007ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: stake7007ABI,
    functionName: 'stakedAmount',
    ...config,
  } as UseContractReadConfig<typeof stake7007ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link stake7007ABI}__ and `functionName` set to `"token"`.
 */
export function useStake7007Token<
  TFunctionName extends 'token',
  TSelectData = ReadContractResult<typeof stake7007ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof stake7007ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: stake7007ABI,
    functionName: 'token',
    ...config,
  } as UseContractReadConfig<typeof stake7007ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link stake7007ABI}__.
 */
export function useStake7007Write<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof stake7007ABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof stake7007ABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof stake7007ABI, TFunctionName, TMode>({
    abi: stake7007ABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link stake7007ABI}__ and `functionName` set to `"consumeInferencePoint"`.
 */
export function useStake7007ConsumeInferencePoint<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof stake7007ABI,
          'consumeInferencePoint'
        >['request']['abi'],
        'consumeInferencePoint',
        TMode
      > & { functionName?: 'consumeInferencePoint' }
    : UseContractWriteConfig<
        typeof stake7007ABI,
        'consumeInferencePoint',
        TMode
      > & {
        abi?: never
        functionName?: 'consumeInferencePoint'
      } = {} as any,
) {
  return useContractWrite<typeof stake7007ABI, 'consumeInferencePoint', TMode>({
    abi: stake7007ABI,
    functionName: 'consumeInferencePoint',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link stake7007ABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function useStake7007RenounceOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof stake7007ABI,
          'renounceOwnership'
        >['request']['abi'],
        'renounceOwnership',
        TMode
      > & { functionName?: 'renounceOwnership' }
    : UseContractWriteConfig<
        typeof stake7007ABI,
        'renounceOwnership',
        TMode
      > & {
        abi?: never
        functionName?: 'renounceOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof stake7007ABI, 'renounceOwnership', TMode>({
    abi: stake7007ABI,
    functionName: 'renounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link stake7007ABI}__ and `functionName` set to `"stake"`.
 */
export function useStake7007Stake<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof stake7007ABI,
          'stake'
        >['request']['abi'],
        'stake',
        TMode
      > & { functionName?: 'stake' }
    : UseContractWriteConfig<typeof stake7007ABI, 'stake', TMode> & {
        abi?: never
        functionName?: 'stake'
      } = {} as any,
) {
  return useContractWrite<typeof stake7007ABI, 'stake', TMode>({
    abi: stake7007ABI,
    functionName: 'stake',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link stake7007ABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function useStake7007TransferOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof stake7007ABI,
          'transferOwnership'
        >['request']['abi'],
        'transferOwnership',
        TMode
      > & { functionName?: 'transferOwnership' }
    : UseContractWriteConfig<
        typeof stake7007ABI,
        'transferOwnership',
        TMode
      > & {
        abi?: never
        functionName?: 'transferOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof stake7007ABI, 'transferOwnership', TMode>({
    abi: stake7007ABI,
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link stake7007ABI}__.
 */
export function usePrepareStake7007Write<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof stake7007ABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: stake7007ABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof stake7007ABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link stake7007ABI}__ and `functionName` set to `"consumeInferencePoint"`.
 */
export function usePrepareStake7007ConsumeInferencePoint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof stake7007ABI, 'consumeInferencePoint'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: stake7007ABI,
    functionName: 'consumeInferencePoint',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof stake7007ABI,
    'consumeInferencePoint'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link stake7007ABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function usePrepareStake7007RenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof stake7007ABI, 'renounceOwnership'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: stake7007ABI,
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof stake7007ABI, 'renounceOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link stake7007ABI}__ and `functionName` set to `"stake"`.
 */
export function usePrepareStake7007Stake(
  config: Omit<
    UsePrepareContractWriteConfig<typeof stake7007ABI, 'stake'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: stake7007ABI,
    functionName: 'stake',
    ...config,
  } as UsePrepareContractWriteConfig<typeof stake7007ABI, 'stake'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link stake7007ABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function usePrepareStake7007TransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof stake7007ABI, 'transferOwnership'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: stake7007ABI,
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof stake7007ABI, 'transferOwnership'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link stake7007ABI}__.
 */
export function useStake7007Event<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof stake7007ABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: stake7007ABI,
    ...config,
  } as UseContractEventConfig<typeof stake7007ABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link stake7007ABI}__ and `eventName` set to `"OwnershipTransferred"`.
 */
export function useStake7007OwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof stake7007ABI, 'OwnershipTransferred'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: stake7007ABI,
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<typeof stake7007ABI, 'OwnershipTransferred'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link token7007ABI}__.
 */
export function useToken7007Read<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof token7007ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof token7007ABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: token7007ABI,
    ...config,
  } as UseContractReadConfig<typeof token7007ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link token7007ABI}__ and `functionName` set to `"allowance"`.
 */
export function useToken7007Allowance<
  TFunctionName extends 'allowance',
  TSelectData = ReadContractResult<typeof token7007ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof token7007ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: token7007ABI,
    functionName: 'allowance',
    ...config,
  } as UseContractReadConfig<typeof token7007ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link token7007ABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useToken7007BalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof token7007ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof token7007ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: token7007ABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof token7007ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link token7007ABI}__ and `functionName` set to `"decimals"`.
 */
export function useToken7007Decimals<
  TFunctionName extends 'decimals',
  TSelectData = ReadContractResult<typeof token7007ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof token7007ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: token7007ABI,
    functionName: 'decimals',
    ...config,
  } as UseContractReadConfig<typeof token7007ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link token7007ABI}__ and `functionName` set to `"name"`.
 */
export function useToken7007Name<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof token7007ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof token7007ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: token7007ABI,
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof token7007ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link token7007ABI}__ and `functionName` set to `"owner"`.
 */
export function useToken7007Owner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof token7007ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof token7007ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: token7007ABI,
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof token7007ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link token7007ABI}__ and `functionName` set to `"symbol"`.
 */
export function useToken7007Symbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof token7007ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof token7007ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: token7007ABI,
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof token7007ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link token7007ABI}__ and `functionName` set to `"totalSupply"`.
 */
export function useToken7007TotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof token7007ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof token7007ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: token7007ABI,
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<typeof token7007ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link token7007ABI}__.
 */
export function useToken7007Write<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof token7007ABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof token7007ABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof token7007ABI, TFunctionName, TMode>({
    abi: token7007ABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link token7007ABI}__ and `functionName` set to `"approve"`.
 */
export function useToken7007Approve<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof token7007ABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof token7007ABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof token7007ABI, 'approve', TMode>({
    abi: token7007ABI,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link token7007ABI}__ and `functionName` set to `"mint"`.
 */
export function useToken7007Mint<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof token7007ABI,
          'mint'
        >['request']['abi'],
        'mint',
        TMode
      > & { functionName?: 'mint' }
    : UseContractWriteConfig<typeof token7007ABI, 'mint', TMode> & {
        abi?: never
        functionName?: 'mint'
      } = {} as any,
) {
  return useContractWrite<typeof token7007ABI, 'mint', TMode>({
    abi: token7007ABI,
    functionName: 'mint',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link token7007ABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function useToken7007RenounceOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof token7007ABI,
          'renounceOwnership'
        >['request']['abi'],
        'renounceOwnership',
        TMode
      > & { functionName?: 'renounceOwnership' }
    : UseContractWriteConfig<
        typeof token7007ABI,
        'renounceOwnership',
        TMode
      > & {
        abi?: never
        functionName?: 'renounceOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof token7007ABI, 'renounceOwnership', TMode>({
    abi: token7007ABI,
    functionName: 'renounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link token7007ABI}__ and `functionName` set to `"transfer"`.
 */
export function useToken7007Transfer<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof token7007ABI,
          'transfer'
        >['request']['abi'],
        'transfer',
        TMode
      > & { functionName?: 'transfer' }
    : UseContractWriteConfig<typeof token7007ABI, 'transfer', TMode> & {
        abi?: never
        functionName?: 'transfer'
      } = {} as any,
) {
  return useContractWrite<typeof token7007ABI, 'transfer', TMode>({
    abi: token7007ABI,
    functionName: 'transfer',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link token7007ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useToken7007TransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof token7007ABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<typeof token7007ABI, 'transferFrom', TMode> & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof token7007ABI, 'transferFrom', TMode>({
    abi: token7007ABI,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link token7007ABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function useToken7007TransferOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof token7007ABI,
          'transferOwnership'
        >['request']['abi'],
        'transferOwnership',
        TMode
      > & { functionName?: 'transferOwnership' }
    : UseContractWriteConfig<
        typeof token7007ABI,
        'transferOwnership',
        TMode
      > & {
        abi?: never
        functionName?: 'transferOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof token7007ABI, 'transferOwnership', TMode>({
    abi: token7007ABI,
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link token7007ABI}__.
 */
export function usePrepareToken7007Write<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof token7007ABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: token7007ABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof token7007ABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link token7007ABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareToken7007Approve(
  config: Omit<
    UsePrepareContractWriteConfig<typeof token7007ABI, 'approve'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: token7007ABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof token7007ABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link token7007ABI}__ and `functionName` set to `"mint"`.
 */
export function usePrepareToken7007Mint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof token7007ABI, 'mint'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: token7007ABI,
    functionName: 'mint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof token7007ABI, 'mint'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link token7007ABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function usePrepareToken7007RenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof token7007ABI, 'renounceOwnership'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: token7007ABI,
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof token7007ABI, 'renounceOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link token7007ABI}__ and `functionName` set to `"transfer"`.
 */
export function usePrepareToken7007Transfer(
  config: Omit<
    UsePrepareContractWriteConfig<typeof token7007ABI, 'transfer'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: token7007ABI,
    functionName: 'transfer',
    ...config,
  } as UsePrepareContractWriteConfig<typeof token7007ABI, 'transfer'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link token7007ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareToken7007TransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof token7007ABI, 'transferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: token7007ABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof token7007ABI, 'transferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link token7007ABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function usePrepareToken7007TransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof token7007ABI, 'transferOwnership'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: token7007ABI,
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof token7007ABI, 'transferOwnership'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link token7007ABI}__.
 */
export function useToken7007Event<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof token7007ABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: token7007ABI,
    ...config,
  } as UseContractEventConfig<typeof token7007ABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link token7007ABI}__ and `eventName` set to `"Approval"`.
 */
export function useToken7007ApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof token7007ABI, 'Approval'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: token7007ABI,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof token7007ABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link token7007ABI}__ and `eventName` set to `"OwnershipTransferred"`.
 */
export function useToken7007OwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof token7007ABI, 'OwnershipTransferred'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: token7007ABI,
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<typeof token7007ABI, 'OwnershipTransferred'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link token7007ABI}__ and `eventName` set to `"Transfer"`.
 */
export function useToken7007TransferEvent(
  config: Omit<
    UseContractEventConfig<typeof token7007ABI, 'Transfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: token7007ABI,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof token7007ABI, 'Transfer'>)
}
