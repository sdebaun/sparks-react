import React from 'react';

import ActionMenu from 'components/ActionMenu'
import MenuItem from 'material-ui/lib/menus/menu-item';

class OrganizerActionMenu extends React.Component {

  handleRemove() {}

  render() {
    const {organizer} = this.props
    return (
      <ActionMenu {...this.props}>
        <MenuItem href={'/profile/' + organizer.profileKey} target='new'>Profile</MenuItem>
        <MenuItem disabled={true} onTouchTap={this.handleRemove}>Remove</MenuItem>
      </ActionMenu>
    )
  }
}

export default OrganizerActionMenu


