// contracts/PlanetReact.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./NFTplanet.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract PlanetReact is NFTplanet{
    
    constructor()public NFTplanet(){  }

    // change the position of the planet
    function move(uint256 planetId, uint256 _p, uint256 _r, uint256 _a) public {
        Planet storage currentPlanet = allPlanets[planetId];
        currentPlanet.a = _a;
        currentPlanet.p = _p;
        currentPlanet.r = _r;
    }

    /// @notice add an NFT in the planet canvas (5 available)
    function addNFT(ERC721 nftContract, uint256 tokenId, uint256 planetId) public{
        require(msg.sender==nftContract.ownerOf(tokenId));
        Planet storage currentPlanet = allPlanets[planetId];
        
    }

    /// @notice for change the look of the canvas
    /// @param Documents a parameter just like in doxygen (must be followed by parameter name)
    /// @return Documents the return variables of a contract’s function state variable
    function removeNFT() public {}

    /// @notice after winning a game we have the choice to add slot +1
    /// @dev Explain to a developer any extra details
    /// @param Documents a parameter just like in doxygen (must be followed by parameter name)
    function addSlot() {
        require(condition);
    }

    /// @notice trasnfer planets or nft's
    /// @dev Explain to a developer any extra details
    /// @param Documents a parameter just like in doxygen (must be followed by parameter name)
    /// @return Documents the return variables of a contract’s function state variable
    function transfer() {}

    /// @notice remove the nft inside and the slot 
    /// @dev Explain to a developer any extra details
    /// @param Documents a parameter just like in doxygen (must be followed by parameter name)
    function removeSlot(){}

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
}

