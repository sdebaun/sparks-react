require('normalize.css');
require('styles/app.styl');

import React from 'react';

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import Theme from '../theme'

import Auth from './Auth'
import IsAuthed from './IsAuthed'
import User from './User'

import DevTools from 'components/DevTools'


class App extends React.Component {
  
  render() {
    return (
      <div style={{display:'flex',flexDirection:'row'}}>
        <div className="index" style={{flex:1}}>
          <Auth/>
          <IsAuthed><User/></IsAuthed>
          {this.props.children}
        </div>
        <div id="tools">
          <DevTools/>
        </div>
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
