import web3 from "./web3";

const compiledProf = require("./build/medicalProfContract.json");

export default (address) => {
  return new web3.eth.Contract(compiledProf.abi, address);
};
