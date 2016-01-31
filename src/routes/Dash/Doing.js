import React from 'react';
import ProjectListItem from 'containers/Project/ProjectListItem'
import List from 'components/styled/List'
import ListItemHeader from 'components/styled/ListItemHeader'

const Container = ({organizers})=>
  <List>
  { (organizers.length > 0) && <ListItemHeader primaryText='organizing'/> }
  { organizers.map( o=> <ProjectListItem key={o.$key} projectKey={o.projectKey} secondaryText={o.authority} /> )}
  </List>

import { connect } from 'react-redux';
import { createSelector } from 'reselect'
import { Organizers } from 'remote'

const mapState = createSelector(
  Organizers.select.by('profileKey'),
  (organizers)=>{ return {organizers} }
)

export default {
  component: connect(mapState)(Container)
}
