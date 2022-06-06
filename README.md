# Smart Contract Oracles

This project implements a contract to explain Chainlink Data Feed usage and another one to build a custom oracle that can be provided with any data.

To test:

```shell
npx hardhat test
```

To run oracle server:

```shell
node scripts/oracleServer.js
```

To deploy Currency Oracle on Rinkeby Network:

```shell
npx hardhat deploy --network rinkeby
```

To deploy get current price:

```shell
npx hardhat getprice --network rinkeby
```