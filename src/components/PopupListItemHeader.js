import React from 'react';

import FAB from 'material-ui/lib/floating-action-button'
import ListItemHeader from 'components/styled/ListItemHeader'

import Dialog from 'components/styled/Dialog'

export default class Component extends React.Component {
  state = { isOpen: false }

  open = ()=> this.setState({isOpen:true})

  close = ()=> this.setState({isOpen:false})

  render() {
    const {state:{isOpen}, props:{primaryText,secondaryText,rightIcon}} = this
    const fabIcon = <FAB mini={true} style={{marginTop:6,marginLeft:0,marginRight:18}}>{rightIcon}</FAB>
    return (
      <ListItemHeader onTouchTap={this.open} {...{primaryText,secondaryText,rightIcon:fabIcon}} >
        <Dialog modal={false} open={isOpen} onRequestClose={this.close} {...{title:primaryText,leftIcon:rightIcon}}>
          {this.props.children}
        </Dialog>
      </ListItemHeader>
    );
  }

}