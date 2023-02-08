import React from "react";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import "./App.css";
import abi from "./utils/WavePortal.json";
import detectEthereumProvider from "@metamask/detect-provider";

const App = () => {
	/*
	 * Just a state variable we use to store our user's public wallet.
	 */
	const [currentAccount, setCurrentAccount] = useState("");

	/*
    Create a variable here that holds the contract address after you deploy!
   */
	const contractAddress = "0x686C997023c5bC4f12c9227358C85753e9B70ABB";

	/**
	 * Create a variable here that references the abi content!
	 */
	const contractABI = abi.abi;

	/*
	 * All state property to store all waves
	 */
	const [allWaves, setAllWaves] = useState([]);

	const [waveCount, setWaveCount] = useState(0);

	// Custom input msg
	const [inputMsg, setInputMsg] = useState("");

	const handleInput = (e) => {
		console.log(e);
		setInputMsg(e.target.value);
	};

	// const handleSubmit = (event) => {
	// 	event.preventDefault();
	// 	alert(`The message you entered was: ${inputMsg}`);
	// };

	const checkIfWalletIsConnected = async () => {
		/*try {
			/*
			 * First make sure we have access to window.ethereum
			 
			const { ethereum } = window;
			if (!ethereum) {
				console.log("Make sure you have metamask!");
				return;
			} else {
				console.log("We have the ethereum object", ethereum);
			}

			/*
			 * Check if we're authorized to access the user's wallet
			 
			const { accounts } = await ethereum.request({
				method: "eth_accounts",
			});

      console.log(accounts);
			if (accounts.length !== 0) {
				const account = accounts[0];
				console.log("Found an authorized account:", account);
				setCurrentAccount(account);
			} else {
				console.log("No authorized account found");
			}
		} catch (error) {
			console.log(error);
		}*/
		// this returns the provider, or null if it wasn't detected
		const provider = await detectEthereumProvider();

		if (provider) {
			startApp(provider); // Initialize your app
		} else {
			console.log("Please install MetaMask!");
		}

		function startApp(provider) {
			// If the provider returned by detectEthereumProvider is not the same as
			// window.ethereum, something is overwriting it, perhaps another wallet.
			if (provider !== window.ethereum) {
				console.error("Do you have multiple wallets installed?");
			}
			// Access the decentralized web!
		}

		let currentAccount = null;
		ethereum
			.request({ method: "eth_accounts" })
			.then(handleAccountsChanged)
			.catch((err) => {
				// Some unexpected error.
				// For backwards compatibility reasons, if no accounts are available,
				// eth_accounts will return an empty array.
				console.error(err);
			});

		// Note that this event is emitted on page load.
		// If the array of accounts is non-empty, you're already
		// connected.
		ethereum.on("accountsChanged", handleAccountsChanged);

		// For now, 'eth_accounts' will continue to always return an array
		function handleAccountsChanged(accounts) {
			if (accounts.length === 0) {
				// MetaMask is locked or the user has not connected any accounts
				console.log("Please connect to MetaMask.");
			} else if (accounts[0] !== currentAccount) {
				currentAccount = accounts[0];
				setCurrentAccount(accounts[0]);
				// Do any other work!
			}
			console.log(accounts);
		}
	};

	const connectWallet = async () => {
		try {
			console.log("Hv3");
			const { ethereum } = window;
			if (!ethereum) {
				alert("You need to Install MetaMask!");
				return;
			}
			const accounts = await ethereum.request({
				method: "eth_requestAccounts",
			});

			console.log("Connected to account =>", accounts[0]);
			setCurrentAccount(accounts[0]);
			console.log("Hv1");
			getAllWaves();
		} catch (error) {
			console.log(error);
		}
	};

	/*
	 * Create a method that gets all waves from your contract
	 */
	const getAllWaves = async () => {
		try {
			const { ethereum } = window;
			if (ethereum) {
				const provider = new ethers.providers.Web3Provider(ethereum);
				const signer = provider.getSigner();
				const wavePortalContract = new ethers.Contract(
					contractAddress,
					contractABI,
					signer
				);

				/*
				 * Call the getAllWaves method from your Smart Contract
				 */
				console.log("Hv2");
				const waves = await wavePortalContract.getAllWaves();
				console.log("The waves list", waves);

				/*
				 * We only need address, timestamp, and message in our UI so let's
				 * pick those out
				 */
				let wavesCleaned = [];
				waves.forEach((wave) => {
					wavesCleaned.push({
						address: wave.waver,
						timestamp: new Date(wave.timestamp * 1000),
						message: wave.message,
					});
				});

				/*
				 * Store our data in React State
				 */
				setAllWaves(wavesCleaned);

				// Set wave count
				setWaveCount(wavesCleaned.length);

				console.log("Finished setting waves");
			} else {
				console.log("Ethereum object doesn't exist!");
			}
		} catch (error) {
			console.log(error);
		}
	};

	const wave = async () => {
		try {
			const { ethereum } = window;

			/* ethers is a library that helps our frontend talk to our contract
			 */
			if (ethereum) {
				const provider = new ethers.providers.Web3Provider(ethereum);
				/* Provider => talk to Ethereum nodes. Remember how we were using Alchemy to deploy? 
In this case we use nodes that Metamask provides in the background to send/receive data from our deployed contract. */

				const signer = provider.getSigner();

				/* Signer => abstraction of an Ethereum Account.
- To sign messages and transactions, send signed transactions to the Ethereum Network to execute state changing operations. */

				const wavePortalContract = new ethers.Contract(
					contractAddress,
					contractABI,
					signer
				);
				/* contractAddress => Address of the contract deployed , contractABI => File in Artifacts. 
                ABI file is something our web app needs to know how to communicate with our contract */

				let count = await wavePortalContract.getTotalWaves();
				console.log("Retrieved total wave count...", count.toNumber());

				/*
				 * Execute the actual wave from your smart contract
				 */
				const waveTxn = await wavePortalContract.wave(inputMsg);
				console.log("Mining...", waveTxn.hash);

				await waveTxn.wait();
				console.log("Mined -- ", waveTxn.hash);

				count = await wavePortalContract.getTotalWaves();
				console.log("Retrieved total wave count...", count.toNumber());

				setInputMsg("");
				getAllWaves();
			} else {
				console.log("Ethereum object doesn't exist!");
			}
		} catch (error) {
			console.log(error);
		}
	};

	/*
	 * This runs our function when the page loads.
	 */
	useEffect(() => {
		checkIfWalletIsConnected();
	}, []);

	return (
		<div className="mainContainer">
			<div className="dataContainer">
				<div className="header">👋 Hey there! Welcome</div>

				<div className="bio">
					I am Harsha and I am currently pursuing my masters in
					Computer Science at USC. Connect your Ethereum wallet and
					wave at me!
				</div>

				{/*
				 * If there is no currentAccount render this button
				 */}
				{!currentAccount && (
					<button className="waveButton" onClick={connectWallet}>
						Connect Wallet
					</button>
				)}

				{/*Display form and wave button after connecting the wallet*/}
				{currentAccount && (
						<form>
							<input
								type="text"
								value={inputMsg}
								onChange={handleInput}
								// id="user_input"
								placeholder="Enter your message and wave at me..."
								className="user-input"
							/>
						</form>
					) && (
						<button className="waveButton" onClick={wave}>
							Wave at Me
						</button>
					)}
				<div className="user-wave-count">
					Total number of users waved at Harsha : {waveCount}
				</div>

				{allWaves.map((wave, index) => {
					return (
						<div
							key={index}
							style={{
								backgroundColor: "OldLace",
								marginTop: "16px",
								padding: "8px",
							}}
						>
							<div>Address: {wave.address}</div>
							<div>Time: {wave.timestamp.toString()}</div>
							<div>Message: {wave.message}</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default App;
