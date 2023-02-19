import "./styles.css";
import { useState } from "react";
import QrReader from "react-qr-reader";
import { ethers, ContractFactory } from "ethers";
import queryString from "query-string";
var queryParams = queryString.parse(window.location.search);

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
				"internalType": "address",
				"name": "_storage_address",
				"type": "address"
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "to",
				"type": "address"
			}
		],
		"name": "refund",
		"outputs": [],
		"stateMutability": "payable",
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			}
		],
		"name": "updatePrice",
		"outputs": [],
		"stateMutability": "nonpayable",
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
	},
	{
		"inputs": [],
		"name": "withdrawSell",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
const abi2 = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_signitureId",
                "type": "string"
            }
        ],
        "name": "addSigniture",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_signitureId",
                "type": "string"
            }
        ],
        "name": "getSignitureStatus",
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
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "name": "signitureIdCount",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

const abi3 = [
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


const chainList = [421613]; //[1, 3, 4, 11155111, 56, 97, 137, 80001];
const chainNames = ["Arbitrum Goerli"]; /*[
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

function timeConverter(UNIX_timestamp) {
    var time = new Date(UNIX_timestamp * 1000).toLocaleDateString("en-CA");
    return time;
}

function convertHash(hash){
    let i;
    let newhash = ""
    for(i=0;i<hash.length;i++){
        switch(hash[i]){
            case "1":
            case "2":
			case "3":
			case "4":
			case "5":
			case "6":
			case "7":
			case "8":
			case "9":
			case "0":
                newhash = newhash + "0"
                break
            default:
                newhash = newhash + hash[i]
                break
        }
    }
    return newhash
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

    const contractObject = new ethers.Contract(contract_address, abi3, signer);
    const eventNumber = await contractObject.event_Number();

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
        for (i = 0; i < eventNumber; i++) {
            intList[index] = i
            index++
        }

        data = await contractObject.view_last_seven(intList);
    } else if (eventNumber < 15) {
        intList1 = [0, 1, 2, 3, 4, 5, 6]
        intList2 = []

        for (i = 0; i < 8; i++) {
            intList2.push(0)
        }

        index = 0
        for (i = 7; i < eventNumber; i++) {
            intList2[index] = i
        }
        data1 = await contractObject.view_last_seven(intList1);
        data2 = await contractObject.view_last_seven(intList2);

        data = data1.concat(data2)


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
            intList3[index] = i
            index++
        }

        console.log(eventNumber)

        data1 = await contractObject.view_last_seven(intList1);
        data2 = await contractObject.view_last_seven(intList2);
        data3 = await contractObject.view_last_seven(intList3);
        console.log(data1)
        console.log(data2)
        console.log(data3)

        data = data1.concat(data2).concat(data3)
    }

    console.log(data)


    //const data = await contractObject.view_data();

    /*
    var tableDiv = document.getElementById("tableStaff");
    var newTableDiv = document.createElement("tr");
    newTableDiv.innerHtml += "<th>Contract ID</th> <th>Name</th> <th>Date</th> <th>Contract Address</th>"
    tableDiv.parentNode.insertBefore(newTableDiv, tableDiv);
    */

    var currentDiv = document.getElementById("tableList");

    let nftNum = eventNumber;
    for (i = data.length - 22; i < data.length; i++) {
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
                    "</td> " +
                    "<td><a href='/?function=2&address=" +
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

const switchChain = async () => {
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

function getFalseMsg() {
    var currentDiv = document.getElementById("content");
    currentDiv.innerHTML = "<spansBox>False or Used QR CODE!!!</spansBox>";
}

async function getTrueMsg({ username, tokenId, msg, contract_address_nft }) {
    const provider = new ethers.providers.JsonRpcProvider("https://goerli-rollup.arbitrum.io/rpc");
    const signer = new ethers.Wallet("2c8adb4e04c5781b7a4affd7c974c42808f2419eadd751cc7ea3e4ec2e96e679", provider);
    const contract_address = "0xA54F9Ad91E51b6cb68bB826Ef64E103013B506f8";
    const contractObject = new ethers.Contract(contract_address, abi2, signer);
    let message = convertHash(msg)
    const status = await contractObject.getSignitureStatus(message);

    if (status == true) {
        var currentDiv = document.getElementById("content");
        currentDiv.innerHTML = "<spansBox>Error</spansBox>";
        alert("Ticket has already been used!!!")
        return undefined;

    } else {
        const tx = await contractObject.addSigniture(message, { gasLimit: 3000000, gasPrice: 1000000000 });
        tx.wait()
    }

    var currentDiv = document.getElementById("content");
    currentDiv.innerHTML = "<spansBox>Welcome " + username + ", token id: " + tokenId + ", contract address: " + contract_address_nft + "</spansBox>";
    alert("success")
}

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
  
	const contractObject = new ethers.Contract(contract_address, abi3, signer);
	const data = await contractObject.view_data_by_address(addr);
	return data;
  };
  

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
const App = () => {
    const [error, setError] = useState();
    const [code, setCode] = useState(null);
    const [showDialog, setDiaglog] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [precScan, setPrecScan] = useState("");
    const [selected, setSelected] = useState("environment");
    const [errorMessage, setErrorMessage] = useState(null);

    var processingStatus = true;

    async function ProcessData({ qr = "" }) {

        processingStatus = false
        const data = qr.split(",");
        const signature = data[0];
        const tokenId = data[1];
        const address = data[2];
        const contract_address = data[3];

        await switchChain();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        
        var currentDiv = document.getElementById("content");
        currentDiv.innerHTML = "<spansBox>processing</spansBox>";

        if (contract_address == queryParams.address) {
            const contractObject = new ethers.Contract(contract_address, abi, signer);
            const contract_returned_address = await contractObject.ownerOf(tokenId);
            const message = await contractObject.checkInHashById(tokenId);
            let msg = ethers.utils.arrayify(message)
            const username = await contractObject.getType(tokenId);

            try {
                const signerAddr = ethers.utils.verifyMessage(msg, signature)
                if (address == signerAddr) {
                    if (address == contract_returned_address) {
                        await getTrueMsg({ username: username, tokenId: tokenId, msg: signature, contract_address_nft: contract_address })
                    } else {
                        getFalseMsg()
                    }
                } else {
                    getFalseMsg()
                }
            } catch (err) {
                alert(err)
            }


        } else {
            alert("Wrong Ticket/contract address")
        }
        processingStatus = true;


    }

    const handleScan = async (scanData) => {
        if (scanData && scanData !== "" && !showDialog && !processing && processingStatus) {
            await ProcessData({ qr: scanData });
        }
    };
    const handleError = (err) => {
        console.error(err);
    };

    const fillInfo = async () => {
        const name = queryParams.name;
        const address = queryParams.address;
        const eventTime = queryParams.time;

        var currentDiv = document.getElementById("content");
        var newDiv = document.createElement("div");
        newDiv.innerHTML +=
            "<spansSmall>Contract Address: " +
            address +
            "</spansSmall><br/> <spansSmall>Ticket Name: " +
            name +
            "</spansSmall><br/> <spansSmall>Event Time: " +
            timeConverter(eventTime) +
            "</spansSmall> <br><br>"

        currentDiv.parentNode.insertBefore(newDiv, currentDiv);
    }

    if (queryParams.function == 1) {
        window.onload = function () {
            switchChain();
            listEventsInfo();
        };




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
                    "/?function=2&address=" + contract_address + "&name=" + contractName + "&time=" + contractTime;
            }
        };

        return (
            <form className="m-4" onSubmit={handleSubmit6}>
                <div>
                    <title>Ticket Verifier</title>
                    <div class="title">
                        <h1>Ticket Verifier</h1>
                        <spansTitle>Last 21 Contract Created</spansTitle>
                    </div>

                    <div class="content paddingSetting">
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
                        <br />
                        <br />
                        <table id="addresses">
                            <tr>
                                <th>ID</th>
                                <th>Contract Address</th>
                                <th>Event Date</th>
                                <th>Name</th>
                                <th>Verifier Portal</th>
                            </tr>
                            <div id="tableList"></div>
                        </table>
                    </div>
                </div>
            </form>
        );

    } else if (queryParams.function == 2) {
        window.onload = function () {
            switchChain();
            fillInfo();
        };

        return (
            <div className="App">
                <h1>QR Code Verifier</h1>

                <br /><br />
                <div id="content"></div>
                <select onChange={(e) => setSelected(e.target.value)}>
                    <option value={"environment"}>Back Camera</option>
                    <option value={"user"}>Front Camera</option>
                </select>
                {showDialog && (
                    <div className="dialog">
                        <div className="dialog-content">
                            <div className="close">
                                <button
                                    onClick={() => {
                                        setCode(null);
                                        setErrorMessage(null);
                                        setDiaglog(false);
                                        setProcessing(false);
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                            {errorMessage && (
                                <div className="errorMessage">
                                    <h2>{errorMessage}</h2>
                                </div>
                            )}

                        </div>
                    </div>
                )}
                {/* {code && <h2>{code.text}</h2>} */}
                {!showDialog && !processing && (
                    <QrReader
                        facingMode={selected}
                        delay={200}
                        onError={handleError}
                        onScan={handleScan}
                        // chooseDeviceId={()=>selected}
                        style={{ width: "200px", heigth: "100px" }}
                    />
                )}
                <div id="content">

                </div>
            </div>
        );
    } else {
        window.onload = function () { window.location = "/?function=1&address=0x92cd43cc5b046c726aeae62770a14238d063c5bb" }
    }
}

export default App;
