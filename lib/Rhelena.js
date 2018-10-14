'use strict';

var isPrivateProperty = function(presentationModelInstance, propertyName) {
    return propertyName === "viewComponent" || typeof(presentationModelInstance[propertyName]) === "function" || propertyName.substring(0,1) == "_"
}
module.exports = {

    /**
     * this object is used to store the global state of the Application, regard the use of local state per component
     */
  globalState: {},

  /**
    * This function attaches a PresentationModel instance to a ViewInstance
    */
  attachModelToView : function(presentationModelInstance, viewInstance) {
      presentationModelInstance.viewComponent = viewInstance;

      if (viewInstance.state==null) {
        viewInstance.setState({});
      }

      //initialize state and create on the presentationModel properties that update de view when they are changed
      Object.getOwnPropertyNames(presentationModelInstance).forEach(function(propertyName) {

          //prevent from changing the behavior of functions and the viewComponent reserved attribute
          if (isPrivateProperty(presentationModelInstance, propertyName))
              return;

          presentationModelInstance["_" + propertyName] = presentationModelInstance[propertyName];
          delete presentationModelInstance[propertyName]; //removes the original property
          Object.defineProperty(presentationModelInstance, propertyName, {
              set:  function(newValue) { //if it is persistent, use the persistent model
                      presentationModelInstance["_" + propertyName] = newValue;
                      var objState = {};
                      objState[propertyName] = this["_" + propertyName];
                      if (presentationModelInstance.__persistenceGroup) {
                          module.exports.globalState[presentationModelInstance.__persistenceGroup][presentationModelInstance.__persistenceId][propertyName] = presentationModelInstance["_" + propertyName]
                      }
                      presentationModelInstance.viewComponent.setState(objState);
                    }
              ,
              get:  function() {
                if (presentationModelInstance.__persistenceGroup) { //if it is persistent, use the persistent model
                    return module.exports.globalState[presentationModelInstance.__persistenceGroup][presentationModelInstance.__persistenceId][propertyName]
                }
                return presentationModelInstance["_" + propertyName];
            },
            configurable: true,
          });

          const property = {};
          property[propertyName] = presentationModelInstance[propertyName];
          viewInstance.setState(property);
      });


      //define simple local attributes on the presentationModel that are the same as the props passed throught props from React.
      Object.keys(viewInstance.props).forEach(function(propertyName) {

          presentationModelInstance["_" + propertyName] = viewInstance.props[propertyName];
          Object.defineProperty(presentationModelInstance, propertyName, {
              set:  function(newValue) {
                      presentationModelInstance["_" + propertyName] = newValue;
                      var objState = {};
                      objState[propertyName] = this["_" + propertyName];
                      presentationModelInstance.viewComponent.setState(objState);
                    }
              ,
              get:  function() {
                return presentationModelInstance["_" + propertyName];
              },
              configurable: true
          });

          const property = {};
          property[propertyName] = presentationModelInstance[propertyName];
          viewInstance.setState(property);

      });

      if (typeof(viewInstance.viewModel) === "undefined" || viewInstance.viewModel==null) {
          viewInstance.viewModel = {};
      }

      /*
       * Now we bind all of the PresentationModels methods to its context and separate State
       * Reference: http://reactkungfu.com/2015/07/why-and-how-to-bind-methods-in-your-react-component-classes/
       */
      var presentationModelMethods = Object.getOwnPropertyNames( presentationModelInstance.__proto__ );
      for (var i=0; i<presentationModelMethods.length; i++) {
          var propertyName = presentationModelMethods[i];

          if (propertyName == 'constructor') continue;

            if(typeof(presentationModelInstance[propertyName]) == 'function') {
              //if this binding is not done, the method cannot use the 'this' keyword
              //create proxies
              presentationModelInstance[propertyName].bind(presentationModelInstance)
          }
      }
      //put the whole object so the actions can access the model properties
      viewInstance.viewModel = presentationModelInstance;

      //The user can define and event to be invoked after the attachment has been done.
      //If the user defined an event handler for "onModelAttached", invoke it
      if (typeof(presentationModelInstance.onModelAttached) !== "undefined") {
        presentationModelInstance.onModelAttached();
      }
  },

  /**
    * The RhelenaPresentationModel attaches the dataModel passed through constructor to the instance itself
    * so that the State of the View React Component has the same properties as the ViewModel and
    */
  RhelenaPresentationModel : function() {
      this.viewComponent = null;
      this.__persistenceGroup = null;
      this.__persistenceId = null;

      var _self = this;
      this.keepState = function(group, id) {

        _self.__persistenceGroup = null;
        _self.__persistenceId = null;

        // initialize, if may
        if (!module.exports.globalState[group]) {
            module.exports.globalState[group] = {}
        }
        if (!module.exports.globalState[group][id]) {
            module.exports.globalState[group][id] = {}
        }

        // initialize globalstate with current state
        Object.getOwnPropertyNames(_self).forEach(function(propertyName) {            
            if (!isPrivateProperty(_self, propertyName)) {
                module.exports.globalState[group][id][propertyName] = _self[propertyName]
            }
        })

        // assign after initialized
        _self.__persistenceGroup = group;
        _self.__persistenceId = id;
        
      };

      this.loadState = function(group, id) {
        
        // check whether the state can be loaded
        if (!module.exports.globalState[group]) {
            throw `There's no state group named "${group}". Have you ever called the method "keepState" for this group?`
        }
        if (!module.exports.globalState[group][id]) {
            throw `There's no state in the group "${group}" with Id "${id}". Have you ever called the method "keepState" for this group and ID?`
        }

        _self.__persistenceGroup = null;
        _self.__persistenceId = null;
        
        // initialize globalstate with current state
        Object.getOwnPropertyNames(_self).forEach(function(propertyName) {
            if (!isPrivateProperty(_self, propertyName)) {
                _self[propertyName] = module.exports.globalState[group][id][propertyName]
            }
        })
        
        _self.__persistenceGroup = group;
        _self.__persistenceId = id;
    };

    this.isStateKept = function(group, id) {
        return (!!module.exports.globalState[group] && !!module.exports.globalState[group][id])
    };
  }

}
