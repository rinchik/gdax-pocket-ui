import Div from './html/div';
import Socket from './utils/socket';
import Accounts from './dao/accounts';
import Balance from './components/balance/index';
import Orders from './components/orders/index';
import Controls from './components/controls/index';
import Loader from './components/loader/index';
import Ticker from './components/ticker/index';

class App {
    constructor(accounts) {
        this.usd = accounts.usd;
        this.usd.latest =0;
        this.etherium = accounts.etherium;
        this.orders = accounts.orders;
        this.build();
        this.createTicker();
        this.renderBalances();
        this.renderControls();
        this.renderOrders();

        return this.app;
    }

    build() {
        this.app = new Div('app');
        this.app.render(document.body);
    }

    createTicker() {
        const ticker = new Ticker(this.usd, this.etherium, this.getSocket());
        ticker.getElement().render(this.app)
    }

    getSocket() {
        if (!this.socket)
            this.socket = new Socket(':4999');

        return this.socket;
    }

    renderControls() {
        var controls = new Controls(this.etherium, this.usd);
        controls.render(this.app);
    }

    renderBalances() {
        let container = new Div();
        container.addClass('balances');
        container.render(this.app);

        const ethBalance = new Balance('etherium', this.etherium);
        const usdBalance = new Balance('usd', this.usd);

        ethBalance.render(container);
        usdBalance.render(container);
    }

    renderOrders() {
        let orders = new Orders(this.orders);
        orders.render(this.app);
    }

}


(function connect(){
    const accounts = new Accounts();
    const loader = new Loader();

    loader.render(document.body);

    accounts
        .then((response) => {
            const app = new App(response);
            app.addClass('blur');
            setTimeout(() => {
                loader.remove();
                app.removeClass('blur');
            }, 2000);
        })
        .catch((error) => {
            throw new Error(error)
        })

}());
