//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract CurrencyOracle {

    struct CurrencyPrice {
        int ethPrice;
        int brlPrice;
        uint256 retrievedAt;
    }

    CurrencyPrice[] private prices;
    uint256 private totalRequests = 0;
    uint8 private _decimals = 8;

    address private owner;

    event PriceRequested();

    constructor(int _currentEthPrice, int _currentBrlPrice) {
        prices.push(CurrencyPrice(_currentEthPrice, _currentBrlPrice, block.timestamp));
        totalRequests++;
        owner = msg.sender;
    }

    function getCurrentPrice() public {
        emit PriceRequested();
    }

    function updatePrice(int _ethPrice, int _brlPrice) external onlyOwner {
        prices.push(CurrencyPrice(_ethPrice, _brlPrice, block.timestamp));
        totalRequests++;
    }

    function getLatestPrice() public view returns (int) {
        int base = 10;
        int multiplier = base ** _decimals;
        int price = prices[totalRequests - 1].ethPrice * multiplier / prices[totalRequests - 1].brlPrice;
        return price;
    }

    function decimals() external view returns (uint8) {
        return _decimals;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "CurrencyOracle: only contract onwer can do this!");
        _;
    }
}