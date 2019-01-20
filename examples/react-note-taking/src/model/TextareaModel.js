import autoBind from 'react-autobind'
import {RhelenaPresentationModel} from 'rhelena'
import manuh from 'manuh'
class TextareaModel extends RhelenaPresentationModel {

  constructor(props) {
    super(props)
    this.ref = props.ref
    this.value = props.value ? props.value : ''
    console.log("this.value ===> ",this.value);
    this.gambs = ''
    this.disabled = props.disabled || true
    autoBind(this)
  }
  
  updateTextValue = (event, id) => { 
    this.value = event.target.value
    manuh.publish(`notes/update`, {value: this.value, id: id})  // Atencao: publicar em canal vazio gera exceção!    
  }
  changeDisabled(disabled){
    this.disabled = disabled == undefined ? !this.disabled : !!disabled
  }
  focusOrDisable() {
    if(this.value.match(/([^\s\t\n])/gm) === null)
      this.ref.current.focus()
    else
      this.changeDisabled()
  }
}

export default TextareaModel;