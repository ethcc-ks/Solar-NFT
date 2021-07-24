// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


interface ProofOfHumanity{
    function isRegistered(address) external view returns (bool);
}