import React from 'react'

import List from 'components/styled/List'
import LeadInviteListItem from 'containers/Lead/LeadInviteListItem'
import InviteActionMenu from 'containers/Lead/InviteActionMenu'
import LeadActionMenu from 'containers/Lead/LeadActionMenu'
import InviteListItem from 'containers/Invite/InviteListItem'
import ProfileListItem from 'containers/Profile/ProfileListItem'
// import OrganizerActionMenu from 'containers/Organizer/OrganizerActionMenu'
import ListItemHeader from 'components/styled/ListItemHeader'

const Container = ({ teamKey, invited, active })=>
  <List>
    <LeadInviteListItem teamKey={teamKey}/>
    { (invited.length > 0) && <ListItemHeader primaryText='Open Invites'/> }
    { invited.map( lead=>
      <InviteListItem {...lead} key={lead.$key}
        actionMenu={ <InviteActionMenu acceptUrl={'/accept/lead/'+lead.$key}/> }
        />
    ) }
    { (active.length > 0) && <ListItemHeader primaryText='Organizers'/> }
    { active.map( lead=>
      <ProfileListItem key={lead.$key} profileKey={lead.profileKey}
        secondaryText={lead.authority}
        rightIconButton={<LeadActionMenu {...lead}/>}
        />
    )}
  </List>

import { connect } from 'react-redux';
import { compose } from 'redux'
import { createSelector } from 'reselect'
import { Leads } from 'remote'
import { wanting } from 'lib/react-needful'

const wants = {
  leads: ({teamKey,wantsLeads})=>wantsLeads({orderByChild:'teamKey',equalTo:teamKey})
}

const invitedLeads = createSelector(
  Leads.select.by('teamKey'),
  (leads)=>leads.filter(leads=>!leads.profileKey)
)
const activeLeads = createSelector(
  Leads.select.by('teamKey'),
  (leads)=>leads.filter(leads=>!!leads.profileKey)
)

const mapState = createSelector(
  invitedLeads,
  activeLeads,
  (invited, active)=>{ return { invited, active } }
)

const mapDispatch = {
  wantsLeads: Leads.actions.query
}

export default {
  path: 'leads',
  component: compose(connect(mapState,mapDispatch),wanting(wants))(Container)
}
