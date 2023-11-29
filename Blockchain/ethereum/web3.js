import Web3 from "web3";

// window only available inside browser, not in node js where our server is currently running

let web3;
if (typeof window !== "undefined" && typeof (window.web3 !== "undefined")) {
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.web3.currentProvider);
} else {
  const provider = new Web3.providers.HttpProvider(
    "HTTP://127.0.0.1:7545"
  );
  web3 = new Web3(provider);
}

export default web3;
