import React, {Children, cloneElement} from 'react';
import { connect } from 'react-redux';

import Tabs from 'material-ui/lib/tabs/tabs'
import { pushPath } from 'redux-simple-router'

const style = {
  fontSize: '1.1em'
}

class NavTabs extends React.Component {
  static defaultProps = {baseUrl:''}

  handleChange = (value)=>this.props.pushPath(value)

  render() {
    const {baseUrl, path, children} = this.props
    return (
      <Tabs {...this.props} value={path} onChange={this.handleChange}>
      { Children.map( children, (c)=>cloneElement(c,{style, value:baseUrl+c.props.route}) ) }
      </Tabs>
    )
  }
}

const mapStateToProps = (state)=>{ return {path: state.routing.path} }

const mapDispatchToProps = { pushPath }

export default connect(mapStateToProps,mapDispatchToProps)(NavTabs);
