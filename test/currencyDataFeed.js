const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Currency Data Feed", function () {
  it("Should return ETH price in USD", async function () {
    const CurrencyDataFeed =  await ethers.getContractFactory("CurrencyDataFeed");
    const currencyDataFeed = await CurrencyDataFeed.deploy();
    await currencyDataFeed.deployed();

    const ethPrice = await currencyDataFeed.getLatestPrice();
    const ethDecimals = await currencyDataFeed.decimals();
    console.log("ETH Price returned in BRL: R$", ethPrice.toNumber() / 10 ** ethDecimals);
    expect(ethPrice).to.exist;
  });
});
