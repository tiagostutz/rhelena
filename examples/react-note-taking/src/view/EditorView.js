import React from 'react';
import EditableList from './EditableListView'
import { attachModelToView } from 'rhelena'
import EditorModel from '../model/EditorModel'
import {validChars} from '../aux/util'

class EditorView extends React.Component {
  constructor(props) {
    super(props)
    this.idNum = props.idNumd
    this.editorTextarea = React.createRef()
  }
  componentWillMount(){
    attachModelToView(new EditorModel({
      enable: this.props.enable,
      ref: this.editorTextarea
    }), this)
  }

  componentDidUpdate() {
    this.editorTextarea.current.focus()
  }
  render() {
    const validdd = validChars(this.state.textUser)
    return (
      <div className="center-me">
        <textarea ref={this.editorTextarea}
        onChange={ e => {
          this.viewModel.updateTextValue(e, parseInt(this.props.idEditor.split('_')[0], 10 ) )
        }}
        value={this.state.textUser}
        placeholder="Digite aqui sua nota..."
        cols="80" rows="10"
        ></textarea>
        <div className = "buttons-wrapper">
          <button id="addButton" onClick={() => this.viewModel.addItem()}
          disabled={validdd == 0}>
          Add note</button>
          <button id="resetButton"onClick={ () => this.viewModel.resetTextUser()}
          disabled={validdd == 0}
          >Erase draft</button>
        </div>
        <EditableList idNum={this.idNum} enable={this.state.enable}       
        ></EditableList>
      </div>
    )
  }
}

export default EditorView;