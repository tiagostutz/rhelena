import React from 'react'
import { attachModelToView } from '../../../vendors_modules/Rhelena'

import ProductItemModel from '../models/ProductItemModel'

export default class ProductItem extends React.Component {

    componentWillMount() {
        attachModelToView(new ProductItemModel(), this);
    }

    render() {
        if (this.props.product == null) {
            return (<div>carregando...</div>);
        }

        return (
            <div className="uk-panel uk-panel-box uk-margin-bottom">
                <img className="uk-thumbnail uk-thumbnail-mini uk-align-left" src={this.props.product.image} />
                <h4 className="uk-h4">{this.props.product.title} - &euro;{this.props.product.price}</h4>
                <button className="uk-button uk-button-small uk-button-primary"
                    onClick={this.actions.addToCart}
                    disabled={this.props.product.inventory > 0 ? '' : 'disabled'}>
                    {this.props.product.inventory > 0 ? 'Add to cart' : 'Sold Out'}
                </button>
            </div>
        );
    }
}
