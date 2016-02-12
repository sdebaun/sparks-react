import React from 'react';
// import SelectField from 'material-ui/lib/select-field';
// import ArrowDropDownIcon from 'material-ui/lib/svg-icons/navigation/arrow-drop-down';
// import MenuItem from 'material-ui/lib/menus/menu-item';
// import TeamListItem from 'containers/Team/TeamListItem'

const ProjectTitle = ({project:{name}})=><div>{name}</div>


import { connect } from 'react-redux'
import { compose } from 'redux'
import { createSelector } from 'reselect'
import { Projects, Teams } from 'remote'
import { wanting, needful } from 'lib/react-needful'
import { pushPath } from 'redux-simple-router'

const wants = {
  project: ({projectKey,wantsProject})=>wantsProject(projectKey),
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