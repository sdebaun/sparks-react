import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect'

import MainBar from 'components/MainBar'
import SideNav from 'components/SideNav'
import PageLoadSpinner from 'components/PageLoadSpinner'
import IsDesktop from 'components/IsDesktop'
import NavList from 'containers/Project/NavList'
import ProjectHeader from 'containers/Project/ProjectHeader'

import Fetch from 'containers/Fetch'

class Main extends React.Component {  

  render() {
    const {project, params:{projectKey}} = this.props
    return (
      <div className="index">
        <MainBar />
        <Fetch collection="Projects" itemKey={projectKey}/>
        { !project && <PageLoadSpinner/>}
        { project &&
          <div style={{display:'flex'}}>
            <SideNav>
              <IsDesktop>
                <ProjectHeader style={{height:100}} primaryText={project && project.name} />
              </IsDesktop>
              <NavList baseUrl={'/project/'+projectKey}/>
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

const mapStateToProps = createSelector(
  (state,ownProps)=>Projects.selectors.loaded(state,ownProps.params.projectKey),
  (state,ownProps)=>Projects.selectors.single(state,ownProps.params.projectKey),
  (projectLoaded,project)=>{
    return {projectLoaded,project}
  }
)

import Glance from './Glance'
import Manage from './Manage'

export default {
  path: 'project/:projectKey',
  component: connect(mapStateToProps)(Main),
  childRoutes: [ Glance, Manage ]
}
