const { RhelenaPresentationModel } = require('../lib/Rhelena');

class PersistMockModel extends RhelenaPresentationModel {
    constructor() {
        super();
        this.value = null        
    }
}

module.exports = PersistMockModel