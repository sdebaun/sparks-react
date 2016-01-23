import React from 'react';
import { connect } from 'react-redux';

import FlatButton from 'material-ui/lib/flat-button'
import Dialog from 'material-ui/lib/dialog'

import ListItem from 'material-ui/lib/lists/list-item'

import AddCircleIcon from 'material-ui/lib/svg-icons/content/add-circle';

import ProjectForm from 'containers/Project/ProjectForm'

class PopupListItem extends React.Component {
  state = { open: false }

  open = ()=> this.setState({open:true})

  close = ()=> this.setState({open:false})

  render() {
    const {state:{open}, props:{primaryText,secondaryText,leftIcon}} = this
    return (
      <ListItem onTouchTap={this.open} {...{primaryText,secondaryText,leftIcon}} >
        <Dialog title={primaryText} modal={false} open={open} onRequestClose={this.close}>
          {this.props.children}
        </Dialog>
      </ListItem>
    );
  }

}

export default PopupListItem;
