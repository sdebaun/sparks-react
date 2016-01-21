import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect'

// import RaisedButton from 'material-ui/lib/raised-button'
import FlatButton from 'material-ui/lib/flat-button'
import Dialog from 'material-ui/lib/dialog'

// import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
// import TextField from 'material-ui/lib/text-field'
import IconButton from 'material-ui/lib/icon-button';
import AddCircleIcon from 'material-ui/lib/svg-icons/content/add-circle';
import PersonAddIcon from 'material-ui/lib/svg-icons/social/person-add';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
// import Query from 'containers/Query'
// import NavListItem from 'components/NavListItem'
import InviteForm from 'containers/Invite/InviteForm'

import AppBar from 'material-ui/lib/app-bar'
import Colors from 'material-ui/lib/styles/colors';

class CreateInviteListItem extends React.Component {
  state = { open: false }
  handleOpen = ()=> this.setState({open:true})
  handleClose = ()=> this.setState({open:false})
  handleSubmit = data => {
    if (data) this.props.create(data,this.props.projectKey,this.props.userProfileKey)
    this.handleClose()
  }

  render() {

    const tb = <AppBar title='Invite an Admin' style={{backgroundColor:Colors.amber700}}
      iconElementLeft={<IconButton disabled={true}><PersonAddIcon color='white'/></IconButton>}
      />

    return (
          <ListItem primaryText='Invite Organizer'
            secondaryText='Invite another person to help you manage this project.'
            leftIcon={<FloatingActionButton mini={true}><PersonAddIcon/></FloatingActionButton>}
            onTouchTap={this.handleOpen}>
            <Dialog title={tb}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
              >
              <InviteForm onSubmit={this.handleSubmit}>
                <FlatButton onTouchTap={this.handleClose} label='Not Yet' primary={true}/>
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
