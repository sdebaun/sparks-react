import React from 'react';
import { connect } from 'react-redux';

import ListItem from 'material-ui/lib/lists/list-item'
import { pushPath } from 'redux-simple-router'
import Colors from 'material-ui/lib/styles/colors';

class NavListItem extends React.Component {
  render() {
    const isActive = this.props.location && (this.props.location.pathname==this.props.targetRoute) ||
      this.props.activeFor && this.props.activeFor.reduce( (acc,val)=>(
        acc || (this.props.location.pathname == this.props.targetRoute + val)
      ),false)
    const selectedStyle =  isActive && {borderLeft:'0.5em solid',borderColor:Colors.amber700} || {}
    return <ListItem {...this.props} style={selectedStyle} onTouchTap={()=>this.props.pushPath(this.props.targetRoute)}/>
  }
}

const mapStateToProps = ()=>{return {}}

function mapDispatchToProps(dispatch) {
  return {
    pushPath: (...args)=>dispatch(pushPath(...args))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(NavListItem);
