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
import Theme from '../../theme'

import { Link } from 'react-router';
import { pushPath } from 'redux-simple-router'

import AppIconMenu from '../../components/AppIconMenu';

class Main extends React.Component {
  
  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(Theme)
    }
  }

  render() {
    const dispatch = this.props.dispatch

    return (
      <div className="index">
        <AppBar title='Dash' showMenuIconButton={false} iconElementRight={<AppIconMenu/>} />
        <Tabs>
          <Tab label='Finding' route='/dash' onActive={ tab=>dispatch(pushPath(tab.props.route)) }/>
          <Tab label='Doing' route='/dash/doing' onActive={ tab=>dispatch(pushPath(tab.props.route)) } />
        </Tabs>
        {this.props.children}
      </div>
    );
  }

}

Main.defaultProps = {
};

Main.childContextTypes = {
  muiTheme: React.PropTypes.object
};

function mapStateToProps(state) {
  const props = { auth: state.auth };
  return props;
}

export default connect(mapStateToProps)(Main);
