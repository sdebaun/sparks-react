import React from 'react';
import { connect } from 'react-redux';

import IconButton from 'material-ui/lib/icon-button'
import Menu from 'material-ui/lib/svg-icons/navigation/menu';

import {popoutToggle} from 'actions'

class LeftNavButton extends React.Component {
  render() {
    return (
      <IconButton onTouchTap={()=>this.props.popoutToggle()}><Menu color='white'/></IconButton>
    );
  }
}

const mapStateToProps = ()=>{return {}}

function mapDispatchToProps(dispatch) {
  return {
    popoutToggle: (...args)=>dispatch(popoutToggle(...args))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(LeftNavButton);
