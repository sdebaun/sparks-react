require('normalize.css');
require('styles/app.styl');

import React from 'react';

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
