import React from 'react';

import AppBar from 'material-ui/lib/app-bar'
import AppIconMenu from 'components/AppIconMenu';
import HeaderLogo from 'components/HeaderLogo'

class MainBar extends React.Component {
  render() {
    return (
      <AppBar style={{display:'flex',alignItems:'center'}} iconElementRight={<AppIconMenu/>} iconElementLeft={
        <div style={{display:'flex',alignItems:'center'}}><HeaderLogo linkTo='/dash'/></div>
        }/>
    );
  }
}

export default MainBar;
