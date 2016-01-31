import React from 'react'

import List from 'components/styled/List'
import CreateInviteListItem from 'containers/Invite/CreateInviteListItem'
import InviteListItem from 'containers/Invite/InviteListItem'
import ProfileListItem from 'containers/Profile/ProfileListItem'
import OrganizerActionMenu from 'containers/Organizer/OrganizerActionMenu'
import ListItemHeader from 'components/styled/ListItemHeader'

const Container = ({ projectKey, invites, organizers })=>
  <List>
    <CreateInviteListItem projectKey={projectKey}/>
    { (invites.length > 0) && <ListItemHeader primaryText='Open Invites'/> }
    { invites.map( invite=><InviteListItem key={invite.$key} {...invite} /> ) }
    { (organizers.length > 0) && <ListItemHeader primaryText='Organizers'/> }
    { organizers.map( o=>
      <ProfileListItem key={o.$key} profileKey={o.profileKey}
        secondaryText={o.authority}
        rightIconButton={<OrganizerActionMenu organizer={o}/>}
        />
    )}
  </List>

import { connect } from 'react-redux';
import { compose } from 'redux'
import { createSelector } from 'reselect'
import { Organizers, Invites } from 'remote'
import { wanting } from 'lib/react-needful'

const wants = {
  invites: ({projectKey,dispatch})=>dispatch(Invites.actions.query({orderByChild:'projectKey',equalTo:projectKey})),
  organizers: ({projectKey,dispatch})=>dispatch(Organizers.actions.query({orderByChild:'projectKey',equalTo:projectKey}))
}

const filteredInvites = createSelector(
  Invites.select.by('projectKey'),
  (invites)=>invites && invites.filter(invite=>!invite.claimedProfileKey)
)

const mapState = createSelector(
  filteredInvites,
  Organizers.select.by('projectKey'),
  (invites, organizers)=>{ return { invites, organizers } }
)

export default {
  path: 'staff',
  component: compose(connect(mapState),wanting(wants))(Container)
}
