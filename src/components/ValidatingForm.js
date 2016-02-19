import React, {Children,cloneElement} from 'react';

import RaisedButton from 'material-ui/lib/raised-button'

const childProps = (field)=>{ return {
  errorText: field.touched && field.error,
  ...field
} }

export default ({fields, errors, handleSubmit, submitting, children})=>
  <form onSubmit={handleSubmit}>
    { Children.map(children,(child)=>
        child.props.field &&
        cloneElement(child,childProps(fields[child.props.field])) ||
        child
    )}
    <div style={{display:'flex',width:'100%',justifyContent:'flex-end'}}>
      <RaisedButton disabled={(Object.keys(errors).length>0) || submitting} primary={true} onTouchTap={handleSubmit} label='OK' style={{marginRight:'1em'}}/>
    </div>
  </form>
