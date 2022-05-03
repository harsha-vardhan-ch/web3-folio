// SPDX license identifier => Developers can specify the license contract uses 

// Version of solidity compiler we want to run this smart contact === version present in hardhat.config.js
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;         // unsigned int => is same when declared as uint totalWaves
    // Automatic initialization to 0
    // State variable , permanently stored in contract storage

    /*
     * event
     */
    event NewWave(address indexed from, uint256 timestamp, string message);

    /*
     * struct Wave.
     * A struct is basically a custom datatype where we can customize what we want to hold inside it.
     */
    struct Wave {
        address waver; // The address of the user who waved.
        string message; // The message the user sent.
        uint256 timestamp; // The timestamp when the user waved.
    }

    /*
     * variable waves that lets me store an array of structs.
     * This is what lets me hold all the waves anyone ever sends to me!
     */
    Wave[] waves;

    constructor() {
        console.log("Debugging smart contract constructor");
    }



    function wave(string memory _message) public {
        totalWaves += 1;

        // msg.sender => Wallet address of person who called this function [ Must connect with any valid wallet] 
        // Built in authentication
        console.log("%s has waved w/ message %s", msg.sender, _message);

        // Future => Modify function so that only certain wallet address can cal this function

        /*
         * store the wave data in the array.
         */
        waves.push(Wave(msg.sender, _message, block.timestamp));

        /*
         * emitting event
         */
        emit NewWave(msg.sender, block.timestamp, _message);
    }


    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }

    /*
     * returns the struct array, waves, to us.
     * This will make it easy to retrieve the waves from our website!
     */
    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }
}
