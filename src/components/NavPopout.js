import React from 'react';
import { connect } from 'react-redux';

import LeftNav from 'material-ui/lib/left-nav';

class NavPopout extends React.Component {
  toggle = ()=>this.props.toggle()

  render() {
    const {props: {isOpen,children}} = this
    return (
      <LeftNav docked={false} open={isOpen} onRequestChange={this.toggle}>{children}</LeftNav>
      )
  }
}

import {popoutToggle} from 'actions'

const mapStateToProps = (state)=>{
  return {isOpen:state.navPopout}
}

const mapDispatchToProps = {
  toggle: popoutToggle
}

export default connect(mapStateToProps,mapDispatchToProps)(NavPopout);
