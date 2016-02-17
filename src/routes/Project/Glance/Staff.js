import React from 'react'

import List from 'components/styled/List'
import InviteListItem from 'containers/Invite/InviteListItem'
import InviteActionMenu from 'containers/Lead/InviteActionMenu'
import ProfileListItem from 'containers/Profile/ProfileListItem'
import OrganizerActionMenu from 'containers/Organizer/OrganizerActionMenu'
import OrganizerInviteListItem from 'containers/Organizer/OrganizerInviteListItem'
import TitledListItems from 'components/TitledListItems'

const Container = ({ projectKey, invited, active })=>
  <List>
    <OrganizerInviteListItem {...{projectKey}}/>
    <TitledListItems primaryText='Open Invites' items={invited} mapper={(item)=>
      <InviteListItem key={item.$key} {...item}
        actionMenu={ <InviteActionMenu acceptUrl={'/accept/organizer/'+item.$key}/> }
        />
      }/>
    <TitledListItems primaryText='Organizers' items={active} mapper={(item)=>
      <ProfileListItem key={item.$key} {...item.profile}
        secondaryText={item.authority}
        rightIconButton={<OrganizerActionMenu organizer={item}/>}
        />
      }/>
  </List>

import { connect } from 'react-redux';
import { compose } from 'redux'
import { createSelector } from 'reselect'
import { Organizers } from 'remote'
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
