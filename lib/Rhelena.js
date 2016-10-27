'use strict';

module.exports = {
  /**
    * This function attaches a PresentationModel instance to a ViewInstance
    */
  attachModelToView : function(presentationModelInstance, viewInstance) {
      presentationModelInstance.viewComponent = viewInstance;

      if (viewInstance.state==null) {
          viewInstance.state = {};
      }

      //initialize state and create on the presentationModel properties that update de view when they are changed
      Object.getOwnPropertyNames(presentationModelInstance).forEach(function(propertyName) {

          //prevent from changing the behavior of functions and the viewComponent reserved attribute
          if (propertyName === "viewComponent" || typeof(presentationModelInstance[propertyName]) === "function")
              return;

          presentationModelInstance["_" + propertyName] = presentationModelInstance[propertyName];
          delete presentationModelInstance[propertyName]; //removes the original property
          Object.defineProperty(presentationModelInstance, propertyName, {
              set:  function(newValue) {
                      presentationModelInstance["_" + propertyName] = newValue;
                      let objState = {};
                      objState[propertyName] = this["_" + propertyName];
                      presentationModelInstance.viewComponent.setState( objState );
                    }
              ,
              get:  function() {
                return presentationModelInstance["_" + propertyName];
            },
            configurable: true
          });

          viewInstance.state[propertyName] = presentationModelInstance[propertyName];
      });


      //define simple local attributes on the presentationModel that are the same as the props passed throught props from React.
      Object.keys(viewInstance.props).forEach(function(propertyName) {

          presentationModelInstance["_" + propertyName] = viewInstance.props[propertyName];
          Object.defineProperty(presentationModelInstance, propertyName, {
              set:  function(newValue) {
                      presentationModelInstance["_" + propertyName] = newValue;
                      let objState = {};
                      objState[propertyName] = this["_" + propertyName];
                      presentationModelInstance.viewComponent.setState( objState );
                    }
              ,
              get:  function() {
                return presentationModelInstance["_" + propertyName];
              },
              configurable: true
          });

          viewInstance.state[propertyName] = presentationModelInstance[propertyName];

      });

      if (typeof(viewInstance.actions) === "undefined" || viewInstance.actions==null) {
          viewInstance.actions = {};
      }

      /*
       * Now we bind all of the PresentationModels methods to its context and separate State and Actions
       * Reference: http://reactkungfu.com/2015/07/why-and-how-to-bind-methods-in-your-react-component-classes/
       */
      let presentationModelMethods = Object.getOwnPropertyNames( presentationModelInstance.__proto__ );
      for (let i=0; i<presentationModelMethods.length; i++) {
          let propertyName = presentationModelMethods[i];

          if (propertyName == 'constructor') continue;

            if(typeof(presentationModelInstance[propertyName]) == 'function') {
              //if this binding is not done, the method cannot use the 'this' keyword
              //create proxies
              presentationModelInstance[propertyName].bind(presentationModelInstance)
          }
      }
      //put the whole object so the actions can access the model properties
      viewInstance.actions = presentationModelInstance;
  },

  /**
    * The RhelenaPresentationModel attaches the dataModel passed through constructor to the instance itself
    * so that the State of the View React Component has the same properties as the ViewModel and
    */
  RhelenaPresentationModel : function() {
          this.viewComponent = null;
  }

}
