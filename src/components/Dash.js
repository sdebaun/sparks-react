require('normalize.css');
// require('styles/App.css');

import React from 'react';
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/lib/raised-button'
import AppBar from 'material-ui/lib/app-bar'
import Tabs from 'material-ui/lib/tabs/tabs'
import Tab from 'material-ui/lib/tabs/tab'
import IconButton from 'material-ui/lib/icon-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/lib/menus/menu-item';

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import Theme from '../theme'

import { Link } from 'react-router';
import { pushPath } from 'redux-simple-router'

class Dash extends React.Component {
  
  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(Theme)
    }
  }

  handleChange(val) {
    console.log("New tab val", val);
  }

  render() {
    const dispatch = this.props.dispatch

    return (
      <div className="index">
        <AppBar title='Dash'
          showMenuIconButton={false} 
          iconElementRight={<IconMenu
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <MenuItem primaryText="Refresh" />
              <MenuItem primaryText="Help" />
              <MenuItem primaryText="Sign out" />
            </IconMenu>} />
        <Tabs value={1} onChange={this.handleChange}>
          <Tab label='hello' value={0} onChange={this.handleChange}><div>foo</div></Tab>
          <Tab label='world' value={1} onChange={this.handleChange}><div>bar</div></Tab>
        </Tabs>
        <RaisedButton label='Go Main' onClick={ ()=> dispatch(pushPath('/')) } />
      </div>
    );
  }

}

Dash.defaultProps = {
};

Dash.childContextTypes = {
  muiTheme: React.PropTypes.object
};

function mapStateToProps(state) {
  const props = { auth: state.auth };
  return props;
}

export default connect(mapStateToProps)(Dash);
