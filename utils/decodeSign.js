const nacl = require("tweetnacl")
const b58 = require("b58")

function decode(rawData)
{
try{
    const signData = b58.decode(rawData.sign);

    const decodeData = nacl.sign.open( signData, b58.decode('ENzsJ58Lmb6GMfMPhsTKm1AYaEoL5Z24r9RVPKaYLyJ6'))

    const finalData = JSON.parse(
        Buffer.from(decodeData).toString()
    )

    return finalData;
}catch(e){console.error(e)}
return false;
}

module.exports = {decode}