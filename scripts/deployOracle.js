const { task } = require("hardhat/config");
const { retrievePrice } = require("../helpers/currencies");

task("deploy", "Deploys CurrencyOracle.sol contract").setAction(async function (
  taskArguments,
  hre
) {
    const [deployer] = await hre.ethers.getSigners();

    const CurrencyOracle = await hre.ethers.getContractFactory("CurrencyOracle", deployer);
    const prices = {};
    prices.eth = await retrievePrice("eth");
    prices.brl = await retrievePrice("brl");
    const currencyOracle = await CurrencyOracle.deploy(prices.eth, prices.brl);

    await currencyOracle.deployed();
    console.log(`Contract deployed to address: ${currencyOracle.address}`);
});