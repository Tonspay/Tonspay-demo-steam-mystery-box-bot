var MongoClient = require('mongodb').MongoClient;
require('dotenv').config()
    //DB name
const mainDB = "steam_cd_key"

//Sheet name
const sInvoice = "invoices";
const sCDKeys = "cd_keys"
//DB struct

const steamCDKey = {
    id:0,//Self incress,
    status:0,//0 : unused , 1 : used
    key:""//The final cdkey
}
const invoices = {
    id: 0, //Invoice id generate by Tonspay
    uid: 0, //Who to recive the msg
    email: "", //The email to recive msg.
    callback : {},
    status:0,//invoices status,
    keyId:0,//Steam cd key id .
    createTime:0
}

/**
 * Invoice
 */

async function getInvoiceById(data) {
    const pool = await MongoClient.connect(process.env.SQL_HOST)
    var db = pool.db(mainDB);
    var ret = await db.collection(sInvoice).find({
        id: data
    }).project({}).toArray();
    await pool.close();
    if (ret.length > 0) {
        return ret[0]
    }
    return false;
}

async function newInvoice(invoice,uid,email) {
    const keyId = await getAKeyUnUsed();
    if(keyId)
    {
        const pool = await MongoClient.connect(process.env.SQL_HOST)
        var db = pool.db(mainDB);
        var ret = await db.collection(sInvoice).insertOne(
            {
                id: invoice, //Invoice id generate by Tonspay
                uid: uid, //Who to recive the msg
                email:email, //The email to recive msg.
                callback : {},
                status:0,//invoices status,
                keyId:keyId.id,//Steam cd key id .
                createTime:Date.now(),//Request time
            }
        );
        await pool.close();
        return ret;
    }
    return false;
}

async function payInvoice(id, callback) {
    const pool = await MongoClient.connect(process.env.SQL_HOST)
    var db = pool.db(mainDB);
    await db.collection(sInvoice).updateMany({
        id: id
    }, {
        "$set": {
            status: 1,
            callback : callback
        }
    });
    const invoice = await getInvoiceById(id);
    await db.collection(sCDKeys).updateMany({
        id: invoice.keyId
    }, {
        "$set": {
            status: 1,
        }
    });
    await pool.close();
    return await getKeysById(invoice.keyId);
}


/**
 * Keys
 */

async function getKeysById(data) {
    const pool = await MongoClient.connect(process.env.SQL_HOST)
    var db = pool.db(mainDB);
    var ret = await db.collection(sCDKeys).find({
        id: data
    }).project({}).toArray();
    await pool.close();
    if (ret.length > 0) {
        return ret[0]
    }
    return false;
}

async function getAKeyUnUsed() {
    const pool = await MongoClient.connect(process.env.SQL_HOST)
    var db = pool.db(mainDB);
    var ret = await db.collection(sCDKeys).find({
        status: 0
    }).project({}).toArray();
    await pool.close();
    if (ret.length > 0) {
        return ret[0]
    }
    return false;
}

async function newKeys(key) {
    const pool = await MongoClient.connect(process.env.SQL_HOST)
    var db = pool.db(mainDB);

    var id = (await db.collection(sCDKeys).count());
    var ret = await db.collection(sCDKeys).insertOne(
        {
            id:id,//Self incress,
            status:0,//0 : unused , 1 : used
            key:key//The final cdkey
        }
    );
    await pool.close();
    return ret;
}

module.exports = {
    getInvoiceById,
    newInvoice,
    payInvoice,
    getKeysById,
    getAKeyUnUsed,
    newKeys
}