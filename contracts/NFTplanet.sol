// contracts/NFTplanet.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTplanet is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter public totalPlanets;
    mapping (address => uint256[]) planetsIds;
    mapping(uint256 => Planet) public allPlanets;
    event NewPlanet(uint256 id);
     

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

    constructor() ERC721("PlanetNFT", "PNFT") {}

    function mintPlanet(string memory tokenURI, string memory name) public returns (uint256)
    {   
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

        return newPlanetId;
    }




}


