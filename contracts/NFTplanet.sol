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
    mapping(uint256 => Planet) public allPlanets;
    mapping(address => bool) POHOwner;
    event NewPlanet(uint256 id, uint nbSlots,string NFTname, string tokenURI);
    address public constant POH_ADDRESS = 0x9b1590A4D36255b3b18Bb681062FD159f809009f; // ETH ropsten
    ProofOfHumanity proofContract;
    
    struct Planet {
        string name;
        uint256 PlanetId;
        address owner;
        //number of "place" available to store your other NFT in the planet
        uint256 slots;
        uint256 nftCounter;
        NftArt[] allNfts;
    }
    
    //What is inside a slots of NftArt
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

            Planet storage newPlanet = allPlanets[newPlanetId];
            newPlanet.name = name;
            newPlanet.PlanetId = newPlanetId;
            newPlanet.owner = msg.sender;
            newPlanet.slots =5;
            emit NewPlanet(newPlanetId, newPlanet.slots,  newPlanet.name, tokenURI);

            newPlanet.nftCounter=0;
        }else if(msg.value>= 0.0001 ether){
           uint256 newPlanetId = totalPlanets.current();

            totalPlanets.increment();  

            _mint(msg.sender, newPlanetId);

            uint256[] storage allIds =  planetsIds[msg.sender];
            allIds.push(newPlanetId);

            _setTokenURI(newPlanetId, tokenURI);


            Planet storage newPlanet = allPlanets[newPlanetId];
            newPlanet.name = name;
            newPlanet.PlanetId = newPlanetId;
            newPlanet.owner = msg.sender;
            newPlanet.slots =5;
            emit NewPlanet(newPlanetId, newPlanet.slots,  newPlanet.name, tokenURI);

            newPlanet.nftCounter=0;
        }
        
    }




}


