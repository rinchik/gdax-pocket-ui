import TickerChart from '../tickerChart/index';
import Div from '../../html/div';
import H1 from '../../html/h1';
import Span from '../../html/span';

class Ticker {
    constructor(usd, eth, socket) {
        this.container = new Div();
        this.container.addClass('ticker-container');

        this.currentTickerPrice = new H1();
        this.currentTickerPrice.addClass('ticker-price');
        this.currentTickerPrice.render(this.container);
        this.currentTickerPrice.text('$ 0.00')


        const balanceElement = new H1();
        balanceElement.addClass('balance').text('$ 0.00');
        balanceElement.render(this.container);

        const tickerChart = new TickerChart(this.container);

        socket.addEvent('price', (priceObject)=>{
            let price = parseFloat(priceObject.price);
            let balanceUsd = parseFloat(usd.balance);
            let balanceEth = parseFloat(eth.balance);
            let balance = balanceUsd + balanceEth*price;
            this.currentTickerPrice.text('$ ' + price.toFixed(2));

            if (!isNaN(balance))
                balanceElement.text('$ ' + balance.toFixed(2));

            usd.latest = price;
        });

        let previousLatestPrice = 0;

        const ticker = setInterval(() => {
            tickerChart.addPoint(usd.latest);
            this.updateClasses(previousLatestPrice, usd.latest);
            previousLatestPrice = usd.latest;
        }, 1000)
    }

    getElement() {
        return this.container;
    }

    updateClasses(previousPrice, latestPrice) {
        if (previousPrice == latestPrice)
            return;

        if (previousPrice < latestPrice) {
            this.currentTickerPrice.removeClass('price-decrease');
            this.container.removeClass('ticker-container--red');
            return;
        }

        this.currentTickerPrice.addClass('price-decrease');
        this.container.addClass('ticker-container--red')
    }

}


export default Ticker