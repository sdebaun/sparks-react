import React from 'react'

import List from 'components/styled/List'
import CreateInviteListItem from 'containers/Invite/CreateInviteListItem'
import InviteListItem from 'containers/Invite/InviteListItem'
import ProfileListItem from 'containers/Profile/ProfileListItem'
import OrganizerActionMenu from 'containers/Organizer/OrganizerActionMenu'

const Container = ({ projectKey, invites, organizers })=>
  <div>
    <List><CreateInviteListItem projectKey={projectKey}/></List>
    { (invites.length > 0) &&
      <List header="Open Invites">
        {invites.map(i=><InviteListItem key={i.$key} invite={i} />)}
      </List>
    }
    { (organizers.length > 0) &&
      <List header='Organizers'>
        {organizers.map( o=>
          <ProfileListItem key={o.$key} profileKey={o.profileKey} secondaryText={o.authority}
            rightIconButton={<OrganizerActionMenu organizer={o}/>} />
        )}
      </List>
    }
  </div>

import { connect } from 'react-redux';
import { createSelector } from 'reselect'
import {Organizers,Invites} from 'remote'

const filteredInvites = createSelector(
  Invites.select.by('projectKey'),
  (invites)=>invites && invites.filter(invite=>!invite.claimedProfileKey)
)

const mapStateToProps = createSelector(
  filteredInvites,
  Organizers.select.by('projectKey'),
  (invites,organizers)=>{ return {invites,organizers} }
)

export default {
  path: 'staff',
  component: connect(mapStateToProps)(Container)
}
