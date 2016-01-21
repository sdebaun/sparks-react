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
    const {Title, Tabs, Main, project, params:{projectKey}} = this.props
    return (
      <div style={{height:'100%'}}>
        <MainBar />
        { !project && <PageLoadSpinner/>}
        { project &&
          <div style={{height:'100%',display:'flex'}}>
            <SideNav>
              <IsDesktop>
                <ProjectHeader style={{height:100}} primaryText={project.name} />
              </IsDesktop>
              <ProjectNavList baseUrl={'/project/'+projectKey} {...this.props}/>
            </SideNav>
            <div style={{flex:1}}>
              <IsDesktop>{ React.cloneElement(Tabs,{baseUrl:'/project/'+projectKey}) }</IsDesktop>
              <IsMobile>
                <ProjectHeader sideNav={true} primaryText={project.name} secondaryText={Title}>
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
      const params = { orderByChild:'projectKey', equalTo:route.params.projectKey }
      yield put( Organizers.actions.query(params) )
      yield put( Invites.actions.query(params) )
    })
  }
}
