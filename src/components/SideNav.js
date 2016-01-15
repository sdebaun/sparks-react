import React from 'react';

import IsMobile from 'components/IsMobile'
import IsDesktop from 'components/IsDesktop'
import NavPopout from 'components/NavPopout'

class SideNav extends React.Component {
  render() {
    return (
      <div>
        <IsMobile>
          <NavPopout>{ this.props.children }</NavPopout>
        </IsMobile>
        <IsDesktop>
          <div style={{width:256}}>{this.props.children}</div>
        </IsDesktop>
      </div>
    );
  }
}

export default SideNav;
