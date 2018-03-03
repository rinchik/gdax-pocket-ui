# GDAX Pocket UI


Simple `Pocket UI` built on top of the https://github.com/coinbase/gdax-node GDAX API library, that allows you to use 
GDAX API's credentials for "Manual Trades On The Go".

First iteration of this application is limited to [Etherium](https://www.ethereum.org/) account, but can easily be 
extended over to Bitcoin and other Cryptocurrencies available on [Coinbase](https://www.coinbase.com/) and
 [GDAX](https://www.gdax.com).

![GDAX Pocket UI](https://raw.githubusercontent.com/rinchik/gdax-pocket-ui/master/docs/static/gdax-pocket-ui.gif)

## Tech Stack

UI part of this application is built purely with VanillaJS without any 3rd party libraries 
(except [socket.io](https://socket.io/) for the price-ticker).

[Babel](https://babeljs.io/) is used for transpilation, [RollupJS](https://rollupjs.org/guide/en) for bundling and 
[Jest](https://facebook.github.io/jest/) for testing.
 
Server is running with [ExpressJS](https://expressjs.com/) which is an overkill and will be replaced in the future.

## Running GDAX Pocket UI
 
#### Prerequisites

* NodeJS 8.x or higher

* [NVM](https://github.com/creationix/nvm)
 
* [ForeverJS](https://github.com/foreverjs/forever)

* [Yarn](https://yarnpkg.com/en/)

For security purposes, in order to run this application and access it over secure HTTPS
you will have to create a self-signed certificate. It will trigger site-identity warning in browsers, but since it's
a private application that is not designed to be open for general public, you can ignore this warning, the connection
will still be secure.
  
Navigage to the `encryption/` directory and run this command:
  

```bash
openssl req -new -newkey rsa:2048 -nodes -out mydomain.csr -keyout private.key
```

After following the instructions, it will generate `private.key` which we can now use to create our self-signed 
certificate using this command:


```bash
openssl x509 -req -days 365 -in mydomain.csr -signkey private.key -out server.crt
```

This command has generated the certificate that later will be used by `/server.js`



