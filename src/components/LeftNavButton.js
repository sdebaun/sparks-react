import React from 'react';
import { connect } from 'react-redux';

import IconButton from 'material-ui/lib/icon-button'
import Menu from 'material-ui/lib/svg-icons/navigation/menu';

class LeftNavButton extends React.Component {
  render() {
    return (
      <IconButton><Menu color='white'/></IconButton>
    );
  }
}

export default LeftNavButton;
