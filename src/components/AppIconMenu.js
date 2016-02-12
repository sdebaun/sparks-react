// require('normalize.css');
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
import Avatar from 'material-ui/lib/avatar';

// import { Link } from 'react-router';
import { pushPath } from 'redux-simple-router'
// import {login, logout} from '../actions'

import IsAuthed from 'containers/IsAuthed'
import IsAdmin from 'containers/IsAdmin'
import remote from '../remote'

class AppIconMenu extends React.Component {
  render() {
    const button = this.props.userProfile &&
      <Avatar src={this.props.userProfile.profileImageURL}/> ||
      <IconButton><MoreVertIcon color='white'/></IconButton>
    return (
      <IconMenu
        iconButtonElement={button}
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
          <MenuItem primaryText="Sign In" onClick={ ()=> this.props.login('google') } />
        </IsAuthed>
      </IconMenu>
    );
  }
}

import { Profiles } from 'remote'
import { createSelector } from 'reselect'

const mapStateToProps = createSelector(
  Profiles.select.authed,
  (userProfile)=>{ return {userProfile} }
)

const mapDispatchToProps = {
  login: remote.auth.login,
  logout: remote.auth.logout,
  pushPath
}

export default connect(mapStateToProps,mapDispatchToProps)(AppIconMenu);
