import React from 'react'
import AppBar from 'material-ui/AppBar';

export default function ContentTemplate(props) {
  return (
    <span>
      <AppBar title={props.title}/>
      <div id="content">
        {props.children}
      </div>
    </span>
  )
}