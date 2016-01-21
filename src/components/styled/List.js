import React from 'react';

import List from 'material-ui/lib/lists/list'
import ListItemHeader from './ListItemHeader'

class StyledList extends React.Component {
  render() { return (
    <List {...this.props}>
      {this.props.header && <ListItemHeader primaryText={this.props.header}/>}
      { this.props.children }
    </List>
  ) }
}

export default StyledList
