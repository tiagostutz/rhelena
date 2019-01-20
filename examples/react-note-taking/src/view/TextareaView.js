import React from 'react';
import {attachModelToView} from 'rhelena'
import TextareaModel from '../model/TextareaModel'
import autoBind from 'react-autobind'
import {validChars} from '../aux/util.js'

const clg = console.log

class TextareaView extends React.Component {

  constructor(props){
    super(props)
    this.dadRef = props.ref
    this.ref = React.createRef()
    autoBind(this)
  }

  componentWillMount () {
    attachModelToView(new TextareaModel({ref: this.ref, r: this.render}), this)
  }

  // By default, textarea is disabled
  componentDidUpdate(){
    // clg('Updated textareaView')
    this.valid = validChars(this.state.value)
    // clg('this.valid == ', this.valid)
    // const valid = validChars(this.state.value)
    if( this.valid < 2 )
      if( this.valid === 0)
        this.ref.current.focus()
  }

  render() {
    this.valid = validChars(this.state.value)    
    return (
      <div className="to-make-editable"
      onDoubleClick={() => {
        this.viewModel.changeDisabled()
        this.ref.current.focus()
        }}>
          <textarea ref={this.ref} id={this.props.id}        
          disabled={this.state.disabled}
          onClick={()=>this.ref.current.focus()}
          onDoubleClick={this.viewModel.changeDisabled}
          className={"outline-"+ ( this.valid < 1 ? "red" : "none")}      
          onBlur = {this.viewModel.focusOrDisable}
          onChange={ e => this.viewModel.updateTextValue(e, this.props.id) }
          value={this.state.value}
          placeholder="Empty notes aren't allowed..."
          cols="80" rows="10"
          ></textarea>
      </div>
    )
  }
};

export default TextareaView;