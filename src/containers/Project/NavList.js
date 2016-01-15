import React from 'react';

import List from 'material-ui/lib/lists/list';
import NavListItem from 'components/NavListItem'

class NavList extends React.Component {
  render() {
    return (
      <List>
        <NavListItem primaryText="At a Glance" route={this.props.baseUrl}/>
        <NavListItem primaryText="Manage" route={this.props.baseUrl+'/manage'}/>
      </List>
    )
  }
}

export default (NavList);
