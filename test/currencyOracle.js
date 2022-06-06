const { expect } = require("chai");
const { ethers } = require("hardhat");
const { retrievePrice } = require("../helpers/currencies");
const { sleep } = require("../helpers/sleep");

describe("Currency Oracle", function () {
    let CurrencyOracle;
    const prices = {};
    let currencyOracle;
    let price;

    it("Should deploy contract with current prices", async function () {
        CurrencyOracle = await ethers.getContractFactory("CurrencyOracle");
        prices.eth = await retrievePrice("eth");
        prices.brl = await retrievePrice("brl");
        currencyOracle = await CurrencyOracle.deploy(prices.eth, prices.brl);
        await currencyOracle.deployed();

        price = await currencyOracle.getLatestPrice();

        console.log("Raw ETH price in BRL after contract creation: ", price);
        console.log("Adjusted ETH price in BRL after contract creation: R$", Math.round(price / 10 ** 6) / 100);
        expect(Math.round(price / 10 ** 6) / 100).to.be.equal(Math.round(prices.eth * 100 / prices.brl) / 100);
        await sleep(30000);
    });

    it("Should be possible to get updated price", async function () {
        await sleep(30000);
        const transaction = await currencyOracle.getCurrentPrice();
        const response = await transaction.wait();
        const events = response.events.filter(event => event.event === "PriceRequested");
        expect(events.length).to.be.equal(1);

        prices.eth = await retrievePrice("eth");
        prices.brl = await retrievePrice("brl");

        await currencyOracle.updatePrice(prices.eth, prices.brl);

        price = await currencyOracle.getLatestPrice();
        console.log("Raw ETH price in BRL after update request: ", price);
        console.log("Adjusted ETH price in BRL after uodate request: R$", Math.round(price / 10 ** 6) / 100);
        expect(Math.round(price / 10 ** 6) / 100).to.be.equal(Math.round(prices.eth * 100 / prices.brl) / 100);
    });

    it("Shouldnt be possible to regular user update prices", async function () {
        const [, lucas] = await ethers.getSigners();
        prices.eth = await retrievePrice("eth");
        prices.brl = await retrievePrice("brl");

        expect(currencyOracle.connect(lucas).updatePrice(prices.eth, prices.brl)).to.be.revertedWith(
            "CurrencyOracle: only contract onwer can do this!"
        );
    });
});