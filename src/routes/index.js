import React from 'react';

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import Theme from '../theme'

import Auth from 'containers/Auth'
import DevTools from 'components/DevTools'

class App extends React.Component {
  static childContextTypes = {
    muiTheme: React.PropTypes.object
  }

  getChildContext() {
    return { muiTheme: ThemeManager.getMuiTheme(Theme) }
  }

  render() {
    return (
      <div className="index" style={{flex:1}}>
        <Auth/>
        {this.props.children}
        <DevTools/>
      </div>
    );
  }
}

import Landing from './Landing'
import Dash from './Dash'
import Admin from './Admin'
import Project from './Project'
import ConfirmProfile from './ConfirmProfile'
import AcceptInvite from './AcceptInvite'

export default {
  path: '/',
  component: App,
  indexRoute: Landing,
  childRoutes: [ Admin, Dash, Project, ConfirmProfile, AcceptInvite ]
}

  // childRoutes: [ DashRoutes, AdminRoutes, ProjectRoutes, ProjectInviteRoutes, ConfirmProfileRoutes ]
