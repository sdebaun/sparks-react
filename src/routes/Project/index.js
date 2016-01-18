import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect'

import MainBar from 'components/MainBar'
import SideNav from 'components/SideNav'
import PageLoadSpinner from 'components/PageLoadSpinner'
import IsDesktop from 'components/IsDesktop'
import ProjectNavList from 'containers/Project/ProjectNavList'
import ProjectHeader from 'containers/Project/ProjectHeader'

class Main extends React.Component {
  componentDidMount() {
    this.props.load(this.props.params.projectKey)
  }

  render() {
    const {project, params:{projectKey}} = this.props
    return (
      <div className="index">
        <MainBar />
        { !project && <PageLoadSpinner/>}
        { project &&
          <div style={{display:'flex'}}>
            <SideNav>
              <IsDesktop>
                <ProjectHeader style={{height:100}} primaryText={project.name} />
              </IsDesktop>
              <ProjectNavList baseUrl={'/project/'+projectKey}/>
            </SideNav>
            <div style={{flex:1}}>
              { React.cloneElement(this.props.children, {project,projectKey}) }
            </div>
          </div>
        }
      </div>
    );
  }
}

import { Projects } from 'remote'

const selectedProject = createSelector(
  Projects.select.collection,
  (state,ownProps)=>ownProps.params.projectKey,
  (projects,projectKey)=>projects && projects[projectKey]
)

const mapStateToProps = createSelector(
  selectedProject,
  (project)=>{ return {project} }
)

const mapDispatchToProps = {
  load: Projects.actions.watch
}

import Glance from './Glance'
import Manage from './Manage'

export default {
  path: 'project/:projectKey',
  component: connect(mapStateToProps,mapDispatchToProps)(Main),
  childRoutes: [ Glance, Manage ]
}
