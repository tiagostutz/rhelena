# Rhelena

Automatic View state binding to Model

## Usage

* Create View and Model into separate classes
  * View will have JSX instructions and Model will have state and behavior
* Connect View to Model using Rhelena
~~~~
... View class
componentWillMount() {
  Rhelena.attachModelToView(new MyModel(this.props), this);
}
~~~~
* Now updates to Model will re-render the View ('setState' will be handled by Rhelena), and all updates to view.state will update the corresponding attribute in Model instance automatically
  * Call Model methods from View using 'view.actions.myMethod()'
  * Access/modify view Model state by using 'view.viewModel.myProperty = 234'

## Example
* There is nothing better than an example! See them at *examples* folder

![Dog Bark](examples/dogbark.gif?raw=true)

## v1.2.0

Introducing **persistent model**: now you can make your model persistent, so you can store and load it's last state.
To do so you simply call the method `persist(modelName, modelId)` on your model instance passing the corresponding params. Example:
```js
class MyModel extends  extends RhelenaPresentationModel {
  constructor(modelId) {
    super();
    this.attribute1 = 999

    this.persist("MyModel", modelId)
  }
}
```

In the above example, if the modelId passed as parameter is from an already persisted model, the attribute values will be loaded from the persisted state. For example, if the last value of `attribute1` was **100**, after the `this.persist("MyModel", modelId)` is executed the value of `attribute1` will be **100**
## Reserved Words
**Note**: you can call `persist` before or after calling the `attachModelToView`.

Some attributes are used internally to control the lifecycle of a Rhelena Model, so if you have attributes on your model with the same name you may face unexpected behavior with your Model. Those are:
* __persistenceGroup
* __persistenceId

## 1.0.0 version DEPRACATION WARNING

The attribute `actions` that was present in prior versions is no longer available. Use `this.viewModel` to access ViewModel's methods instead

### Demo
[Here](examples/note-app) is a simple note-taking React application which use *rhelena* and *manuh*.