// contracts/NFTplanet.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract PlanetNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter public _tokenIds;

    struct Planet {

    }

    constructor() ERC721("PlanetNFT", "PNFT") {}

    function mintPlanet(address player, string memory tokenURI) public returns (uint256 tokenID)
    {
        _tokenIds.increment();

        uint256 newPlanetId = _tokenIds.current();

        _mint(player, newPlanetId);

        _setTokenURI(newPlanetId, tokenURI);

        return newPlanetId;
    }


    function getParam()  public returns (uint256 r, uint256 p, uint256 a)
    {
        
         r = 21;
         p = ;
         a = ;

    }

    function updatePosition (address player, uint256 _tokenID) public returns (uint256 r, uint256 p, uint256 a){
    {

    }

}


