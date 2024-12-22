const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const keys = require("./keys.json");

// alternative to deprecated HDWalletProvider
// https://www.npmjs.com/package/web3-hdwallet-provider

module.exports = {
  contracts_build_directory: "./public/contracts",
  networks: {
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 7545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
    },
    sepolia: {
      // provider: () => {
      //   const privateKey = `${keys.PRIVATE_KEY}`; // Use private key securely from .env
      //   const infuraUrl = `https://sepolia.infura.io/v3/${keys.INFURA_PROJECT_ID}`;

      //   const web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl), {
      //     headers: [
      //       {
      //         name: "Authorization",
      //         value: `Bearer ${keys.INFURA_PROJECT_ID}`,
      //       },
      //     ],
      //   });

      //   // Add the account using the private key
      //   const account = web3.eth.accounts.privateKeyToAccount(privateKey);
      //   web3.eth.accounts.wallet.add(account);

      //   return web3.currentProvider; // Return the web3 provider for Truffle
      // },
      provider: () =>
        new HDWalletProvider({
          mnemonic: {
            phrase: keys.MNEMONIC,
          },
          providerOrUrl: `https://sepolia.infura.io/v3/${keys.INFURA_PROJECT_ID}`,
          addressIndex: 0,
        }),
      network_id: "11155111",
      gas: 5500000, // Gas Limit, How much gas we are willing to spent
      gasPrice: 20000000000,
      networkCheckoutTimeout: 10000,
      timeoutBlocks: 200,
      confirmations: 2,
      timeout: 20000, // Timeout in milliseconds
      pollingInterval: 10000, // Polling interval in milliseconds
    },
  },
  compilers: {
    solc: {
      version: "0.8.4", // Fetch exact version from solc-bin (default: truffle's version)
    },
  },
};
