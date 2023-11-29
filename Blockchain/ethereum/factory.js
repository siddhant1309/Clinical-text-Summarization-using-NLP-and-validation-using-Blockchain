import web3 from "./web3";
const compiledFactory = require("./build/FactoryContract.json");

const instance = new web3.eth.Contract(
  compiledFactory.abi,
  "0x0F2A27fB9bae72DA71692E4A48de5E2C006306FC"
);

export default instance;
