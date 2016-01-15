import React from 'react';
import { connect } from 'react-redux';

import Tabs from 'material-ui/lib/tabs/tabs'
import { pushPath } from 'redux-simple-router'

class NavTabs extends React.Component {
  render() {
    const {baseUrl} = this.props

    return (
      <Tabs {...this.props}>
      { React.Children.map( this.props.children, (c)=>{
          return React.cloneElement(c,{onActive:tab=>this.props.pushPath(baseUrl + tab.props.route)})
          }
        )
      }
      </Tabs>
    )
  }
}

NavTabs.defaultProps = {baseUrl:''}

const mapStateToProps = ()=>{return {}}

function mapDispatchToProps(dispatch) {
  return {
    pushPath: (...args)=>dispatch(pushPath(...args))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(NavTabs);
