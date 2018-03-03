# GDAX Pocket UI


Simple `Pocket UI` built on top of the https://github.com/coinbase/gdax-node GDAX API library, that allows you to use 
GDAX API's credentials for "Manual Trades On The Go".

First iteration of this application is limited to [Etherium](https://www.ethereum.org/) account, but can easily be 
extended over to Bitcoin and other Cryptocurrencies available on [Coinbase](https://www.coinbase.com/) and [GDAX](https://www.gdax.com).

![GDAX Pocket UI](https://raw.githubusercontent.com/rinchik/gdax-pocket-ui/master/docs/static/gdax-pocket-ui.gif)

## Tech Stack

UI part of this application is built purely with VanillaJS without any 3rd party libraries (except [socket.io](https://socket.io/) 
for the price-ticker).

[Babel](https://babeljs.io/) is used for transpilation, [RollupJS](https://rollupjs.org/guide/en) for bundling and 
[Jest](https://facebook.github.io/jest/) for testing.
 
Server is running with [ExpressJS](https://expressjs.com/) which is an overkill and will be replaced in the future.


### Self-signed HTTPS certificate:

```bash
openssl req -new -newkey rsa:2048 -nodes -out mydomain.csr -keyout private.key
```

```bash
openssl x509 -req -days 365 -in mydomain.csr -signkey private.key -out server.crt
```

