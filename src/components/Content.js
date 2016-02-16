import React from 'react';

const contentStyle = {
  display:'flex', flexDirection:'column',margin:'0em 1em'
}

export default ({style,children})=>
  <div style={Object.assign(contentStyle,style)}>{ children }</div>
