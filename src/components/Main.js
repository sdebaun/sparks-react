require('normalize.css');
// require('styles/App.css');

import React from 'react';

import RaisedButton from 'material-ui/lib/raised-button'
import AppBar from 'material-ui/lib/app-bar'

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import Theme from '../theme'

class Main extends React.Component {
  
  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(Theme)
    }
  }
  render() {
    return (
      <div className="index">
        <AppBar title='Title' showMenuIconButton={false}/>
        <RaisedButton label='Test'/>
      </div>
    );
  }
}

Main.defaultProps = {
};

Main.childContextTypes = {
  muiTheme: React.PropTypes.object
};

export default Main;
