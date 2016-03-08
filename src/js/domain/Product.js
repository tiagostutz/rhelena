import productsDataBase from './data/products.js'

import ProductEvents from '../events/ProductEvents'

export default {

    fetchAll(timeout, cb) {
        const TIMEOUT = 100;

        timeout = timeout || TIMEOUT;
        setTimeout(() => {
            if (cb && cb !== null) {
                cb(productsDataBase);
            }else{
                ProductEvents.publishOnProductsFetched(productsDataBase)
            }
        }, timeout);
    }
    
}
