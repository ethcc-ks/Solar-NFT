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
        uint256 p;
        uint256 r;
        uint256 a;
        uint256 PlanetId;
        address owner;
        uint256 slots;
        NftArt[] allNfts;
    }
    
    struct NftArt{
        address contractAddress;
        uint256 id;
    }

    constructor() ERC721("PlanetNFT", "PNFT") {}

    function mintPlanet(string memory tokenURI, string memory name) public returns (uint256)
    {   
        uint256 r;
        uint256 p;
        uint256 a;
        uint256 newPlanetId = totalPlanets.current();


        totalPlanets.increment();  

        _mint(msg.sender, newPlanetId);

        uint256[] storage allIds =  planetsIds[msg.sender];
        allIds.push(newPlanetId);

        _setTokenURI(newPlanetId, tokenURI);

        emit NewPlanet(newPlanetId);

        (r, p, a) = getParam();

        Planet memory newPlanet;
        newPlanet.name = name;
        newPlanet.r = r;
        newPlanet.p = p;
        newPlanet.a = a;
        newPlanet.PlanetId = newPlanetId;
        newPlanet.owner = msg.sender;
        newPlanet.slots =5;
        newPlanet.allNfts= new NftArt[](5);

        allPlanets[newPlanetId]= newPlanet;

        return newPlanetId;
    }


    function getParam() public view returns (uint256 r, uint256 p, uint256 a)
    {
        r = 21;
        p = 0;
        a = 2;
    }



}


