import React from 'react';
import Original from 'material-ui/lib/select-field';

export default class Patched extends React.Component {
  render() {
    const {props: {onChange, ...props}} = this
    return <Original {...props} onChange={(e,i,v)=>onChange(v)}/>
  }
}