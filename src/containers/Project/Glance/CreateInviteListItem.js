import React from 'react';
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/lib/raised-button'
import Dialog from 'material-ui/lib/dialog'

import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import TextField from 'material-ui/lib/text-field'

import AddCircleIcon from 'material-ui/lib/svg-icons/content/add-circle';

import Query from 'containers/Query'
import NavListItem from 'components/NavListItem'
import InviteForm from 'containers/Project/Glance/InviteForm'

import { pushPath } from 'redux-simple-router'

class CreateInviteListItem extends React.Component {
  state = { open: false }
  handleOpen = ev => this.setState({open:true})
  handleClose = ev => this.setState({open:false})
  handleSubmit = data => {
    if (data) this.props.invitePush(Object.assign(data,{projectKey:this.props.projectKey}))
    this.handleClose()
  }

  render() {
    return (
          <ListItem primaryText='Invite a Staff Member'
            secondaryText='Add Owners or Admins to help run everything.'
            leftIcon={<AddCircleIcon/>}
            onTouchTap={this.handleOpen}>
            <Dialog title='Invite New Staff'
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
              >
              <InviteForm onSubmit={this.handleSubmit}>
              </InviteForm>
            </Dialog>
          </ListItem>
    );
  }

}

import { Invites } from '../../../remote'

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    invitePush: (...args)=>dispatch(Invites.push(...args)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateInviteListItem);
