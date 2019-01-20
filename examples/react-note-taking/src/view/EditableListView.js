import React from 'react';
import '../css/EditableListView.css'
import Textarea from '../view/TextareaView'
import Button from '../aux/Button'
import {attachModelToView} from 'rhelena'
import EditableListModel from '../model/EditableListModel'
import {validChars} from '../aux/util.js'
import Tags from '../aux/Tags'

class EditableListView extends React.Component {
  
  componentWillMount() {
    attachModelToView(new EditableListModel(this.props), this)
  }

  render() {
    let a = (
            <ul id="lista-items">
              {this.state.items
                  .map((it,id) => {
                    return (
                    <React.Fragment key={id+'_'+it.value}>
                        <li  >
                          <div width="inherit">
                            <div flex-column="true"> 
                                <Button action={this.viewModel.rmvItem} id={id}
                                text="Delete note"
                                enable={this.state.enable || validChars(it) == 0}
                                />                            
                            </div>
                            <Textarea value={it.value} id={id+'_'+it.value} onClick={()=>console.log('wow!!')}>
                            </Textarea>
                            <div className="wrapper-tags">
                              <Tags
                              tags={it.tags}
                              id={id}>
                              </Tags>
                            </div>
                        </div>
                        </li>
                      </React.Fragment>
                    )
              })}
            </ul>
    )
    return a
  }
}

export default EditableListView;