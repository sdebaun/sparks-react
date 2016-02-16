import React from 'react'

import List from 'components/styled/List'
import LeadInviteListItem from 'containers/Lead/LeadInviteListItem'
import InviteActionMenu from 'containers/Lead/InviteActionMenu'
import LeadActionMenu from 'containers/Lead/LeadActionMenu'
import InviteListItem from 'containers/Invite/InviteListItem'
import ProfileListItem from 'containers/Profile/ProfileListItem'
import TitledListItems from 'components/TitledListItems'

const Container = ({ teamKey, invited, active })=>
  <List>
    <LeadInviteListItem teamKey={teamKey}/>
    <TitledListItems primaryText='Open Invites' items={invited} mapper={(item)=>
      <InviteListItem key={item.$key} {...item}
        actionMenu={ <InviteActionMenu acceptUrl={'/accept/lead/'+item.$key}/> }
        />
      }/>
    <TitledListItems primaryText='Leads' items={active} mapper={(item)=>
      <ProfileListItem key={item.$key} profileKey={item.profileKey}
        secondaryText={item.authority}
        rightIconButton={<LeadActionMenu lead={item}/>}
        />
      }/>
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
