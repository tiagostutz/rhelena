import React from 'react'

import { attachModelToView } from '../../../vendors_modules/Rhelena'

import ProductListModel from '../models/ProductListModel'
import ProductItem from './ProductItem'

export default class ProductsList extends React.Component {

    componentWillMount() {
        attachModelToView(new ProductListModel(), this);
    }

    render() {
        if (this.props.products == null) {
            return (<div>{this.props.loadingMessage}</div>)
        }

        let productItems = this.props.products.map(product  => {
            return (
                <ProductItem
                    key={product.id}
                    product={product}
                />
            );
        });

        return (
            <div className="shop-wrap">
                <h2 className="uk-h2">{this.props.title}</h2>
                <div>{productItems}</div>
            </div>
        );
    }
};
