let ProductEvents = {

    onProductsFetchedSubscriptions : [],
    publishOnProductsFetched(fetchedProducts) {
        this.onProductsFetchedSubscriptions.forEach( cb => { cb(fetchedProducts) } );
    },
    subscribeToProductsFetched(onProductsFetched) {
        this.onProductsFetchedSubscriptions.push(onProductsFetched);
    },

    onProductSoldOutSubscriptions : [],
    publishOnProductSoldOut(soldOutProduct) {
        this.onProductSoldOutSubscriptions.forEach( cb => { cb(soldOutProduct) } );
    },
    subscribeToProductSoldOut(onProductSoldOut) {
        this.onProductSoldOutSubscriptions.push(onProductSoldOut);
    }
}
export default ProductEvents;
