import React from 'react';
import { connect } from 'react-redux';

import LeftNav from 'material-ui/lib/left-nav';

const NavPopout = ({toggle,isOpen,children})=>
  <LeftNav docked={false} open={isOpen} onRequestChange={()=>toggle()}>{children}</LeftNav>

import {popoutToggle} from 'actions'

const mapState = (state)=>{
  return {isOpen:state.navPopout}
}

const mapDispatch = {
  toggle: popoutToggle
}

export default connect(mapState,mapDispatch)(NavPopout);
