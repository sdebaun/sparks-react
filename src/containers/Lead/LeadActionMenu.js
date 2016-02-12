import React from 'react';

import ActionMenu from 'components/ActionMenu'
import MenuItem from 'material-ui/lib/menus/menu-item';

export default class LeadActionMenu extends React.Component {

  remove() {}

  render() {
    const {props: {profileKey, ...props}} = this
    return (
      <ActionMenu {...props}>
        <MenuItem href={'/profile/' + profileKey} target='new'>Profile</MenuItem>
        <MenuItem disabled={true} onTouchTap={this.remove}>Remove</MenuItem>
      </ActionMenu>
    )
  }
}