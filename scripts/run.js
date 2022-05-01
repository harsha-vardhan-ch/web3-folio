const main = async () => {

  // The Hardhat Runtime Environment, or HRE for short, is an object containing all the functionality that Hardhat exposes when running a task, test or script. 
// In reality, Hardhat is the HRE.
// Every time you run a terminal command that starts with npx hardhat you are getting this hre object built on the fly using the hardhat.config.js specified in your code!
//  This means you will never have to actually do some sort of import into your files like: const hre = require("hardhat")
    
    //compile the contract and generate the necessary files we need to work with our contract under the artifacts directory.
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");

    //  Hardhat will create a local Ethereum network for us, but just for this contract. 
    // after the script completes it'll destroy that local network. 
    // So, every time you run the contract, it'll be a fresh blockchain. 
    // It's kinda like refreshing your local server every time so you always start from a clean slate which makes it easy to debug errors.
    const waveContract = await waveContractFactory.deploy();

    // wait until our contract is officially deployed to our local blockchain
    await waveContract.deployed();

    // address of the deployed contract.
    // millions of contracts on the actual blockchain. this address gives us easy access to our contract
    console.log("Contract deployed to:", waveContract.address);
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0); // exit Node process without error
    } catch (error) {
      console.log(error);
      process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
    }
    // Read more about Node exit ('process.exit(num)') status codes here: https://stackoverflow.com/a/47163396/7974948
  };
  
  runMain();


