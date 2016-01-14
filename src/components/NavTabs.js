import React from 'react';
import { connect } from 'react-redux';

import Tabs from 'material-ui/lib/tabs/tabs'
import { pushPath } from 'redux-simple-router'

class NavTabs extends React.Component {
  render() {
    return (
      <Tabs>
      { React.Children.map( this.props.children, (c)=> React.cloneElement(c,{onActive:tab=>this.props.pushPath(tab.props.route)}) ) }
      </Tabs>
    )
  }
}

const mapStateToProps = ()=>{return {}}

function mapDispatchToProps(dispatch) {
  return {
    pushPath: (...args)=>dispatch(pushPath(...args))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(NavTabs);
