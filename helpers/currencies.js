require('dotenv').config();
const axios = require('axios');

const currencyIds = {
    eth: 1027,
    brl: 2783
}

const retrievePrice = async (currency) => {
    const response = await axios.get(
        `https://pro-api.coinmarketcap.com/v2/tools/price-conversion?id=${currencyIds[currency]}&amount=1`,
        {
            headers: 
                {
                    'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_KEY,
                }
        }
    ).catch(error => {
        console.log("Error: ", error);
        return Promise.reject(error);
    });

    const price = Math.round(response.data.data.quote.USD.price * (10 ** 8));

    return Promise.resolve(price);
}

module.exports = {
    retrievePrice
}