// contracts/NFTplanet.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./IProofOfHumanity.sol";

contract NFTplanet is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter public totalPlanets;
    mapping (address => uint256[]) planetsIds;
    mapping(uint256 => Planet) public allPlanets;
    mapping(address => bool) POHOwner;
    event NewPlanet(uint256 id);
    address public constant POH_ADDRESS = 0x9b1590A4D36255b3b18Bb681062FD159f809009f; // ETH ropsten
    ProofOfHumanity proofContract;

    struct Planet {
        string name;
        uint256 PlanetId;
        address owner;
        uint256 slots;
        uint256 nftCounter;
        NftArt[] allNfts;
    }
    
    struct NftArt{
        address contractAddress;
        uint256 id;
    }

    constructor() ERC721("PlanetNFT", "PNFT") {
        proofContract= ProofOfHumanity(POH_ADDRESS);
    }


    function mintPlanet(string memory tokenURI, string memory name) payable public 
    { 
        if(proofContract.isRegistered(msg.sender) && !POHOwner[msg.sender]){
            POHOwner[msg.sender]=true;
            uint256 newPlanetId = totalPlanets.current();

            totalPlanets.increment();  

            _mint(msg.sender, newPlanetId);

            uint256[] storage allIds =  planetsIds[msg.sender];
            allIds.push(newPlanetId);

            _setTokenURI(newPlanetId, tokenURI);

            emit NewPlanet(newPlanetId);

            Planet storage newPlanet = allPlanets[newPlanetId];
            newPlanet.name = name;
            newPlanet.PlanetId = newPlanetId;
            newPlanet.owner = msg.sender;
            newPlanet.slots =5;
            newPlanet.nftCounter=0;
        }else if(msg.value>= 0.0001 ether){
           uint256 newPlanetId = totalPlanets.current();

            totalPlanets.increment();  

            _mint(msg.sender, newPlanetId);

            uint256[] storage allIds =  planetsIds[msg.sender];
            allIds.push(newPlanetId);

            _setTokenURI(newPlanetId, tokenURI);

            emit NewPlanet(newPlanetId);

            Planet storage newPlanet = allPlanets[newPlanetId];
            newPlanet.name = name;
            newPlanet.PlanetId = newPlanetId;
            newPlanet.owner = msg.sender;
            newPlanet.slots =5;
            newPlanet.nftCounter=0;
        }
        
    }




}


