import React from 'react';

import MediaQuery from 'react-responsive'

class IsMobile extends React.Component {
  render() {
    return (<MediaQuery maxWidth={480}>{this.props.children}</MediaQuery>)
  }
}

export default IsMobile;
