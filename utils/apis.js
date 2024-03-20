const req = require("./request");
require('dotenv').config()

const baseUrl = process.env.BASE_URL

const router = {
  newPaymentMethod:baseUrl+"setting/paymentmethod/new",
  getPaymentMethod:baseUrl+"setting/paymentmethod/get",
  newInvoices:baseUrl+"invoice/new",
  coinmarketcapQuotesById:"https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?id="
}

async function anyRequest(url)
{
    var options = {
        'method': 'GET',
        'url': url,
        'headers': {
          'user-agent': ' Nodejs ',
          'Content-Type': 'application/json'
        },
      };
      return req.doRequest(options);
}

async function newInvoices(body)
{
    var options = {
        'method': 'POST',
        'url': router.newInvoices,
        'headers': {
          'Content-Type': 'application/json',
          'token':process.env.MERCHANT_API_KEY
        },
        'body':JSON.stringify(body)
      };
      return req.doRequest(options);
}

async function getPrice(id)
{
    var options = {
        'method': 'GET',
        'url': router.coinmarketcapQuotesById+id,
        'headers': {
          'Content-Type': 'application/json',
          'X-CMC_PRO_API_KEY':process.env.COINMARKETCAP_API
        },
      };
      return req.doRequest(options);
}

async function getTokenPrice(id)
{
    // BTC 1 / ETH 1027 / SOL 5426 / TON 11419
    const price = await getPrice(id);
    if(price && price?.data && price?.data[id]?.quote)
    {
        return price.data[id].quote.USD.price
    }
}

async function getTokensPrice()
{
    return{
        eth:await getTokenPrice(1027),
        sol:await getTokenPrice(5426),
        ton:await getTokenPrice(11419)
    }
}
module.exports = {
    anyRequest,
    newInvoices,
    getPrice,
    getTokensPrice,
    getTokenPrice
}