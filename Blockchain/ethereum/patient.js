import web3 from "./web3";

const compiledPatient = require("./build/patientContract.json");

export default (address) => {
  return new web3.eth.Contract(compiledPatient.abi, address);
};
