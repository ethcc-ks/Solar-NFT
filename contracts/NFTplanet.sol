// contracts/NFTplanet.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract PlanetNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter public totalPlanets;
    mapping (address => uint256[]) planetsIds;

    event NewPlanet(uint256 id);

    struct Planet {
        uint256 p;
        uint256 r;
        uint256 a;
        uint256 id;
        address owner;
        NftArt[] allNfts;
    }
    
    struct NftArt{
        address contractAddress;
        uint256 id;
    }

    constructor() ERC721("PlanetNFT", "PNFT") {}

    function mintPlanet(address player, string memory tokenURI) public returns (uint256)
    {
        uint256 newPlanetId = totalPlanets.current();
        totalPlanets.increment();        

        _mint(player, newPlanetId);

        _setTokenURI(newPlanetId, tokenURI);

        emit NewPlanet(newPlanetId);

        return newPlanetId;
    }


    function getParam() public view returns (uint256 r, uint256 p, uint256 a)
    {
        
        r = 21;
        p = 0;
        a = 2;
    }

    function updatePosition (address player, uint256 _tokenID) public returns (uint256 r, uint256 p, uint256 a){
    {

    }

}


