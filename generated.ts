import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AIGC
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const aigcAbi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: '_aiOracle',
        internalType: 'contract IAIOracle',
        type: 'address',
      },
      { name: '_name', internalType: 'string', type: 'string' },
      { name: '_symbol', internalType: 'string', type: 'string' },
      { name: '_mintPrice', internalType: 'uint256', type: 'uint256' },
      { name: '_aiModelId', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'AddressInsufficientBalance',
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
    type: 'error',
    inputs: [
      { name: 'expected', internalType: 'contract IAIOracle', type: 'address' },
      { name: 'found', internalType: 'contract IAIOracle', type: 'address' },
    ],
    name: 'UnauthorizedCallbackSource',
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
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'requestId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'modelId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'prompt',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
    ],
    name: 'promptRequest',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'requestId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'modelId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'input', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'output',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'callbackData',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
    ],
    name: 'promptsUpdated',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'AIGC_tokens',
    outputs: [
      { name: 'prompt', internalType: 'string', type: 'string' },
      { name: 'neg_prompt', internalType: 'string', type: 'string' },
      { name: 'title', internalType: 'string', type: 'string' },
      { name: 'seed', internalType: 'uint256', type: 'uint256' },
      { name: 'author', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'aiModelId',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'aiOracle',
    outputs: [
      { name: '', internalType: 'contract IAIOracle', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'requestId', internalType: 'uint256', type: 'uint256' },
      { name: 'output', internalType: 'bytes', type: 'bytes' },
      { name: 'callbackData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'aiOracleCallback',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'aiOracleCallbackGasLimit',
    outputs: [{ name: '', internalType: 'uint64', type: 'uint64' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'prompt', internalType: 'string', type: 'string' },
      { name: 'seed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'encode',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'estimateOAOFee',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'estimateTotalFee',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getAIResultFromTokenId',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'hasStartMint',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'requestId', internalType: 'uint256', type: 'uint256' }],
    name: 'isFinalized',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'positive_prompt', internalType: 'string', type: 'string' },
      { name: 'neg_prompt', internalType: 'string', type: 'string' },
      { name: 'title', internalType: 'string', type: 'string' },
      { name: 'seed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'mintPrice',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
    name: 'promptSeedToTokenId',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'string', type: 'string' },
    ],
    name: 'prompts',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'requests',
    outputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'modelId', internalType: 'uint256', type: 'uint256' },
      { name: 'input', internalType: 'bytes', type: 'bytes' },
      { name: 'output', internalType: 'bytes', type: 'bytes' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'startOrStopMint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_gasLimit', internalType: 'uint64', type: 'uint64' }],
    name: 'updateAIOracleCallbackGasLimit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AIGC_Factory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const aigcFactoryAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_aigcContractImpl', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
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
    type: 'function',
    inputs: [],
    name: 'aigcContractImpl',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
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
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'deployedAIGCs',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'deployedAIGTs',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_modelIndex', internalType: 'uint256', type: 'uint256' }],
    name: 'getAIGC',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_modelIndex', internalType: 'uint256', type: 'uint256' }],
    name: 'getAIGT',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'modelIndexCurrent',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'modelIndexToIpOrgAddr',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AIGT
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const aigtAbi = [
  {
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
    stateMutability: 'nonpayable',
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
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getModelIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getShare',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'maxSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_amount', internalType: 'uint256', type: 'uint256' }],
    name: 'mint',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'modelIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'tokenPrice',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Erc20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20Abi = [
  {
    type: 'event',
    inputs: [
      { name: 'owner', type: 'address', indexed: true },
      { name: 'spender', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    inputs: [
      { name: 'from', type: 'address', indexed: true },
      { name: 'to', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'sender', type: 'address' },
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MarketplaceV3
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const marketplaceV3Abi = [
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
          { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'quantity', internalType: 'uint256', type: 'uint256' },
          { name: 'pricePerToken', internalType: 'uint256', type: 'uint256' },
          { name: 'startTimestamp', internalType: 'uint128', type: 'uint128' },
          { name: 'endTimestamp', internalType: 'uint128', type: 'uint128' },
          { name: 'listingCreator', internalType: 'address', type: 'address' },
          { name: 'assetContract', internalType: 'address', type: 'address' },
          { name: 'currency', internalType: 'address', type: 'address' },
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
          { name: 'reserved', internalType: 'bool', type: 'bool' },
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
          { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'quantity', internalType: 'uint256', type: 'uint256' },
          { name: 'pricePerToken', internalType: 'uint256', type: 'uint256' },
          { name: 'startTimestamp', internalType: 'uint128', type: 'uint128' },
          { name: 'endTimestamp', internalType: 'uint128', type: 'uint128' },
          { name: 'listingCreator', internalType: 'address', type: 'address' },
          { name: 'assetContract', internalType: 'address', type: 'address' },
          { name: 'currency', internalType: 'address', type: 'address' },
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
          { name: 'reserved', internalType: 'bool', type: 'bool' },
        ],
        indexed: false,
      },
    ],
    name: 'UpdatedListing',
  },
  {
    type: 'function',
    inputs: [],
    name: '_msgData',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: '_msgSender',
    outputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_listingId', internalType: 'uint256', type: 'uint256' },
      { name: '_buyer', internalType: 'address', type: 'address' },
      { name: '_toApprove', internalType: 'bool', type: 'bool' },
    ],
    name: 'approveBuyerForListing',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
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
    stateMutability: 'nonpayable',
  },
  {
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
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: '_listingId', internalType: 'uint256', type: 'uint256' }],
    name: 'cancelListing',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
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
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_listingId', internalType: 'uint256', type: 'uint256' },
      { name: '_currency', internalType: 'address', type: 'address' },
    ],
    name: 'currencyPriceForListing',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
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
          { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'quantity', internalType: 'uint256', type: 'uint256' },
          { name: 'pricePerToken', internalType: 'uint256', type: 'uint256' },
          { name: 'startTimestamp', internalType: 'uint128', type: 'uint128' },
          { name: 'endTimestamp', internalType: 'uint128', type: 'uint128' },
          { name: 'listingCreator', internalType: 'address', type: 'address' },
          { name: 'assetContract', internalType: 'address', type: 'address' },
          { name: 'currency', internalType: 'address', type: 'address' },
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
          { name: 'reserved', internalType: 'bool', type: 'bool' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
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
          { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'quantity', internalType: 'uint256', type: 'uint256' },
          { name: 'pricePerToken', internalType: 'uint256', type: 'uint256' },
          { name: 'startTimestamp', internalType: 'uint128', type: 'uint128' },
          { name: 'endTimestamp', internalType: 'uint128', type: 'uint128' },
          { name: 'listingCreator', internalType: 'address', type: 'address' },
          { name: 'assetContract', internalType: 'address', type: 'address' },
          { name: 'currency', internalType: 'address', type: 'address' },
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
          { name: 'reserved', internalType: 'bool', type: 'bool' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
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
          { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'quantity', internalType: 'uint256', type: 'uint256' },
          { name: 'pricePerToken', internalType: 'uint256', type: 'uint256' },
          { name: 'startTimestamp', internalType: 'uint128', type: 'uint128' },
          { name: 'endTimestamp', internalType: 'uint128', type: 'uint128' },
          { name: 'listingCreator', internalType: 'address', type: 'address' },
          { name: 'assetContract', internalType: 'address', type: 'address' },
          { name: 'currency', internalType: 'address', type: 'address' },
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
          { name: 'reserved', internalType: 'bool', type: 'bool' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_listingId', internalType: 'uint256', type: 'uint256' },
      { name: '_buyer', internalType: 'address', type: 'address' },
    ],
    name: 'isBuyerApprovedForListing',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_listingId', internalType: 'uint256', type: 'uint256' },
      { name: '_currency', internalType: 'address', type: 'address' },
    ],
    name: 'isCurrencyApprovedForListing',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalListings',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
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
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'auctionId',
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
        name: 'closer',
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
        name: 'auctionCreator',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'winningBidder',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'AuctionClosed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'auctionCreator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'auctionId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'CancelledAuction',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'auctionCreator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'auctionId',
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
        name: 'auction',
        internalType: 'struct IEnglishAuctions.Auction',
        type: 'tuple',
        components: [
          { name: 'auctionId', internalType: 'uint256', type: 'uint256' },
          { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'quantity', internalType: 'uint256', type: 'uint256' },
          {
            name: 'minimumBidAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'buyoutBidAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'timeBufferInSeconds',
            internalType: 'uint64',
            type: 'uint64',
          },
          { name: 'bidBufferBps', internalType: 'uint64', type: 'uint64' },
          { name: 'startTimestamp', internalType: 'uint64', type: 'uint64' },
          { name: 'endTimestamp', internalType: 'uint64', type: 'uint64' },
          { name: 'auctionCreator', internalType: 'address', type: 'address' },
          { name: 'assetContract', internalType: 'address', type: 'address' },
          { name: 'currency', internalType: 'address', type: 'address' },
          {
            name: 'tokenType',
            internalType: 'enum IEnglishAuctions.TokenType',
            type: 'uint8',
          },
          {
            name: 'status',
            internalType: 'enum IEnglishAuctions.Status',
            type: 'uint8',
          },
        ],
        indexed: false,
      },
    ],
    name: 'NewAuction',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'auctionId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'bidder',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'assetContract',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'bidAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'auction',
        internalType: 'struct IEnglishAuctions.Auction',
        type: 'tuple',
        components: [
          { name: 'auctionId', internalType: 'uint256', type: 'uint256' },
          { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'quantity', internalType: 'uint256', type: 'uint256' },
          {
            name: 'minimumBidAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'buyoutBidAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'timeBufferInSeconds',
            internalType: 'uint64',
            type: 'uint64',
          },
          { name: 'bidBufferBps', internalType: 'uint64', type: 'uint64' },
          { name: 'startTimestamp', internalType: 'uint64', type: 'uint64' },
          { name: 'endTimestamp', internalType: 'uint64', type: 'uint64' },
          { name: 'auctionCreator', internalType: 'address', type: 'address' },
          { name: 'assetContract', internalType: 'address', type: 'address' },
          { name: 'currency', internalType: 'address', type: 'address' },
          {
            name: 'tokenType',
            internalType: 'enum IEnglishAuctions.TokenType',
            type: 'uint8',
          },
          {
            name: 'status',
            internalType: 'enum IEnglishAuctions.Status',
            type: 'uint8',
          },
        ],
        indexed: false,
      },
    ],
    name: 'NewBid',
  },
  {
    type: 'function',
    inputs: [
      { name: '_auctionId', internalType: 'uint256', type: 'uint256' },
      { name: '_bidAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'bidInAuction',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: '_auctionId', internalType: 'uint256', type: 'uint256' }],
    name: 'cancelAuction',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_auctionId', internalType: 'uint256', type: 'uint256' }],
    name: 'collectAuctionPayout',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_auctionId', internalType: 'uint256', type: 'uint256' }],
    name: 'collectAuctionTokens',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_params',
        internalType: 'struct IEnglishAuctions.AuctionParameters',
        type: 'tuple',
        components: [
          { name: 'assetContract', internalType: 'address', type: 'address' },
          { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'quantity', internalType: 'uint256', type: 'uint256' },
          { name: 'currency', internalType: 'address', type: 'address' },
          {
            name: 'minimumBidAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'buyoutBidAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'timeBufferInSeconds',
            internalType: 'uint64',
            type: 'uint64',
          },
          { name: 'bidBufferBps', internalType: 'uint64', type: 'uint64' },
          { name: 'startTimestamp', internalType: 'uint64', type: 'uint64' },
          { name: 'endTimestamp', internalType: 'uint64', type: 'uint64' },
        ],
      },
    ],
    name: 'createAuction',
    outputs: [{ name: 'auctionId', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_startId', internalType: 'uint256', type: 'uint256' },
      { name: '_endId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getAllAuctions',
    outputs: [
      {
        name: '_allAuctions',
        internalType: 'struct IEnglishAuctions.Auction[]',
        type: 'tuple[]',
        components: [
          { name: 'auctionId', internalType: 'uint256', type: 'uint256' },
          { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'quantity', internalType: 'uint256', type: 'uint256' },
          {
            name: 'minimumBidAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'buyoutBidAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'timeBufferInSeconds',
            internalType: 'uint64',
            type: 'uint64',
          },
          { name: 'bidBufferBps', internalType: 'uint64', type: 'uint64' },
          { name: 'startTimestamp', internalType: 'uint64', type: 'uint64' },
          { name: 'endTimestamp', internalType: 'uint64', type: 'uint64' },
          { name: 'auctionCreator', internalType: 'address', type: 'address' },
          { name: 'assetContract', internalType: 'address', type: 'address' },
          { name: 'currency', internalType: 'address', type: 'address' },
          {
            name: 'tokenType',
            internalType: 'enum IEnglishAuctions.TokenType',
            type: 'uint8',
          },
          {
            name: 'status',
            internalType: 'enum IEnglishAuctions.Status',
            type: 'uint8',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_startId', internalType: 'uint256', type: 'uint256' },
      { name: '_endId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getAllValidAuctions',
    outputs: [
      {
        name: '_validAuctions',
        internalType: 'struct IEnglishAuctions.Auction[]',
        type: 'tuple[]',
        components: [
          { name: 'auctionId', internalType: 'uint256', type: 'uint256' },
          { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'quantity', internalType: 'uint256', type: 'uint256' },
          {
            name: 'minimumBidAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'buyoutBidAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'timeBufferInSeconds',
            internalType: 'uint64',
            type: 'uint64',
          },
          { name: 'bidBufferBps', internalType: 'uint64', type: 'uint64' },
          { name: 'startTimestamp', internalType: 'uint64', type: 'uint64' },
          { name: 'endTimestamp', internalType: 'uint64', type: 'uint64' },
          { name: 'auctionCreator', internalType: 'address', type: 'address' },
          { name: 'assetContract', internalType: 'address', type: 'address' },
          { name: 'currency', internalType: 'address', type: 'address' },
          {
            name: 'tokenType',
            internalType: 'enum IEnglishAuctions.TokenType',
            type: 'uint8',
          },
          {
            name: 'status',
            internalType: 'enum IEnglishAuctions.Status',
            type: 'uint8',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_auctionId', internalType: 'uint256', type: 'uint256' }],
    name: 'getAuction',
    outputs: [
      {
        name: '_auction',
        internalType: 'struct IEnglishAuctions.Auction',
        type: 'tuple',
        components: [
          { name: 'auctionId', internalType: 'uint256', type: 'uint256' },
          { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'quantity', internalType: 'uint256', type: 'uint256' },
          {
            name: 'minimumBidAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'buyoutBidAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'timeBufferInSeconds',
            internalType: 'uint64',
            type: 'uint64',
          },
          { name: 'bidBufferBps', internalType: 'uint64', type: 'uint64' },
          { name: 'startTimestamp', internalType: 'uint64', type: 'uint64' },
          { name: 'endTimestamp', internalType: 'uint64', type: 'uint64' },
          { name: 'auctionCreator', internalType: 'address', type: 'address' },
          { name: 'assetContract', internalType: 'address', type: 'address' },
          { name: 'currency', internalType: 'address', type: 'address' },
          {
            name: 'tokenType',
            internalType: 'enum IEnglishAuctions.TokenType',
            type: 'uint8',
          },
          {
            name: 'status',
            internalType: 'enum IEnglishAuctions.Status',
            type: 'uint8',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_auctionId', internalType: 'uint256', type: 'uint256' }],
    name: 'getWinningBid',
    outputs: [
      { name: '_bidder', internalType: 'address', type: 'address' },
      { name: '_currency', internalType: 'address', type: 'address' },
      { name: '_bidAmount', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_auctionId', internalType: 'uint256', type: 'uint256' }],
    name: 'isAuctionExpired',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_auctionId', internalType: 'uint256', type: 'uint256' },
      { name: '_bidAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'isNewWinningBid',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalAuctions',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'offeror',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'offerId',
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
        name: 'seller',
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
    name: 'AcceptedOffer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'offeror',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'offerId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'CancelledOffer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'offeror',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'offerId',
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
        name: 'offer',
        internalType: 'struct IOffers.Offer',
        type: 'tuple',
        components: [
          { name: 'offerId', internalType: 'uint256', type: 'uint256' },
          { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'quantity', internalType: 'uint256', type: 'uint256' },
          { name: 'totalPrice', internalType: 'uint256', type: 'uint256' },
          {
            name: 'expirationTimestamp',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'offeror', internalType: 'address', type: 'address' },
          { name: 'assetContract', internalType: 'address', type: 'address' },
          { name: 'currency', internalType: 'address', type: 'address' },
          {
            name: 'tokenType',
            internalType: 'enum IOffers.TokenType',
            type: 'uint8',
          },
          {
            name: 'status',
            internalType: 'enum IOffers.Status',
            type: 'uint8',
          },
        ],
        indexed: false,
      },
    ],
    name: 'NewOffer',
  },
  {
    type: 'function',
    inputs: [{ name: '_offerId', internalType: 'uint256', type: 'uint256' }],
    name: 'acceptOffer',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_offerId', internalType: 'uint256', type: 'uint256' }],
    name: 'cancelOffer',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_startId', internalType: 'uint256', type: 'uint256' },
      { name: '_endId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getAllOffers',
    outputs: [
      {
        name: '_allOffers',
        internalType: 'struct IOffers.Offer[]',
        type: 'tuple[]',
        components: [
          { name: 'offerId', internalType: 'uint256', type: 'uint256' },
          { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'quantity', internalType: 'uint256', type: 'uint256' },
          { name: 'totalPrice', internalType: 'uint256', type: 'uint256' },
          {
            name: 'expirationTimestamp',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'offeror', internalType: 'address', type: 'address' },
          { name: 'assetContract', internalType: 'address', type: 'address' },
          { name: 'currency', internalType: 'address', type: 'address' },
          {
            name: 'tokenType',
            internalType: 'enum IOffers.TokenType',
            type: 'uint8',
          },
          {
            name: 'status',
            internalType: 'enum IOffers.Status',
            type: 'uint8',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_startId', internalType: 'uint256', type: 'uint256' },
      { name: '_endId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getAllValidOffers',
    outputs: [
      {
        name: '_validOffers',
        internalType: 'struct IOffers.Offer[]',
        type: 'tuple[]',
        components: [
          { name: 'offerId', internalType: 'uint256', type: 'uint256' },
          { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'quantity', internalType: 'uint256', type: 'uint256' },
          { name: 'totalPrice', internalType: 'uint256', type: 'uint256' },
          {
            name: 'expirationTimestamp',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'offeror', internalType: 'address', type: 'address' },
          { name: 'assetContract', internalType: 'address', type: 'address' },
          { name: 'currency', internalType: 'address', type: 'address' },
          {
            name: 'tokenType',
            internalType: 'enum IOffers.TokenType',
            type: 'uint8',
          },
          {
            name: 'status',
            internalType: 'enum IOffers.Status',
            type: 'uint8',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_offerId', internalType: 'uint256', type: 'uint256' }],
    name: 'getOffer',
    outputs: [
      {
        name: '_offer',
        internalType: 'struct IOffers.Offer',
        type: 'tuple',
        components: [
          { name: 'offerId', internalType: 'uint256', type: 'uint256' },
          { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'quantity', internalType: 'uint256', type: 'uint256' },
          { name: 'totalPrice', internalType: 'uint256', type: 'uint256' },
          {
            name: 'expirationTimestamp',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'offeror', internalType: 'address', type: 'address' },
          { name: 'assetContract', internalType: 'address', type: 'address' },
          { name: 'currency', internalType: 'address', type: 'address' },
          {
            name: 'tokenType',
            internalType: 'enum IOffers.TokenType',
            type: 'uint8',
          },
          {
            name: 'status',
            internalType: 'enum IOffers.Status',
            type: 'uint8',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_params',
        internalType: 'struct IOffers.OfferParams',
        type: 'tuple',
        components: [
          { name: 'assetContract', internalType: 'address', type: 'address' },
          { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'quantity', internalType: 'uint256', type: 'uint256' },
          { name: 'currency', internalType: 'address', type: 'address' },
          { name: 'totalPrice', internalType: 'uint256', type: 'uint256' },
          {
            name: 'expirationTimestamp',
            internalType: 'uint256',
            type: 'uint256',
          },
        ],
      },
    ],
    name: 'makeOffer',
    outputs: [{ name: '_offerId', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalOffers',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'constructor',
    inputs: [
      {
        name: '_marketplaceV3Params',
        internalType: 'struct MarketplaceV3.MarketplaceConstructorParams',
        type: 'tuple',
        components: [
          {
            name: 'extensions',
            internalType: 'struct IExtension.Extension[]',
            type: 'tuple[]',
            components: [
              {
                name: 'metadata',
                internalType: 'struct IExtension.ExtensionMetadata',
                type: 'tuple',
                components: [
                  { name: 'name', internalType: 'string', type: 'string' },
                  {
                    name: 'metadataURI',
                    internalType: 'string',
                    type: 'string',
                  },
                  {
                    name: 'implementation',
                    internalType: 'address',
                    type: 'address',
                  },
                ],
              },
              {
                name: 'functions',
                internalType: 'struct IExtension.ExtensionFunction[]',
                type: 'tuple[]',
                components: [
                  {
                    name: 'functionSelector',
                    internalType: 'bytes4',
                    type: 'bytes4',
                  },
                  {
                    name: 'functionSignature',
                    internalType: 'string',
                    type: 'string',
                  },
                ],
              },
            ],
          },
          {
            name: 'royaltyEngineAddress',
            internalType: 'address',
            type: 'address',
          },
          {
            name: 'nativeTokenWrapper',
            internalType: 'address',
            type: 'address',
          },
        ],
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'error',
    inputs: [
      { name: '_size', internalType: 'uint256', type: 'uint256' },
      { name: '_start', internalType: 'uint256', type: 'uint256' },
      { name: '_end', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'InvalidCodeAtRange',
  },
  { type: 'error', inputs: [], name: 'WriteError' },
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
      { name: 'name', internalType: 'string', type: 'string', indexed: true },
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'extension',
        internalType: 'struct IExtension.Extension',
        type: 'tuple',
        components: [
          {
            name: 'metadata',
            internalType: 'struct IExtension.ExtensionMetadata',
            type: 'tuple',
            components: [
              { name: 'name', internalType: 'string', type: 'string' },
              { name: 'metadataURI', internalType: 'string', type: 'string' },
              {
                name: 'implementation',
                internalType: 'address',
                type: 'address',
              },
            ],
          },
          {
            name: 'functions',
            internalType: 'struct IExtension.ExtensionFunction[]',
            type: 'tuple[]',
            components: [
              {
                name: 'functionSelector',
                internalType: 'bytes4',
                type: 'bytes4',
              },
              {
                name: 'functionSignature',
                internalType: 'string',
                type: 'string',
              },
            ],
          },
        ],
        indexed: false,
      },
    ],
    name: 'ExtensionAdded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'name', internalType: 'string', type: 'string', indexed: true },
      {
        name: 'extension',
        internalType: 'struct IExtension.Extension',
        type: 'tuple',
        components: [
          {
            name: 'metadata',
            internalType: 'struct IExtension.ExtensionMetadata',
            type: 'tuple',
            components: [
              { name: 'name', internalType: 'string', type: 'string' },
              { name: 'metadataURI', internalType: 'string', type: 'string' },
              {
                name: 'implementation',
                internalType: 'address',
                type: 'address',
              },
            ],
          },
          {
            name: 'functions',
            internalType: 'struct IExtension.ExtensionFunction[]',
            type: 'tuple[]',
            components: [
              {
                name: 'functionSelector',
                internalType: 'bytes4',
                type: 'bytes4',
              },
              {
                name: 'functionSignature',
                internalType: 'string',
                type: 'string',
              },
            ],
          },
        ],
        indexed: false,
      },
    ],
    name: 'ExtensionRemoved',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'name', internalType: 'string', type: 'string', indexed: true },
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'extension',
        internalType: 'struct IExtension.Extension',
        type: 'tuple',
        components: [
          {
            name: 'metadata',
            internalType: 'struct IExtension.ExtensionMetadata',
            type: 'tuple',
            components: [
              { name: 'name', internalType: 'string', type: 'string' },
              { name: 'metadataURI', internalType: 'string', type: 'string' },
              {
                name: 'implementation',
                internalType: 'address',
                type: 'address',
              },
            ],
          },
          {
            name: 'functions',
            internalType: 'struct IExtension.ExtensionFunction[]',
            type: 'tuple[]',
            components: [
              {
                name: 'functionSelector',
                internalType: 'bytes4',
                type: 'bytes4',
              },
              {
                name: 'functionSignature',
                internalType: 'string',
                type: 'string',
              },
            ],
          },
        ],
        indexed: false,
      },
    ],
    name: 'ExtensionReplaced',
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
      { name: 'name', internalType: 'string', type: 'string', indexed: true },
      {
        name: 'functionSelector',
        internalType: 'bytes4',
        type: 'bytes4',
        indexed: true,
      },
      {
        name: 'extMetadata',
        internalType: 'struct IExtension.ExtensionMetadata',
        type: 'tuple',
        components: [
          { name: 'name', internalType: 'string', type: 'string' },
          { name: 'metadataURI', internalType: 'string', type: 'string' },
          { name: 'implementation', internalType: 'address', type: 'address' },
        ],
        indexed: false,
      },
    ],
    name: 'FunctionDisabled',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'name', internalType: 'string', type: 'string', indexed: true },
      {
        name: 'functionSelector',
        internalType: 'bytes4',
        type: 'bytes4',
        indexed: true,
      },
      {
        name: 'extFunction',
        internalType: 'struct IExtension.ExtensionFunction',
        type: 'tuple',
        components: [
          { name: 'functionSelector', internalType: 'bytes4', type: 'bytes4' },
          { name: 'functionSignature', internalType: 'string', type: 'string' },
        ],
        indexed: false,
      },
      {
        name: 'extMetadata',
        internalType: 'struct IExtension.ExtensionMetadata',
        type: 'tuple',
        components: [
          { name: 'name', internalType: 'string', type: 'string' },
          { name: 'metadataURI', internalType: 'string', type: 'string' },
          { name: 'implementation', internalType: 'address', type: 'address' },
        ],
        indexed: false,
      },
    ],
    name: 'FunctionEnabled',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'version', internalType: 'uint8', type: 'uint8', indexed: false },
    ],
    name: 'Initialized',
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
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoyaltyEngineUpdated',
  },
  { type: 'fallback', inputs: [], stateMutability: 'payable' },
  {
    type: 'function',
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_extension',
        internalType: 'struct IExtension.Extension',
        type: 'tuple',
        components: [
          {
            name: 'metadata',
            internalType: 'struct IExtension.ExtensionMetadata',
            type: 'tuple',
            components: [
              { name: 'name', internalType: 'string', type: 'string' },
              { name: 'metadataURI', internalType: 'string', type: 'string' },
              {
                name: 'implementation',
                internalType: 'address',
                type: 'address',
              },
            ],
          },
          {
            name: 'functions',
            internalType: 'struct IExtension.ExtensionFunction[]',
            type: 'tuple[]',
            components: [
              {
                name: 'functionSelector',
                internalType: 'bytes4',
                type: 'bytes4',
              },
              {
                name: 'functionSignature',
                internalType: 'string',
                type: 'string',
              },
            ],
          },
        ],
      },
    ],
    name: 'addExtension',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'contractType',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'contractURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'contractVersion',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'defaultExtensions',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_extensionName', internalType: 'string', type: 'string' },
      { name: '_functionSelector', internalType: 'bytes4', type: 'bytes4' },
    ],
    name: 'disableFunctionInExtension',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_extensionName', internalType: 'string', type: 'string' },
      {
        name: '_function',
        internalType: 'struct IExtension.ExtensionFunction',
        type: 'tuple',
        components: [
          { name: 'functionSelector', internalType: 'bytes4', type: 'bytes4' },
          { name: 'functionSignature', internalType: 'string', type: 'string' },
        ],
      },
    ],
    name: 'enableFunctionInExtension',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getAllExtensions',
    outputs: [
      {
        name: 'allExtensions',
        internalType: 'struct IExtension.Extension[]',
        type: 'tuple[]',
        components: [
          {
            name: 'metadata',
            internalType: 'struct IExtension.ExtensionMetadata',
            type: 'tuple',
            components: [
              { name: 'name', internalType: 'string', type: 'string' },
              { name: 'metadataURI', internalType: 'string', type: 'string' },
              {
                name: 'implementation',
                internalType: 'address',
                type: 'address',
              },
            ],
          },
          {
            name: 'functions',
            internalType: 'struct IExtension.ExtensionFunction[]',
            type: 'tuple[]',
            components: [
              {
                name: 'functionSelector',
                internalType: 'bytes4',
                type: 'bytes4',
              },
              {
                name: 'functionSignature',
                internalType: 'string',
                type: 'string',
              },
            ],
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'extensionName', internalType: 'string', type: 'string' }],
    name: 'getExtension',
    outputs: [
      {
        name: '',
        internalType: 'struct IExtension.Extension',
        type: 'tuple',
        components: [
          {
            name: 'metadata',
            internalType: 'struct IExtension.ExtensionMetadata',
            type: 'tuple',
            components: [
              { name: 'name', internalType: 'string', type: 'string' },
              { name: 'metadataURI', internalType: 'string', type: 'string' },
              {
                name: 'implementation',
                internalType: 'address',
                type: 'address',
              },
            ],
          },
          {
            name: 'functions',
            internalType: 'struct IExtension.ExtensionFunction[]',
            type: 'tuple[]',
            components: [
              {
                name: 'functionSelector',
                internalType: 'bytes4',
                type: 'bytes4',
              },
              {
                name: 'functionSignature',
                internalType: 'string',
                type: 'string',
              },
            ],
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getFlatPlatformFeeInfo',
    outputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_functionSelector', internalType: 'bytes4', type: 'bytes4' },
    ],
    name: 'getImplementationForFunction',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'functionSelector', internalType: 'bytes4', type: 'bytes4' },
    ],
    name: 'getMetadataForFunction',
    outputs: [
      {
        name: '',
        internalType: 'struct IExtension.ExtensionMetadata',
        type: 'tuple',
        components: [
          { name: 'name', internalType: 'string', type: 'string' },
          { name: 'metadataURI', internalType: 'string', type: 'string' },
          { name: 'implementation', internalType: 'address', type: 'address' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getPlatformFeeInfo',
    outputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint16', type: 'uint16' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getPlatformFeeType',
    outputs: [
      {
        name: '',
        internalType: 'enum IPlatformFee.PlatformFeeType',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getRoleMember',
    outputs: [{ name: 'member', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleMemberCount',
    outputs: [{ name: 'count', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenAddress', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getRoyalty',
    outputs: [
      {
        name: 'recipients',
        internalType: 'address payable[]',
        type: 'address[]',
      },
      { name: 'amounts', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getRoyaltyEngineAddress',
    outputs: [
      {
        name: 'royaltyEngineAddress',
        internalType: 'address',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'hasRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'hasRoleWithSwitch',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
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
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'forwarder', internalType: 'address', type: 'address' }],
    name: 'isTrustedForwarder',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes[]', type: 'bytes[]' }],
    name: 'multicall',
    outputs: [{ name: 'results', internalType: 'bytes[]', type: 'bytes[]' }],
    stateMutability: 'nonpayable',
  },
  {
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
    stateMutability: 'nonpayable',
  },
  {
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
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC721Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_extensionName', internalType: 'string', type: 'string' },
    ],
    name: 'removeExtension',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_extension',
        internalType: 'struct IExtension.Extension',
        type: 'tuple',
        components: [
          {
            name: 'metadata',
            internalType: 'struct IExtension.ExtensionMetadata',
            type: 'tuple',
            components: [
              { name: 'name', internalType: 'string', type: 'string' },
              { name: 'metadataURI', internalType: 'string', type: 'string' },
              {
                name: 'implementation',
                internalType: 'address',
                type: 'address',
              },
            ],
          },
          {
            name: 'functions',
            internalType: 'struct IExtension.ExtensionFunction[]',
            type: 'tuple[]',
            components: [
              {
                name: 'functionSelector',
                internalType: 'bytes4',
                type: 'bytes4',
              },
              {
                name: 'functionSignature',
                internalType: 'string',
                type: 'string',
              },
            ],
          },
        ],
      },
    ],
    name: 'replaceExtension',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_uri', internalType: 'string', type: 'string' }],
    name: 'setContractURI',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_platformFeeRecipient',
        internalType: 'address',
        type: 'address',
      },
      { name: '_flatFee', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setFlatPlatformFeeInfo',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
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
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_feeType',
        internalType: 'enum IPlatformFee.PlatformFeeType',
        type: 'uint8',
      },
    ],
    name: 'setPlatformFeeType',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_royaltyEngineAddress',
        internalType: 'address',
        type: 'address',
      },
    ],
    name: 'setRoyaltyEngine',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  { type: 'receive', stateMutability: 'payable' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aigcAbi}__
 */
export const useReadAigc = /*#__PURE__*/ createUseReadContract({ abi: aigcAbi })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aigcAbi}__ and `functionName` set to `"AIGC_tokens"`
 */
export const useReadAigcAigcTokens = /*#__PURE__*/ createUseReadContract({
  abi: aigcAbi,
  functionName: 'AIGC_tokens',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aigcAbi}__ and `functionName` set to `"aiModelId"`
 */
export const useReadAigcAiModelId = /*#__PURE__*/ createUseReadContract({
  abi: aigcAbi,
  functionName: 'aiModelId',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aigcAbi}__ and `functionName` set to `"aiOracle"`
 */
export const useReadAigcAiOracle = /*#__PURE__*/ createUseReadContract({
  abi: aigcAbi,
  functionName: 'aiOracle',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aigcAbi}__ and `functionName` set to `"aiOracleCallbackGasLimit"`
 */
export const useReadAigcAiOracleCallbackGasLimit =
  /*#__PURE__*/ createUseReadContract({
    abi: aigcAbi,
    functionName: 'aiOracleCallbackGasLimit',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aigcAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadAigcBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: aigcAbi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aigcAbi}__ and `functionName` set to `"encode"`
 */
export const useReadAigcEncode = /*#__PURE__*/ createUseReadContract({
  abi: aigcAbi,
  functionName: 'encode',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aigcAbi}__ and `functionName` set to `"estimateOAOFee"`
 */
export const useReadAigcEstimateOaoFee = /*#__PURE__*/ createUseReadContract({
  abi: aigcAbi,
  functionName: 'estimateOAOFee',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aigcAbi}__ and `functionName` set to `"estimateTotalFee"`
 */
export const useReadAigcEstimateTotalFee = /*#__PURE__*/ createUseReadContract({
  abi: aigcAbi,
  functionName: 'estimateTotalFee',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aigcAbi}__ and `functionName` set to `"getAIResultFromTokenId"`
 */
export const useReadAigcGetAiResultFromTokenId =
  /*#__PURE__*/ createUseReadContract({
    abi: aigcAbi,
    functionName: 'getAIResultFromTokenId',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aigcAbi}__ and `functionName` set to `"getApproved"`
 */
export const useReadAigcGetApproved = /*#__PURE__*/ createUseReadContract({
  abi: aigcAbi,
  functionName: 'getApproved',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aigcAbi}__ and `functionName` set to `"hasStartMint"`
 */
export const useReadAigcHasStartMint = /*#__PURE__*/ createUseReadContract({
  abi: aigcAbi,
  functionName: 'hasStartMint',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aigcAbi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const useReadAigcIsApprovedForAll = /*#__PURE__*/ createUseReadContract({
  abi: aigcAbi,
  functionName: 'isApprovedForAll',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aigcAbi}__ and `functionName` set to `"isFinalized"`
 */
export const useReadAigcIsFinalized = /*#__PURE__*/ createUseReadContract({
  abi: aigcAbi,
  functionName: 'isFinalized',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aigcAbi}__ and `functionName` set to `"mintPrice"`
 */
export const useReadAigcMintPrice = /*#__PURE__*/ createUseReadContract({
  abi: aigcAbi,
  functionName: 'mintPrice',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aigcAbi}__ and `functionName` set to `"name"`
 */
export const useReadAigcName = /*#__PURE__*/ createUseReadContract({
  abi: aigcAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aigcAbi}__ and `functionName` set to `"owner"`
 */
export const useReadAigcOwner = /*#__PURE__*/ createUseReadContract({
  abi: aigcAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aigcAbi}__ and `functionName` set to `"ownerOf"`
 */
export const useReadAigcOwnerOf = /*#__PURE__*/ createUseReadContract({
  abi: aigcAbi,
  functionName: 'ownerOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aigcAbi}__ and `functionName` set to `"promptSeedToTokenId"`
 */
export const useReadAigcPromptSeedToTokenId =
  /*#__PURE__*/ createUseReadContract({
    abi: aigcAbi,
    functionName: 'promptSeedToTokenId',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aigcAbi}__ and `functionName` set to `"prompts"`
 */
export const useReadAigcPrompts = /*#__PURE__*/ createUseReadContract({
  abi: aigcAbi,
  functionName: 'prompts',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aigcAbi}__ and `functionName` set to `"requests"`
 */
export const useReadAigcRequests = /*#__PURE__*/ createUseReadContract({
  abi: aigcAbi,
  functionName: 'requests',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aigcAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadAigcSupportsInterface = /*#__PURE__*/ createUseReadContract(
  { abi: aigcAbi, functionName: 'supportsInterface' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aigcAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadAigcSymbol = /*#__PURE__*/ createUseReadContract({
  abi: aigcAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aigcAbi}__ and `functionName` set to `"tokenURI"`
 */
export const useReadAigcTokenUri = /*#__PURE__*/ createUseReadContract({
  abi: aigcAbi,
  functionName: 'tokenURI',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aigcAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadAigcTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: aigcAbi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link aigcAbi}__
 */
export const useWriteAigc = /*#__PURE__*/ createUseWriteContract({
  abi: aigcAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link aigcAbi}__ and `functionName` set to `"aiOracleCallback"`
 */
export const useWriteAigcAiOracleCallback =
  /*#__PURE__*/ createUseWriteContract({
    abi: aigcAbi,
    functionName: 'aiOracleCallback',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link aigcAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteAigcApprove = /*#__PURE__*/ createUseWriteContract({
  abi: aigcAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link aigcAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteAigcMint = /*#__PURE__*/ createUseWriteContract({
  abi: aigcAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link aigcAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteAigcRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: aigcAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link aigcAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useWriteAigcSafeTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: aigcAbi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link aigcAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useWriteAigcSetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: aigcAbi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link aigcAbi}__ and `functionName` set to `"startOrStopMint"`
 */
export const useWriteAigcStartOrStopMint = /*#__PURE__*/ createUseWriteContract(
  { abi: aigcAbi, functionName: 'startOrStopMint' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link aigcAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteAigcTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: aigcAbi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link aigcAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteAigcTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: aigcAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link aigcAbi}__ and `functionName` set to `"updateAIOracleCallbackGasLimit"`
 */
export const useWriteAigcUpdateAiOracleCallbackGasLimit =
  /*#__PURE__*/ createUseWriteContract({
    abi: aigcAbi,
    functionName: 'updateAIOracleCallbackGasLimit',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link aigcAbi}__ and `functionName` set to `"withdraw"`
 */
export const useWriteAigcWithdraw = /*#__PURE__*/ createUseWriteContract({
  abi: aigcAbi,
  functionName: 'withdraw',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link aigcAbi}__
 */
export const useSimulateAigc = /*#__PURE__*/ createUseSimulateContract({
  abi: aigcAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link aigcAbi}__ and `functionName` set to `"aiOracleCallback"`
 */
export const useSimulateAigcAiOracleCallback =
  /*#__PURE__*/ createUseSimulateContract({
    abi: aigcAbi,
    functionName: 'aiOracleCallback',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link aigcAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateAigcApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: aigcAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link aigcAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateAigcMint = /*#__PURE__*/ createUseSimulateContract({
  abi: aigcAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link aigcAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateAigcRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: aigcAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link aigcAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useSimulateAigcSafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: aigcAbi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link aigcAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useSimulateAigcSetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: aigcAbi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link aigcAbi}__ and `functionName` set to `"startOrStopMint"`
 */
export const useSimulateAigcStartOrStopMint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: aigcAbi,
    functionName: 'startOrStopMint',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link aigcAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateAigcTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: aigcAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link aigcAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateAigcTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: aigcAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link aigcAbi}__ and `functionName` set to `"updateAIOracleCallbackGasLimit"`
 */
export const useSimulateAigcUpdateAiOracleCallbackGasLimit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: aigcAbi,
    functionName: 'updateAIOracleCallbackGasLimit',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link aigcAbi}__ and `functionName` set to `"withdraw"`
 */
export const useSimulateAigcWithdraw = /*#__PURE__*/ createUseSimulateContract({
  abi: aigcAbi,
  functionName: 'withdraw',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link aigcAbi}__
 */
export const useWatchAigcEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: aigcAbi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link aigcAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchAigcApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: aigcAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link aigcAbi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const useWatchAigcApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: aigcAbi,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link aigcAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchAigcOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: aigcAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link aigcAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchAigcTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: aigcAbi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link aigcAbi}__ and `eventName` set to `"promptRequest"`
 */
export const useWatchAigcPromptRequestEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: aigcAbi,
    eventName: 'promptRequest',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link aigcAbi}__ and `eventName` set to `"promptsUpdated"`
 */
export const useWatchAigcPromptsUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: aigcAbi,
    eventName: 'promptsUpdated',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aigcFactoryAbi}__
 */
export const useReadAigcFactory = /*#__PURE__*/ createUseReadContract({
  abi: aigcFactoryAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aigcFactoryAbi}__ and `functionName` set to `"aigcContractImpl"`
 */
export const useReadAigcFactoryAigcContractImpl =
  /*#__PURE__*/ createUseReadContract({
    abi: aigcFactoryAbi,
    functionName: 'aigcContractImpl',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aigcFactoryAbi}__ and `functionName` set to `"deployedAIGCs"`
 */
export const useReadAigcFactoryDeployedAigCs =
  /*#__PURE__*/ createUseReadContract({
    abi: aigcFactoryAbi,
    functionName: 'deployedAIGCs',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aigcFactoryAbi}__ and `functionName` set to `"deployedAIGTs"`
 */
export const useReadAigcFactoryDeployedAigTs =
  /*#__PURE__*/ createUseReadContract({
    abi: aigcFactoryAbi,
    functionName: 'deployedAIGTs',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aigcFactoryAbi}__ and `functionName` set to `"getAIGC"`
 */
export const useReadAigcFactoryGetAigc = /*#__PURE__*/ createUseReadContract({
  abi: aigcFactoryAbi,
  functionName: 'getAIGC',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aigcFactoryAbi}__ and `functionName` set to `"getAIGT"`
 */
export const useReadAigcFactoryGetAigt = /*#__PURE__*/ createUseReadContract({
  abi: aigcFactoryAbi,
  functionName: 'getAIGT',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aigcFactoryAbi}__ and `functionName` set to `"modelIndexCurrent"`
 */
export const useReadAigcFactoryModelIndexCurrent =
  /*#__PURE__*/ createUseReadContract({
    abi: aigcFactoryAbi,
    functionName: 'modelIndexCurrent',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aigcFactoryAbi}__ and `functionName` set to `"modelIndexToIpOrgAddr"`
 */
export const useReadAigcFactoryModelIndexToIpOrgAddr =
  /*#__PURE__*/ createUseReadContract({
    abi: aigcFactoryAbi,
    functionName: 'modelIndexToIpOrgAddr',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link aigcFactoryAbi}__
 */
export const useWriteAigcFactory = /*#__PURE__*/ createUseWriteContract({
  abi: aigcFactoryAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link aigcFactoryAbi}__ and `functionName` set to `"createAIGC"`
 */
export const useWriteAigcFactoryCreateAigc =
  /*#__PURE__*/ createUseWriteContract({
    abi: aigcFactoryAbi,
    functionName: 'createAIGC',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link aigcFactoryAbi}__
 */
export const useSimulateAigcFactory = /*#__PURE__*/ createUseSimulateContract({
  abi: aigcFactoryAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link aigcFactoryAbi}__ and `functionName` set to `"createAIGC"`
 */
export const useSimulateAigcFactoryCreateAigc =
  /*#__PURE__*/ createUseSimulateContract({
    abi: aigcFactoryAbi,
    functionName: 'createAIGC',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link aigcFactoryAbi}__
 */
export const useWatchAigcFactoryEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: aigcFactoryAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link aigcFactoryAbi}__ and `eventName` set to `"AIGC_Created"`
 */
export const useWatchAigcFactoryAigcCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: aigcFactoryAbi,
    eventName: 'AIGC_Created',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aigtAbi}__
 */
export const useReadAigt = /*#__PURE__*/ createUseReadContract({ abi: aigtAbi })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aigtAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadAigtAllowance = /*#__PURE__*/ createUseReadContract({
  abi: aigtAbi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aigtAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadAigtBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: aigtAbi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aigtAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadAigtDecimals = /*#__PURE__*/ createUseReadContract({
  abi: aigtAbi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aigtAbi}__ and `functionName` set to `"getModelIndex"`
 */
export const useReadAigtGetModelIndex = /*#__PURE__*/ createUseReadContract({
  abi: aigtAbi,
  functionName: 'getModelIndex',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aigtAbi}__ and `functionName` set to `"getShare"`
 */
export const useReadAigtGetShare = /*#__PURE__*/ createUseReadContract({
  abi: aigtAbi,
  functionName: 'getShare',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aigtAbi}__ and `functionName` set to `"maxSupply"`
 */
export const useReadAigtMaxSupply = /*#__PURE__*/ createUseReadContract({
  abi: aigtAbi,
  functionName: 'maxSupply',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aigtAbi}__ and `functionName` set to `"modelIndex"`
 */
export const useReadAigtModelIndex = /*#__PURE__*/ createUseReadContract({
  abi: aigtAbi,
  functionName: 'modelIndex',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aigtAbi}__ and `functionName` set to `"name"`
 */
export const useReadAigtName = /*#__PURE__*/ createUseReadContract({
  abi: aigtAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aigtAbi}__ and `functionName` set to `"owner"`
 */
export const useReadAigtOwner = /*#__PURE__*/ createUseReadContract({
  abi: aigtAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aigtAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadAigtSymbol = /*#__PURE__*/ createUseReadContract({
  abi: aigtAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aigtAbi}__ and `functionName` set to `"tokenPrice"`
 */
export const useReadAigtTokenPrice = /*#__PURE__*/ createUseReadContract({
  abi: aigtAbi,
  functionName: 'tokenPrice',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aigtAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadAigtTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: aigtAbi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link aigtAbi}__
 */
export const useWriteAigt = /*#__PURE__*/ createUseWriteContract({
  abi: aigtAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link aigtAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteAigtApprove = /*#__PURE__*/ createUseWriteContract({
  abi: aigtAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link aigtAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteAigtMint = /*#__PURE__*/ createUseWriteContract({
  abi: aigtAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link aigtAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteAigtRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: aigtAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link aigtAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteAigtTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: aigtAbi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link aigtAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteAigtTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: aigtAbi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link aigtAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteAigtTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: aigtAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link aigtAbi}__ and `functionName` set to `"withdraw"`
 */
export const useWriteAigtWithdraw = /*#__PURE__*/ createUseWriteContract({
  abi: aigtAbi,
  functionName: 'withdraw',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link aigtAbi}__
 */
export const useSimulateAigt = /*#__PURE__*/ createUseSimulateContract({
  abi: aigtAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link aigtAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateAigtApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: aigtAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link aigtAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateAigtMint = /*#__PURE__*/ createUseSimulateContract({
  abi: aigtAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link aigtAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateAigtRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: aigtAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link aigtAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateAigtTransfer = /*#__PURE__*/ createUseSimulateContract({
  abi: aigtAbi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link aigtAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateAigtTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: aigtAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link aigtAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateAigtTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: aigtAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link aigtAbi}__ and `functionName` set to `"withdraw"`
 */
export const useSimulateAigtWithdraw = /*#__PURE__*/ createUseSimulateContract({
  abi: aigtAbi,
  functionName: 'withdraw',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link aigtAbi}__
 */
export const useWatchAigtEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: aigtAbi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link aigtAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchAigtApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: aigtAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link aigtAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchAigtOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: aigtAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link aigtAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchAigtTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: aigtAbi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useReadErc20 = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"allowance"`
 */
export const useReadErc20Allowance = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadErc20BalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"decimals"`
 */
export const useReadErc20Decimals = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"name"`
 */
export const useReadErc20Name = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"symbol"`
 */
export const useReadErc20Symbol = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadErc20TotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useWriteErc20 = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const useWriteErc20Approve = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useWriteErc20Transfer = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteErc20TransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useSimulateErc20 = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const useSimulateErc20Approve = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateErc20Transfer = /*#__PURE__*/ createUseSimulateContract(
  { abi: erc20Abi, functionName: 'transfer' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateErc20TransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc20Abi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__
 */
export const useWatchErc20Event = /*#__PURE__*/ createUseWatchContractEvent({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Approval"`
 */
export const useWatchErc20ApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20Abi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchErc20TransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20Abi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketplaceV3Abi}__
 */
export const useReadMarketplaceV3 = /*#__PURE__*/ createUseReadContract({
  abi: marketplaceV3Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"_msgData"`
 */
export const useReadMarketplaceV3MsgData = /*#__PURE__*/ createUseReadContract({
  abi: marketplaceV3Abi,
  functionName: '_msgData',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"_msgSender"`
 */
export const useReadMarketplaceV3MsgSender =
  /*#__PURE__*/ createUseReadContract({
    abi: marketplaceV3Abi,
    functionName: '_msgSender',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"currencyPriceForListing"`
 */
export const useReadMarketplaceV3CurrencyPriceForListing =
  /*#__PURE__*/ createUseReadContract({
    abi: marketplaceV3Abi,
    functionName: 'currencyPriceForListing',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"getAllListings"`
 */
export const useReadMarketplaceV3GetAllListings =
  /*#__PURE__*/ createUseReadContract({
    abi: marketplaceV3Abi,
    functionName: 'getAllListings',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"getAllValidListings"`
 */
export const useReadMarketplaceV3GetAllValidListings =
  /*#__PURE__*/ createUseReadContract({
    abi: marketplaceV3Abi,
    functionName: 'getAllValidListings',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"getListing"`
 */
export const useReadMarketplaceV3GetListing =
  /*#__PURE__*/ createUseReadContract({
    abi: marketplaceV3Abi,
    functionName: 'getListing',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"isBuyerApprovedForListing"`
 */
export const useReadMarketplaceV3IsBuyerApprovedForListing =
  /*#__PURE__*/ createUseReadContract({
    abi: marketplaceV3Abi,
    functionName: 'isBuyerApprovedForListing',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"isCurrencyApprovedForListing"`
 */
export const useReadMarketplaceV3IsCurrencyApprovedForListing =
  /*#__PURE__*/ createUseReadContract({
    abi: marketplaceV3Abi,
    functionName: 'isCurrencyApprovedForListing',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"totalListings"`
 */
export const useReadMarketplaceV3TotalListings =
  /*#__PURE__*/ createUseReadContract({
    abi: marketplaceV3Abi,
    functionName: 'totalListings',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"getAllAuctions"`
 */
export const useReadMarketplaceV3GetAllAuctions =
  /*#__PURE__*/ createUseReadContract({
    abi: marketplaceV3Abi,
    functionName: 'getAllAuctions',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"getAllValidAuctions"`
 */
export const useReadMarketplaceV3GetAllValidAuctions =
  /*#__PURE__*/ createUseReadContract({
    abi: marketplaceV3Abi,
    functionName: 'getAllValidAuctions',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"getAuction"`
 */
export const useReadMarketplaceV3GetAuction =
  /*#__PURE__*/ createUseReadContract({
    abi: marketplaceV3Abi,
    functionName: 'getAuction',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"getWinningBid"`
 */
export const useReadMarketplaceV3GetWinningBid =
  /*#__PURE__*/ createUseReadContract({
    abi: marketplaceV3Abi,
    functionName: 'getWinningBid',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"isAuctionExpired"`
 */
export const useReadMarketplaceV3IsAuctionExpired =
  /*#__PURE__*/ createUseReadContract({
    abi: marketplaceV3Abi,
    functionName: 'isAuctionExpired',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"isNewWinningBid"`
 */
export const useReadMarketplaceV3IsNewWinningBid =
  /*#__PURE__*/ createUseReadContract({
    abi: marketplaceV3Abi,
    functionName: 'isNewWinningBid',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"totalAuctions"`
 */
export const useReadMarketplaceV3TotalAuctions =
  /*#__PURE__*/ createUseReadContract({
    abi: marketplaceV3Abi,
    functionName: 'totalAuctions',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"getAllOffers"`
 */
export const useReadMarketplaceV3GetAllOffers =
  /*#__PURE__*/ createUseReadContract({
    abi: marketplaceV3Abi,
    functionName: 'getAllOffers',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"getAllValidOffers"`
 */
export const useReadMarketplaceV3GetAllValidOffers =
  /*#__PURE__*/ createUseReadContract({
    abi: marketplaceV3Abi,
    functionName: 'getAllValidOffers',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"getOffer"`
 */
export const useReadMarketplaceV3GetOffer = /*#__PURE__*/ createUseReadContract(
  { abi: marketplaceV3Abi, functionName: 'getOffer' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"totalOffers"`
 */
export const useReadMarketplaceV3TotalOffers =
  /*#__PURE__*/ createUseReadContract({
    abi: marketplaceV3Abi,
    functionName: 'totalOffers',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`
 */
export const useReadMarketplaceV3DefaultAdminRole =
  /*#__PURE__*/ createUseReadContract({
    abi: marketplaceV3Abi,
    functionName: 'DEFAULT_ADMIN_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"contractType"`
 */
export const useReadMarketplaceV3ContractType =
  /*#__PURE__*/ createUseReadContract({
    abi: marketplaceV3Abi,
    functionName: 'contractType',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"contractURI"`
 */
export const useReadMarketplaceV3ContractUri =
  /*#__PURE__*/ createUseReadContract({
    abi: marketplaceV3Abi,
    functionName: 'contractURI',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"contractVersion"`
 */
export const useReadMarketplaceV3ContractVersion =
  /*#__PURE__*/ createUseReadContract({
    abi: marketplaceV3Abi,
    functionName: 'contractVersion',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"defaultExtensions"`
 */
export const useReadMarketplaceV3DefaultExtensions =
  /*#__PURE__*/ createUseReadContract({
    abi: marketplaceV3Abi,
    functionName: 'defaultExtensions',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"getAllExtensions"`
 */
export const useReadMarketplaceV3GetAllExtensions =
  /*#__PURE__*/ createUseReadContract({
    abi: marketplaceV3Abi,
    functionName: 'getAllExtensions',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"getExtension"`
 */
export const useReadMarketplaceV3GetExtension =
  /*#__PURE__*/ createUseReadContract({
    abi: marketplaceV3Abi,
    functionName: 'getExtension',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"getFlatPlatformFeeInfo"`
 */
export const useReadMarketplaceV3GetFlatPlatformFeeInfo =
  /*#__PURE__*/ createUseReadContract({
    abi: marketplaceV3Abi,
    functionName: 'getFlatPlatformFeeInfo',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"getImplementationForFunction"`
 */
export const useReadMarketplaceV3GetImplementationForFunction =
  /*#__PURE__*/ createUseReadContract({
    abi: marketplaceV3Abi,
    functionName: 'getImplementationForFunction',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"getMetadataForFunction"`
 */
export const useReadMarketplaceV3GetMetadataForFunction =
  /*#__PURE__*/ createUseReadContract({
    abi: marketplaceV3Abi,
    functionName: 'getMetadataForFunction',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"getPlatformFeeInfo"`
 */
export const useReadMarketplaceV3GetPlatformFeeInfo =
  /*#__PURE__*/ createUseReadContract({
    abi: marketplaceV3Abi,
    functionName: 'getPlatformFeeInfo',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"getPlatformFeeType"`
 */
export const useReadMarketplaceV3GetPlatformFeeType =
  /*#__PURE__*/ createUseReadContract({
    abi: marketplaceV3Abi,
    functionName: 'getPlatformFeeType',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"getRoleAdmin"`
 */
export const useReadMarketplaceV3GetRoleAdmin =
  /*#__PURE__*/ createUseReadContract({
    abi: marketplaceV3Abi,
    functionName: 'getRoleAdmin',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"getRoleMember"`
 */
export const useReadMarketplaceV3GetRoleMember =
  /*#__PURE__*/ createUseReadContract({
    abi: marketplaceV3Abi,
    functionName: 'getRoleMember',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"getRoleMemberCount"`
 */
export const useReadMarketplaceV3GetRoleMemberCount =
  /*#__PURE__*/ createUseReadContract({
    abi: marketplaceV3Abi,
    functionName: 'getRoleMemberCount',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"getRoyaltyEngineAddress"`
 */
export const useReadMarketplaceV3GetRoyaltyEngineAddress =
  /*#__PURE__*/ createUseReadContract({
    abi: marketplaceV3Abi,
    functionName: 'getRoyaltyEngineAddress',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"hasRole"`
 */
export const useReadMarketplaceV3HasRole = /*#__PURE__*/ createUseReadContract({
  abi: marketplaceV3Abi,
  functionName: 'hasRole',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"hasRoleWithSwitch"`
 */
export const useReadMarketplaceV3HasRoleWithSwitch =
  /*#__PURE__*/ createUseReadContract({
    abi: marketplaceV3Abi,
    functionName: 'hasRoleWithSwitch',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"isTrustedForwarder"`
 */
export const useReadMarketplaceV3IsTrustedForwarder =
  /*#__PURE__*/ createUseReadContract({
    abi: marketplaceV3Abi,
    functionName: 'isTrustedForwarder',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadMarketplaceV3SupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: marketplaceV3Abi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link marketplaceV3Abi}__
 */
export const useWriteMarketplaceV3 = /*#__PURE__*/ createUseWriteContract({
  abi: marketplaceV3Abi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"approveBuyerForListing"`
 */
export const useWriteMarketplaceV3ApproveBuyerForListing =
  /*#__PURE__*/ createUseWriteContract({
    abi: marketplaceV3Abi,
    functionName: 'approveBuyerForListing',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"approveCurrencyForListing"`
 */
export const useWriteMarketplaceV3ApproveCurrencyForListing =
  /*#__PURE__*/ createUseWriteContract({
    abi: marketplaceV3Abi,
    functionName: 'approveCurrencyForListing',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"buyFromListing"`
 */
export const useWriteMarketplaceV3BuyFromListing =
  /*#__PURE__*/ createUseWriteContract({
    abi: marketplaceV3Abi,
    functionName: 'buyFromListing',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"cancelListing"`
 */
export const useWriteMarketplaceV3CancelListing =
  /*#__PURE__*/ createUseWriteContract({
    abi: marketplaceV3Abi,
    functionName: 'cancelListing',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"createListing"`
 */
export const useWriteMarketplaceV3CreateListing =
  /*#__PURE__*/ createUseWriteContract({
    abi: marketplaceV3Abi,
    functionName: 'createListing',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"updateListing"`
 */
export const useWriteMarketplaceV3UpdateListing =
  /*#__PURE__*/ createUseWriteContract({
    abi: marketplaceV3Abi,
    functionName: 'updateListing',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"bidInAuction"`
 */
export const useWriteMarketplaceV3BidInAuction =
  /*#__PURE__*/ createUseWriteContract({
    abi: marketplaceV3Abi,
    functionName: 'bidInAuction',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"cancelAuction"`
 */
export const useWriteMarketplaceV3CancelAuction =
  /*#__PURE__*/ createUseWriteContract({
    abi: marketplaceV3Abi,
    functionName: 'cancelAuction',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"collectAuctionPayout"`
 */
export const useWriteMarketplaceV3CollectAuctionPayout =
  /*#__PURE__*/ createUseWriteContract({
    abi: marketplaceV3Abi,
    functionName: 'collectAuctionPayout',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"collectAuctionTokens"`
 */
export const useWriteMarketplaceV3CollectAuctionTokens =
  /*#__PURE__*/ createUseWriteContract({
    abi: marketplaceV3Abi,
    functionName: 'collectAuctionTokens',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"createAuction"`
 */
export const useWriteMarketplaceV3CreateAuction =
  /*#__PURE__*/ createUseWriteContract({
    abi: marketplaceV3Abi,
    functionName: 'createAuction',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"acceptOffer"`
 */
export const useWriteMarketplaceV3AcceptOffer =
  /*#__PURE__*/ createUseWriteContract({
    abi: marketplaceV3Abi,
    functionName: 'acceptOffer',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"cancelOffer"`
 */
export const useWriteMarketplaceV3CancelOffer =
  /*#__PURE__*/ createUseWriteContract({
    abi: marketplaceV3Abi,
    functionName: 'cancelOffer',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"makeOffer"`
 */
export const useWriteMarketplaceV3MakeOffer =
  /*#__PURE__*/ createUseWriteContract({
    abi: marketplaceV3Abi,
    functionName: 'makeOffer',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"addExtension"`
 */
export const useWriteMarketplaceV3AddExtension =
  /*#__PURE__*/ createUseWriteContract({
    abi: marketplaceV3Abi,
    functionName: 'addExtension',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"disableFunctionInExtension"`
 */
export const useWriteMarketplaceV3DisableFunctionInExtension =
  /*#__PURE__*/ createUseWriteContract({
    abi: marketplaceV3Abi,
    functionName: 'disableFunctionInExtension',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"enableFunctionInExtension"`
 */
export const useWriteMarketplaceV3EnableFunctionInExtension =
  /*#__PURE__*/ createUseWriteContract({
    abi: marketplaceV3Abi,
    functionName: 'enableFunctionInExtension',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"getRoyalty"`
 */
export const useWriteMarketplaceV3GetRoyalty =
  /*#__PURE__*/ createUseWriteContract({
    abi: marketplaceV3Abi,
    functionName: 'getRoyalty',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"grantRole"`
 */
export const useWriteMarketplaceV3GrantRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: marketplaceV3Abi,
    functionName: 'grantRole',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"initialize"`
 */
export const useWriteMarketplaceV3Initialize =
  /*#__PURE__*/ createUseWriteContract({
    abi: marketplaceV3Abi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"multicall"`
 */
export const useWriteMarketplaceV3Multicall =
  /*#__PURE__*/ createUseWriteContract({
    abi: marketplaceV3Abi,
    functionName: 'multicall',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"onERC1155BatchReceived"`
 */
export const useWriteMarketplaceV3OnErc1155BatchReceived =
  /*#__PURE__*/ createUseWriteContract({
    abi: marketplaceV3Abi,
    functionName: 'onERC1155BatchReceived',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"onERC1155Received"`
 */
export const useWriteMarketplaceV3OnErc1155Received =
  /*#__PURE__*/ createUseWriteContract({
    abi: marketplaceV3Abi,
    functionName: 'onERC1155Received',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"onERC721Received"`
 */
export const useWriteMarketplaceV3OnErc721Received =
  /*#__PURE__*/ createUseWriteContract({
    abi: marketplaceV3Abi,
    functionName: 'onERC721Received',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"removeExtension"`
 */
export const useWriteMarketplaceV3RemoveExtension =
  /*#__PURE__*/ createUseWriteContract({
    abi: marketplaceV3Abi,
    functionName: 'removeExtension',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"renounceRole"`
 */
export const useWriteMarketplaceV3RenounceRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: marketplaceV3Abi,
    functionName: 'renounceRole',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"replaceExtension"`
 */
export const useWriteMarketplaceV3ReplaceExtension =
  /*#__PURE__*/ createUseWriteContract({
    abi: marketplaceV3Abi,
    functionName: 'replaceExtension',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"revokeRole"`
 */
export const useWriteMarketplaceV3RevokeRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: marketplaceV3Abi,
    functionName: 'revokeRole',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"setContractURI"`
 */
export const useWriteMarketplaceV3SetContractUri =
  /*#__PURE__*/ createUseWriteContract({
    abi: marketplaceV3Abi,
    functionName: 'setContractURI',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"setFlatPlatformFeeInfo"`
 */
export const useWriteMarketplaceV3SetFlatPlatformFeeInfo =
  /*#__PURE__*/ createUseWriteContract({
    abi: marketplaceV3Abi,
    functionName: 'setFlatPlatformFeeInfo',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"setPlatformFeeInfo"`
 */
export const useWriteMarketplaceV3SetPlatformFeeInfo =
  /*#__PURE__*/ createUseWriteContract({
    abi: marketplaceV3Abi,
    functionName: 'setPlatformFeeInfo',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"setPlatformFeeType"`
 */
export const useWriteMarketplaceV3SetPlatformFeeType =
  /*#__PURE__*/ createUseWriteContract({
    abi: marketplaceV3Abi,
    functionName: 'setPlatformFeeType',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"setRoyaltyEngine"`
 */
export const useWriteMarketplaceV3SetRoyaltyEngine =
  /*#__PURE__*/ createUseWriteContract({
    abi: marketplaceV3Abi,
    functionName: 'setRoyaltyEngine',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link marketplaceV3Abi}__
 */
export const useSimulateMarketplaceV3 = /*#__PURE__*/ createUseSimulateContract(
  { abi: marketplaceV3Abi },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"approveBuyerForListing"`
 */
export const useSimulateMarketplaceV3ApproveBuyerForListing =
  /*#__PURE__*/ createUseSimulateContract({
    abi: marketplaceV3Abi,
    functionName: 'approveBuyerForListing',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"approveCurrencyForListing"`
 */
export const useSimulateMarketplaceV3ApproveCurrencyForListing =
  /*#__PURE__*/ createUseSimulateContract({
    abi: marketplaceV3Abi,
    functionName: 'approveCurrencyForListing',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"buyFromListing"`
 */
export const useSimulateMarketplaceV3BuyFromListing =
  /*#__PURE__*/ createUseSimulateContract({
    abi: marketplaceV3Abi,
    functionName: 'buyFromListing',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"cancelListing"`
 */
export const useSimulateMarketplaceV3CancelListing =
  /*#__PURE__*/ createUseSimulateContract({
    abi: marketplaceV3Abi,
    functionName: 'cancelListing',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"createListing"`
 */
export const useSimulateMarketplaceV3CreateListing =
  /*#__PURE__*/ createUseSimulateContract({
    abi: marketplaceV3Abi,
    functionName: 'createListing',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"updateListing"`
 */
export const useSimulateMarketplaceV3UpdateListing =
  /*#__PURE__*/ createUseSimulateContract({
    abi: marketplaceV3Abi,
    functionName: 'updateListing',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"bidInAuction"`
 */
export const useSimulateMarketplaceV3BidInAuction =
  /*#__PURE__*/ createUseSimulateContract({
    abi: marketplaceV3Abi,
    functionName: 'bidInAuction',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"cancelAuction"`
 */
export const useSimulateMarketplaceV3CancelAuction =
  /*#__PURE__*/ createUseSimulateContract({
    abi: marketplaceV3Abi,
    functionName: 'cancelAuction',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"collectAuctionPayout"`
 */
export const useSimulateMarketplaceV3CollectAuctionPayout =
  /*#__PURE__*/ createUseSimulateContract({
    abi: marketplaceV3Abi,
    functionName: 'collectAuctionPayout',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"collectAuctionTokens"`
 */
export const useSimulateMarketplaceV3CollectAuctionTokens =
  /*#__PURE__*/ createUseSimulateContract({
    abi: marketplaceV3Abi,
    functionName: 'collectAuctionTokens',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"createAuction"`
 */
export const useSimulateMarketplaceV3CreateAuction =
  /*#__PURE__*/ createUseSimulateContract({
    abi: marketplaceV3Abi,
    functionName: 'createAuction',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"acceptOffer"`
 */
export const useSimulateMarketplaceV3AcceptOffer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: marketplaceV3Abi,
    functionName: 'acceptOffer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"cancelOffer"`
 */
export const useSimulateMarketplaceV3CancelOffer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: marketplaceV3Abi,
    functionName: 'cancelOffer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"makeOffer"`
 */
export const useSimulateMarketplaceV3MakeOffer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: marketplaceV3Abi,
    functionName: 'makeOffer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"addExtension"`
 */
export const useSimulateMarketplaceV3AddExtension =
  /*#__PURE__*/ createUseSimulateContract({
    abi: marketplaceV3Abi,
    functionName: 'addExtension',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"disableFunctionInExtension"`
 */
export const useSimulateMarketplaceV3DisableFunctionInExtension =
  /*#__PURE__*/ createUseSimulateContract({
    abi: marketplaceV3Abi,
    functionName: 'disableFunctionInExtension',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"enableFunctionInExtension"`
 */
export const useSimulateMarketplaceV3EnableFunctionInExtension =
  /*#__PURE__*/ createUseSimulateContract({
    abi: marketplaceV3Abi,
    functionName: 'enableFunctionInExtension',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"getRoyalty"`
 */
export const useSimulateMarketplaceV3GetRoyalty =
  /*#__PURE__*/ createUseSimulateContract({
    abi: marketplaceV3Abi,
    functionName: 'getRoyalty',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"grantRole"`
 */
export const useSimulateMarketplaceV3GrantRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: marketplaceV3Abi,
    functionName: 'grantRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateMarketplaceV3Initialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: marketplaceV3Abi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"multicall"`
 */
export const useSimulateMarketplaceV3Multicall =
  /*#__PURE__*/ createUseSimulateContract({
    abi: marketplaceV3Abi,
    functionName: 'multicall',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"onERC1155BatchReceived"`
 */
export const useSimulateMarketplaceV3OnErc1155BatchReceived =
  /*#__PURE__*/ createUseSimulateContract({
    abi: marketplaceV3Abi,
    functionName: 'onERC1155BatchReceived',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"onERC1155Received"`
 */
export const useSimulateMarketplaceV3OnErc1155Received =
  /*#__PURE__*/ createUseSimulateContract({
    abi: marketplaceV3Abi,
    functionName: 'onERC1155Received',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"onERC721Received"`
 */
export const useSimulateMarketplaceV3OnErc721Received =
  /*#__PURE__*/ createUseSimulateContract({
    abi: marketplaceV3Abi,
    functionName: 'onERC721Received',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"removeExtension"`
 */
export const useSimulateMarketplaceV3RemoveExtension =
  /*#__PURE__*/ createUseSimulateContract({
    abi: marketplaceV3Abi,
    functionName: 'removeExtension',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"renounceRole"`
 */
export const useSimulateMarketplaceV3RenounceRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: marketplaceV3Abi,
    functionName: 'renounceRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"replaceExtension"`
 */
export const useSimulateMarketplaceV3ReplaceExtension =
  /*#__PURE__*/ createUseSimulateContract({
    abi: marketplaceV3Abi,
    functionName: 'replaceExtension',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"revokeRole"`
 */
export const useSimulateMarketplaceV3RevokeRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: marketplaceV3Abi,
    functionName: 'revokeRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"setContractURI"`
 */
export const useSimulateMarketplaceV3SetContractUri =
  /*#__PURE__*/ createUseSimulateContract({
    abi: marketplaceV3Abi,
    functionName: 'setContractURI',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"setFlatPlatformFeeInfo"`
 */
export const useSimulateMarketplaceV3SetFlatPlatformFeeInfo =
  /*#__PURE__*/ createUseSimulateContract({
    abi: marketplaceV3Abi,
    functionName: 'setFlatPlatformFeeInfo',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"setPlatformFeeInfo"`
 */
export const useSimulateMarketplaceV3SetPlatformFeeInfo =
  /*#__PURE__*/ createUseSimulateContract({
    abi: marketplaceV3Abi,
    functionName: 'setPlatformFeeInfo',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"setPlatformFeeType"`
 */
export const useSimulateMarketplaceV3SetPlatformFeeType =
  /*#__PURE__*/ createUseSimulateContract({
    abi: marketplaceV3Abi,
    functionName: 'setPlatformFeeType',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link marketplaceV3Abi}__ and `functionName` set to `"setRoyaltyEngine"`
 */
export const useSimulateMarketplaceV3SetRoyaltyEngine =
  /*#__PURE__*/ createUseSimulateContract({
    abi: marketplaceV3Abi,
    functionName: 'setRoyaltyEngine',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link marketplaceV3Abi}__
 */
export const useWatchMarketplaceV3Event =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: marketplaceV3Abi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link marketplaceV3Abi}__ and `eventName` set to `"BuyerApprovedForListing"`
 */
export const useWatchMarketplaceV3BuyerApprovedForListingEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: marketplaceV3Abi,
    eventName: 'BuyerApprovedForListing',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link marketplaceV3Abi}__ and `eventName` set to `"CancelledListing"`
 */
export const useWatchMarketplaceV3CancelledListingEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: marketplaceV3Abi,
    eventName: 'CancelledListing',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link marketplaceV3Abi}__ and `eventName` set to `"CurrencyApprovedForListing"`
 */
export const useWatchMarketplaceV3CurrencyApprovedForListingEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: marketplaceV3Abi,
    eventName: 'CurrencyApprovedForListing',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link marketplaceV3Abi}__ and `eventName` set to `"NewListing"`
 */
export const useWatchMarketplaceV3NewListingEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: marketplaceV3Abi,
    eventName: 'NewListing',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link marketplaceV3Abi}__ and `eventName` set to `"NewSale"`
 */
export const useWatchMarketplaceV3NewSaleEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: marketplaceV3Abi,
    eventName: 'NewSale',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link marketplaceV3Abi}__ and `eventName` set to `"UpdatedListing"`
 */
export const useWatchMarketplaceV3UpdatedListingEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: marketplaceV3Abi,
    eventName: 'UpdatedListing',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link marketplaceV3Abi}__ and `eventName` set to `"AuctionClosed"`
 */
export const useWatchMarketplaceV3AuctionClosedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: marketplaceV3Abi,
    eventName: 'AuctionClosed',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link marketplaceV3Abi}__ and `eventName` set to `"CancelledAuction"`
 */
export const useWatchMarketplaceV3CancelledAuctionEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: marketplaceV3Abi,
    eventName: 'CancelledAuction',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link marketplaceV3Abi}__ and `eventName` set to `"NewAuction"`
 */
export const useWatchMarketplaceV3NewAuctionEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: marketplaceV3Abi,
    eventName: 'NewAuction',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link marketplaceV3Abi}__ and `eventName` set to `"NewBid"`
 */
export const useWatchMarketplaceV3NewBidEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: marketplaceV3Abi,
    eventName: 'NewBid',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link marketplaceV3Abi}__ and `eventName` set to `"AcceptedOffer"`
 */
export const useWatchMarketplaceV3AcceptedOfferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: marketplaceV3Abi,
    eventName: 'AcceptedOffer',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link marketplaceV3Abi}__ and `eventName` set to `"CancelledOffer"`
 */
export const useWatchMarketplaceV3CancelledOfferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: marketplaceV3Abi,
    eventName: 'CancelledOffer',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link marketplaceV3Abi}__ and `eventName` set to `"NewOffer"`
 */
export const useWatchMarketplaceV3NewOfferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: marketplaceV3Abi,
    eventName: 'NewOffer',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link marketplaceV3Abi}__ and `eventName` set to `"ContractURIUpdated"`
 */
export const useWatchMarketplaceV3ContractUriUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: marketplaceV3Abi,
    eventName: 'ContractURIUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link marketplaceV3Abi}__ and `eventName` set to `"ExtensionAdded"`
 */
export const useWatchMarketplaceV3ExtensionAddedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: marketplaceV3Abi,
    eventName: 'ExtensionAdded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link marketplaceV3Abi}__ and `eventName` set to `"ExtensionRemoved"`
 */
export const useWatchMarketplaceV3ExtensionRemovedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: marketplaceV3Abi,
    eventName: 'ExtensionRemoved',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link marketplaceV3Abi}__ and `eventName` set to `"ExtensionReplaced"`
 */
export const useWatchMarketplaceV3ExtensionReplacedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: marketplaceV3Abi,
    eventName: 'ExtensionReplaced',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link marketplaceV3Abi}__ and `eventName` set to `"FlatPlatformFeeUpdated"`
 */
export const useWatchMarketplaceV3FlatPlatformFeeUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: marketplaceV3Abi,
    eventName: 'FlatPlatformFeeUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link marketplaceV3Abi}__ and `eventName` set to `"FunctionDisabled"`
 */
export const useWatchMarketplaceV3FunctionDisabledEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: marketplaceV3Abi,
    eventName: 'FunctionDisabled',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link marketplaceV3Abi}__ and `eventName` set to `"FunctionEnabled"`
 */
export const useWatchMarketplaceV3FunctionEnabledEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: marketplaceV3Abi,
    eventName: 'FunctionEnabled',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link marketplaceV3Abi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchMarketplaceV3InitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: marketplaceV3Abi,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link marketplaceV3Abi}__ and `eventName` set to `"PlatformFeeInfoUpdated"`
 */
export const useWatchMarketplaceV3PlatformFeeInfoUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: marketplaceV3Abi,
    eventName: 'PlatformFeeInfoUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link marketplaceV3Abi}__ and `eventName` set to `"PlatformFeeTypeUpdated"`
 */
export const useWatchMarketplaceV3PlatformFeeTypeUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: marketplaceV3Abi,
    eventName: 'PlatformFeeTypeUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link marketplaceV3Abi}__ and `eventName` set to `"RoleAdminChanged"`
 */
export const useWatchMarketplaceV3RoleAdminChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: marketplaceV3Abi,
    eventName: 'RoleAdminChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link marketplaceV3Abi}__ and `eventName` set to `"RoleGranted"`
 */
export const useWatchMarketplaceV3RoleGrantedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: marketplaceV3Abi,
    eventName: 'RoleGranted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link marketplaceV3Abi}__ and `eventName` set to `"RoleRevoked"`
 */
export const useWatchMarketplaceV3RoleRevokedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: marketplaceV3Abi,
    eventName: 'RoleRevoked',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link marketplaceV3Abi}__ and `eventName` set to `"RoyaltyEngineUpdated"`
 */
export const useWatchMarketplaceV3RoyaltyEngineUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: marketplaceV3Abi,
    eventName: 'RoyaltyEngineUpdated',
  })
