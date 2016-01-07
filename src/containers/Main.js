require('normalize.css');
require('styles/app.styl');

import React from 'react';

// import RaisedButton from 'material-ui/lib/raised-button'
import AppBar from 'material-ui/lib/app-bar'

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import Theme from '../theme'

import { Link } from 'react-router';

class Main extends React.Component {
  
  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(Theme)
    }
  }
  render() {
    return (
      <div className="index">
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

export default Main;
