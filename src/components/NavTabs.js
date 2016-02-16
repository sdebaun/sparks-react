import React, {Children, cloneElement} from 'react';
import { connect } from 'react-redux';

import Tabs from 'material-ui/lib/tabs/tabs'
import { pushPath } from 'redux-simple-router'

const style = {
  fontSize: '1.1em'
}

const NavTabs = ({baseUrl,path,children,pushPath,...props})=>
  <Tabs {...props} value={path} onChange={(value)=>pushPath(value)}>
    { Children.map( children, (c)=>cloneElement(c,{style, value:baseUrl+c.props.route}) ) }
  </Tabs>

const mapState = (state)=>{ return {path: state.routing.path} }

const mapDispatch = { pushPath }

export default connect(mapState,mapDispatch)(NavTabs);
