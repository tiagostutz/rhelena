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

## 1.0.0 version DEPRACATION WARNING

The attribute `actions` that was present in prior versions is no longer available. Use `this.viewModel` to access ViewModel's methods instead