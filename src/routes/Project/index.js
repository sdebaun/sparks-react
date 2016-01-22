import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect'

import MainBar from 'components/MainBar'
import SideNav from 'components/SideNav'
import PageLoadSpinner from 'components/PageLoadSpinner'
import IsDesktop from 'components/IsDesktop'
import IsMobile from 'components/IsMobile'
import ProjectNavList from 'containers/Project/ProjectNavList'
import ProjectHeader from 'containers/Project/ProjectHeader'

class Main extends React.Component {
  render() {
    const {Title, Tabs, Main, project, projectImage, params:{projectKey}} = this.props
    return (
      <div style={{height:'100%'}}>
        <MainBar />
        { !(project && projectImage) && <PageLoadSpinner/>}
        { project && projectImage &&
          <div style={{height:'100%',display:'flex'}}>
            <SideNav>
              <IsDesktop>
                <ProjectHeader imageUrl={projectImage.dataUrl} style={{height:100}} primaryText={project.name} />
              </IsDesktop>
              <ProjectNavList baseUrl={'/project/'+projectKey} {...this.props}/>
            </SideNav>
            <div style={{flex:1}}>
              <IsDesktop>{ React.cloneElement(Tabs,{baseUrl:'/project/'+projectKey}) }</IsDesktop>
              <IsMobile>
                <ProjectHeader imageUrl={projectImage.dataUrl} sideNav={true} primaryText={project.name} secondaryText={Title}>
                  { React.cloneElement(Tabs,{baseUrl:'/project/'+projectKey}) }
                </ProjectHeader>
              </IsMobile>
              { React.cloneElement(Main, {project,projectKey}) }
            </div>
          </div>
        }
      </div>
    );
  }
}

import { Projects, ProjectImages } from 'remote'

const selectedProjectKey = (state,ownProps)=>ownProps.params.projectKey

const selectedProject = createSelector(
  Projects.select.collection,
  selectedProjectKey,
  (projects,projectKey)=>projects && projects[projectKey]
)

const selectedProjectImage = createSelector(
  ProjectImages.select.collection,
  selectedProjectKey,
  (projectImages,projectKey)=>projectImages && projectImages[projectKey]
)

const mapStateToProps = createSelector(
  selectedProject,
  selectedProjectImage,
  (project,projectImage)=>{ return {project,projectImage} }
)

import { put } from 'redux-saga';
import { master } from 'sagas'

import Glance from './Glance'
import Manage from './Manage'
import {Organizers,Invites} from 'remote'

export default {
  path: 'project/:projectKey',
  component: connect(mapStateToProps)(Main),
  childRoutes: [ Glance, Manage ],
  onEnter: (route)=>{
    master.start( function*() {
      yield put( Projects.actions.watch(route.params.projectKey) )
      yield put( ProjectImages.actions.watch(route.params.projectKey) )
      const params = { orderByChild:'projectKey', equalTo:route.params.projectKey }
      yield put( Organizers.actions.query(params) )
      yield put( Invites.actions.query(params) )
    })
  }
}
