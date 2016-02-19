import React from 'react';

import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Avatar from 'material-ui/lib/avatar';

// if this is stateless function, material-ui complains, but it still works
class MenuIcon extends React.Component {
  render() {
    const {props:{userProfile,...props}} = this
    return userProfile &&
      <Avatar src={userProfile.profileImageURL} {...props}/> ||
      <IconButton {...props}><MoreVertIcon color='white'/></IconButton>
  }
}

const AppIconMenu = ({userProfile,pushPath,login,logout})=>
  <IconMenu iconButtonElement={<MenuIcon {...{userProfile}}/>}>
    { userProfile &&
      <div>
        <MenuItem primaryText="Home" onClick={ ()=> pushPath('/dash') } />
        <MenuItem primaryText="Sign out" onClick={ ()=> logout() } />
        { userProfile.isAdmin &&
          <MenuItem primaryText="Admin" onClick={ ()=> pushPath('/admin') } />
        }
      </div> ||
      <MenuItem primaryText="Sign In" onClick={ ()=> login('google') } />
    }
  </IconMenu>

import { connect } from 'react-redux';
import { createSelector } from 'reselect'
import remote from '../remote'
import { pushPath } from 'redux-simple-router'
import { Profiles } from 'remote'

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
