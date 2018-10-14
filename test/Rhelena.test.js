var assert = require('assert');

const MockModel = require('./MockModel')
const PersistentMockModel = require('./PersistentMockModel')
const ViewMock = require('./ViewMock')
const { globalState, attachModelToView } = require('../lib/Rhelena')

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

    describe('#keepState()', () => {
        it('persist and retrieve the model directly', () => {
            const model_1 = new PersistentMockModel()
            assert.equal(model_1.__persistenceGroup, null)
            assert.equal(model_1.__persistenceId, null)

            //enable persistence
            model_1.keepState("mocks", 22)
            assert.equal(model_1.__persistenceGroup, "mocks")
            assert.equal(model_1.__persistenceId, 22)

            delete globalState['mocks']
        })

        it('attachToView, pre-persist and check the model value modified by global and global by local', () => {
            const model_1 = new PersistentMockModel()
            assert.equal(model_1.__persistenceGroup, null)
            assert.equal(model_1.__persistenceId, null)

            //enable persistence
            model_1.value = 1
            model_1.keepState("mocks", 22) // first persist
            assert.equal(model_1.__persistenceGroup, "mocks")
            assert.equal(model_1.__persistenceId, 22)
            assert.equal(globalState['mocks'][22].value, 1)
            assert.equal(model_1.value, 1)
            
            attachModelToView(model_1, new ViewMock()) //then attach
            assert.equal(globalState['mocks'][22].value, 1)
            assert.equal(model_1.value, 1)

            model_1.value = 999
            assert.equal(model_1.value, 999)
            assert.equal(globalState['mocks'][22].value, 999)

            globalState['mocks'][22].value = 7777
            assert.equal(globalState['mocks'][22].value, 7777)
            assert.equal(model_1.value, 7777)

            delete globalState['mocks']

        })

        it('attachToView, post-persist and check the model value modified by global and global by local', () => {
            const model_1 = new PersistentMockModel()
            assert.equal(model_1.__persistenceGroup, null)
            assert.equal(model_1.__persistenceId, null)

            //enable persistence
            model_1.value = 300
            assert.equal(model_1.__persistenceGroup, null)
            assert.equal(model_1.__persistenceId, null)
            assert.equal(model_1.value, 300)
            
            attachModelToView(model_1, new ViewMock()) //first, attach
            assert.equal(globalState['mocks'], undefined)
            assert.equal(model_1.value, 300)

            model_1.keepState("mocks", 33) //then, keepState
            assert.equal(model_1.__persistenceGroup, "mocks")
            assert.equal(model_1.__persistenceId, 33)
            assert.equal(globalState['mocks'][33].value, 300)
            assert.equal(model_1.value, 300)

            model_1.value = 444
            assert.equal(model_1.value, 444)
            assert.equal(globalState['mocks'][33].value, 444)

            globalState['mocks'][33].value = 5555
            assert.equal(globalState['mocks'][33].value, 5555)
            assert.equal(model_1.value, 5555)

            delete globalState['mocks']

        })

        it('attachToView, pre-persist, re-instantiate and check the model with values from previous instance', () => {
            const model_1 = new PersistentMockModel()
            assert.equal(model_1.__persistenceGroup, null)
            assert.equal(model_1.__persistenceId, null)

            //enable persistence
            model_1.value = 1
            model_1.keepState("mocks", 22) // first persist
            assert.equal(model_1.__persistenceGroup, "mocks")
            assert.equal(model_1.__persistenceId, 22)
            assert.equal(globalState['mocks'][22].value, 1)
            assert.equal(model_1.value, 1)
            
            attachModelToView(model_1, new ViewMock()) //then attach
            assert.equal(globalState['mocks'][22].value, 1)
            assert.equal(model_1.value, 1)

            model_1.value = 999
            assert.equal(model_1.value, 999)
            assert.equal(globalState['mocks'][22].value, 999)

            globalState['mocks'][22].value = 7777
            assert.equal(globalState['mocks'][22].value, 7777)
            assert.equal(model_1.value, 7777)

            const model_2 = new PersistentMockModel()
            assert.equal(model_2.value, null)
            model_2.loadState("mocks", 22) // first persist
            assert.equal(model_2.value, 7777)

            delete globalState['mocks']

        })        

        
        it('attachToView, post-persist re-instantiate and check the model with values from previous instance', () => {
            const model_1 = new PersistentMockModel()
            assert.equal(model_1.__persistenceGroup, null)
            assert.equal(model_1.__persistenceId, null)

            // simple assignment
            model_1.value = 300
            assert.equal(model_1.__persistenceGroup, null)
            assert.equal(model_1.__persistenceId, null)
            assert.equal(model_1.value, 300)
            
            attachModelToView(model_1, new ViewMock()) //first, attach
            assert.equal(globalState['mocks'], undefined)
            assert.equal(model_1.value, 300)

            model_1.keepState("mocks", 33) //then, keepState
            assert.equal(model_1.__persistenceGroup, "mocks")
            assert.equal(model_1.__persistenceId, 33)
            assert.equal(model_1.value, 300)
            assert.equal(globalState['mocks'][33].value, 300)

            model_1.value = 444
            assert.equal(model_1.value, 444)
            assert.equal(globalState['mocks'][33].value, 444)

            globalState['mocks'][33].value = 5555
            assert.equal(globalState['mocks'][33].value, 5555)
            assert.equal(model_1.value, 5555)

            const model_2 = new PersistentMockModel()
            assert.equal(model_2.value, null)
            model_2.loadState("mocks", 33) // first persist
            assert.equal(model_2.value, 5555)

            delete globalState['mocks']

        })

        it('attachToView, post-persist with differente IDs changing values and checking the model values', () => {
            const model_1 = new PersistentMockModel()
            assert.equal(globalState['mocks'], undefined)
            assert.equal(model_1.__persistenceGroup, null)
            assert.equal(model_1.__persistenceId, null)

            // simple assignment
            model_1.value = 300
            assert.equal(globalState['mocks'], undefined)
            assert.equal(model_1.__persistenceGroup, null)
            assert.equal(model_1.__persistenceId, null)
            assert.equal(model_1.value, 300)
            
            attachModelToView(model_1, new ViewMock()) //first, attach
            assert.equal(globalState['mocks'], undefined)
            assert.equal(model_1.__persistenceGroup, null)
            assert.equal(model_1.__persistenceId, null)            
            assert.equal(model_1.value, 300)

            model_1.keepState("mocks", 33) //then, keepState
            assert.equal(model_1.__persistenceGroup, "mocks")
            assert.equal(model_1.__persistenceId, 33)
            assert.equal(model_1.value, 300)
            assert.equal(globalState['mocks'][33].value, 300)

            model_1.value = 444
            assert.equal(model_1.value, 444)
            assert.equal(globalState['mocks'][33].value, 444)

            globalState['mocks'][33].value = 5555
            assert.equal(globalState['mocks'][33].value, 5555)
            assert.equal(model_1.value, 5555)

            model_1.keepState("mocks", 44)
            assert.equal(model_1.value, 444)
            assert.equal(globalState['mocks'][44].value, 444)
            assert.equal(globalState['mocks'][33].value, 5555)
            model_1.value = 5550
            assert.equal(model_1.value, 5550)
            assert.equal(globalState['mocks'][44].value, 5550)
            assert.equal(globalState['mocks'][33].value, 5555)

            model_1.loadState("mocks", 33)
            assert.equal(model_1.value, 5555)
            assert.equal(globalState['mocks'][44].value, 5550)
            assert.equal(globalState['mocks'][33].value, 5555)

            model_1.loadState("mocks", 44)
            assert.equal(model_1.value, 5550)
            assert.equal(globalState['mocks'][44].value, 5550)
            assert.equal(globalState['mocks'][33].value, 5555)

            delete globalState['mocks']
        })

        it('attachToView, post-persist with differente IDs changing values, checking if persisted and checking the model values', () => {

            const model_1 = new PersistentMockModel()
            assert.equal(globalState['mocks'], undefined)
            assert.equal(model_1.__persistenceGroup, null)
            assert.equal(model_1.__persistenceId, null)

            //enable persistence
            model_1.value = 100
            assert.equal(globalState['mocks'], undefined)
            assert.equal(model_1.__persistenceGroup, null)
            assert.equal(model_1.__persistenceId, null)
            assert.equal(model_1.value, 100)
            
            attachModelToView(model_1, new ViewMock()) //first, attach
            assert.equal(globalState['mocks'], undefined)
            assert.equal(model_1.__persistenceGroup, null)
            assert.equal(model_1.__persistenceId, null)            
            assert.equal(model_1.value, 100)

            model_1.keepState("mocks", 33) //then, keepState
            assert.equal(model_1.__persistenceGroup, "mocks")
            assert.equal(model_1.__persistenceId, 33)
            assert.equal(model_1.value, 100)
            assert.equal(globalState['mocks'][33].value, 100)

            if (!model_1.isStateKept("mocks", 55)) {
                model_1.keepState("mocks", 55) //then, keepState
                model_1.value = 200
                assert.equal(model_1.__persistenceGroup, "mocks")
                assert.equal(model_1.__persistenceId, 55)
                assert.equal(model_1.value, 200)
                assert.equal(globalState['mocks'][55].value, 200)
                assert.equal(globalState['mocks'][33].value, 100)
            }
          
            assert.equal(model_1.isStateKept("mocks", 33), !!true)
            assert.equal(model_1.isStateKept("mocks", 55), !!true)

            if (model_1.isStateKept("mocks", 33)) {
                model_1.loadState("mocks", 33) 
                assert.equal(model_1.__persistenceGroup, "mocks")
                assert.equal(model_1.__persistenceId, 33)
                assert.equal(model_1.value, 100)
                assert.equal(globalState['mocks'][55].value, 200)
                assert.equal(globalState['mocks'][33].value, 100) 

                model_1.value = 300               
                assert.equal(model_1.value, 300)
                assert.equal(globalState['mocks'][55].value, 200)
                assert.equal(globalState['mocks'][33].value, 300) 
                model_1.value = 303               
                assert.equal(model_1.value, 303)
                assert.equal(globalState['mocks'][55].value, 200)
                assert.equal(globalState['mocks'][33].value, 303) 
            }

            if (model_1.isStateKept("mocks", 55)) {
                model_1.loadState("mocks", 55) //loadState `clears` the keepState
                assert.equal(model_1.__persistenceGroup, "mocks")
                assert.equal(model_1.__persistenceId, 55)
                assert.equal(model_1.value, 200)
                assert.equal(globalState['mocks'][55].value, 200)
                assert.equal(globalState['mocks'][33].value, 303) 
                model_1.value = 500               
                assert.equal(model_1.value, 500)
                assert.equal(globalState['mocks'][55].value, 500)
                assert.equal(globalState['mocks'][33].value, 303) 
                model_1.value = 505               
                assert.equal(model_1.value, 505)
                assert.equal(globalState['mocks'][55].value, 505)
                assert.equal(globalState['mocks'][33].value, 303) 
            }

            delete globalState['mocks']

        })

    })
})
