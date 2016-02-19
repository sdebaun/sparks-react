import React from 'react';

import List from 'material-ui/lib/lists/list'
import ListItemHeader from './ListItemHeader'

export default ({header,rightIcon,children})=>
  <List style={{paddingTop:0}}>
    {header && <ListItemHeader primaryText={header} rightIcon={rightIcon}/>}
    { children }
  </List>
