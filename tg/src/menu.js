const lan = require("./text")
const utils = require("../../utils/index")
const config = require("../../config.json");
require('dotenv').config()

async function main(bot, uid, req, data) {
    return await bot.sendMessage(uid, lan.text.main[0], {
        parse_mode: 'MarkDown',
        disable_web_page_preview: "true",
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{
                    "text": lan.buttonText.main[0],
                    "callback_data": "/buy"
                }],
                [{
                    "text": lan.buttonText.main[1],
                    "url": "https://t.me/tonspay_bot"
                }],
                [{
                    "text": lan.buttonText.main[2],
                    "url": "https://github.com/Tonspay/Tonspay-demo-steam-mystery-box-bot"
                }]
            ]
        })
    });
}

async function selectPaymentMethod(bot, uid, req, data) {
    return await bot.sendMessage(uid, lan.text.purchas[0], {
        parse_mode: 'MarkDown',
        disable_web_page_preview: "true",
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{
                    "text": lan.buttonText.purchas[0],
                    "callback_data": "/buy_sol"
                }, {
                    "text": lan.buttonText.purchas[1],
                    "callback_data": "/buy_eth"
                }],
                [{
                    "text": lan.buttonText.purchas[2],
                    "callback_data": "/buy_ton"
                }]
            ]
        })
    });
}

async function USDToTokenAmount (id,amount)
{
    // BTC 1 / ETH 1027 / SOL 5426 / TON 11419
    const decimails = config.decimails[id]
    const price = await utils.api.getTokenPrice(id)
    const amountRaw = amount/price;
    console.log(decimails,price,amountRaw,(amountRaw*Math.pow(10,decimails)).toFixed(0))
    return (amountRaw*Math.pow(10,decimails)).toFixed(0)
}

async function generateInvoices(bot, uid, req, data, paymentMethod) {
    var i = false; 
    var keyboard;
    const amount = config.defaultPrice;
    var tokenAmount;
    const callback_url = "https://demo.tonspay.top/callback/api";
    switch (paymentMethod) {
        case 0:
            //TON
            tokenAmount =await USDToTokenAmount(11419,amount);
            i = await utils.api.newInvoices(
                {
                    "amountToken":tokenAmount,
                    "amountUsd":amount,
                    "paymentMethodId":process.env.PAY_TON,
                    "callback":callback_url,
                    "comment":"TON invoices to buy steam cd key ."
                }
            )
            break;
        case 1:
            //SOL
            tokenAmount =await USDToTokenAmount(5426,amount);
            i = await utils.api.newInvoices(
                {
                    "amountToken":tokenAmount,
                    "amountUsd":amount,
                    "paymentMethodId":process.env.PAY_SOL,
                    "callback":callback_url,
                    "comment":"SOLANA invoices to buy steam cd key ."
                }
            )
            break;
        case 2:
            //ETH
            tokenAmount =await USDToTokenAmount(1027,amount);
            i = await utils.api.newInvoices(
                {
                    "amountToken":tokenAmount,
                    "amountUsd":amount,
                    "paymentMethodId":process.env.PAY_ETH,
                    "callback":callback_url,
                    "comment":"ETH invoices to buy steam cd key ."
                }
            )
            break
        default:
            break;
    }
    console.log(tokenAmount,amount)
    console.log(i)
    if(i && i.data)
    {
        i = i.data
        //Storage information into db
        await utils.db.newInvoice(i.invoiceId,uid,"")
        keyboard= [
                    [{
                        "text": lan.buttonText.payment[0],
                        url: i.webappLink
                        // web_app: {
                        //     url: i.webappLink
                        // }
                    },],
                    [{
                        "text": lan.buttonText.payment[1],
                        url: encodeURI(`https://t.me/share/url?url=${i.webappLink}&text=Please pay this invoice for me ! Thanks !`)
                    }]
                ]
                return await bot.sendMessage(uid, lan.text.purchas[1], {
                    parse_mode: 'MarkDown',
                    disable_web_page_preview: "true",
                    reply_markup: JSON.stringify({
                        inline_keyboard: keyboard
                    })
                });
    }
    return false;
}

async function sendKey(bot, sign) {
    const cb = utils.decode.decode(sign)

    if(cb)
    {
        const invoiceId = cb.invoiceId
        const calllback = cb
        const key = await utils.db.payInvoice(invoiceId,calllback)
        const invoice = await utils.db.getInvoiceById(invoiceId)
        console.log(invoice)
        var finalText = `${lan.text.paid[0]}

${lan.text.paid[1]} : \`${key.key}\`

${lan.text.paid[2]} : \`${calllback.paymentDetails.hash}\``
        return await bot.sendMessage(invoice.uid,finalText, {
            parse_mode: 'MarkDown',
            disable_web_page_preview: "true",
            reply_markup: JSON.stringify({
                inline_keyboard: [lan.close()]
            })
        });
    }

}
module.exports = {
    main,
    selectPaymentMethod,
    generateInvoices,
    sendKey
}