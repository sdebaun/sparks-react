// require('normalize.css');
// require('styles/App.css');

import React from 'react';

// import RaisedButton from 'material-ui/lib/raised-button'
import AppBar from 'material-ui/lib/app-bar'

import { Link } from 'react-router';

import AppIconMenu from '../components/AppIconMenu';

class Landing extends React.Component {
  
  render() {
    return (
      <div className="landing">
        <div className="container">
          sparks logo
          <AppIconMenu/>
        </div>
        <h1 className="container">
          Doing is Living.
        </h1>
        <h2 className="container">
          Get Involved Now!
        </h2>
        <div className="container">
          About the Sparks.Network
        </div>
        <Link to='/dash'>Dash</Link>
      </div>
    );
  }

}

Landing.defaultProps = {
};

Landing.childContextTypes = {
  muiTheme: React.PropTypes.object
};

export default Landing;
