//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract CurrencyDataFeed {
    AggregatorV3Interface internal ethPriceFeed;
    AggregatorV3Interface internal brlPriceFeed;
    uint8 private _decimals;

    constructor() {
        ethPriceFeed = AggregatorV3Interface(0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419);
        brlPriceFeed = AggregatorV3Interface(0x971E8F1B779A5F1C36e1cd7ef44Ba1Cc2F5EeE0f);
        _decimals = 8;
    }


    function getLatestPrice() public view returns (int) {
        (
            /* uint80 roundID */,
            int ethPrice,
            /* uint startedAt */,
            uint ethTimeStamp,
            /* uint80 answeredInRound */
        ) = ethPriceFeed.latestRoundData();
        require(ethTimeStamp > 0, "Round not complete");

        (
            /* uint80 roundID */,
            int brlPrice,
            /* uint startedAt */,
            uint brlTimeStamp,
            /* uint80 answeredInRound */
        ) = brlPriceFeed.latestRoundData();
        // If the round is not complete yet, timestamp is 0
        require(brlTimeStamp > 0, "Round not complete");
        int base = 10;
        int multiplier = base ** _decimals;
        int price = ethPrice * multiplier / brlPrice;

        return price;
    }

    function decimals() external view returns (uint8) {
        return _decimals;
    }
}
