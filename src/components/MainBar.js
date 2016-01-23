import React from 'react';

import AppBar from 'material-ui/lib/app-bar'
import AppIconMenu from 'components/AppIconMenu'
import HeaderLogo from 'components/HeaderLogo'

export default class MainBar extends React.Component {
  static propTypes = {
    showMenu: React.PropTypes.bool
  }
  static defaultProps = {
    showMenu: true
  }
  render() {
    const { props: {showMenu} } = this
    return (
      <AppBar style={{display:'flex',alignItems:'center',minHeight:0}}
        iconElementRight={showMenu ? <AppIconMenu/> : <div/>}
        iconElementLeft={<div style={{display:'flex',alignItems:'center'}}><HeaderLogo linkTo='/dash'/></div>}
        />
    );
  }
}