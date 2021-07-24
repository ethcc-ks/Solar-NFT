// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PlanetERC20 is ERC20, Ownable {

    constructor (address _ERC721address) ERC20("Planet ERC20", "PLT")
    {
        Ownable.transferOwnership(_ERC721address);
    }

    function mint(uint256 _amount, address _owner) public onlyOwner {
        ERC20._mint(_owner, _amount);
    }    
}

