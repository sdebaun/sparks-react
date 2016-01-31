import React from 'react';
import List from 'material-ui/lib/lists/list'
import CreateProjectListItem from 'containers/Project/CreateProjectListItem'
import ProjectListItem from 'containers/Project/ProjectListItem'

const Container = ({lead})=>
  <div>Accept an invite for a lead here</div>

import { connect } from 'react-redux';
import { createSelector } from 'reselect'
import { Leads } from 'remote'
import { wanting } from 'lib/react-needful'
import { needfulPage } from 'needers'
import { compose } from 'redux'

const wants = {
  lead: ({params:{leadKey},wantsLead})=> wantsLead(leadKey)
}

const needs = ['lead']

const mapState = createSelector(
  (s,p)=>Leads.select.matching('leadKey')(s,p.params),
  (lead)=>{ return {lead} }
)

const mapDispatch = {
  wantsLead: Leads.actions.watch
}

export default {
  path: 'lead/:leadKey',
  component: compose(connect(mapState,mapDispatch),wanting(wants),needfulPage(needs))(Container)
}
