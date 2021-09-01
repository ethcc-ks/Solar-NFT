// contracts/NFTplanet.sol
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/// @title Planet creation in NFT 
/// @author Danny ba and Aymeric Noel
/// @notice we going to use this contract to mint a planet
 
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./IProofOfHumanity.sol"; //We using Kleros implementation

/// @title  Minting the planet 
/// @notice using ERC721URIStorage standards  for the NFTPlanet 
contract NFTplanet is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter public totalPlanets;
    mapping (address => uint256[]) planetsIds;
    mapping(address => bool) POHOwner;
    event NewPlanet(uint256 id, string tokenURI);
    address public constant POH_ADDRESS = 0x9b1590A4D36255b3b18Bb681062FD159f809009f; // ETH ropsten
    ProofOfHumanity proofContract;

    constructor() ERC721("PlanetNFT", "PNFT") {
        proofContract= ProofOfHumanity(POH_ADDRESS);
    }

    function mintPlanet(string memory tokenURI) payable public 
    { 
        require(msg.value >= 0.0001 ether);

        uint256 newPlanetId = totalPlanets.current();

        totalPlanets.increment();  

        _safeMint(msg.sender, newPlanetId);

        _setTokenURI(newPlanetId, tokenURI);

        emit NewPlanet(newPlanetId, tokenURI);
        
    }
}
