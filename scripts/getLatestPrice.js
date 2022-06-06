const { task } = require("hardhat/config");
const { sleep } = require("../helpers/sleep");

task(
  "getprice",
  "Get current ETH price in BRL"
).setAction(async function (taskArguments, hre) {
    const CurrencyOracle = await hre.ethers.getContractFactory("CurrencyOracle");
    const currencyOracle = CurrencyOracle.attach("0xda8D62fF61f032CB24cf85F00DB70dEF18eEAfD2");

    console.log("Getting current Prices.");
    const tx = await currencyOracle.getCurrentPrice();
    await tx.wait();

    const price = await currencyOracle.getLatestPrice();

    console.log("Raw ETH price in BRL: ", price);
    console.log("Adjusted ETH price in BRL: R$", Math.round(price / 10 ** 6) / 100);

    await sleep(60000);

    console.log("Getting current Prices.");
    const tx1 = await currencyOracle.getCurrentPrice();
    await tx1.wait();

    console.log("Retrieving ETH prince in BRL.");
    const updatedPrice = await currencyOracle.getLatestPrice();

    console.log("Raw ETH price in BRL: ", updatedPrice);
    console.log("Adjusted ETH price in BRL: R$", Math.round(updatedPrice / 10 ** 6) / 100);
});