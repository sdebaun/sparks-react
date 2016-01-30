import React from 'react';
// import ListItem from 'material-ui/lib/lists/list-item'
import NavListItem from 'components/NavListItem'

const Container = ({project,projectKey,...other})=>
  <NavListItem primaryText={project.name} targetRoute={'/project/' + projectKey} {...other}/>

// class Container extends React.Component {
//   componentWillMount() {
//     this.props.project || this.props.dispatch(Projects.actions.watch(this.props.projectKey))
//   }

//   render() {
//     const { project, projectKey } = this.props
//     const targetRoute = '/project/' + projectKey
//     if (!project) return <ListItem>...</ListItem>
//     return <NavListItem primaryText={project.name} targetRoute={targetRoute} {...this.props}/>
//   }

// }

import { connect } from 'react-redux';
import { createSelector } from 'reselect'
import needful from 'lib/react-needful'
import { Projects, ProjectImages } from 'remote'

const needs = {
  projectImage: ({projectKey,dispatch})=> dispatch(ProjectImages.actions.watch(projectKey)),
  project: ({projectKey,dispatch})=> dispatch(Projects.actions.watch(projectKey))
}

const mapState = createSelector(
  ProjectImages.select.matching('projectKey'),
  (projectImage)=>{ return {projectImage} }
)

export default connect(mapState)(needful(needs)(Container));
