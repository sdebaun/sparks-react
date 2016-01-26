import React from 'react';

import List from 'material-ui/lib/lists/list'
import ListItemHeader from './ListItemHeader'

export default class TeamHeader extends React.Component {
  render() {
    const {props:{header,rightIcon,children}, ...props} = this
    return (
      <List style={{paddingTop:0}} {...props}>
        {header && <ListItemHeader primaryText={header} rightIcon={rightIcon}/>}
        { children }
      </List>
    )
  }
}
