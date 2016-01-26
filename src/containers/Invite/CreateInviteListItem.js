import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect'

import FlatButton from 'material-ui/lib/flat-button'
import PersonAddIcon from 'material-ui/lib/svg-icons/social/person-add';

import PopupListItem from 'components/PopupListItem'
import InviteForm from 'containers/Invite/InviteForm'

class CreateInviteListItem extends React.Component {
  save = (data)=>{
    if (data) this.props.create(data,this.props.projectKey,this.props.userProfileKey)
    this.refs.listItem.close()
  }

  cancel = ()=>{ this.refs.listItem.close() }

  render() {
    return (
      <PopupListItem ref='listItem' primaryText='Invite Organizer'
        secondaryText='Invite another person to help you manage this project.'
        leftIcon={<PersonAddIcon/>}
        >
        <InviteForm onSubmit={this.save}>
          <FlatButton onTouchTap={this.cancel} label='Not Yet' primary={true}/>
        </InviteForm>
      </PopupListItem>
    )
  }

}

import { Invites, Users } from 'remote'

const mapStateToProps = createSelector(
  Users.select.authed,
  (userProfileKey)=>{ return {userProfileKey} }
)

const mapDispatchToProps = {
  create: Invites.actions.create
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateInviteListItem);
