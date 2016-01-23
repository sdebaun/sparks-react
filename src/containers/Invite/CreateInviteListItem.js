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
// import AddCircleIcon from 'material-ui/lib/svg-icons/content/add-circle';
import PersonAddIcon from 'material-ui/lib/svg-icons/social/person-add';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
// import Query from 'containers/Query'
// import NavListItem from 'components/NavListItem'

import PopupListItem from 'components/PopupListItem'
import InviteForm from 'containers/Invite/InviteForm'

import AppBar from 'material-ui/lib/app-bar'
import Colors from 'material-ui/lib/styles/colors';

class CreateInviteListItem extends React.Component {
  save = (data)=>{
    if (data) this.props.create(data,this.props.projectKey,this.props.userProfileKey)
    this.refs.listItem.close()
  }

  cancel = ()=>{ this.refs.listItem.close() }

  render() {

    // const tb = <AppBar title='Invite an Admin' style={{backgroundColor:Colors.amber700}}
    //   iconElementLeft={<IconButton disabled={true}><PersonAddIcon color='white'/></IconButton>}
    //   />

// <FloatingActionButton seconary={true} mini={true}><PersonAddIcon/></FloatingActionButton>

    return (
          <PopupListItem ref='listItem' primaryText='Invite Organizer'
            secondaryText='Invite another person to help you manage this project.'
            leftIcon={<PersonAddIcon/>}
            >
            <InviteForm onSubmit={this.save}>
              <FlatButton onTouchTap={this.cancel} label='Not Yet' primary={true}/>
            </InviteForm>
          </PopupListItem>
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
