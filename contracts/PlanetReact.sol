// contracts/PlanetReact.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "contract/NFTplanet.sol"

contract PlanetReact {
    

    /// @change the position of the planet
    /// @param Documents a parameter just like in doxygen (must be followed by parameter name)
    /// @return Documents the return variables of a contract’s function state variable
    function move() public returns {}

    /// @notice add an NFT in the planet canvas (5 available)
    /// @param Documents a parameter just like in doxygen (must be followed by parameter name)
    /// @return Documents the return variables of a contract’s function state variable
    function addNFT(){
        require(condition);
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

