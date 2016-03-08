import React from 'react'
import { attachModelToView } from '../../../vendors_modules/Rhelena'

import CartModel from '../models/CartModel'

class Product extends React.Component {
    render() {
        return <div>{this.props.children}</div>;
    }
};

export default class Cart extends React.Component {

    componentWillMount() {
        attachModelToView(new CartModel(), this);
    }

    render() {
        var hasProducts = (this.props.cart!=null) && (this.props.cart.products!=null) && (this.props.cart.products.length > 0);
        var nodes = !hasProducts ?
            <div>Please add some product to cart.</div> :
            this.props.cart.products.map( p => {
                return <Product key={p.id}>{p.title} - &euro;{p.price} x {p.quantity}</Product>;
            });

        return (
            <div className="cart uk-panel uk-panel-box uk-panel-box-primary">
                <div className="uk-badge uk-margin-bottom">Your Cart</div>
                <div className="uk-margin-small-bottom">{nodes}</div>
                <div className="uk-margin-small-bottom">Total: &euro;{this.props.cart.total}</div>
                <button className="uk-button uk-button-large uk-button-success uk-align-right"
                    onClick={this.actions.onCheckoutClicked}
                    disabled={hasProducts ? '' : 'disabled'}>
                    Checkout
                </button>
            </div>
        );
    }
};
