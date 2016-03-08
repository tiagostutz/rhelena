import { RhelenaPresentationModel } from '../../../vendors_modules/Rhelena'

import Cart from '../domain/Cart.js'


export default class ProductItemModel extends RhelenaPresentationModel{


    constructor() {
        super();
     }

     addToCart() {
         Cart.add(this.product);
     }

}
