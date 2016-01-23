import React from 'react';

import FAB from 'material-ui/lib/floating-action-button'
import ListItem from 'material-ui/lib/lists/list-item'

import Dialog from 'components/styled/Dialog'

export default class PopupListItem extends React.Component {
  state = { isOpen: false }

  open = ()=> this.setState({isOpen:true})

  close = ()=> this.setState({isOpen:false})

  render() {
    const {state:{isOpen}, props:{primaryText,secondaryText,leftIcon}} = this
    const fabIcon = <FAB mini={true}>{leftIcon}</FAB>
    return (
      <ListItem onTouchTap={this.open} {...{primaryText,secondaryText,leftIcon:fabIcon}} >
        <Dialog modal={false} open={isOpen} onRequestClose={this.close} {...{title:primaryText,leftIcon}}>
          {this.props.children}
        </Dialog>
      </ListItem>
    );
  }

}