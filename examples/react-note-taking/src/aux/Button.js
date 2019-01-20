import React from 'react'

const ButtonFunctional = props => {
  return (
    <button id = {props.id}
    disabled={!props.enable}
    onClick = {(id) => props.action(props.id)}
    >
    {props.text}
    </button>
  )
  // console.log('a is ===> ', a)
}

export default ButtonFunctional;