import React from 'react';
import CircularProgress from 'material-ui/lib/circular-progress'
import ListItem from 'material-ui/lib/lists/list-item'

export default ()=>
  <ListItem primaryText="..." leftAvatar={<CircularProgress size={1}/>}/>
