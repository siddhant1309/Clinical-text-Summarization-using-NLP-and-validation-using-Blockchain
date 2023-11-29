// const HDWalletProvider = require("@truffle/hdwallet-provider");
// const Web3 = require("web3");

// // const interface = require("./compile").abi;
// // const bytecode = require("./compile").bytecode;

// const compiledFactory = require("../ethereum/build/campaignFactory.json");
// const compiledCampaign = require("../ethereum/build/Campaign.json");

// const provider = new HDWalletProvider(
//   "",
//   "HTTP://127.0.0.1:7545"
// );

// const web3 = new Web3(provider);

// const deploy = async () => {
//   const accounts = await web3.eth.getAccounts();

//   console.log("attempting to deploy from account", accounts[0]);

//   const result = await new web3.eth.Contract(compiledFactory.abi)
//     .deploy({ data: compiledFactory.evm.bytecode.object })
//     .send({ from: accounts[0], gas: 10000000 });

//   //   console.log(abi);
//   console.log("contract deployed at", result.options.address);

//   provider.engine.stop();
// };

// deploy();

const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");

const compiledFactory = require("../ethereum/build/FactoryContract.json");

const mnemonic = "enter your metamask mnemonic";
const provider = new HDWalletProvider(mnemonic, "HTTP://127.0.0.1:7545"); // Use the correct RPC endpoint for Ganache

const web3 = new Web3(provider);

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts();

    console.log("Attempting to deploy from account", accounts[0]);

    const balance = await web3.eth.getBalance(accounts[0]);
console.log("Account balance:", web3.utils.fromWei(balance, "ether"), "ETH");

    const result = await new web3.eth.Contract(compiledFactory.abi)
      .deploy({ data: compiledFactory.evm.bytecode.object })
      .send({ from: accounts[0], gas: 6000000 });

    console.log("Contract deployed at", result.options.address);

    provider.engine.stop();
  } catch (error) {
    console.error("Error during deployment:", error);
    provider.engine.stop();
  }
};

deploy();

