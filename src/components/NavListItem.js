import React from 'react';
import { connect } from 'react-redux';

import ListItem from 'material-ui/lib/lists/list-item'
import { pushPath } from 'redux-simple-router'

class NavListItem extends React.Component {
  render() {
    return <ListItem {...this.props} onTouchTap={()=>this.props.pushPath(this.props.route)}/>
  }
}

const mapStateToProps = ()=>{return {}}

function mapDispatchToProps(dispatch) {
  return {
    pushPath: (...args)=>dispatch(pushPath(...args))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(NavListItem);
