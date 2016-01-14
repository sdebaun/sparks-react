// require('normalize.css');
// require('styles/App.css');
require('styles/landing.styl');

import React from 'react';

// import RaisedButton from 'material-ui/lib/raised-button'
// import AppBar from 'material-ui/lib/app-bar'

// import { Link } from 'react-router';

import AppIconMenu from '../components/AppIconMenu';

class Landing extends React.Component {
  
  render() {
    return (
      <div id='landing'>
        <div id='hook'>
          <div className='row'>
            <img src='/images/sn-logo-32.png'/>
            <AppIconMenu/>
          </div>
          <h1 className="container">
            Doing is Living.
          </h1>
        </div>
        <div id='promise'>
          <h2 className="container">
            Get Involved Now!
          </h2>
        </div>
        <div id='more-heart'></div>
        <div id='benefits'>
          <div className='container'>
            <h3>
            Get invited to volunteer opportunities from all over the world by joining the <b>sparks.network</b>.
            </h3>

            <ul>
              <li className='sn-icon flag'>
                <b>Have new experiences</b> by participating in lots of different events and groups.
              </li>
              <li className='sn-icon mountains'>
                <b>Get rewarded</b> by the people you help with cool gifts and perks.
              </li>
              <li className='sn-icon first'>
                <b>Be recognized</b> for your contributions with Karma, Accomplishments, and Triumphs.
              </li>
            </ul>
          </div>
        </div>
        <div id='cta'>
          <div className='container'>
            <h4>
              Sign Up For
              <br/>
              The Sparks Network!
            </h4>
          </div>
        </div>

        <div id='footer'>
          <div className='links container'>
            <div>
              <h5>Contact</h5>
              <ul>
              <li><a href=''>Support</a></li>
              <li><a href=''>Business</a></li>
              <li><a href=''>Press</a></li>
              <li><a href='mailto:info@sparks.network'>Info</a></li>
              </ul>
            </div>
            <div>
              <h5>About</h5>
              <ul>
              <li><a href=''>Mission</a></li>
              <li><a href=''>Now Hiring</a></li>
              <li><a href=''>Our Team</a></li>
              </ul>
            </div>
            <div>
              <h5>News</h5>
              <ul>
              <li><a href=''>Blog</a></li>
              <li><a href=''>Facebook</a></li>
              <li><a href=''>Twitter</a></li>
              </ul>
            </div>
          </div>
          <div className='container'>
            &copy; 2015 Sparks.Network
          </div>
        </div>
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
