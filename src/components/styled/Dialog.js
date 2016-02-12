import React from 'react';

import Dialog from 'material-ui/lib/dialog'
import AppBar from 'material-ui/lib/app-bar'
import IconButton from 'material-ui/lib/icon-button';
import Colors from 'material-ui/lib/styles/colors';

// title={title} modal={false} open={open} onRequestClose={this.close}

class StyledDialog extends React.Component {
  render() {
    const {props:{title,leftIcon,open,onRequestClose}} = this
    const appBar = (
      <AppBar title={title} style={{backgroundColor:Colors.amber700}}
      iconElementLeft={<IconButton disabled={true}>{React.cloneElement(leftIcon,{color:'white'})}</IconButton>}
      />
    )
    return (
      <Dialog modal={false} title={appBar} {...{open,onRequestClose}}>
        { this.props.children }
      </Dialog>
    )
  }
}

export default StyledDialog
