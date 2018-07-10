var assert = require('assert');

const MockModel = require('./MockModel')
const { globalState } = require('../lib/Rhelena')

describe('Rhelena', () => {
    describe('#globalState()', () => {
        it('should increase a global state counter from 2 differente local instances', () => {
            const model_1 = new MockModel(1);
            globalState.counter = model_1.value

            const model_2 = new MockModel(2);
            globalState.counter = globalState.counter+ model_2.value

            assert.equal(globalState.counter, 3)
        })
    })
})
