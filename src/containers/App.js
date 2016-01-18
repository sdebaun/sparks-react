require('normalize.css');
require('styles/app.styl');

import React from 'react';

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import Theme from '../theme'

import Auth from './Auth'
import IsAuthed from './IsAuthed'

import DevTools from 'components/DevTools'

class App extends React.Component {
  
  render() {
    return (
      <div>
        <div className="index" style={{flex:1}}>
          <Auth/>
          {this.props.children}
        </div>
        <DevTools/>
      </div>
    );
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(Theme)
    }
  }
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object
};

export default App;
