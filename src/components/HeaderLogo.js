import React from 'react';

import { Link } from 'react-router';

class HeaderLogo extends React.Component {
  render() {
    return (
      <Link to={this.props.linkTo}><img src="/images/sn-logo-32.png"/></Link>
    );
  }
}

export default HeaderLogo;
