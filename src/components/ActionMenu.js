import React from 'react';

import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import Colors from 'material-ui/lib/styles/colors';

const iconButton = <IconButton touch={true}><MoreVertIcon color={Colors.grey400} /></IconButton>

class Component extends React.Component {
  render() {
    return <IconMenu iconButtonElement={iconButton} {...this.props}>{this.props.children}</IconMenu>
  }
}

export default Component