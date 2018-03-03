'use strict'
require('dotenv').config();
const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();
const basicauth = require('basicauth-middleware');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const users = require('./users.config');
const GDAX = require('./src/gdax.js');

const key = fs.readFileSync('./encryption/private.key');
const cert = fs.readFileSync( './encryption/server.crt');

const options = {
    key: key,
    cert: cert
};

const server = require('https').createServer(options, app);
const io = require('socket.io')(server);

let userLevel = 'guest';

app.use(basicauth(function(username, password) {

    const user = users.find((userObject) => {
        return userObject.username == username && userObject.password == password;
    });

    if (user) {
        userLevel = user.level;
        return true;
    }

    return false;
}));

app.use(morgan('combined'));
app.use(bodyParser.json());

app.set('view engine', 'pug');
app.set('views', './views');

function setUpPriceTicker(gdax) {
    io.on('connection', function (socket) {
        console.log('New Socket Connection');
        gdax.on('message', (data) => {
            socket.emit('price', data);
        });

        socket.on('disconnect', function() {
            console.log('Socket disconnect and clean up');
            socket.removeAllListeners();
            socket.disconnect(true);
        });
    });
}


app.get('/favicon.ico', (req, res) => {
   res.end();
});

app.get('/socket.js', (req, res) => {
    res.sendFile(__dirname + '/node_modules/socket.io-client/dist/socket.io.js');
});

app.get('/build.js', (req, res) => {
    res.sendFile(__dirname + '/client/build.js');
});

app.get('/client.js', (req, res) => {
    res.sendFile(__dirname + '/client/client.js');
});

app.get('/index.css', (req, res) => {
    res.sendFile(__dirname + '/css/index.css');
});

app.get('/', async (req, res) => {
    setUpPriceTicker(GDAX.getSocket());
    return res.render('index');
});

app.get('/accounts', async (req, res) => {
    let error, etherium, usd, orders;

    [error, etherium] = await GDAX.getEtheriumAccount();
    if (!etherium)
        return res.send(error);

    [error, usd] = await GDAX.getUsdAccount();
    if (!usd)
        return res.send(error);

    [error, orders] = await GDAX.getActiveOrders();
    if (!orders)
        return res.send(error);

    return res.send({
        etherium,
        usd,
        orders
    });
});

app.post('/sell', async (req, res) => {
    if (!checkPermisison(req))
        return res.send(JSON.stringify('Low clearance level for this operation.'));

    let userData = req.body;
    let error, sellOrder;

    if (!userData || !userData.size || !userData.price) {
        console.log('Missing sell data');
        return res.send('Missing sell data');
    }

    [error, sellOrder] = await GDAX.sell(userData.size, userData.price);

    if (!sellOrder)
        return res.send(error);

    return res.send(sellOrder);
});

app.post('/buy', async (req, res) => {

    if (!checkPermisison(req))
        return res.send(JSON.stringify('Low clearance level for this operation.'));

    let userData = req.body;
    let error, buyOrder;

    if (!userData || !userData.size || !userData.price) {
        console.log('Missing sell data');
        return res.send('Missing sell data');
    }

    [error, buyOrder] = await GDAX.buy(userData.size, userData.price);

    if (!buyOrder)
        return res.send(error);

    return res.send(buyOrder);

});

app.post('/cancel', async (req, res) => {

    if (!checkPermisison(req))
        return res.send(JSON.stringify('Low clearance level for this operation.'));

    let orderId = req.body.orderId;
    let error, cancelledOrder;

    if (!orderId) {
        console.log('Missing order ID');
        return res.send('Missing order ID');
    }

    [error, cancelledOrder] = await GDAX.cancel(orderId);

    if (!cancelledOrder)
        return res.send(error);

    return res.send(cancelledOrder);

});

function checkPermisison(req) {
    return userLevel == 'admin';

    const auth = req.get("authorization");
    const credentials = new Buffer(auth.split(" ").pop(), "base64").toString("ascii").split(":");

    return credentials[0] == 'rinat';
}

server.listen(4999, () => console.log('App listening on port 4999!'));