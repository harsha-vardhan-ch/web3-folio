// require("@nomiclabs/hardhat-waffle");
require("@nomicfoundation/hardhat-toolbox");

// Import and configure dotenv
require("dotenv").config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.17",
  networks: {
    // rinkeby: {
    //   url: "https://eth-rinkeby.alchemyapi.io/v2/ycfi8q30m1oCBLoL4flMVN20HBYlL5S_",
    //   accounts: ["YOUR_PRIVATE_RINKEBY_ACCOUNT_KEY"]
    // },
    // rinkeby: {
    //   // This value will be replaced on runtime
    //   url: process.env.STAGING_ALCHEMY_KEY,
    //   accounts: [process.env.PRIVATE_KEY],
    // },
    goerli: {
      url: process.env.GOERLI_URL,
      accounts: [process.env.PRIVATE_KEY]
    },
  },
};
