import React from 'react';

import List from 'material-ui/lib/lists/list';
import NavListItem from 'components/NavListItem'

class ProjectNavList extends React.Component {
  render() {
    return (
      <List>
        <NavListItem primaryText="At a Glance" activeFor={['/staff','/history']} targetRoute={this.props.baseUrl} {...this.props}/>
        <NavListItem primaryText="Manage" activeFor={['/exchange','/applying']} targetRoute={this.props.baseUrl+'/manage'} {...this.props}/>
      </List>
    )
  }
}

export default (ProjectNavList);
