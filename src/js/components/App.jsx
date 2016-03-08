import React from 'react'
import { attachModelToView } from '../../../vendors_modules/Rhelena'

import AppModel from '../models/AppModel'

import ProductList from './ProductList'
import Cart from './Cart'

export default class App extends React.Component {

    componentWillMount() {
        attachModelToView(new AppModel(), this);
    }

    render() {
        return (
            <div>
               <ProductList products={this.state.availableProducts} title="All items" />
               <ProductList products={this.state.unavailableProducts} title="Sold out Items" loadingMessage="all items are available"/>
               <Cart cart={this.state.cart} />
           </div>
          )
    }
}
