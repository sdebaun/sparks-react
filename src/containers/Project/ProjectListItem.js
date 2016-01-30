import React from 'react';
import NavListItem from 'components/NavListItem'

const Container = ({project,projectKey,...other})=>
  <NavListItem primaryText={project.name} targetRoute={'/project/' + projectKey} {...other}/>

import { connect } from 'react-redux';
import { createSelector } from 'reselect'
import { needfulListItem } from 'needers'
import { Projects, ProjectImages } from 'remote'
import { wanting } from 'lib/react-needful'

const wants = {
  projectImage: ({projectKey,dispatch})=> dispatch(ProjectImages.actions.watch(projectKey)),
  project: ({projectKey,dispatch})=> dispatch(Projects.actions.watch(projectKey))
}
const needs = ['project']

const mapState = createSelector(
  Projects.select.matching('projectKey'),
  ProjectImages.select.matching('projectKey'),
  (project,projectImage)=>{ return {project,projectImage} }
)

export default connect(mapState)(wanting(wants)(needfulListItem(needs)(Container)))
