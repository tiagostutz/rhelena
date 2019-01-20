import {RhelenaPresentationModel} from 'rhelena'
import autoBind from 'react-autobind'
import manuh from 'manuh'
const clg = console.log


class EditorModel extends RhelenaPresentationModel {
  constructor(props) {
    super(props)
    this.editorRef = props.ref
    this.enable = props.enable
    this.textUser = 'Just a text...'
    autoBind(this)
  }
  updateTextValue = event => { 
    this.textUser= event.target.value
  }
  resetTextUser() {
    this.textUser = ''
  }
  addItem() {
    manuh.publish(`notes/add`, this.textUser)
    this.resetTextUser() 
  }

}

export default EditorModel;