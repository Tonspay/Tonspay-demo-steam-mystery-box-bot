

var querystring = require('querystring');
var express = require('express');
const fs = require("fs");
const tg= require("./tg/telegram")
var bot;
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(6553, async function() {
    console.log('mock-server start')
})
app.get('/ping', async function(req, res) {
    res.status(200).send({
        "code": 200,
        "data": "pong"
    })
})

app.post('/callback/api', async function(req, res) {
    console.log(req.body)
    res.status(200).send({
        "code": 200,
        "data": "callback success"
    })
})


async function init()
{
    await tg.init();
    bot = tg.getBot()
}

init()