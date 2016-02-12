import React from 'react';

import FlatButton from 'material-ui/lib/flat-button'
import PersonAddIcon from 'material-ui/lib/svg-icons/social/person-add';

import PopupListItem from 'components/PopupListItem'
import InviteForm from 'containers/Invite/InviteForm'

class OrganizerInviteListItem extends React.Component {
  save = (data)=>{
    if (data) this.props.create(this.props.projectKey,this.props.userProfileKey,data)
    this.refs.listItem.close()
  }

  cancel = ()=>{ this.refs.listItem.close() }

  render() {
    return (
      <PopupListItem ref='listItem' primaryText='Invite Organizer'
        secondaryText='Invite someone to run this project.'
        leftIcon={<PersonAddIcon/>}
        >
        <InviteForm onSubmit={this.save}>
          <FlatButton onTouchTap={this.cancel} label='Not Yet' primary={true}/>
        </InviteForm>
      </PopupListItem>
    )
  }

}

import { connect } from 'react-redux';
import { createSelector } from 'reselect'
import { Organizers, Users } from 'remote'

const mapState = createSelector(
  Users.select.authed,
  (userProfileKey)=>{ return {userProfileKey} }
)

const mapDispatch = {
  create: Organizers.actions.create
}

export default connect(mapState, mapDispatch)(OrganizerInviteListItem);
