import React from 'react';
import List from 'material-ui/lib/lists/list'
import CreateProjectListItem from 'containers/Project/CreateProjectListItem'
import ProjectListItem from 'containers/Project/ProjectListItem'

const Container = ({projects})=>
  <List>
    <CreateProjectListItem/>
    { projects.map( p=> <ProjectListItem key={p.$key} projectKey={p.$key} /> )}
  </List>

import { connect } from 'react-redux';
import { createSelector } from 'reselect'
import {Projects} from 'remote'
import { wanting } from 'lib/react-needful'

// import {needfulPage} from 'needers'

const wants = {
  projects: ({dispatch})=> dispatch(Projects.actions.query())
}

const mapState = createSelector(
  Projects.select.rows,
  (projects)=>{ return {projects} }
)

export default {
  component: connect(mapState)(wanting(wants)(Container))
}