const GDAX_NODE = require('gdax');

class GDAX {

    constructor() {
        this.CLIENT = new GDAX_NODE.AuthenticatedClient(process.env.VIEW_API_KEY, process.env.VIEW_BASE64SECRET, process.env.VIEW_PASSPHRASE, process.env.API_URL);
        this.TRADE_CLIENT = new GDAX_NODE.AuthenticatedClient(process.env.TRADING_API_KEY, process.env.TRADING_BASE64SECRET, process.env.TRADING_PASSPHRASE, process.env.API_URL);
    }

    getEtheriumAccount() {
        return this.getAccount(process.env.ACCOUNT_ETH);
    }

    getUsdAccount() {
        return this.getAccount(process.env.ACCOUNT_USD);
    }

    getActiveOrders() {
        return this.CLIENT.getOrders()
            .then(data => [null, data])
            .catch(error => [error]);
    }

    getSocket() {
        this.socket = new GDAX_NODE.WebsocketClient([process.env.ETH_USD]);
        this.socket.channels = ["ticker"];
        this.socket.heartbeat = true;

        return this.socket;
    }

    getAccount(account) {
        return this.CLIENT.getAccount(account)
            .then(data => [null, data])
            .catch(error => [error]);
    }

    getOrder (orderId) {
        return this.CLIENT.getOrder(orderId)
            .then(data => [null, data])
            .catch(error => [error]);
    }

    sell(size, price) {
        const parameters = {
            size: size,
            price: price,
            cancel_after: 'day',
            product_id: process.env.ETH_USD
        }

        return this.TRADE_CLIENT.sell(parameters)
            .then(data => [null, data])
            .catch(error => [error]);
    }

    buy(size, price) {
        const parameters = {
            size: size,
            price: price,
            cancel_after: 'day',
            product_id: process.env.ETH_USD
        }

        return this.TRADE_CLIENT.buy(parameters)
            .then(data => [null, data])
            .catch(error => [error]);
    }

    cancel(orderId) {
        return this.TRADE_CLIENT.cancelOrder(orderId)
            .then(data => [null, data])
            .catch(error => [error]);
    }
}



module.exports = new GDAX();