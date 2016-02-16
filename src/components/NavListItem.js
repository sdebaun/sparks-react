import React from 'react';
import { connect } from 'react-redux';

import ListItem from 'material-ui/lib/lists/list-item'
import { pushPath } from 'redux-simple-router'
import Colors from 'material-ui/lib/styles/colors';

const isActive = (location,targetRoute,activeFor)=>
  location && (location.pathname==targetRoute) || (
    activeFor && activeFor.reduce( (acc,val)=>(acc||(location.pathname==targetRoute+val)),false)
    )

const activeStyle = {borderLeft:'0.5em solid',borderColor:Colors.amber700}

const NavListItem = ({targetRoute, location, activeFor, pushPath, ...props})=> targetRoute &&
  <ListItem {...props} style={isActive(location,targetRoute,activeFor) && activeStyle || {}}
    onTouchTap={()=>pushPath(targetRoute)}/> ||
  <ListItem {...props}/>

const mapState = ()=>{return {}}

const mapDispatch = { pushPath }

export default connect(mapState,mapDispatch)(NavListItem);
