import autoBind from 'react-autobind'
import manuh from 'manuh'
import {RhelenaPresentationModel} from 'rhelena'
const clg = console.log
const empty = txt => txt.match(/[^ \t\n]/gm) == null
class EditableList extends RhelenaPresentationModel {

  constructor(props) {
    super(props)
    this.props = props
    this.id = props.idNum // why always undefined?
    this.items = [
      {
        value: 'some text',
        tags: ['tag1']
      },
      {
        value: '',
        tags: ['tag2']
      }
    ].filter(a => a.value)
    this.enable = props.enable
    
    manuh.subscribe(`notes/add`, this.id, (txt, info) => {
      this.items.push({
        value: txt,
        tags: [txt.split("").reverse().join("")]
      });
      this.items = this.items;
    })
    
    manuh.subscribe(`notes/update`, this.id, (data, info) => {
      this.items[parseInt(data.id.split('_')[0], 10 )].value = data.value // Doubt: this WON'T trigger any render, right?      
      if( this.enable === false ) {  
        if(!empty(data.value)) {  // então, ativar os botões, que estavam desativados
          this.enable = true
        }
      }
    })

    manuh.subscribe(`tags/update`, this.id, (data, info) => {
      this.items[data.id].tags = data.tags  // should NOT trigger an rerender
      clg('new tags of ', this.items[data.id].value, ' : ', this.items[data.id].tags)
    })
    autoBind(this)
  }

  rmvItem(id) {
    clg('TRIGGERED RMV ITEM')
    this.updateme = true
    let items = this.items
    items.splice( parseInt(id, 10), 1)
    this.items = items
  }

}

export default EditableList;