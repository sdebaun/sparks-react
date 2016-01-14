import React from 'react';
import { connect } from 'react-redux';

import AppBar from 'material-ui/lib/app-bar'
import AppIconMenu from 'components/AppIconMenu';
import HeaderLogo from 'components/HeaderLogo'

class MainBar extends React.Component {
  render() {
    return (
      <AppBar className='row' iconElementLeft={<HeaderLogo linkTo='/dash'/>} iconElementRight={<AppIconMenu/>} />
    );
  }
}

export default MainBar;
