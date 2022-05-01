// SPDX license identifier => Developers can specify the license contract uses 

// Version of solidity compiler we want to run this smart contact === version present in hardhat.config.js
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;         // unsigned int => is same when declared as uint totalWaves
    // Automatic initialization to 0
    // State variable , permanently stored in contract storage

    constructor() {
        console.log("Debugging smart contract constructor");
    }



    function wave() public {
        totalWaves += 1;

        // msg.sender => Wallet address of person who called this function [ Must connect with any valid wallet] 
        // Built in authentication
        console.log("%s has waved!", msg.sender);

        // Future => Modify function so that only certain wallet address can cal this function
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }
}
