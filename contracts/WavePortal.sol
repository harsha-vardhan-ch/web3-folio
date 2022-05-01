// SPDX license identifier => Developers can specify the license contract uses 

// Version of solidity compiler we want to run this smart contact === version present in hardhat.config.js
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    constructor() {
        console.log("Debugging smart contract constructor");
    }
}
