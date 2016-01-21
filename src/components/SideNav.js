import React from 'react';

import IsMobile from 'components/IsMobile'
import IsDesktop from 'components/IsDesktop'
import NavPopout from 'components/NavPopout'
import Paper from 'material-ui/lib/paper';

class SideNav extends React.Component {
  render() {
    return (
      <div style={{height:'100%'}}>
        <IsMobile>
          <NavPopout>{ this.props.children }</NavPopout>
        </IsMobile>
        <IsDesktop>
          <Paper style={{height:'100%', width:256}}>{this.props.children}</Paper>
        </IsDesktop>
      </div>
    );
  }
}

export default SideNav;
