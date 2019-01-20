import React from 'react';
import autobind from 'react-autobind'
import manuh from 'manuh'

import TagsInput from 'react-tagsinput'

import 'react-tagsinput/react-tagsinput.css' // If using WebPack and style-loader.

class Tags extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tags: props.tags ? props.tags : [],
    }
    this.id = props.id
    autobind(this)
  }

  handleChange(tags) {
    manuh.publish(`tags/update`, {id: this.id, tags: tags})
    this.setState({tags})
  }
  render() {
    return (<TagsInput
            value={this.state.tags}
            onChange={this.handleChange}
            addKeys={[9,13]}
            />
    )
  }
}

export default Tags;
