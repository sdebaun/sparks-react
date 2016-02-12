import React, {Children, cloneElement} from 'react';
import { connect } from 'react-redux';

import Tabs from 'material-ui/lib/tabs/tabs'
import { pushPath } from 'redux-simple-router'

const style = {
  fontSize: '1.1em'
}

class NavTabs extends React.Component {
  static defaultProps = {baseUrl:''}

  navigate = (value)=>this.props.pushPath(value)

  render() {
    const {props:{baseUrl, path, children, ...props}} = this
    return (
      <Tabs {...props} value={path} onChange={this.navigate}>
      { Children.map( children, (c)=>cloneElement(c,{style, value:baseUrl+c.props.route}) ) }
      </Tabs>
    )
  }
}

const mapStateToProps = (state)=>{ return {path: state.routing.path} }

const mapDispatchToProps = { pushPath }

export default connect(mapStateToProps,mapDispatchToProps)(NavTabs);
