require('normalize.css');
// require('styles/App.css');

import React from 'react';
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/lib/raised-button'
import AppBar from 'material-ui/lib/app-bar'

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

  render() {
    const dispatch = this.props.dispatch

    return (
      <div className="index">
        <AppBar title='Dash' showMenuIconButton={false}/>
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
  /* Populated by react-webpack-redux:reducer */
  const props = { auth: state.auth };
  return props;
}

export default connect(mapStateToProps)(Dash);
