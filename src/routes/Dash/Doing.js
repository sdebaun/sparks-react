import React from 'react';
import ProjectListItem from 'containers/Project/ProjectListItem'
import TeamListItem from 'containers/Team/TeamListItem'
import List from 'components/styled/List'
import ListItemHeader from 'components/styled/ListItemHeader'

const Container = ({organizers, leads})=>
  <List>
  { (organizers.length > 0) && <ListItemHeader primaryText='organizing'/> }
  { organizers.map( o=> <ProjectListItem key={o.$key} projectKey={o.projectKey} secondaryText={o.authority} /> )}
  { (leads.length > 0) && <ListItemHeader primaryText='leading'/> }
  { leads.map( ({$key,teamKey,authority})=> <TeamListItem key={$key} teamKey={teamKey} secondaryText={authority} /> )}
  </List>

import { connect } from 'react-redux';
import { createSelector } from 'reselect'
import { Organizers, Leads } from 'remote'

const mapState = createSelector(
  Organizers.select.by('profileKey'),
  Leads.select.by('profileKey'),
  (organizers, leads)=>{ return {organizers, leads} }
)

export default {
  component: connect(mapState)(Container)
}
