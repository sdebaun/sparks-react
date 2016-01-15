import React from 'react';
import { connect } from 'react-redux';

import LeftNav from 'material-ui/lib/left-nav';
import {popoutToggle} from 'actions'

class NavPopout extends React.Component {
  render() {
    return (
      <LeftNav docked={false} open={this.props.navPopout} onRequestChange={open=>this.props.popoutToggle(open)}>
        {this.props.children}
      </LeftNav>
      )
  }
}

const mapStateToProps = (state)=>{return {navPopout:state.navPopout}}
function mapDispatchToProps(dispatch) {
  return {
    popoutToggle: (...args)=>dispatch(popoutToggle(...args))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(NavPopout);
