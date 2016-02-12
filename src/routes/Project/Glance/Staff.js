import React from 'react'

import List from 'components/styled/List'
import CreateInviteListItem from 'containers/Invite/CreateInviteListItem'
import InviteListItem from 'containers/Invite/InviteListItem'
import InviteActionMenu from 'containers/Lead/InviteActionMenu'
import ProfileListItem from 'containers/Profile/ProfileListItem'
import OrganizerActionMenu from 'containers/Organizer/OrganizerActionMenu'
import ListItemHeader from 'components/styled/ListItemHeader'
import OrganizerInviteListItem from 'containers/Organizer/OrganizerInviteListItem'

const Container = ({ projectKey, invited, active })=>
  <List>
    <OrganizerInviteListItem {...{projectKey}}/>
    { (invited.length > 0) && <ListItemHeader primaryText='Open Invites'/> }
    { invited.map( invite=>
      <InviteListItem {...invite} key={invite.$key}
        actionMenu={ <InviteActionMenu acceptUrl={'/accept/organizer/'+invite.$key}/> }
        />
    ) }
    { (active.length > 0) && <ListItemHeader primaryText='Organizers'/> }
    { active.map( o=>
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
  organizers: ({projectKey,wantsOrganizers})=>wantsOrganizers({orderByChild:'projectKey',equalTo:projectKey})
}

const invitedOrganizers = createSelector(
  Organizers.select.by('projectKey'),
  (organizers)=>organizers.filter(organizer=>!organizer.profileKey)
)
const activeOrganizers = createSelector(
  Organizers.select.by('projectKey'),
  (organizers)=>organizers.filter(organizer=>!!organizer.profileKey)
)

const mapState = createSelector(
  invitedOrganizers,
  activeOrganizers,
  (invited, active)=>{ return { invited, active } }
)

const mapDispatch = {
  wantsOrganizers: Organizers.actions.query
}

export default {
  path: 'staff',
  component: compose(connect(mapState,mapDispatch),wanting(wants))(Container)
}
