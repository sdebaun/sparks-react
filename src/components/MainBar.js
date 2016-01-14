import React from 'react';
import { connect } from 'react-redux';

import AppBar from 'material-ui/lib/app-bar'
import AppIconMenu from './AppIconMenu';
// // import Tabs from 'material-ui/lib/tabs/tabs'
// // import Tab from 'material-ui/lib/tabs/tab'
// import IconButton from 'material-ui/lib/icon-button';
// // import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
// import IconMenu from 'material-ui/lib/menus/icon-menu';
// import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
// import MenuItem from 'material-ui/lib/menus/menu-item';

import { Link } from 'react-router';
// import { pushPath } from 'redux-simple-router'
// import {login, logout} from '../actions'

// import IsAuthed from '../containers/IsAuthed'
// import IsUser from '../containers/IsUser'
// import IsAdmin from '../containers/IsAdmin'
// import remote from '../remote'

class MainBar extends React.Component {
  render() {
    return (
      <AppBar className='row' iconElementLeft={<Link to="/dash"><img src="/images/sn-logo-32.png"/></Link>} iconElementRight={<AppIconMenu/>} />
    );
  }
}

export default MainBar;
