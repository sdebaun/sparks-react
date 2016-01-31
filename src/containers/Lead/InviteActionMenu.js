import React from 'react';

import ActionMenu from 'components/ActionMenu'
import MenuItem from 'material-ui/lib/menus/menu-item';

export default class LeadActionMenu extends React.Component {

  remove() {}

  render() {
    const {props: {acceptUrl, $key, ...props}} = this
    return (
      <ActionMenu {...props}>
        <MenuItem href={acceptUrl} target='new'>Preview</MenuItem>
        <MenuItem disabled={true} onTouchTap={this.remove}>Revoke</MenuItem>
      </ActionMenu>
    )
  }
}