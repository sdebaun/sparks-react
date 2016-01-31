import React from 'react';

import FlatButton from 'material-ui/lib/flat-button'
import PersonAddIcon from 'material-ui/lib/svg-icons/social/person-add';

import PopupListItem from 'components/PopupListItem'
import InviteForm from 'containers/Invite/InviteForm'

class LeadInviteListItem extends React.Component {
  save = (data)=>{
    if (data) this.props.create(this.props.teamKey,this.props.userProfileKey,data)
    this.refs.listItem.close()
  }

  cancel = ()=>{ this.refs.listItem.close() }

  render() {
    return (
      <PopupListItem ref='listItem' primaryText='Invite Lead'
        secondaryText='Invite someone to run this team.'
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
import { Leads, Users } from 'remote'

const mapState = createSelector(
  Users.select.authed,
  (userProfileKey)=>{ return {userProfileKey} }
)

const mapDispatch = {
  create: Leads.actions.create
}

export default connect(mapState, mapDispatch)(LeadInviteListItem);
