let CartEvents = {

    onOnCartUpdatedSubscriptions : [],

    publishOnCartUpdated(cart) {
        this.onOnCartUpdatedSubscriptions.forEach( cb => { cb(cart) } );
    },

    subscribeToCartUpdated(onCartUpdated) {
        this.onOnCartUpdatedSubscriptions.push(onCartUpdated);
    },

}
export default CartEvents;
