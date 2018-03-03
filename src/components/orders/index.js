import Div from '../../html/div';
import Span from '../../html/span';
import Link from '../../html/link';
import H2 from '../../html/h2';
import Ajax from '../../utils/ajax';

class Orders {

    constructor(orders) {
        this.container = new Div();
        this.container.addClass('orders');

        this.getHeader().render(this.container);

        this.renderOrders(orders);

        return this.container;
    }

    getHeader() {
        let header = new H2();
        return header.text('Active Orders')
    }

    renderOrders(orders) {
        orders.forEach((order) => {
            let orderContainer = new Div();
            orderContainer.addClass('orders--order').addClass('order-'+order.side);

            let price = new Span();
            price.addClass('order-price').text('$ '+order.price).render(orderContainer);

            let size = new Span();
            size.addClass('order-size').text('ETH: '+order.size).render(orderContainer);

            let cancelContainer = new Span();
            let cancelButton = new Link('(cancel)', this.cancelOrder(order.id));
            cancelButton.addClass('cancel-link');

            cancelButton.render(cancelContainer);
            cancelContainer.render(orderContainer);
            orderContainer.render(this.container);
        })
    }

    cancelOrder(orderId) {
        return () => {
            if (!confirm('Are you sure you want to cancel this order?'))
                return;

            Ajax.post('/cancel', {
                orderId
            }).then((response) => {
                alert(response);
            }).catch((error) => {
                alert(error);
            })
        };
    }
}

export default Orders;