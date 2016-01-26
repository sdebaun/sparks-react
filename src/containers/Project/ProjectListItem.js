import React from 'react';
import { connect } from 'react-redux';

import ListItem from 'material-ui/lib/lists/list-item'

import NavListItem from 'components/NavListItem'

import { createSelector } from 'reselect'
import { Projects } from 'remote'

class Container extends React.Component {
  componentWillMount() {
    this.props.project || this.props.dispatch(Projects.actions.watch(this.props.projectKey))
  }

  render() {
    const { project, projectKey } = this.props
    const targetRoute = '/project/' + projectKey
    if (!project) return <ListItem>...</ListItem>
    return <NavListItem primaryText={project.name} targetRoute={targetRoute} {...this.props}/>
  }

}

const mapStateToProps = createSelector(
  Projects.select.matching('projectKey'),
  (project)=>{ return {project} }
)

export default connect(mapStateToProps)(Container);
