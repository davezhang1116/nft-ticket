// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts@4.7.0/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.7.0/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts@4.7.0/access/Ownable.sol";


library Base64 {
    string internal constant TABLE_ENCODE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    bytes  internal constant TABLE_DECODE = hex"0000000000000000000000000000000000000000000000000000000000000000"
                                            hex"00000000000000000000003e0000003f3435363738393a3b3c3d000000000000"
                                            hex"00000102030405060708090a0b0c0d0e0f101112131415161718190000000000"
                                            hex"001a1b1c1d1e1f202122232425262728292a2b2c2d2e2f303132330000000000";

    function encode(bytes memory data) internal pure returns (string memory) {
        if (data.length == 0) return '';

        string memory table = TABLE_ENCODE;

        uint256 encodedLen = 4 * ((data.length + 2) / 3);

        string memory result = new string(encodedLen + 32);

        assembly {
            mstore(result, encodedLen)
            let tablePtr := add(table, 1)

            let dataPtr := data
            let endPtr := add(dataPtr, mload(data))

            let resultPtr := add(result, 32)

            for {} lt(dataPtr, endPtr) {}
            {
                dataPtr := add(dataPtr, 3)
                let input := mload(dataPtr)

                mstore8(resultPtr, mload(add(tablePtr, and(shr(18, input), 0x3F))))
                resultPtr := add(resultPtr, 1)
                mstore8(resultPtr, mload(add(tablePtr, and(shr(12, input), 0x3F))))
                resultPtr := add(resultPtr, 1)
                mstore8(resultPtr, mload(add(tablePtr, and(shr( 6, input), 0x3F))))
                resultPtr := add(resultPtr, 1)
                mstore8(resultPtr, mload(add(tablePtr, and(        input,  0x3F))))
                resultPtr := add(resultPtr, 1)
            }

            switch mod(mload(data), 3)
            case 1 { mstore(sub(resultPtr, 2), shl(240, 0x3d3d)) }
            case 2 { mstore(sub(resultPtr, 1), shl(248, 0x3d)) }
        }

        return result;
    }

    function decode(string memory _data) internal pure returns (bytes memory) {
        bytes memory data = bytes(_data);

        if (data.length == 0) return new bytes(0);
        require(data.length % 4 == 0, "invalid base64 decoder input");
        bytes memory table = TABLE_DECODE;

        uint256 decodedLen = (data.length / 4) * 3;
        bytes memory result = new bytes(decodedLen + 32);

        assembly {
            let lastBytes := mload(add(data, mload(data)))
            if eq(and(lastBytes, 0xFF), 0x3d) {
                decodedLen := sub(decodedLen, 1)
                if eq(and(lastBytes, 0xFFFF), 0x3d3d) {
                    decodedLen := sub(decodedLen, 1)
                }
            }

            mstore(result, decodedLen)

            let tablePtr := add(table, 1)

            let dataPtr := data
            let endPtr := add(dataPtr, mload(data))

            let resultPtr := add(result, 32)

            for {} lt(dataPtr, endPtr) {}
            {
               dataPtr := add(dataPtr, 4)
               let input := mload(dataPtr)


               let output := add(
                   add(
                       shl(18, and(mload(add(tablePtr, and(shr(24, input), 0xFF))), 0xFF)),
                       shl(12, and(mload(add(tablePtr, and(shr(16, input), 0xFF))), 0xFF))),
                   add(
                       shl( 6, and(mload(add(tablePtr, and(shr( 8, input), 0xFF))), 0xFF)),
                               and(mload(add(tablePtr, and(        input , 0xFF))), 0xFF)
                    )
                )
                mstore(resultPtr, shl(232, output))
                resultPtr := add(resultPtr, 3)
            }
        }

        return result;
    }
}

contract Records{

    Ticket private newTickets;
    signitureRecorder private SignitureRecord;

    uint eventNumber;
    uint resetNumber;
    address latest;

    mapping(uint => bool) public addressList;
    mapping(uint => bool) private hashList;
    mapping(address => uint) public addrFinder;
    mapping(address => uint[]) public createdByAddr;
    mapping(address => uint) public addrNonce;
    
    constructor(){
        resetNumber = 0;
        eventNumber = 1;
        addressList[0] = true;
        store_data(0x0000000000000000000000000000000000000000, "0", 0, 0);
        SignitureRecord = new signitureRecorder();

    }

    struct events{
        address contract_address;
        string name;
        uint time;
    }

    events[] public eventList;
    

    function store_data(address _contract_address, string memory _name, uint _time, uint _assignedUint) public returns(uint){
        if (addressList[_assignedUint] == true) {
            eventList.push(events(_contract_address, _name, _time));
            addrFinder[_contract_address] = eventNumber-1;
            eventNumber++;
            addressList[_assignedUint] = false;
            hashList[_assignedUint] = true;
            return (eventNumber-1);
        }else{
            revert();
        }
    }

    function view_data() public view returns(events[] memory ){
        return eventList;
    }
    
    function view_last_seven(uint[] memory a) public view returns(
        events memory,
        events memory,
        events memory,
        events memory,
        events memory,
        events memory,
        events memory
        )
    {
        return (
        eventList[a[0]],
        eventList[a[1]],
        eventList[a[2]],
        eventList[a[3]],
        eventList[a[4]],
        eventList[a[5]],
        eventList[a[6]]
        );
    }

    function view_last_five_by_address(address _targetAddr, uint[] memory a) public view returns(
        uint,
        uint,
        uint,
        uint,
        uint
    ){
        
        return(
            createdByAddr[_targetAddr][a[0]],
            createdByAddr[_targetAddr][a[1]],
            createdByAddr[_targetAddr][a[2]],
            createdByAddr[_targetAddr][a[3]],
            createdByAddr[_targetAddr][a[4]]

        );
    }

    function getUserNonce(address _targetAddr) public view returns(uint){
        return (addrNonce[_targetAddr]);
    }

    function event_Number() public view returns(uint){
        return eventNumber-1;
    }

    function view_data_by_id(uint256 id) public view returns(address, string memory, uint){
        return (eventList[id].contract_address, eventList[id].name, eventList[id].time);
    }

    function view_data_by_address(address _address) public view returns(address, string memory, uint){
        return (eventList[addrFinder[_address]].contract_address, eventList[addrFinder[_address]].name, eventList[addrFinder[_address]].time);
    }

    function view_id_by_address(address _address) public view returns(uint){
        return addrFinder[_address];
    }

    function deploy(string memory _imageLink, string memory _name, string memory _ticker, uint256 _timeForEvent, uint256 _price, uint256 _priceForKids, uint maxAmount, string memory _description, uint256 _seed, string memory _seatingPlan) public {
        
        address sender = msg.sender;
        uint rand = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, eventNumber, _seed)));
        addressList[rand] = true;
        latest = msg.sender;
        createdByAddr[msg.sender].push(eventNumber);
        addrNonce[msg.sender] = addrNonce[msg.sender] + 1;
        newTickets = new Ticket( _imageLink, _name, _ticker, _timeForEvent, _price, _priceForKids,  maxAmount,  _description, sender, rand, _seatingPlan);
        
    }

    function checkIntegrity(uint _hash) public view returns(bool){
        if (hashList[_hash] == true){
            return (true);
        }else{
            return( false);
        }
    }

   
}

interface RecordData{
    function store_data(address _contract_address, string memory _name, uint _time, uint _assignedUint) external returns(uint);
}


contract Ticket is ERC721, ERC721Enumerable, Ownable {

    struct Attr {
        string name;
        uint256 seat;
        bool status;
        bool tickeType;
    }


    mapping(uint256 => bool) private takenSeats;
    mapping(uint256 => Attr) public attributes;
    mapping(string => bool) private signedInSeats;
    mapping(uint256 => uint256) public checkInHash;
    
    string public imageLink;
    string public description;
    string public seatingPlan;
    string public extraDescription;

    uint256 public timeForEvent;
    uint256 public price;
    uint256 public priceForKids;
    address public devAddr;
    address public ownerAddr;
    bool public maxSupply;
    uint public maxSupplyNum;
    uint public currentSupply;
    uint public verifierHash;
    uint[] public tokenListCount; 
    


 
    constructor(string memory _imageLink, string memory _name, string memory _ticker, uint256 _timeForEvent, uint _price, uint _priceForKids, uint maxAmount, string memory _description, address _owner, uint _assignedUint, string memory _seatingPlan) ERC721(_name, _ticker) {
        imageLink = _imageLink;
        description = _description;
	    timeForEvent = _timeForEvent;
        price = _price;
        priceForKids = _priceForKids;
	    devAddr = 0xB0C816956b3e1CF3e9E0654D114Eab0e0dDA6361;
        RecordData RecordDataContract = RecordData(msg.sender);
        ownerAddr = _owner;
        RecordDataContract.store_data(address(this), _name, _timeForEvent, _assignedUint);
        if (maxAmount == 0){
            maxSupply = false;
        }else{
            maxSupply = true;
            maxSupplyNum = maxAmount;
        }
        currentSupply = 0;
        verifierHash = _assignedUint;
        seatingPlan = _seatingPlan;
        _transferOwnership(ownerAddr);
    } 

    function uint2str(uint _i) internal pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint j = _i;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len;
        while (_i != 0) {
            k = k-1;
            uint8 temp = (48 + uint8(_i - _i / 10 * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {   

        if (attributes[tokenId].status == true){
            revert();
        }else{
            super._beforeTokenTransfer(from, to, tokenId);
        }


    }
        
    

    function _burn(uint256 tokenId) internal override(ERC721) {

        if (attributes[tokenId].status == true){
            revert();
        }else{
            super._burn(tokenId);
        }
        
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }


    function payToMint( 
        uint256 tokenId, 
        string memory _name, 
        bool _status) 
        
    public payable{

        if (_status == true){
            if(msg.value != price){
                revert();
            }
        }else{
            if(msg.value != priceForKids){
                revert();
            }
        }

	    require(block.timestamp < timeForEvent, "You cannot mint any token after the event");
        require(tokenId>0, "Token ID must be greater than 0");

        if (maxSupply == true){
            require(currentSupply<maxSupplyNum, "Max supply reached!");
            require(tokenId<=maxSupplyNum, "Token ID needs to be smaller than MaxSupply");
        }

        
        attributes[tokenId] = Attr(_name, tokenId, false, _status);
        currentSupply++;
        tokenListCount.push(tokenId);
        _safeMint(msg.sender, tokenId);
    }

    function mintAndCheckIn(
        uint tokenId,
        string memory _name,
        address _address,
        bool _status
    ) public payable{
        require(block.timestamp < timeForEvent, "You cannot mint any token after the event");
        if (_status == true){
            if(msg.value != price){
                revert();
            }
        }else{
            if(msg.value != priceForKids){
                revert();
            }
        }
        require(tokenId>0, "Token ID must be greater than 0");
        if (maxSupply == true){
            require(currentSupply<maxSupplyNum, "Max supply reached!");
            require(tokenId<=maxSupplyNum, "Token ID needs to be smaller than MaxSupply");
        }
        _safeMint(_address, tokenId);
        attributes[tokenId] = Attr(_name, tokenId, true, _status);
        checkInHash[tokenId] = uint(keccak256(abi.encodePacked(tokenId, block.difficulty, block.timestamp)));
        currentSupply++;
        tokenListCount.push(tokenId);
    }

    function refund(
        uint tokenId
    ) public payable{

        require(msg.sender == ownerOf(tokenId));
        require(block.timestamp < (timeForEvent - 86400), "It's too late to request a refund!");
        _burn(tokenId);
        
        currentSupply--;
        for (uint256 i = 0; i < tokenListCount.length; i++) {
            if (tokenListCount[i] == tokenId) {
                delete tokenListCount[i];
                break;
            }
        }

        if (attributes[tokenId].tickeType == true){
            payable(msg.sender).transfer(price);
        }else{
            payable(msg.sender).transfer(priceForKids);
        }

        attributes[tokenId] = Attr("", 0, false, false);
        
    }
    function withdrawSale() public{
        require(msg.sender==ownerAddr, "you are not the owner");
        require(address(this).balance>0, "This contract has 0 Ether");
        require(block.timestamp > timeForEvent, "Cannot withdraw earnings before the event!");
	    payable(devAddr).transfer(address(this).balance / 200);
        payable(msg.sender).transfer(address(this).balance);
    }

    function getStatus(uint256 tokenId) public view returns (bool){
        return attributes[tokenId].status;
    }

    function getType(uint256 tokenId) public view returns (string memory){
        return attributes[tokenId].name;
    }

    function getPrice() public view returns (uint){
        return price;
    }
    function checkIn(uint256 tokenId) public {
    require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "ERC721: caller is not owner nor approved"
        );
    require(attributes[tokenId].status ==  false, "you have already checked in");
    attributes[tokenId].status = true;
    checkInHash[tokenId] = uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, block.chainid, tokenId, address(this))));
    }

    function checkInHashById(uint tokenId) public view returns (uint){
        return checkInHash[tokenId];
    }

    function getTokenList() public view returns (string memory tokenList){
        tokenList = " ";
        for (uint i = 0; i<balanceOf(msg.sender); i++){
            tokenList = string(abi.encodePacked(tokenList , ", " , uint2str(tokenOfOwnerByIndex(msg.sender, i))));
        }
        return tokenList;
    }

    function getTokenDetail(uint tokenID) public view returns (bool tokenStatus, string memory tokenType){
        return (getStatus(tokenID), getType(tokenID));
    }

    function getImageLink() public view returns(string memory){
        return imageLink;
    }

    function getTokenMaxSupply() public view returns(uint){
        return maxSupplyNum;
    }
    
    function getTokenMaxSupplyStatus() public view returns(bool){
        return maxSupply;
    }

    function getUsedSeats() public view returns(uint[] memory){
        return tokenListCount;
    }

    function getDescription() public view returns(string memory){
        return description;
    }

    function updateExtraDescription(string memory _info) public {
        require(msg.sender==ownerAddr, "You are not the owner");
        extraDescription = _info;
    }

    function updateDescription(string memory _description) public{
        require(msg.sender==ownerAddr, "You are not the owner");
        description = _description;
    }

    function updateImageLink(string memory _imageLink) public{
        require(msg.sender==ownerAddr, "You are not the owner");
        imageLink = _imageLink;
    }

    function updateName(string memory _newName, uint _id) public{
        require(
            _isApprovedOrOwner(_msgSender(), _id),
            "ERC721: caller is not owner nor approved"
        );
        attributes[_id].name = _newName;
    }

    function getHash() public view returns(uint){
        return (verifierHash);
    }

    function tokenURI(uint256 tokenId) override(ERC721) public view returns (string memory) {

        string memory usedStatus;
        string memory attr_name;
        if (attributes[tokenId].status==true){
             usedStatus = "Yes";
        }else{
             usedStatus = "No";
        }
        
        if (attributes[tokenId].tickeType==true){
            attr_name = string(abi.encodePacked("Adult #", uint2str(attributes[tokenId].seat)));
        }else{
            attr_name = string(abi.encodePacked("Children #", uint2str(attributes[tokenId].seat)));
        }
        
              
        string memory json = Base64.encode(
            bytes(string(
                abi.encodePacked(
                    '{"name":"', attr_name,
                    '","description":"', description,
                    '","image":"', imageLink,
                    '","attributes":[{"trait_type":"Seat","value":"', uint2str(attributes[tokenId].seat), '"},{"trait_type":"Checked_In","value":"', usedStatus, '"},{"trait_type":"Ticket_Name","value":"', attributes[tokenId].name, '"}]}'
                )
            ))
        );
        return string(abi.encodePacked('data:application/json;base64,', json));
    }    
}

contract signitureRecorder{

    mapping (string => bool) public signitureIdCount;

    constructor(){
    }

    function addSigniture(string memory _signitureId) public {
        if(signitureIdCount[_signitureId]==true){
            revert();
        }else{
            signitureIdCount[_signitureId] = true;
        }
        
    }

    function getSignitureStatus(string memory _signitureId) public view returns (bool){
        if(signitureIdCount[_signitureId]==true){
            return true;
        }else{
            return false;
        }

    }
}

