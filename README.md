# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

Initial setup 
=============================
cd my-wave-portal
npm init -y
npm install --save-dev hardhat

For Sample project - npx hardhat 


npx hardhat accounts - strings generated by hardhat to stimulate real users on blockchain
npx hardhat compile - To compile
npx hardhat test - To Test

Delete un necessary starter code 
- file sample-test.js under test.  Also, delete sample-script.js under scripts. Then, delete Greeter.sol under contracts
================================ 

Write a smart contract in .sol file in contracts folder 

Compile it 
Deploy to local blockchain
Once deployed we can see our console log statements 

Above 3 steps => compile, deploy, execute => Write a script in scripts folder 

===============================
After writing script
npx hardhat run scripts/run.js

We deployed smart contract to the local blockchain
============================

Store the Data

The blockchain = Think of it as a cloud provider, kinda like AWS, but it's owned by no one. It's run by compute power from mining machines all over the world. Usually these people are called miners and we pay them to run our code!

A smart contract = Kinda like our server's code with different functions people can hit.