import React, {Children, cloneElement} from 'react';
import { connect } from 'react-redux';

import Tabs from 'material-ui/lib/tabs/tabs'
import { pushPath } from 'redux-simple-router'

const style = {
  fontSize: '1.1em'
}

class NavTabs extends React.Component {
  handleChange = (value)=>{
    console.log('switching to ' + value)
    this.props.pushPath(value)
  }

  render() {
    const {baseUrl, route, path, children} = this.props
    const targetRoute = baseUrl + route

    return (
      <Tabs {...this.props} value={path} onChange={this.handleChange}>
      { Children.map( children, (c)=>cloneElement(c,{style, value:baseUrl+c.props.route}) ) }
      </Tabs>
    )
  }
}

    // return (
    //   <Tabs {...this.props}>
    //   { React.Children.map( this.props.children, (c)=>{
    //       return React.cloneElement(c,{style:tabStyle, value:baseUrl + tab.props.route, onActive:tab=>this.props.pushPath(baseUrl + tab.props.route)})
    //       }
    //     )
    //   }
    //   </Tabs>
    // )

NavTabs.defaultProps = {baseUrl:''}

const mapStateToProps = (state)=>{ return {path: state.routing.path} }

function mapDispatchToProps(dispatch) {
  return {
    pushPath: (...args)=>dispatch(pushPath(...args))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(NavTabs);
