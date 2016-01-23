import React from 'react';
import { connect } from 'react-redux';

import FlatButton from 'material-ui/lib/flat-button'
import FloatingActionButton from 'material-ui/lib/floating-action-button'
// import Dialog from 'material-ui/lib/dialog'
import Dialog from 'components/styled/Dialog'

import ListItem from 'material-ui/lib/lists/list-item'

import AddIcon from 'material-ui/lib/svg-icons/content/add';

import ProjectForm from 'containers/Project/ProjectForm'

import AppBar from 'material-ui/lib/app-bar'
import Colors from 'material-ui/lib/styles/colors';

class PopupListItem extends React.Component {
  state = { isOpen: false }

  open = ()=> this.setState({isOpen:true})

  close = ()=> this.setState({isOpen:false})
// <FloatingActionButton seconary={true} mini={true}><PersonAddIcon/></FloatingActionButton>

  render() {
    const {state:{isOpen}, props:{primaryText,secondaryText,leftIcon}} = this
    const fabIcon = <FloatingActionButton mini={true}>{leftIcon}</FloatingActionButton>
    return (
      <ListItem onTouchTap={this.open} {...{primaryText,secondaryText,leftIcon:fabIcon}} >
        <Dialog modal={false} open={isOpen} onRequestClose={this.close} {...{title:primaryText,leftIcon}}>
          {this.props.children}
        </Dialog>
      </ListItem>
    );
  }

}

export default PopupListItem;
