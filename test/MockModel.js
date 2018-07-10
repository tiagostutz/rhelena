const { RhelenaPresentationModel } = require('../lib/Rhelena');

class MockModel extends RhelenaPresentationModel {
    constructor(valueParam) {
        super();
        this.value = valueParam
    }
}

module.exports = MockModel