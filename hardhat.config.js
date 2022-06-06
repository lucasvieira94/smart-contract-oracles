require('dotenv').config();
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("./scripts/deployOracle");
require("./scripts/getLatestPrice");

module.exports = {
  solidity: "0.8.4",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      forking: {
        url: process.env.MAINNET_FORKING_URL
      }
    },
    rinkeby: {
      url: process.env.RINKEBY_URL,
      accounts: [process.env.DEV_PRIVATE_KEY]
    }
  },
  gasReporter: {
    enabled: true,
    currency: "BRL",
    coinmarketcap: process.env.COINMARKETCAP_KEY,
  },
};