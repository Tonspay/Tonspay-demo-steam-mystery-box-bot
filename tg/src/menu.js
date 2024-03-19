const lan = require("./text")
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

async function generateInvoices(bot, uid, req, data, paymentMethod) {
    switch (paymentMethod) {
        case 0:
            //TON
            break;
        case 1:
            //SOL
            break;
        case 2:
            //ETH
            break
        default:
            break;
    }

    var keyboard;
    [
        [{
            "text": lan.buttonText.payment[0],
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
    return await bot.sendMessage(uid, lan.text.purchas[1], {
        parse_mode: 'MarkDown',
        disable_web_page_preview: "true",
        reply_markup: JSON.stringify({
            inline_keyboard: keyboard
        })
    });
}
module.exports = {
    main,
    selectPaymentMethod,
    generateInvoices
}