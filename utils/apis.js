const req = require("./request");
require('dotenv').config()

const baseUrl = process.env.BASE_URL

const router = {
  newPaymentMethod:baseUrl+"setting/paymentmethod/new",
  getPaymentMethod:baseUrl+"setting/paymentmethod/get",
  newInvoices:baseUrl+"invoice/new",
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
          'Content-Type': 'application/json'
        },
        'body':JSON.stringify(body)
      };
      return req.doRequest(options);
}
module.exports = {
    anyRequest,
    newInvoices
}