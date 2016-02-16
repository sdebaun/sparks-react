import React from 'react';

import ListItem from 'material-ui/lib/lists/list-item'

import Colors from 'material-ui/lib/styles/colors';

const style = {
  backgroundColor: Colors.grey500,
  color: 'white',
  fontSize: '1.2em',
  fontWeight: 'bold',
  textTransform: 'uppercase'
}

export default (props)=> <ListItem style={style} {...props}/>
