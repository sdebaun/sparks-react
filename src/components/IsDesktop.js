import React from 'react';

import MediaQuery from 'react-responsive'

class IsDesktop extends React.Component {
  render() {
    return (<MediaQuery minWidth={480}>{this.props.children}</MediaQuery>)
  }
}

export default IsDesktop;
