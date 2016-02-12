require('react-flexr/styles.css')

import React from 'react';
import {StyleRoot} from 'radium';

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import Theme from '../theme'

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
      <StyleRoot style={{height:'100%'}}>
        {this.props.children}
        <DevTools/>
      </StyleRoot>
    );
  }

}

import Landing from './Landing'
import Dash from './Dash'
import Admin from './Admin'
import Project from './Project'
import Opp from './Opp'
import Team from './Team'
import ConfirmProfile from './ConfirmProfile'
import Accept from './Accept'

export default {
  path: '/',
  component: App,
  indexRoute: Landing,
  childRoutes: [ Admin, Dash, Project, Team, ConfirmProfile, Accept, Opp ]
}
