import React from 'react';

const ProjectTitle = ({project:{name}})=><div>{name}</div>

import { connect } from 'react-redux'
import { compose } from 'redux'
import { createSelector } from 'reselect'
import { Projects } from 'remote'
import { wanting, needful } from 'lib/react-needful'

const wants = {
  project: ({projectKey,wantsProject})=>wantsProject(projectKey)
}

const needs = ['project']

const mapState = createSelector(
  Projects.select.matching('projectKey'),
  (project)=>{ return {project} }
)
const mapDispatch = {
  wantsProject: Projects.actions.watch
}

export default compose(connect(mapState,mapDispatch),wanting(wants),needful(needs))(ProjectTitle)