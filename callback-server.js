

var querystring = require('querystring');
var express = require('express');
const fs = require("fs");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.listen(6553, async function() {
    console.log('mock-server start')
})
app.post('/api', async function(req, res) {
    console.log(req.body)
    res.status(200).send({
        "code": 200,
        "data": "callback success"
    })
})
