require('normalize.css');
// require('styles/App.css');

import React from 'react';
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/lib/raised-button'
// import AppBar from 'material-ui/lib/app-bar'
// import Tabs from 'material-ui/lib/tabs/tabs'
// import Tab from 'material-ui/lib/tabs/tab'
// import IconButton from 'material-ui/lib/icon-button';
// import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
// import IconMenu from 'material-ui/lib/menus/icon-menu';
// import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
// import MenuItem from 'material-ui/lib/menus/menu-item';

// import { Link } from 'react-router';
// import { pushPath } from 'redux-simple-router'
// import {login, logout} from '../actions'

// import IsAuthed from 'containers/IsAuthed'
// import IsAdmin from 'containers/IsAdmin'
import remote from '../remote'

class LoginButton extends React.Component {
  handleClick = ()=> this.props.login(this.props.provider)

  render() {
    const {provider} = this.props

    return (
      <RaisedButton label={'Sign in with ' + provider} onClick={this.handleClick}/>
    );
  }
}

function mapStateToProps() {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    login: ()=>dispatch(remote.auth.login())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginButton);
