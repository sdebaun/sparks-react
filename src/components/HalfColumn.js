import React from 'react';
import { Cell } from 'react-flexr'

const style = { padding: '0 0.5em 1em' }

export default (props)=>
  <Cell portable='1/1' desktop='1/2' gutter='0em' style={style} {...props}/>
