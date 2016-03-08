import productsDataBase from './data/products.js'

import CartEvents from '../events/CartEvents'
import ProductEvents from '../events/ProductEvents'

export default {

    cart : {
        total : 0,
        _productsHash : {},
        addProduct(newProduct) {
            if (this._productsHash[newProduct.id]) {
                newProduct = this._productsHash[newProduct.id];
            }else{
                newProduct.quantity = 0;
                this._productsHash[newProduct.id] = newProduct;
            }
            newProduct.inventory--;
            newProduct.quantity++;

            this.total = this.products.reduce((prev, current) => { return prev + current.price; }, 0);

            if (newProduct.inventory==0) {
                ProductEvents.publishOnProductSoldOut(newProduct);
            }
        },
        get products() {
            var _self = this;
            return Object.keys(this._productsHash).map(function (id) {
                return _self._productsHash[id];
            });
        }

    },

    add(product, timeout, cb) {
        const TIMEOUT = 100;

        timeout = timeout || TIMEOUT;
        this.cart.addProduct(product);
        setTimeout(() => {
            if (cb && cb !== null) {
                cb(this.cart);
            }else{
                CartEvents.publishOnCartUpdated(this.cart);
            }
        }, timeout);

    },

    checkout() {
        this.cart.total = 0;
        this.cart._productsHash = {};

        CartEvents.publishOnCartUpdated(this.cart);
    }
}
