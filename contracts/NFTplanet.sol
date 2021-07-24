// contracts/NFTplanet.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract PlanetNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter public totalPlanets;
    mapping (address => uint256[]) planetsIds;
    mapping(uint256 => Planet) allPlanets;
    event NewPlanet(uint256 id);

    struct Planet {
        string name;
        uint256 p;
        uint256 r;
        uint256 a;
        uint256 PlanetId;
        address owner;
        NftArt[] allNfts;
    }
    
    struct NftArt{
        address contractAddress;
        uint256 id;
    }

    constructor() ERC721("PlanetNFT", "PNFT") {}

    function mintPlanet(address player, string memory tokenURI, string name) public returns (uint256)
    {   
        uint256 r;
        uint256 p;
        uint256 a;
        uint256 newPlanetId = totalPlanets.current();


        totalPlanets.increment();  

        _mint(player, newPlanetId);

        uint256[] allIds =  planetIds[msg.sender];
        allIds.push(newPlanetId);

        _setTokenURI(newPlanetId, tokenURI);

        emit NewPlanet(newPlanetId);

        (r, p, a) = getParam();

        Planet.name = name;
        Planet.r = r;
        Planet.p = p;
        Planet.a = a;
        Planet.planetId = newPlanetId;
        Planet.owner = player;
        Planet.allNfts[5];


        return newPlanetId;
    }


    function getParam() public view returns (uint256 r, uint256 p, uint256 a)
    {
        r = 21;
        p = 0;
        a = 2;
    }



}


