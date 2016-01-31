import React from 'react';
import { connect } from 'react-redux';

// import IconButton from 'material-ui/lib/icon-button'
import Menu from 'material-ui/lib/svg-icons/navigation/menu';

class LeftNavButton extends React.Component {
  toggle = ()=>this.props.toggle()

  render() {
    const { props: {icon} } = this
    return <div onTouchTap={this.toggle}>{icon || <Menu color='white'/>}</div>
    // return <IconButton onTouchTap={this.toggle}>{icon || <Menu color='white'/>}</IconButton>
  }
}

import {popoutToggle} from 'actions'

const mapStateToProps = ()=>{return {}}

const mapDispatchToProps = {
  toggle: popoutToggle
}

export default connect(mapStateToProps,mapDispatchToProps)(LeftNavButton);
