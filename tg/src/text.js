const text = {
    "main": [
        `🔥*Steam Mystery Boxes Bot*🔥

This bot is a demo bot for [Tonspay](https://www.tonspay.top) . *Accept payment onchain* .

You can buy *steam CDkey mystery boxes* here ~! All keys are sold in random for \`0.1$\`  .

More details about *Tonspay* can be found [here](https://docs.tonspay.top/)  Guide about how to use the [Steam CD key](https://help.k4g.com/how-to-activate-a-steam-key/?r=ppc&gad_source=1&gclid=CjwKCAjw7-SvBhB6EiwAwYdCAdWUajAwbFkxUfzafY95WN76NmmWQk3C2F7HPj6QCzqtQg3nqK77LhoCd_EQAvD_BwE)
`
    ],
    "purchas": [
        `Please select a *paymen method* to buy *Mystery Box*`,
        `Now you can pay the invoices . 

More informations can be found in [docs](https://docs.tonspay.top/develop/get-start)`
    ],
    "paid":[
        `🍺 You have paid the *Inovice* .`,
        `Steam-CD-KEY`,
        `Payment transaction`
    ]
}

const buttonText = {
    "main": [
        `Buy A Box`,
        `Visit Tonspay Bot`,
        `Source Code`
    ],
    "purchas": [
        `Pay in SOL`,
        `Pay in ETH`,
        `Pay in TON`,
        `Share invoice`,
        `Pay in BSC`,
    ],
    "payment": [
        `Confirm to pay`,
        `Share invoice`
    ]
}

function close()
{
    return [
        {
            text:'❎Close',
            callback_data:"/close"
        },
        {
            text:'🏡Menu',
            callback_data:"/menu"
        }
    ]
}
module.exports = {
    text,
    buttonText,
    close
}