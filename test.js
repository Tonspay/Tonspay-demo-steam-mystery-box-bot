const utils = require("./utils/index");

async function mock_key_insert()
{
    for(var i = 0 ; i < 100 ; i++)
    {
        await utils.db.newKeys(Date.now())
    }
}

async function test()
{
    await mock_key_insert()
}

test()