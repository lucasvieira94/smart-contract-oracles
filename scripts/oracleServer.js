require('dotenv').config();
const fs = require('fs');
const { ethers } = require("ethers");
const { retrievePrice } = require("../helpers/currencies");

const contractAddress = "0xda8D62fF61f032CB24cf85F00DB70dEF18eEAfD2";
const contractABI = JSON.parse(fs.readFileSync("artifacts/contracts/CurrencyOracle.sol/CurrencyOracle.json")).abi;

const web3Provider = new ethers.providers.WebSocketProvider(process.env.RINKEBY_WEBSOCKET);

const signer = new ethers.Wallet(process.env.DEV_PRIVATE_KEY, web3Provider);
const contract = new ethers.Contract(contractAddress, contractABI, web3Provider);

const oracleServer = () => {
    console.log("Starting Oracle Server...");
        contract.on("PriceRequested", async () => {
            console.log("\n\n-----------------------------");
            console.log("PriceRequested event received!");
            const prices = {};
            prices.eth = await retrievePrice("eth");
            prices.brl = await retrievePrice("brl");
            console.log("Adjusted ETH price: ", prices.eth);
            console.log("Adjusted BRL price: ", prices.brl);            
            await contract.connect(signer).updatePrice(prices.eth, prices.brl);
            console.log("Prices updated on contract.");
            console.log("-----------------------------\n\n");
            return Promise.resolve("Prices retrieved!");
        });
}

oracleServer();