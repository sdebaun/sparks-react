import React from 'react';

import OrganizerAccept from 'containers/Organizer/OrganizerAccept'

// import List from 'material-ui/lib/lists/list'
// import CreateProjectListItem from 'containers/Project/CreateProjectListItem'
// import ProjectListItem from 'containers/Project/ProjectListItem'

const RouteAcceptOrganizer = ({organizer,params:{organizerKey}})=> <OrganizerAccept {...{organizerKey,...organizer}}/>

import { connect } from 'react-redux';
import { createSelector } from 'reselect'
import { Organizers } from 'remote'
import { wanting } from 'lib/react-needful'
import { needfulPage } from 'needers'
import { compose } from 'redux'

const wants = {
  organizer: ({params:{organizerKey},wantsOrganizer})=> wantsOrganizer(organizerKey)
}

const needs = ['organizer']

const mapState = createSelector(
  (s,p)=>Organizers.select.matching('organizerKey')(s,p.params),
  (organizer)=>{ return {organizer} }
)

const mapDispatch = {
  wantsOrganizer: Organizers.actions.watch
}

export default {
  path: 'organizer/:organizerKey',
  component: compose(connect(mapState,mapDispatch),wanting(wants),needfulPage(needs))(RouteAcceptOrganizer)
}
