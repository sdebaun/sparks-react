require('normalize.css');
// require('styles/App.css');

import React from 'react';
import { connect } from 'react-redux';

// import RaisedButton from 'material-ui/lib/raised-button'
// import AppBar from 'material-ui/lib/app-bar'
// import Tabs from 'material-ui/lib/tabs/tabs'
// import Tab from 'material-ui/lib/tabs/tab'
import IconButton from 'material-ui/lib/icon-button';
// import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/lib/menus/menu-item';

// import { Link } from 'react-router';
import { pushPath } from 'redux-simple-router'
// import {login, logout} from '../actions'

import IsAuthed from '../containers/IsAuthed'
import IsUser from '../containers/IsUser'
import IsAdmin from '../containers/IsAdmin'
import remote from '../remote'

class AppIconMenu extends React.Component {
  render() {
    return (
      <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        >
        <IsAuthed>
          <MenuItem primaryText="Home" onClick={ ()=> this.props.pushPath('/dash') } />
          <MenuItem primaryText="Sign out" onClick={ ()=> this.props.logout() } />
          <IsAdmin>
            <MenuItem primaryText="Admin" onClick={ ()=> this.props.pushPath('/admin') } />
          </IsAdmin>
        </IsAuthed>
        <IsAuthed show={false}>
          <MenuItem primaryText="Sign In" onClick={ ()=> this.props.login() } />
        </IsAuthed>
      </IconMenu>
    );
  }
}

function mapStateToProps() {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    login: ()=>dispatch(remote.auth.login()),
    logout: ()=>dispatch(remote.auth.logout()),
    pushPath: (...args)=>dispatch(pushPath(...args))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AppIconMenu);
