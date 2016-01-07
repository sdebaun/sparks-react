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

import { Link } from 'react-router';
import { pushPath } from 'redux-simple-router'

class AppIconMenu extends React.Component {
  
  render() {
    const dispatch = this.props.dispatch

    return (
      <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        >
          <MenuItem primaryText="Home" onClick={ ()=> dispatch(pushPath('/dash')) } />
          <MenuItem primaryText="Sign out" onClick={ ()=> dispatch(pushPath('/')) } />
      </IconMenu>
    );
  }

}

AppIconMenu.defaultProps = {
};

AppIconMenu.childContextTypes = {
  muiTheme: React.PropTypes.object
};

function mapStateToProps(state) {
  const props = { auth: state.auth };
  return props;
}

export default connect(mapStateToProps)(AppIconMenu);
