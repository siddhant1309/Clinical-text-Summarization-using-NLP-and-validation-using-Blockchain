import web3 from "./web3";

const compiledHospital = require("./build/doctorContract.json");

export default (address) => {
  return new web3.eth.Contract(compiledHospital.abi, address);
};
