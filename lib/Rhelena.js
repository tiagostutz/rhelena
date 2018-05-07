'use strict';

module.exports = {
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
          if (propertyName === "viewComponent" || typeof(presentationModelInstance[propertyName]) === "function")
              return;

          presentationModelInstance["_" + propertyName] = presentationModelInstance[propertyName];
          delete presentationModelInstance[propertyName]; //removes the original property
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
  }

}
