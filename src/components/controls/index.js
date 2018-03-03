import Div from '../../html/div';
import Span from '../../html/span';
import Button from '../../html/button';
import Ajax from '../../utils/ajax';

class Controls {

    constructor(etherium, usd) {
        this.usd = usd;
        this.etherium = etherium;
        this.container = new Div();
        this.container.addClass('actions');

        this.getSellButton();
        this.getBuyButton();

        return this.container;
    }

    getSellButton() {
        this.addButton('Sell', this.sell.bind(this), 'button__action--sell');
    }

    getBuyButton() {
        this.addButton('Buy', this.buy.bind(this), 'button__action--buy');
    }

    sell() {
        this.triggerRequest('/sell', 'To Sell');
    }

    buy() {
        this.triggerRequest('/buy', 'To Buy');
    }

    addButton(title, handler, className) {
        let buttonContainer = new Span();
        buttonContainer.addClass('action');
        let button = new Button(title, handler);

        button.render(buttonContainer);
        button.addClass('button--action')
        if (className)
            button.addClass(className);
        buttonContainer.render(this.container);
    }

    triggerRequest(route, message) {
        let requestData = this.getRequestData(message);

        if (!requestData)
            return;

        Ajax.post(route, requestData)
            .then((response) => {
                if (typeof response == 'string')
                    return alert(response);
                
                alert(Object.values(response).join(', '));
            }).catch((error) => {
            alert(error.toString());
        });
    }

    getRequestData(message) {
        let size= window.prompt('How Many ' + message, this.etherium.balance.toString() );

        if (!size)
            return;

        let price = window.prompt(message + ' For How Much' , this.usd.latest);

        if (!price)
            return;

        return {
            size,
            price
        };
    }

}

export default Controls;