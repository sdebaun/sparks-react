import React from 'react';
import { connect } from 'react-redux';

import ListItem from 'material-ui/lib/lists/list-item'
import { pushPath } from 'redux-simple-router'
import Colors from 'material-ui/lib/styles/colors';

class NavListItem extends React.Component {
  navigate = ()=>this.props.pushPath
  
  render() {
    const {targetRoute, location, activeFor} = this.props
    const isActive = location &&
      (location.pathname==targetRoute) ||
      activeFor &&
      activeFor.reduce( (acc,val)=>(acc||(location.pathname==targetRoute+val)),false)
    const selectedStyle =  isActive && {borderLeft:'0.5em solid',borderColor:Colors.amber700} || {}
    return targetRoute &&
      <ListItem {...this.props} style={selectedStyle} onTouchTap={()=>this.props.pushPath(this.props.targetRoute)}/> ||
      <ListItem {...this.props} style={selectedStyle}/>
  }
}

const mapStateToProps = ()=>{return {}}

const mapDispatchToProps = { pushPath }
export default connect(mapStateToProps,mapDispatchToProps)(NavListItem);
