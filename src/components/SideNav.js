import React from 'react';

import { findMatch } from 'react-flexr'

import NavPopout from 'components/NavPopout'

export default ({children})=> findMatch('palm') &&
  <NavPopout>{children}</NavPopout> ||
  <div style={{height:'100%', width:300}}>{children}</div>

// export default class SideNav extends React.Component {
//   render() {
//     return findMatch('palm') &&
//       <NavPopout>{ this.props.children }</NavPopout> ||
//       <div style={{height:'100%', width:300}}>{this.props.children}</div>
//   }
// }
