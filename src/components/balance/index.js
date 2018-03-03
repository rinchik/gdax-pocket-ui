import Div from '../../html/div';
import Span from '../../html/span';

class Balance {
    
    constructor(type, collection) {
        this.container = new Div();
        this.container.addClass('balances__balance');
        this.container.addClass('balances__balance--'+type);
        this.suffix = '';

        this.renderCurrency(collection);
        this.renderBalance(collection);
        this.renderAvailableBalance(collection);
        this.renderHoldBalance(collection);



        return this.container;
    }

    renderCurrency(collection) {
        if (!collection.currency)
            return;

        if (collection.currency == 'USD')
            this.suffix = '$ '

        const currency = new Span();
        currency.addClass('balances__balance--currency');
        currency.text(collection.currency);
        currency.render(this.container);
    }

    renderBalance(collection) {
        if (!collection.balance)
            return;

        const balance = this._getDataRow('Balance', 'balance', collection);
        balance.render(this.container);
    }

    renderAvailableBalance(collection) {
        if (!collection.available)
            return;

        const balance = this._getDataRow('Available', 'available', collection);
        balance.render(this.container);
    }

    renderHoldBalance(collection) {
        if (!collection.hold)
            return;

        const balance = this._getDataRow('On Hold', 'hold', collection);
        balance.render(this.container);
    }

    _getDataRow(titleText, property, collection) {
        const row = new Div();
        const title = new Span();
        const value = new Span();

        title.addClass('details__title').text(titleText).render(row);
        value.addClass('details').text(this.suffix + parseFloat(collection[property])).render(row);

        return row;
    }
}

export default Balance;