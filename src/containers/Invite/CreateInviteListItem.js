import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect'

// import RaisedButton from 'material-ui/lib/raised-button'
import FlatButton from 'material-ui/lib/flat-button'
import Dialog from 'material-ui/lib/dialog'

// import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
// import TextField from 'material-ui/lib/text-field'

import AddCircleIcon from 'material-ui/lib/svg-icons/content/add-circle';

// import Query from 'containers/Query'
// import NavListItem from 'components/NavListItem'
import InviteForm from 'containers/Invite/InviteForm'

// import { pushPath } from 'redux-simple-router'

class CreateInviteListItem extends React.Component {
  state = { open: false }
  handleOpen = ()=> this.setState({open:true})
  handleClose = ()=> this.setState({open:false})
  handleSubmit = data => {
    if (data) this.props.create(data,this.props.projectKey,this.props.userProfileKey)
    this.handleClose()
  }

  render() {
    return (
          <ListItem primaryText='Invite Organizer'
            secondaryText='Invite another person to help you manage this project.'
            leftIcon={<AddCircleIcon/>}
            onTouchTap={this.handleOpen}>
            <Dialog title='Who Are You Inviting?'
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
              >
              <InviteForm onSubmit={this.handleSubmit}>
                <FlatButton onTouchTap={this.handleClose} label='CANCEL' secondary={true}/>
              </InviteForm>
            </Dialog>
          </ListItem>
    );
  }

}

import { Invites, Users } from 'remote'

const mapStateToProps = createSelector(
  Users.select.authed,
  (userProfileKey)=>{
    return {userProfileKey}
  }
)

const mapDispatchToProps = {
  create: Invites.actions.create,
  push: Invites.actions.push
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateInviteListItem);
