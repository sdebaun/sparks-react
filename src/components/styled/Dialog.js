import React from 'react';

import Dialog from 'material-ui/lib/dialog'
import AppBar from 'material-ui/lib/app-bar'
import IconButton from 'material-ui/lib/icon-button';
import Colors from 'material-ui/lib/styles/colors';

const DialogBar = ({title, leftIcon})=>
  <AppBar title={title} style={{backgroundColor:Colors.amber700}}
  iconElementLeft={<IconButton disabled={true}>{leftIcon && React.cloneElement(leftIcon,{color:'white'})}</IconButton>}
  />

export default ({title,leftIcon,open,onRequestClose,children})=>
  <Dialog title={<DialogBar {...{title,leftIcon}}/>} contentStyle={{maxWidth:320}} {...{open,onRequestClose}}>
    { children }
  </Dialog>

    // { React.Children.map(children,(child)=>
    //     React.cloneElement(child,{onSubmit:onRequestClose})
    // )}
