import { useState } from "react";
import { ethers, ContractFactory } from "ethers";
import queryString, { stringify } from "query-string";
import ErrorMessage from "./ErrorMessage";
import TxList from "./TxList";
import { QRCodeCanvas } from "qrcode.react";


const abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_imageLink",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_ticker",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_timeForEvent",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_priceForKids",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "maxAmount",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_assignedUint",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_seatingPlan",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "checkIn",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "_status",
				"type": "bool"
			}
		],
		"name": "mintAndCheckIn",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "_status",
				"type": "bool"
			}
		],
		"name": "payToMint",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "refund",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			}
		],
		"name": "updateDescription",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_info",
				"type": "string"
			}
		],
		"name": "updateExtraDescription",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_imageLink",
				"type": "string"
			}
		],
		"name": "updateImageLink",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_newName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "updateName",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdrawSale",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "attributes",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "seat",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "status",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "tickeType",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "checkInHash",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "checkInHashById",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "currentSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "description",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "devAddr",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "extraDescription",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getDescription",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getHash",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getImageLink",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getStatus",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenID",
				"type": "uint256"
			}
		],
		"name": "getTokenDetail",
		"outputs": [
			{
				"internalType": "bool",
				"name": "tokenStatus",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "tokenType",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTokenList",
		"outputs": [
			{
				"internalType": "string",
				"name": "tokenList",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTokenMaxSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTokenMaxSupplyStatus",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getType",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getUsedSeats",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "imageLink",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "maxSupply",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "maxSupplyNum",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ownerAddr",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "price",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "priceForKids",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "seatingPlan",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "timeForEvent",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "tokenByIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "tokenListCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "tokenOfOwnerByIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "verifierHash",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
const abi2 = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "addrFinder",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "addrNonce",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "addressList",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_hash",
				"type": "uint256"
			}
		],
		"name": "checkIntegrity",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "createdByAddr",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_imageLink",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_ticker",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_timeForEvent",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_priceForKids",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "maxAmount",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_seed",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_seatingPlan",
				"type": "string"
			}
		],
		"name": "deploy",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "eventList",
		"outputs": [
			{
				"internalType": "address",
				"name": "contract_address",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "time",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "event_Number",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_targetAddr",
				"type": "address"
			}
		],
		"name": "getUserNonce",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_contract_address",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_time",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_assignedUint",
				"type": "uint256"
			}
		],
		"name": "store_data",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "view_data",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "contract_address",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "time",
						"type": "uint256"
					}
				],
				"internalType": "struct Records.events[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "view_data_by_address",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "view_data_by_id",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "view_id_by_address",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_targetAddr",
				"type": "address"
			},
			{
				"internalType": "uint256[]",
				"name": "a",
				"type": "uint256[]"
			}
		],
		"name": "view_last_five_by_address",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256[]",
				"name": "a",
				"type": "uint256[]"
			}
		],
		"name": "view_last_seven",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "contract_address",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "time",
						"type": "uint256"
					}
				],
				"internalType": "struct Records.events",
				"name": "",
				"type": "tuple"
			},
			{
				"components": [
					{
						"internalType": "address",
						"name": "contract_address",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "time",
						"type": "uint256"
					}
				],
				"internalType": "struct Records.events",
				"name": "",
				"type": "tuple"
			},
			{
				"components": [
					{
						"internalType": "address",
						"name": "contract_address",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "time",
						"type": "uint256"
					}
				],
				"internalType": "struct Records.events",
				"name": "",
				"type": "tuple"
			},
			{
				"components": [
					{
						"internalType": "address",
						"name": "contract_address",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "time",
						"type": "uint256"
					}
				],
				"internalType": "struct Records.events",
				"name": "",
				"type": "tuple"
			},
			{
				"components": [
					{
						"internalType": "address",
						"name": "contract_address",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "time",
						"type": "uint256"
					}
				],
				"internalType": "struct Records.events",
				"name": "",
				"type": "tuple"
			},
			{
				"components": [
					{
						"internalType": "address",
						"name": "contract_address",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "time",
						"type": "uint256"
					}
				],
				"internalType": "struct Records.events",
				"name": "",
				"type": "tuple"
			},
			{
				"components": [
					{
						"internalType": "address",
						"name": "contract_address",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "time",
						"type": "uint256"
					}
				],
				"internalType": "struct Records.events",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const baseURL = () => {

  if (window.location.href.includes("ipfs")) {
    let urlList = window.location.href.split("/")
    let url = ""
    for (let i = 0; i < 5; i++) {
      if (i == 4) {
        url = url + urlList[i]
      } else {
        url = url + urlList[i] + "/"
      }
    }
    return url
  } else {
    let urlList = window.location.href.split("/")
    let url = ""
    for (let i = 0; i < 3; i++) {
      if (i == 2) {
        url = url + urlList[i]
      } else {
        url = url + urlList[i] + "/"
      }
    }
    return url
  }


}

var queryParams = queryString.parse(window.location.search);

const chainList = [421613]; //[5, 1, 3, 4, 11155111, 56, 97, 137, 80001];
const chainNames = ["Arbitrum Goerli"]; /*[
  "Goerli Testnet",
  "Ethereum Mainnet",
  "Ropsten Testnet",
  "Rinkeby Testnet",
  "Sepolia Testnet",
  "Binance Mainnet",
  "Binance Testnet",
  "Polygon Mainnet",
  "Polygon Mumbai Testnet"
];*/
const chainRpcs = ["https://goerli-rollup.arbitrum.io/rpc"]; /*[
  "https://rpc.ankr.com/eth_goerli",
  "https://rpc.ankr.com/eth",
  "https://rpc.ankr.com/eth_ropsten",
  "https://rpc.ankr.com/eth_rinkeby",
  "https://rpc-sepolia.rockx.com",
  "https://rpc.ankr.com/bsc",
  "https://bsctestapi.terminet.io/rpc",
  "https://rpc.ankr.com/polygon",
  "https://rpc.ankr.com/polygon_mumbai"
];*/
const chainSymbol = ["ETH"]; /*[
  "ETH",
  "ETH",
  "ETH",
  "SEP",
  "BNB",
  "BNB",
  "MATIC",
  "MATIC"
];*/

function showMessage() {
  const signiture = queryParams.signiture;
  const contract_address = queryParams.contract_address;
  const address = queryParams.address;
  const tokenId = queryParams.tokenId;

  var currentDiv = document.getElementById("content");

  var newDiv = document.createElement("div");
  newDiv.innerHTML +=
    "<spansBox>Your Token's signiture: " +
    signiture +
    "</spansBox><br/><spansBox>Contract Address: " +
    contract_address +
    "</spansBox><br/><spansBox>Used Address: " +
    address +
    "</spansBox><br/><spansBox>Token ID: " +
    tokenId +
    "</spansBox>";
  currentDiv.parentNode.insertBefore(newDiv, currentDiv);
}

const signMessage = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();

  const contract_address = queryParams.address;
  const tokenId = parseInt(queryParams.tokenId);
  const contractObject = new ethers.Contract(contract_address, abi, signer);
  let msg = await contractObject.checkInHashById(tokenId);
  msg = ethers.utils.arrayify(msg);
  let signiture = await signer.signMessage(msg);

  const signerAddr = await ethers.utils.verifyMessage(msg, signiture);

  window.location.href = baseURL() +
    "/?function=9&signiture=" +
    signiture +
    "&contract_address=" +
    contract_address +
    "&address=" +
    signerAddr +
    "&tokenId=" +
    tokenId;
};

function getFalseMsg() {
  var currentDiv = document.getElementById("content");
  var newDiv = document.createElement("div");
  newDiv.innerHTML = "<spansBox>False</spansBox>";
  currentDiv.parentNode.insertBefore(newDiv, currentDiv);
}

function getTrueMsg() {
  var currentDiv = document.getElementById("content");
  var newDiv = document.createElement("div");
  newDiv.innerHTML = "<spansBox>True</spansBox>";
  currentDiv.parentNode.insertBefore(newDiv, currentDiv);
}

const verifyMessage = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();

  const contract_address = queryParams.address;
  const tokenId = queryParams.tokenId;
  const contractObject = new ethers.Contract(contract_address, abi, signer);
  const contract_returned_address = await contractObject.ownerOf(tokenId);
  let msg = await contractObject.checkInHashById(tokenId);
  msg = ethers.utils.arrayify(msg);

  console.log(contract_returned_address);

  try {
    const signerAddr = await ethers.utils.verifyMessage(msg, signature);
    if (address == signerAddr) {
      if (address == contract_returned_address) {
        getTrueMsg();
      } else {
        getFalseMsg();
      }
    } else {
      getFalseMsg();
    }
  } catch {
    getFalseMsg();
  }
};

const switchChain = async () => {

  if (!window.ethereum)
    alert("it doesn't seem like an ethereum wallet like Metamask is installed on your browser. Install it through chrome store.")
  const chainId = 421613;
  const chainIndex = chainList.indexOf(chainId);

  if (window.ethereum.networkVersion !== chainId) {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x" + chainId.toString(16) }],
      });
    } catch (err) {
      if (err.code === 4902) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainName: chainNames[chainIndex],
              chainId: "0x" + chainId.toString(16),
              nativeCurrency: {
                name: chainSymbol[chainIndex],
                decimals: 18,
                symbol: chainSymbol[chainIndex],
              },
              rpcUrls: [chainRpcs[chainIndex]],
            },
          ],
        });
      }
    }
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
};

function timeConverter(UNIX_timestamp) {
  var time = new Date(UNIX_timestamp * 1000).toLocaleDateString("en-CA");
  return time;
}

const loadFunctions = async () => {


  const contract_address = queryParams.address;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const contractObject = new ethers.Contract(contract_address, abi, signer);
  
  let ens, creater;
  let addr = contractObject.ownerAddr()
  let provider1 = new ethers.providers.JsonRpcProvider("https://goerli.infura.io/v3/93c161580978483eaf45e459c0c8cd7d");
  ens = provider1.lookupAddress(addr);

  let imageLink = contractObject.getImageLink();
  let description =  contractObject.getDescription();

  let maxSupplyStatus =  contractObject.getTokenMaxSupplyStatus();
  let price =  contractObject.getPrice();
  let priceForKids =  contractObject.priceForKids();
  const eventTime = queryParams.time;

  addr = await addr
  imageLink = await imageLink
  description = await description
  maxSupplyStatus = await maxSupplyStatus
  price = await price
  priceForKids = await priceForKids

  const contract2 = new ethers.Contract("0x92Cd43cc5B046c726AeAE62770A14238d063c5Bb", abi2, signer);
  
  
  let contractStatus;
  let contractHash;
  try{
    contractHash = await contractObject.getHash()
    contractStatus = await contract2.checkIntegrity(contractHash)
  }catch{
    contractStatus = false;
  }
  
  if (contractStatus == false){
    alert("This may not be the original contract, be careful")
  }
  

  const countList = await contractObject.getUsedSeats();
  var newList = [];
  for (var k = 0; k < countList.length; k++) {
    newList.push(parseInt(countList[k].toString()));
  }
  //console.log(newList);

  const nft_contract_address = queryParams.address;
  const chainId = parseInt(queryParams.chainId);
  const contract_name = queryParams.name;

  
  
  ens = await ens
  
  if(ens != null){
    creater = ens
  }else{
    creater =addr 
  }
  
  console.log(creater)

  var currentDiv = document.getElementById("content");

  var newDiv = document.createElement("div");
  newDiv.innerHTML +=
    "<br><spansSmall>Contract Address: " +
    nft_contract_address +
    "</spansSmall><br/> <spansSmall>Ticket Name: " +
    contract_name +
    "</spansSmall><br/> <spansSmall>Creater Address: " 
    + creater +
    "</spansSmall><br/> <spansSmall>Event Time: " +
    timeConverter(eventTime) +
    "</spansSmall><br/> <spansSmall>Opensea Link: <a href='https://testnets.opensea.io/assets?search[query]="+nft_contract_address+"'>open link</a></spansSmall>" 
  
   currentDiv.parentNode.insertBefore(newDiv, currentDiv);

  var newDiv = document.createElement("div");
  newDiv.innerHTML +=
    "<spansSmall>Price For Adults: " +
    ethers.utils.formatEther(price) + " ETH</spansSmall><br/><spansSmall>Price For Children: "+ ethers.utils.formatEther(priceForKids) + " ETH</spansSmall> <br/><br/><spansSmall> Only The Creator Can Modify The Settings Below </spansSmall><br/><br/>"

  newDiv.innerHTML +=
    "<spansSmall>Image Link: " + imageLink.substring(0, 50) + "...</spansSmall>"

  currentDiv.parentNode.insertBefore(newDiv, currentDiv);
  btn = document.createElement('button');
  btn.classList.add('blueColor');
  btn.innerHTML = 'Edit Image Link';
  btn.addEventListener('click', function () { startPrompt({ item: 1 }) }, false);
  newDiv.appendChild(btn);
  
  let i
  console.log(description)
  let descriptionList = description.split("\\n")
  console.log(descriptionList)
  for (i=0;i<descriptionList.length;i++) { 
    if (i==0){
      var newDiv = document.createElement("div");
      newDiv.innerHTML +="<br/><spansSmall>Description: " +
      descriptionList[i] + "</spanSmall> "
      currentDiv.parentNode.insertBefore(newDiv, currentDiv);
    }else{
      var newDiv = document.createElement("div");
      newDiv.innerHTML +="<spansSmall>" +
      descriptionList[i] + "</spanSmall> "
      currentDiv.parentNode.insertBefore(newDiv, currentDiv);
    }
  }
  var btn = document.createElement('button');
  btn.classList.add('blueColor');
  btn.innerHTML = 'Edit Description';
  btn.addEventListener('click', function () { startPrompt({ item: 3 }) }, false);
  newDiv.appendChild(btn);




  if (maxSupplyStatus == true) {
    const maxSupply = await contractObject.getTokenMaxSupply();
    const currentUsed = await contractObject.currentSupply();

    var newDiv = document.createElement("div");
    newDiv.innerHTML +=
      "<br><spansSmall>Max Ticket Number: " +
      maxSupply +
      "</spansSmall> <br/> <spansSmall>Sold: " +
      currentUsed +
      "</spansSmall>  ";
    currentDiv.parentNode.insertBefore(newDiv, currentDiv);
    var availableSeats = [];
    for (var j = 0; j < maxSupply; j++) {
      availableSeats.push(j + 1);
    }

    for (var l = 0; l < newList.length; l++) {
      availableSeats.splice(availableSeats.indexOf(newList[l]), 1);
    }

    console.log(availableSeats.length);

    if (availableSeats.length > 20) {
    } else {
      newDiv.innerHTML +=
        "<br><spansSmall> TICKET ID(s) LEFT TO BE MINTED: " +
        availableSeats +
        "</spansSmall>  ";
      currentDiv.parentNode.insertBefore(newDiv, currentDiv);
    }
  } else {

    var newDiv = document.createElement("div");
    newDiv.innerHTML +=
      "<br><spansSmall>Max Ticket Number: Unlimited </spansSmall>  ";
    currentDiv.parentNode.insertBefore(newDiv, currentDiv);

  }

  var link;

  var newDiv = document.createElement("div");
  newDiv.innerHTML += "<img class='center' src='" + imageLink + "'/>";
  currentDiv.parentNode.insertBefore(newDiv, currentDiv);
  let largest = 0
  let seatingPlan = JSON.parse(await contractObject.seatingPlan())
  console.log(seatingPlan)
  /*[[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 0],
  [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42],
  [43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64],
  [65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86],
  [87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 0 , 0 , 0 , 0 , 0 , 0, 0, 0]
  ]*/

  var newDiv = document.createElement("div");
  let y,z, initHTML;

  if (seatingPlan.length == 1 && seatingPlan[0].length == 0){
    initHTML = '<spansSmall>No seating plan provided</spansSmall><br/><br>'

  }else{
   initHTML = '<spansSmall>Grey: empty space; Orange: seat taken; Yellow: seat available</spansSmall><div class="container">'
  for(y=0;y<seatingPlan.length;y++){
    initHTML += '<div class="row"> <div class="column c'+y+'">'

    for(z=0;z<seatingPlan[y].length;z++){
      if(seatingPlan[y].length>largest){
        largest = seatingPlan[y].length
      }
      if(seatingPlan[y][z]!=0){
        if(newList.includes(seatingPlan[y][z])==true){
          initHTML += '<l><p>'+ seatingPlan[y][z] + '</p></l>\n'
        }else{
          initHTML += '<x><p>'+ seatingPlan[y][z] + '</p></x>\n'
        }
          
      }else{
        initHTML += '<u><o>x</o></u>\n'
      }
    }
    initHTML += "</div></div>"

  }
  initHTML += "</div><br/><br/>"

  largest += largest/4

  let styles = "<style> .column x {\
    width:" + (1/largest)*100+"%; \
    display: inline-block; \
    text-align: center; \
    padding: 20px 0; \
    background: yellow; \
    margin: 7px 0; \
    cursor: crosshair;\
  }\
  .column x p {\
    display: block; \
    text-align: center; \
    transition: ease .35s;\
    opacity: 1;\
  }\
  .column l {\
    width:" + (1/largest)*100+"%; \
    display: inline-block; \
    text-align: center; \
    padding: 20px 0; \
    background: orange; \
    margin: 7px 0; \
    cursor: crosshair;\
  }\
  .column l p {\
    display: block; \
    text-align: center; \
    transition: ease .35s;\
    opacity: 1;\
  }\
  .column u {\
    width: " + (1/largest)*100+"%; \
    display: inline-block; \
    text-align: center; \
    padding: 20px 0; \
    background: grey; \
    margin: 7px 0; \
    cursor: crosshair;\
  }\
  .column u o { display: block;text-align: center; transition: ease .35s;\
    opacity: 0;\
  } </style>"

  console.log(styles)

  initHTML += styles

  }
  newDiv.innerHTML += initHTML;
  currentDiv.parentNode.insertBefore(newDiv, currentDiv);

  link = baseURL() + "/?function=3&address=" + nft_contract_address 

  newDiv = document.createElement("div");
  newDiv.innerHTML +=
    '<button class="button button1" onclick="location.href=\'' +
    link +
    "'\" >View Your Tokens</button>";
  currentDiv.parentNode.insertBefore(newDiv, currentDiv);

  link = baseURL() + "/?function=1&address=" + nft_contract_address 

  newDiv = document.createElement("div");

  newDiv.innerHTML +=
    '<button class="button button1" onclick="location.href=\'' +
    link +
    "'\" >Mint Ticket For Yourself*</button>";
  currentDiv.parentNode.insertBefore(newDiv, currentDiv);

  
  link = baseURL() +
    "/?function=10&address=" + nft_contract_address 

  newDiv = document.createElement("div");

  newDiv.innerHTML +=
    '<button class="button button1" onclick="location.href=\'' +
    link +
    "'\" >Mint Ticket For Others And Check In**</button>";
  currentDiv.parentNode.insertBefore(newDiv, currentDiv);

  link = baseURL() + "/?function=14&address=" + nft_contract_address 

  newDiv = document.createElement("div");

  newDiv.innerHTML +=
    '<button class="button button1" onclick="location.href=\'' +
    link +
    "'\" >Refund Ticket***</button>";
  currentDiv.parentNode.insertBefore(newDiv, currentDiv);

  link = baseURL() + "/?function=5&address=" + nft_contract_address 

  newDiv = document.createElement("div");
  newDiv.innerHTML +=
    '<button class="button button1" onclick="location.href=\'' +
    link +
    "'\" >Withdraw Sale (only the creater)</button>";
  currentDiv.parentNode.insertBefore(newDiv, currentDiv);

  newDiv = document.createElement("div");
  newDiv.innerHTML +=
    '<button class="button button1" onclick="location.href=' +
    "'?function=6&address=0x92Cd43cc5B046c726AeAE62770A14238d063c5Bb&page=1'\" >Return To Contract List</button>";
  currentDiv.parentNode.insertBefore(newDiv, currentDiv);


  newDiv = document.createElement("div");
  newDiv.innerHTML +=
    "<br/><br/><br/><spansSmall>*This function will mint a ticket to payer's address immediately after a payment. This type of ticket can be traded on Opensea and transferred to other addresses. In order to use this type of ticket, users need to submit a transaction to sign in (option available in the View Your Tokens section). Once signed in, tickets will no longer be transferrable or tradable.</spansSmall>";
  currentDiv.parentNode.insertBefore(newDiv, currentDiv);

  newDiv = document.createElement("div");
  newDiv.innerHTML +=
    "<br/><br/><spansSmall>**This option allows non-crypto users to use this service, but this type of ticket cannot be traded, transferred or refunded as it is signed in and ready to use.</spansSmall>";
  currentDiv.parentNode.insertBefore(newDiv, currentDiv);

  newDiv = document.createElement("div");
  newDiv.innerHTML +=
    "<br/><br/><spansSmall>*** Refunding will be disabled 24H before the event starts.</spansSmall>";
  currentDiv.parentNode.insertBefore(newDiv, currentDiv);
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const getAvailableSeat = async () => {
  switchChain();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  var contract_address;
  if (queryParams.address) {
    contract_address = queryParams.address;
  } else {
    alert("No Contract Address");
  }
  const contractObject = new ethers.Contract(contract_address, abi, signer);

  const maxSupply = await contractObject.getTokenMaxSupply();
  const countList = await contractObject.getUsedSeats();

  var seatValue;

  if (maxSupply == 0) {
    seatValue = getRandomInt(1000000000);
    document.getElementById("seatID").value = seatValue;
  } else {
    var newList = [];
    for (var k = 0; k < countList.length; k++) {
      newList.push(parseInt(countList[k].toString()));
    }

    var availableSeats = [];
    for (var j = 0; j < maxSupply; j++) {
      availableSeats.push(j + 1);
    }

    for (var l = 0; l < newList.length; l++) {
      availableSeats.splice(availableSeats.indexOf(newList[l]), 1);
    }

    if (availableSeats.length == 0) {
      alert("No Tickets Available");
    } else {
      seatValue = availableSeats[getRandomInt(availableSeats.length)];
      document.getElementById("seatID").value = seatValue;
    }
  }
};

const listOnHtml = async(nftNum, data) => {
  const delay = ms => new Promise(res => setTimeout(res, ms));

  const abi3 = [
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "a",
          "type": "address[]"
        }
      ],
      "name": "retrieve",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
  let provider1 = new ethers.providers.JsonRpcProvider("https://goerli.infura.io/v3/93c161580978483eaf45e459c0c8cd7d");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const contractObject = new ethers.Contract("0xc45aAe3F20308C7a686D86A3f16aa05a6d7546f5", abi3, signer);
  let i;
  let addrList = []
  let newList = [
  "0x0000000000000000000000000000000000000000",
  "0x0000000000000000000000000000000000000000",
  "0x0000000000000000000000000000000000000000",
  "0x0000000000000000000000000000000000000000",
  "0x0000000000000000000000000000000000000000",
  "0x0000000000000000000000000000000000000000",
  "0x0000000000000000000000000000000000000000"]

  //console.log(data)
  for (i = data.length - 7; i < data.length; i++) {
      addrList.push(data[i].contract_address)
  }

  for (i=0;i<7;i++){
    if (addrList[i] == "0x0000000000000000000000000000000000000000"){
      addrList[i] = "0xE7d329D2F3c3924ff5705e74655773738f6e3534"
    }

  }

  //console.log(addrList)
  let ownerList = await contractObject.retrieve(addrList)
  
  let addr1, addr2, addr3, addr4, addr5, addr6, addr7
  /*
  for(i = 0; i<7; i++){

      addr = await provider1.lookupAddress(ownerList[i])
      if(addr!=null){
        newList[i] = addr
      }else{
        newList[i] = ownerList[i]
      }
    }
  */
  addr1 =  provider1.lookupAddress(ownerList[0])
  addr2 =  provider1.lookupAddress(ownerList[1])
  addr3 =  provider1.lookupAddress(ownerList[2])
  addr4 =  provider1.lookupAddress(ownerList[3])
  addr5 =  provider1.lookupAddress(ownerList[4])
  addr6 =  provider1.lookupAddress(ownerList[5])
  addr7 =  provider1.lookupAddress(ownerList[6])
  
  
  newList[0] = await addr1
  newList[1] = await addr2
  newList[2] = await addr3
  newList[3] = await addr4
  newList[4] = await addr5
  newList[5] = await addr6
  newList[6] = await addr7
  
  for(i=0;i<7;i++){
    if(newList[i] == null){
      newList[i]=ownerList[i]
    }
  }

  let k = 0
  var currentDiv = document.getElementById("tableList");
  for (i = data.length - 7; i < data.length; i++) {
    if (data[i]) {
      if (data[i].contract_address !== "0x0000000000000000000000000000000000000000") {
        var newDiv = document.createElement("tr");
        newDiv.innerHTML +=
          "  <td>" +
          (nftNum - 1) +
          "</td> <td>" +
          data[i].contract_address
          +
          " </td>  <td>" +
          timeConverter(data[i].time) +
          "</td>  <td>" +
          data[i].name +
          "</td> <td>" +
          newList[k] +
          "</td> <td><a href='/?function=7&address=" +
          data[i].contract_address +
          "&name=" +
          data[i].name +
          "&time=" +
          data[i].time +
          "'>Link</a>";
        currentDiv.parentNode.insertBefore(newDiv, currentDiv);
        nftNum--
        k++
      }
    }
  }
}

const listEventsInfo = async () => {
  switchChain()

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  var contract_address;
  if (queryParams.address) {
    contract_address = queryParams.address;
  } else {
    alert("No Contract Address");
    //#window.location.href = baseURL()+ "/";
  }

  const contractObject = new ethers.Contract(contract_address, abi2, signer);
  var eventNumber = await contractObject.event_Number();
  var page = parseInt(queryParams.page)-1;
  eventNumber = eventNumber - (page * 21 )
  var data;
  var data1;
  var data2;
  var data3;
  var i;
  var index;
  var intList;
  var intList1;
  var intList2;
  var intList3;



  if (eventNumber < 8) {
    intList = []

    for (i = 0; i < 8; i++) {
      intList.push(0)
    }

    index = 0
    for (i = eventNumber - 15; i > (eventNumber - 22); i--) {
      if (i<0){
        intList[index] = 0
      }else{
        intList[index] = i
      }

      index++
    }

    data = await contractObject.view_last_seven(intList);
    await listOnHtml(eventNumber, data)
    


  } else if (eventNumber < 15 && eventNumber > 7) {
    intList1 = []
    intList2 = []

    for (i = eventNumber - 1; i > (eventNumber - 8); i--) {
      intList1.push(i)
    }

    for (i = 0; i < 8; i++) {
      intList2.push(0)
    }

    index = 0
    for (i = eventNumber - 8; i > (eventNumber - 15); i--) {
      if (i<0){
        intList2[index] = 0
      }else{
        intList2[index] = i
      }

      index++
    }
    console.log(intList2)
    data = await contractObject.view_last_seven(intList1);
    let await1 = listOnHtml(eventNumber, data)
    eventNumber -= 7
    await new Promise(r => setTimeout(r, 500));
    data = await contractObject.view_last_seven(intList2);
    let await2 = listOnHtml(eventNumber, data)
    await await1;
    await await2;
  } else {
    intList1 = []
    intList2 = []
    intList3 = []


    for (i = eventNumber - 1; i > (eventNumber - 8); i--) {
      intList1.push(i)
    }

    for (i = eventNumber - 8; i > (eventNumber - 15); i--) {
      intList2.push(i)
    }


    for (i = 0; i < 8; i++) {
      intList3.push(0)
    }

    index = 0

    for (i = eventNumber - 15; i > (eventNumber - 22); i--) {
      if (i<0){
        intList3[index] = 0
      }else{
        intList3[index] = i
      }

      index++
    }

   
    data1 = await contractObject.view_last_seven(intList1);
    let await1 = listOnHtml(eventNumber, data1)
    await new Promise(r => setTimeout(r, 500));
    eventNumber -= 7
    data2 = await contractObject.view_last_seven(intList2);
    let await2 = listOnHtml(eventNumber, data2)
    await new Promise(r => setTimeout(r, 500));
    eventNumber -= 7
    data3 = await contractObject.view_last_seven(intList3);
    let await3 = listOnHtml(eventNumber, data3)
    await await1;
    await await2;
    await await3;
    console.log(data1)
    console.log(data2)
    console.log(data3)
  }

  console.log(data)


  //const data = await contractObject.view_data();

  /*
  var tableDiv = document.getElementById("tableStaff");
  var newTableDiv = document.createElement("tr");
  newTableDiv.innerHtml += "<th>Contract ID</th> <th>Name</th> <th>Date</th> <th>Contract Address</th>"
  tableDiv.parentNode.insertBefore(newTableDiv, tableDiv);
  */

}

const getPrice = async () => {
  switchChain();

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  var contract_address;
  if (queryParams.address) {
    contract_address = queryParams.address;
  } else {
    alert("No Contract Address");
    window.location.href = baseURL() + "/";
  }

  const contractObject = new ethers.Contract(contract_address, abi, signer);
  const price = await contractObject.getPrice();
  const ethValue = ethers.utils.formatEther(price);

  if (ethValue == 0) {
    document.getElementById("content").innerHTML =
      "<label> Price: Free </label>";
  } else {
    document.getElementById("content").innerHTML =
      "<label> Price: " + ethValue + " ETH</label>";
  }
};

const updateInfo = async ({ item, contract_address, value }) => {
  switchChain();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const contractObject = new ethers.Contract(contract_address, abi, signer);
  if (item == 1) {
    try {
      const tx = await contractObject.updateImageLink(
        value
      );
      console.log("tx", tx);
    } catch (err) {
      alert(err);
    }
  } else if (item == 2) {
    value = ethers.utils.parseUnits(value, 18);
    try {
      const tx = await contractObject.updatePrice(
        value
      );
      console.log("tx", tx);
    } catch (err) {
      alert(err);
    }

  } else {
    try {
      const tx = await contractObject.updateDescription(
        value
      );
      console.log("tx", tx);
    } catch (err) {
      alert(err);
    }
  }
}

const getPrices = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  var contract_address;
  if (queryParams.address) {
    contract_address = queryParams.address;
  } else {
    alert("No Contract Address");
    window.location.href = baseURL() + "/";
  }

  const contractObject = new ethers.Contract(contract_address, abi, signer);
  const price =  contractObject.getPrice();
  const priceForKids =  contractObject.priceForKids();
  const ethValue = ethers.utils.formatEther(await price);
  const ethValue1 = ethers.utils.formatEther(await priceForKids);


  document.getElementById("addToHere").innerHTML =
  '<option value="0">Choose an option</option><option value="1">Adults '+ethValue +' ETH</option><option value="2">Children '+ethValue1+' ETH</option>'
  
}

const startPrompt = async ({ item }) => {
  if (confirm("Only the creater can edit information. \nPlease make sure that you use the address that created this contract to edit settings. Otherwise, you will encounter an error! \nPress OK to proceed.") == true) {
    let value;
    if (item == 1) {
      value = window.prompt("New Image Link: ")
      if (value !== null) {
        updateInfo({
          item: item,
          contract_address: queryParams.address,
          value: value
        })
      }else{
        alert("empty prompt")
      }
    } else if (item == 2) {
      value = window.prompt("New Price: ")
    } else {
      value = window.prompt("New Description: ")
      if (value.length > 2500){
        alert("description too long")
      }else{
        if (value !== null) {
          updateInfo({
            item: item,
            contract_address: queryParams.address,
            value: value
          })
        }else{
          alert("empty prompt")
        }
      }
    }

    
  }
}

const startPayment = async ({ setError, setTxs, seatID, name, type }) => {
  if (!window.ethereum)
    throw new Error("No crypto wallet found. Please install it.");

  switchChain()

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  var contract_address;
  if (queryParams.address) {
    contract_address = queryParams.address;
  } else {
    alert("No Contract Address");
    window.location.href = baseURL() + "/";
  }
  const contractObject = new ethers.Contract(contract_address, abi, signer);

  let price, status

  if (type == 1){
    price = await contractObject.getPrice();
    status = true
  }else{
    price = await contractObject.priceForKids();
    status = false
  }

  try {
    const tx = await contractObject.payToMint(
      seatID,
      name.split(" ").join("_"),
      status,
      {
        value: price,
      }
    );

    console.log({ seatID, name });
    console.log("tx", tx);
    setTxs([tx]);
  } catch (err) {
    alert(err);
  }
};

const startRefund = async ({ setError, setTxs, id, address }) => {
  if (!window.ethereum)
    throw new Error("No crypto wallet found. Please install it.");

  switchChain()

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  var contract_address;
  if (queryParams.address) {
    contract_address = queryParams.address;
  } else {
    alert("No Contract Address");
    window.location.href = baseURL() + "/";
  }
  const contractObject = new ethers.Contract(contract_address, abi, signer);

  console.log(id)
  try {
    const tx = await contractObject.refund(
      id
    );

    console.log("tx", tx);
    setTxs([tx]);
  } catch (err) {
    alert(err);
  }
};

const paymentForAnother = async ({
  setError,
  setTxs,
  type,
  seatID,
  name,
  address,
}) => {
  if (!window.ethereum)
    throw new Error("No crypto wallet found. Please install it.");

  switchChain()

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  var contract_address;
  if (queryParams.address) {
    contract_address = queryParams.address;
  } else {
    alert("No Contract Address");
    window.location.href = baseURL() + "/";
  }
  const contractObject = new ethers.Contract(contract_address, abi, signer);
  
  let price, status
  if (type == 1){
    price = await contractObject.getPrice();
    status = true
  }else{
    price = await contractObject.priceForKids();
    status = false
  }

  try {
    const tx = await contractObject.mintAndCheckIn(
      seatID,
      name.split(" ").join("_"),
      address,
      status,
      {
        value: price,
      }
    );


    console.log({ seatID, name });
    console.log("tx", tx);
    setTxs([tx]);
  } catch (err) {
    alert(err);
  }
};

const checkIn = async ({ setError, setTxs, seatID }) => {
  if (!window.ethereum)
    throw new Error("No crypto wallet found. Please install it.");

  switchChain()

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  var contract_address;
  if (queryParams.address) {
    contract_address = queryParams.address;
  } else {
    alert("No Contract Address");
    window.location.href = baseURL() + "/";
  }

  const contractObject = new ethers.Contract(contract_address, abi, signer);
  const tx = await contractObject.checkIn(seatID);
  console.log("tx", tx);
  setTxs([tx]);
};

const withdrawSale = async ({ setError, setTxs }) => {
  if (!window.ethereum)
    throw new Error("No crypto wallet found. Please install it.");

  switchChain()

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  var contract_address;
  if (queryParams.address) {
    contract_address = queryParams.address;
  } else {
    alert("No Contract Address");
    window.location.href = baseURL() + "/";
  }

  try {
    const contractObject = new ethers.Contract(contract_address, abi, signer);
    const tx = await contractObject.withdrawSale();
    console.log("tx", tx);
    setTxs([tx]);
  } catch (err) {
    alert(err)
  }
};

const getOwnedToken = async ({ setError, setTxs }) => {
  if (!window.ethereum)
    throw new Error("No crypto wallet found. Please install it.");

  switchChain()

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  var contract_address;
  if (queryParams.address) {
    contract_address = queryParams.address;
  } else {
    alert("No Contract Address");
    window.location.href = baseURL() + "/";
  }
  const contractObject = new ethers.Contract(contract_address, abi, signer);
  var tokens = await contractObject.getTokenList();

  var currentDivBox = document.getElementById("content-box");
  currentDivBox.innerHTML = '<div id="content"></div>';

  console.log(tokens)

  if (tokens !== " ") {
    var tokenList = tokens.split(", ");
    tokenList.shift();
    for (let i = 0; i < tokenList.length; i++) {
      var newDiv = document.createElement("div");
      var callResult = await contractObject.getTokenDetail(tokenList[i]);
      var status;
      var type;
      var { 0: status, 1: type } = callResult;
      if (status == false) {
        newDiv.innerHTML +=
          "<p style='white-space: pre;float:left'> Token ID: " +
          tokenList[i] +
          "      Name: " +
          type +
          "    </p>" +
          "<a style:'float=right' href=/?address=" +
          contract_address +
          "&function=2&seatID=" +
          tokenList[i] +
          "> Check In </a>";
      } else {
        newDiv.innerHTML +=
          "<p style='white-space: pre;'> Token ID: " +
          tokenList[i] +
          "      Name: " +
          type +
          "    You have already checked in  Action: <a class='a' href='" + baseURL() + "/?function=8&address=" +
          contract_address +
          "&tokenId=" +
          tokenList[i] +
          "'> Get Qr Code Authorization Receipt</a></p>";
      }
      var currentDiv = document.getElementById("content");
      currentDiv.parentNode.insertBefore(newDiv, currentDiv);
    }
  } else {
    var newDiv = document.createElement("div");
    newDiv.innerHTML += "<p>You don't have any ticket of this collection. If your tickets are stored in other accounts, you may need to switch wallet manually.</p>";
    var currentDiv = document.getElementById("content");
    currentDiv.parentNode.insertBefore(newDiv, currentDiv);
  }
};

const deploy = async ({
  setError,
  setTxs,
  name,
  tokenTicker,
  poster,
  timeForeEvent,
  price,
  priceForKids,
  network,
  contract_address,
  description,
  maxTokenAmount,
  seatingPlan

}) => {
  if (!window.ethereum)
    throw new Error("No crypto wallet found. Please install it.");
  if (description.lenth > 2500){
    alert("description too long!")
  }else{
    console.log("deploying...")
    switchChain()
    var date = new Date(timeForeEvent);
    var unixTime = Math.floor(date.getTime() / 1000);
    console.log(typeof price)
    var priceInWei = ethers.utils.parseUnits(price, 18);
    console.log("deploying...")
    console.log(typeof priceForKids)
    var priceKidsInWei =  ethers.utils.parseUnits(priceForKids, 18);
    console.log("deploying...")
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contractObject = new ethers.Contract(contract_address, abi2, signer);

    const tx = await contractObject.deploy(
      poster,
      name.split(" ").join("_"),
      tokenTicker,
      unixTime,
      priceInWei,
      priceKidsInWei,
      maxTokenAmount,
      description,
      getRandomInt(100000000000),
      seatingPlan
    );
    var newDiv = document.createElement("div");
    newDiv.innerHTML += "<p> SUCCESS </p>";
    console.log("contract address", tx.address);
    var currentDiv = document.getElementById("content");
    currentDiv.parentNode.insertBefore(newDiv, currentDiv);
  }
  
};

const getEventArr = async (addr) => {
  switchChain()

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  var contract_address;
  if (queryParams.address) {
    contract_address = queryParams.address;
  } else {
    alert("No Contract Address");
    //#window.location.href = baseURL()+ "/";
  }

  const contractObject = new ethers.Contract(contract_address, abi2, signer);
  const data = await contractObject.view_data_by_address(addr);
  return data;
};

const displayContractBalance = async () => {


  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  var contract_address;
  if (queryParams.address) {
    contract_address = queryParams.address;
  } else {
    alert("No Contract Address");
    window.location.href = baseURL() + "/";
  }

  const balance = await provider.getBalance(contract_address);
  const ethValue = ethers.utils.formatEther(balance);

  var currentDiv = document.getElementById("content");
  newDiv = document.createElement("div");
  newDiv.innerHTML += "<label>Available To Withdraw: " + ethValue + " ETH</label>";
  currentDiv.parentNode.insertBefore(newDiv, currentDiv);

}


export default function App() {
  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);

  if (queryParams.function == 1) {
    const handleSubmit = async (e) => {
      e.preventDefault();
      const data = new FormData(e.target);
      if (data.get("name") !== "") {
        setError();
        await startPayment({
          setError,
          setTxs,
          seatID: data.get("seatID"),
          name: data.get("name"),
          type: data.get("type")
        });
      }
    };

    window.onload = function () {
      getPrices();
      switchChain();
    };

    return (
      <form className="m-4" onSubmit={handleSubmit}>
        <div className="credit-card w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
          <main className="mt-4 p-4">
            <h1 className="text-xl font-semibold text-gray-700 text-center">
              Mint Ticket
            </h1>

            <div id="content"></div>

            <div>
              <button onClick={getAvailableSeat}>
                <a class="a">Get Random Available Seat</a>
              </button>
            </div>

            <select
                  name="type"
                  type="text"
                  id = "addToHere"
                  className="input input-bordered block w-full focus:ring focus:outline-none"
  
                  required
                >
                  
                  
            </select>

            <div className="">
              <div className="my-3">
                <input
                  type="number"
                  step="1"
                  name="seatID"
                  id="seatID"
                  className="input input-bordered block w-full focus:ring focus:outline-none"
                  placeholder="Your Ticket ID"
                />
              </div>
              <div className="my-3">
                <input
                  name="name"
                  type="text"
                  className="input input-bordered block w-full focus:ring focus:outline-none"
                  placeholder="Your Name"
                />
              </div>
            </div>
          </main>
          <footer className="p-4">
            <button
              type="submit"
              className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
            >
              Connect Wallet and Pay Now
            </button>
            <ErrorMessage message={error} />
            <TxList txs={txs} />
          </footer>
        </div>
      </form>
    );
  } else if (queryParams.function == 2) {
    window.onload = function () {
      switchChain();
    };
    const handleSubmitFunc2 = async (e) => {
      e.preventDefault();
      const data = new FormData(e.target);
      setError();
      await checkIn({
        setError,
        setTxs,
        seatID: queryParams.seatID,
      });
    };

    return (
      <form className="m-4" onSubmit={handleSubmitFunc2}>
        <button
          type="submit"
          className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
        >
          Connect Wallet And Check In
        </button>
        <spansBox>In order to use this ticket, you must check in.</spansBox>
        <br></br>
        <spansBox>Once this ticket is checked in, you can no longer transfer, refund or sell it.</spansBox>
        <br></br>
        <spansBox>This action is not reversible.</spansBox>
        <ErrorMessage message={error} />
        <TxList txs={txs} />
      </form>
    );
  } else if (queryParams.function == 3) {
    window.onload = function () {
      switchChain();
      getOwnedToken(setError, setTxs);
    };
    const handleSubmitFunc3 = async (e) => {
      e.preventDefault();
      const data = new FormData(e.target);
      setError();
      await getOwnedToken({
        setError,
        setTxs,
      });
    };
    return (
      <form className="m-4" onSubmit={handleSubmitFunc3}>
        <button
          type="submit"
          className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
        >
          Check/Refresh Your Tokens
        </button>
        <br />
        <br />
        <ErrorMessage message={error} />
        <TxList txs={txs} />
        <div id="content-box">
          <div id="content"></div>
        </div>
      </form>
    );
  } else if (queryParams.function == 5) {
    window.onload = function () {
      switchChain();
      displayContractBalance();
    };
    const handleSubmitFunc5 = async (e) => {
      e.preventDefault();
      const data = new FormData(e.target);
      setError();
      await withdrawSale({
        setError,
        setTxs,
      });
    };
    return (
      <form className="m-4" onSubmit={handleSubmitFunc5}>
        <div id="content">

        </div>
        <br /><br />
        <button
          type="submit"
          className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
        >
          Connect Wallet And Withdraw Your Sales
        </button>

        <spanBox>Please make sure that you use the address that created this contract to withdraw your earnings. Otherwise, you will encounter an error!</spanBox>
        <br />
        <br />
        <br />

        <ErrorMessage message={error} />
        <TxList txs={txs} />
        <div id="content"></div>
      </form>
    );
  } else if (queryParams.function == 4) {
    window.onload = function () {
      switchChain();
    };
    const handleSubmitFunc4 = async (e) => {
      e.preventDefault();
      const data = new FormData(e.target);
      setError();
      await deploy({
        setError,
        setTxs,
        name: data.get("name"),
        tokenTicker: data.get("tokenTicker"),
        poster: data.get("poster"),
        timeForeEvent: data.get("timeForeEvent"),
        price: data.get("price"),
        priceForKids: data.get("priceKidsInWei"),
        network: data.get("network"),
        contract_address: data.get("contract_address"),
        description: data.get("description"),
        maxTokenAmount: data.get("maxTokenAmount"),
        seatingPlan: data.get("seatingPlan")
      });
    };
    return (
      <form className="m-4" onSubmit={handleSubmitFunc4}>
        <div className="credit-card w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
          <main className="mt-4 p-4">
            <h1 className="text-xl font-semibold text-gray-700 text-center">
              Deploy ERC-721 Token Contract
            </h1>

            <div className="">
              <label>Token Name</label>
              <div className="my-3">
                <input
                  type="text"
                  name="name"
                  className="input input-bordered block w-full focus:ring focus:outline-none"
                  placeholder="Token Name"
                  required
                />
              </div>
              <div className="my-3">
                <label>Token Ticker (usually three capital letters)</label>
                <input
                  name="tokenTicker"
                  type="text"
                  className="input input-bordered block w-full focus:ring focus:outline-none"
                  placeholder="Token Ticker"
                  required
                />
              </div>
              <div className="my-3">
                <label>Date of Event</label>
                <input
                  name="timeForeEvent"
                  type="date"
                  className="input input-bordered block w-full focus:ring focus:outline-none"
                  placeholder="Date To End Sell"
                  required
                />
              </div>
              <div className="my-3">
                <label>Price For Adults</label>
                <input
                  name="price"
                  type="text"
                  className="input input-bordered block w-full focus:ring focus:outline-none"
                  placeholder="Price For Adults In ETH"
                  required
                />
              </div>
              <div className="my-3">
                <label>Price For Children</label>
                <input
                  name="priceKidsInWei"
                  type="text"
                  className="input input-bordered block w-full focus:ring focus:outline-none"
                  placeholder="Price For Children In ETH"
                  required
                />
              </div>
              <div className="my-3">
                <label>Image Poster</label>
                <input
                  name="poster"
                  type="text"
                  className="input input-bordered block w-full focus:ring focus:outline-none"
                  placeholder="Poster Link, recommand IPFS link"
                  required
                />
              </div>
              <div className="my-3">
                <label>Network</label>
                <select
                  name="network"
                  type="text"
                  className="input input-bordered block w-full focus:ring focus:outline-none"
                  placeholder="Poster Link, recommand IPFS link"
                  required
                >
                  <option value="1">eth-goerli-arbitrum-rollup</option>
                </select>
              </div>
              <div className="my-3">
                <label>Max Token Amount (0 to disable limitation)</label>
                <input
                  name="maxTokenAmount"
                  type="number"
                  step="1"
                  className="input input-bordered block w-full focus:ring focus:outline-none"
                  placeholder="0"
                  defaultValue="0"
                  required
                />
              </div>
              <div className="my-3">
                <label>Ticket Description (max 2500 characters, add "\n" to break lines)</label>
                <input
                  name="description"
                  type="text"
                  className="input input-bordered block w-full focus:ring focus:outline-none"
                  placeholder="Token Description"
                  required
                />
              </div>
              <div className="my-3">
                <label>Seating Plan (format: uint[uint[], 0 means disabled spot])</label>
                <input
                  name="seatingPlan"
                  type="text"
                  className="input input-bordered block w-full focus:ring focus:outline-none"
                  placeholder="Token Description"
                  required
                />
              </div>
              <div className="my-3">
                <label>Default storage contract</label>
                <input
                  name="contract_address"
                  type="text"
                  className="input input-bordered block w-full focus:ring focus:outline-none"
                  placeholder="Storage Address"
                  defaultValue="0x92Cd43cc5B046c726AeAE62770A14238d063c5Bb"
                />
              </div>
            </div>
          </main>
          <footer className="p-4">
            <button
              type="submit"
              className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
            >
              Login With Metamask and Deploy
            </button>
            <ErrorMessage message={error} />
            <TxList txs={txs} />

            <div id="content">
              {" "}
              <br></br>
              <h3>fee rate: 0.5%</h3>
            </div>
          </footer>
        </div>
      </form>
    );
  } else if (queryParams.function == 6) {
    window.onload = function () {
      switchChain();
      listEventsInfo();
    };
    async function nextPage(e){
      e.preventDefault();
      window.location.href = baseURL() + "/?function=6&address=0x92Cd43cc5B046c726AeAE62770A14238d063c5Bb&page=" + (parseInt(queryParams.page) + 1)
    }
    async function privPage(e){
      e.preventDefault();
      if(queryParams.page == 1){
        alert("This is the first page")
        window.location.href = baseURL() + "/?function=6&address=0x92Cd43cc5B046c726AeAE62770A14238d063c5Bb&page=" + (parseInt(queryParams.page))
      }else{
        window.location.href = baseURL() + "/?function=6&address=0x92Cd43cc5B046c726AeAE62770A14238d063c5Bb&page=" + (parseInt(queryParams.page) - 1)
      }
     

    }
    const handleSubmit6 = async (e) => {
      e.preventDefault();
      const data = new FormData(e.target);
      setError();
      
      let contract_address;
      try {
        contract_address = ethers.utils.getAddress(
          data.get("contract_address")
        );
      } catch (err) {
        alert(err);
        return undefined;
      }
      console.log(contract_address);
      const dataArray = await getEventArr(contract_address);
      console.log(dataArray)

      if (false) {
        alert("No Contract Found In This Collection");
      } else {
        const contractName = dataArray[1];
        const contractTime = dataArray[2];
        window.location.href = baseURL() +
          "/?function=7&address=" + contract_address + "&name=" + contractName + "&time=" + contractTime;
      }
    };

    return (
     
        <div>
          <title>Last 21 Contracts Created</title>
          <div class="title">
            <spansTitle>Last 21 Contracts Created</spansTitle>
          </div> 

          <div class="content paddingSetting">
          <form className="m-4" onSubmit={handleSubmit6}>
            <div className="my-3 paddingSetting">
              <label>Contracts Not Shown? Type Your Contract Address Here</label>
              <br />
              <input
                name="contract_address"
                type="text"
                className="input input-bordered block focus:ring focus:outline-none floatLeft lengthControl"
                placeholder="Token Contract Address"
              />
              <button
                type="submit"
                className="btn btn-primary submit-button focus:ring focus:outline-none floatRight lengthControlButton"
              >
                Go!
              </button>
            </div>
            </form>
            <br />

            <form className="m-4" onSubmit={nextPage}>
            <button
                type="submit"
                className="btn btn-primary submit-button bg-gray-300 hover:bg-gray-400 floatRight "
              >
                Next Page
              </button>
            </form>
            <form className="m-4" onSubmit={privPage}>
              <button
                  type="submit"
                  className="btn btn-primary submit-button bg-gray-300 hover:bg-gray-400floatLeft"
                >
                  Privious Page
                </button>
            </form>


            <table id="addresses">
              <tr>
                <th>ID</th>
                <th>Contract Address</th>
                <th>Event Date</th>
                <th>Name</th>
                <th>Creater Address/ENS</th>
                <th>Details</th>
              </tr>
              <div id="tableList"></div>
            </table>
          </div>
        </div>
      
    );
  } else if (queryParams.function == 7) {
    window.onload = function () {
      switchChain();
      loadFunctions();
    };
    return (
      <div>
        <div id="content"></div>
      </div>
    );
  } else if (queryParams.function == 8) {
    window.onload = function () {
      signMessage();
    };

    return (
      <div>
        <div id="content">
          <p>please sign the message with metamask</p>
        </div>
      </div>
    );
  } else if (queryParams.function == 9) {
    window.onload = function () {
      showMessage();
    };
    const qrcode = (
      <QRCodeCanvas
        id="qrCode"
        value={
          queryParams.signiture +
          "," +
          queryParams.tokenId +
          "," +
          queryParams.address +
          "," +
          queryParams.contract_address
        }
        size={300}
        bgColor={"#FFFFFF"}
        level={"H"}
      />
    );
    return (
      <div style={{ padding: "2%" }}>
        <div id="content"></div>
        <div className="qrcode__container" style={{ padding: "1%" }}>
          QR CODE:
          <div>{qrcode}</div>
        </div>
      </div>
    );
  } else if (queryParams.function == 10) {
    const handleSubmit = async (e) => {
      e.preventDefault();
      const data = new FormData(e.target);
      if (data.get("name") !== "") {
        setError();
        await paymentForAnother({
          setError,
          setTxs,
          type: parseInt(data.get("type")),
          seatID: parseInt(data.get("seatID")),
          name: data.get("name").split(" ").join("_"),
          address: data.get("address").split(" ").join(""),
        });
      }
    };

    let prices

    window.onload = function () {
      
      switchChain();
      getPrices();

    };
    console.log(prices)

    

   

    return (
      <form className="m-4" onSubmit={handleSubmit}>
        <div className="credit-card w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
          <main className="mt-4 p-4">
            <h1 className="text-xl font-semibold text-gray-700 text-center">
              Mint Ticket For Others
            </h1>

            <div id="content"></div>

            <div>
              <button onClick={getAvailableSeat}>
                <a class="a">Get Random Available Seat</a>
              </button>
            </div>

            <select
                  name="type"
                  type="text"
                  id = "addToHere"
                  className="input input-bordered block w-full focus:ring focus:outline-none"
  
                  required
                >
                  
                  
            </select>

            <div className="">
              <div className="my-3">
                <input
                  type="number"
                  step="1"
                  name="seatID"
                  id="seatID"
                  className="input input-bordered block w-full focus:ring focus:outline-none"
                  placeholder="Ticket ID"
                />
              </div>
              <div className="my-3">
                <input
                  name="name"
                  type="text"
                  className="input input-bordered block w-full focus:ring focus:outline-none"
                  placeholder="Name"
                />
              </div>
              <div className="my-3">
                <input
                  name="address"
                  type="text"
                  className="input input-bordered block w-full focus:ring focus:outline-none"
                  placeholder="Address To Mint"
                />
              </div>
            </div>
          </main>
          <footer className="p-4">
            <button
              type="submit"
              className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
            >
              Connect Wallet and Pay Now
            </button>
            <ErrorMessage message={error} />
            <TxList txs={txs} />
          </footer>
        </div>
      </form>
    );
  } else if (queryParams.function == 11) {
    const handleSubmit = async (e) => {
      e.preventDefault();
      const data = new FormData(e.target);
      if (data.get("name") !== "") {
        setError();
        await paymentForAnother({
          setError,
          setTxs,
          seatID: parseInt(data.get("seatID")),
          name: data.get("name").split(" ").join("_"),
          address: data.get("address").split(" ").join(""),
        });
      }
    };

    window.onload = function () {
      switchChain();
      loadInfo();
    };



    return (
      <form className="m-4" onSubmit={handleSubmit}>
        <div className="credit-card w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
          <main className="mt-4 p-4">
            <h1 className="text-xl font-semibold text-gray-700 text-center">
              Edit NFT Information For Contract
            </h1>

            <div id="content"></div>

            <div className="">
              <div className="my-3">
                <input
                  type="text"
                  name="imageLink"
                  id="imageLink"
                  className="input input-bordered block w-full focus:ring focus:outline-none"
                  placeholder="New Image Link"
                />
              </div>
              <div className="my-3">
                <input
                  name="description"
                  type="text"
                  className="input input-bordered block w-full focus:ring focus:outline-none"
                  placeholder="New Description"
                />
              </div>
              <div className="my-3">
                <input
                  name="price"
                  type="text"
                  className="input input-bordered block w-full focus:ring focus:outline-none"
                  placeholder="New Price"
                />
              </div>
            </div>
          </main>
          <footer className="p-4">
            <button
              type="submit"
              className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
            >
              Connect Wallet and Commit Change
            </button>
            <ErrorMessage message={error} />
            <TxList txs={txs} />
          </footer>
        </div>
      </form>
    );
  }else if (queryParams.function == 12){


    window.onload = function () {
      switchChain();
    };
    

    const handleSubmit6 = async (e) => {
      let provider1 = new ethers.providers.JsonRpcProvider("https://goerli.infura.io/v3/93c161580978483eaf45e459c0c8cd7d");
      e.preventDefault();
      const data = new FormData(e.target);
      setError();
      let contract_address;
      try {
        contract_address = ethers.utils.getAddress(
          data.get("contract_address")
        );
      } catch (err) {
        try{
          contract_address = await provider1.resolveName(data.get("contract_address"));
        }catch{
          alert(err);
          return undefined;
        }
        
      }
      console.log(contract_address);

      window.location.href = baseURL() +
          "/?function=13&address=" + contract_address  +"&page=1"
      }
  


    return (
      <form className="m-4" onSubmit={handleSubmit6}>
        <div>
          <title>Find Ticket By A Creator's address</title>
          <div class="title">
            <spansTitle>Find Ticket By A Creator's address</spansTitle>
          </div>

          <div class="content paddingSetting">
            <div className="my-3 paddingSetting">
              <label>Type A Creator's Address OR ENS Name (including .eth)</label>
              <br />
              <input
                name="contract_address"
                type="text"
                className="input input-bordered block focus:ring focus:outline-none floatLeft lengthControl"
                placeholder="Address"
              />
              <button
                type="submit"
                className="btn btn-primary submit-button focus:ring focus:outline-none floatRight lengthControlButton"
              >
                Go!
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
  
  else if (queryParams.function ==13){
    window.onload = function () {
      switchChain();
      loadData()
    };

    async function nextPage(e){
      e.preventDefault();
      window.location.href = baseURL() + "/?function=13&address="+queryParams.address+"&page=" + (parseInt(queryParams.page) + 1)
    }
    async function privPage(e){
      e.preventDefault();
      if(queryParams.page == 1){
        alert("This is the first page")
        window.location.href = baseURL() + "/?function=13&address="+queryParams.address+"&page=" + (parseInt(queryParams.page))
      }else{
        window.location.href = baseURL() + "/?function=13&address="+queryParams.address+"&page=" + (parseInt(queryParams.page) - 1)
      }
     

    }
      const loadData = async() => {
        
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();

        let creator_address = queryParams.address;
        try {
          creator_address = ethers.utils.getAddress(
            creator_address
          );
        } catch (err) {
          alert(err);
          return undefined;
        }
        var currentDiv = document.getElementById("main");
        var newDiv = document.createElement("div");
        newDiv.innerHTML = "<title>Contracts Created By " + creator_address + "</title> <div class='title'> <spansTitle>Contracts Created By " + creator_address +"</spansTitle> </div>"
        currentDiv.parentNode.insertBefore(newDiv, currentDiv);

        var requestList = [];
        var requestList2 =[];
        var i, index;        

        const contractObject = new ethers.Contract("0x92Cd43cc5B046c726AeAE62770A14238d063c5Bb", abi2, signer);
        let userNonce = await contractObject.getUserNonce(creator_address)
        userNonce = userNonce.toNumber()
        let page = parseInt(queryParams.page)-1
        userNonce -= page*5
        if (userNonce == 0){
          alert("This address hasn't yet created any tickets")
        }
        for(i=0;i<5;i++){
          requestList.push(0)
        }
        index=0
        if (userNonce > 5){
          for(i=userNonce;i>userNonce-5;i--){
            requestList[index]=i-1
            index++
          }
        }else{
          for(i=userNonce;i>0;i--){
            requestList[index]=i-1
            index++
          }
        }
        console.log(requestList)
        let dataArr = await contractObject.view_last_five_by_address(creator_address, requestList)
        console.log(dataArr)
        for (i=0;i<dataArr.length;i++){
          requestList2.push(dataArr[i].toNumber()-1)
        }
        requestList2.push(0)
        requestList2.push(0)

        console.log(requestList2)
        let dataArray = await contractObject.view_last_seven(requestList2)
        console.log(dataArray)
        let data = dataArray;
        let nftNum = userNonce
        var currentDiv = document.getElementById("tableList");

        for (i = data.length - 7; i < data.length; i++) {
          if (data[i]) {
            if (data[i].contract_address !== "0x0000000000000000000000000000000000000000") {
              if(nftNum<1){
                break
              }
              var newDiv = document.createElement("tr");
              newDiv.innerHTML +=
                "  <td>" +
                (nftNum ) +
                "</td> <td>" +
                data[i].contract_address
                +
                " </td>  <td>" +
                timeConverter(data[i].time) +
                "</td>  <td>" +
                data[i].name +
                "</td> " +
                "<td><a href='/?function=7&address=" +
                data[i].contract_address +
                "&name=" +
                data[i].name +
                "&time=" +
                data[i].time +
                "'>Link</a>";
              currentDiv.parentNode.insertBefore(newDiv, currentDiv);
              nftNum--
              
            }
          }
        }
      };
  
  
      return (

          <div id="main">
            
            <form className="mr-8" onSubmit={nextPage}>
            <button
                type="submit"
                className="btn btn-primary submit-button floatRight "
              >
                Next Page
              </button>
            </form>
            <form className="ml-8" onSubmit={privPage}>

              <button
                  type="submit"
                  className="btn btn-primary submit-button floatLeft"
                  
                >
                  Privious Page
                </button>
            </form>
            <br/>
            <br/>
  
            <div class="content paddingSetting">
              <br />
              <table id="addresses">
                <tr>
                  <th>ID</th>
                  <th>Contract Address</th>
                  <th>Event Date</th>
                  <th>Name</th>
                  <th>Details</th>
                </tr>
                <div id="tableList"></div>
              </table>
            </div>
          </div>

      );
    
  }else if(queryParams.function == 14){
    const handleSubmit = async (e) => {
      e.preventDefault();
      const data = new FormData(e.target);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      let accounts = await provider.send("eth_requestAccounts", []);
      let account = accounts[0];
      console.log(account)
      if (true) {
        setError();
  
        await startRefund({
          setError,
          setTxs,
          id: data.get("seatID"),
          address: account
        });
      }
    };

    window.onload = function () {

      switchChain();
    };

    return (
      <form className="m-4" onSubmit={handleSubmit}>
        <div className="credit-card w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
          <main className="mt-4 p-4">
            <h1 className="text-xl font-semibold text-gray-700 text-center">
              Refund Ticket
            </h1>

            <div id="content"></div>

            <div>
             </div>

            <div className="">
              <div className="my-3">
                <input
                  type="number"
                  step="1"
                  name="seatID"
                  id="seatID"
                  className="input input-bordered block w-full focus:ring focus:outline-none"
                  placeholder="Your Ticket ID"
                />
              </div>
            </div>
          </main>
          <footer className="p-4">
            <button
              type="submit"
              className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
            >
              Connect Wallet and Refund Now
            </button>
            <ErrorMessage message={error} />
            <TxList txs={txs} />
          </footer>
        </div>
      </form>
    );
  }
  else {
    window.onload = function () {
      switchChain();
    };

    return (
      <div>
        <title>Home</title>
        <div class="title"></div>
        <br />
        <div class="box">
          <spansBox> Have you ever lost your paper ticket? </spansBox>
          <br />
          <br />
          <spansBox> Have you ever been scammed? </spansBox>
          <br />
          <br />
          <spansBox>
            {" "}
            Have your credit card information ever been stolen?{" "}
          </spansBox>
          <br />
          <br />
          <spansBox>
            {" "}
            Use this app to get your ticket on blockchain!{" "}
          </spansBox>
          <br />
          <br />
          <spansBox>
            {" "}
            You don't even need to own crypto to use this service!{" "}
          </spansBox>
        </div>
        <br />
        <br />
        <div class="content">
          <button
            class="button button1"
            onClick={() => {
              window.location.href = baseURL() + "/?function=4";
            }}
          >
            Create NFT Contract{" "}
          </button>

          <button
            class="button button1"
            onClick={() => {
              console.log(baseURL())
              window.location.href = baseURL() +
                "/?function=6&address=0x92Cd43cc5B046c726AeAE62770A14238d063c5Bb&page=1";
            }}
          >
            {" "}
            All Token Contracts
          </button>

          <button
            class="button button1"
            onClick={() => {
              console.log(baseURL())
              window.location.href = baseURL() +
                "/?function=12";
            }}
          >
            {" "}
            Search Tickets By A Creator's Address or ENS Name
          </button>
        </div>
      </div>
    );
  }
}