// contracts/PlanetReact.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @title Planet reactions
/// @author Danny ba and Aymeric Noel
/// @notice we going to use this contract handle "reaction" of the planet

import "./NFTplanet.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract PlanetReact is NFTplanet{
    event NFTadded(uint256 planetId, address owner, address nftAddress, uint256 nftId);
    event slotAdded(uint256 planetId, address owner);

    modifier onlyPlanetOwner(uint256 planetId){
        require(msg.sender==allPlanets[planetId].owner);
        _;
    }

    /// @notice add an NFT in the planet canvas (5 available)
    function addNFT(ERC721 nftContract, uint256 tokenId, uint256 planetId) public onlyPlanetOwner(planetId){
        // require(msg.sender==nftContract.ownerOf(tokenId));
        Planet storage currentPlanet = allPlanets[planetId];
        
            if(currentPlanet.nftCounter < currentPlanet.slots ){
                currentPlanet.allNfts.push();

                if(currentPlanet.nftCounter==0){
                        currentPlanet.allNfts[currentPlanet.nftCounter].contractAddress=address(nftContract);
                        currentPlanet.allNfts[currentPlanet.nftCounter].id=tokenId;
                    }
                    else{
                        currentPlanet.allNfts[currentPlanet.nftCounter+1].contractAddress=address(nftContract);
                        currentPlanet.allNfts[currentPlanet.nftCounter+1].id=tokenId;
                    }                
                     
            }
               
                currentPlanet.nftCounter++;               
                emit NFTadded(planetId, msg.sender,address(nftContract), tokenId);
    }


    /// @notice after winning a game we have the choice to add slot +1
    function addSlot(uint256 planetId) private{
        Planet storage currentPlanet = allPlanets[planetId];
        currentPlanet.allNfts.push();
        emit slotAdded(planetId, msg.sender);

    }

    // /// @notice trasnfer planets or nft's
    // /// @dev Explain to a developer any extra details
    // /// @param Documents a parameter just like in doxygen (must be followed by parameter name)
    // /// @return Documents the return variables of a contract’s function state variable
    // function transfer() {}

    // function removeNFT(ERC721 nftContract, uint256 tokenId, uint256 planetId) public onlyPlanetOwner(planetId) {
    //     Planet storage currentPlanet = allPlanets[planetId];
    //     for (uint256 index = 0; index < currentPlanet.allNfts.length; index++) {
    //         if(currentPlanet.allNfts[index].contractAddress == address(nftContract) && currentPlanet.allNfts[index].id == tokenId){
    //             currentPlanet.allNfts[index].contractAddress=address(0);
    //             break;
    //         }
    //     }
    //     currentPlanet.nftCounter--;   
    // }

/*
    /// @notice decalre a war to another user that have all of his 5 slots 
    /// @param Documents a parameter just like in doxygen (must be followed by parameter name)
    /// @return Documents the return variables of a contract’s function state variable
    function declareWar() {}

    /// @notice decline 
    /// @dev Explain to a developer any extra details
    /// @param Documents a parameter just like in doxygen (must be followed by parameter name)
    /// @return Documents the return variables of a contract’s function state variable
    function declineWar() {}

    /// @notice accept
    /// @param Documents a parameter just like in doxygen (must be followed by parameter name)
    /// @return Documents the return variables of a contract’s function state variable
    function acceptWar() {}

    /// @notice give the choice of add slot and make his planet bigger or have a new planet randomly created
    /// @dev Explain to a developer any extra details
    /// @param Documents a parameter just like in doxygen (must be followed by parameter name)
    /// @return Documents the return variables of a contract’s function state variable
    function choice() {}
    */
}

