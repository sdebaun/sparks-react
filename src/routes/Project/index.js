import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect'

import MainBar from 'components/MainBar'
import SideNav from 'components/SideNav'
import PageLoadSpinner from 'components/PageLoadSpinner'
import ProjectHeader from 'containers/Project/ProjectHeader'
import ProjectNavList from 'containers/Project/ProjectNavList'

import { Grid, Cell } from 'react-flexr'

import { findMatch } from 'react-flexr'

const Page = ({Title, Tabs, Main, project, projectImage, projectKey, location})=>{
  const baseUrl = '/project/'+projectKey,
    tabs = React.cloneElement(Tabs,{baseUrl}),
    isLarge = findMatch('lap','desk'),
    headerAttrs = { name: project.name, dataUrl: projectImage && projectImage.dataUrl, isMobile: findMatch('palm') }

  return <div>
    <MainBar />
    { (!project || !projectImage) && <PageLoadSpinner/> ||
      <Grid gutter='0em'>
        <SideNav>
          { isLarge && <ProjectHeader {...headerAttrs} /> }
          <ProjectNavList {...{baseUrl, location, projectKey}}/>
        </SideNav>
        <Cell>
          { isLarge && tabs || <ProjectHeader {...{tabs, secondaryText:Title, ...headerAttrs}}/> }
          { React.cloneElement(Main, {projectKey, project, projectImage}) }
        </Cell>
      </Grid>
    }
  </div>
}

import { needfulPage } from 'needers'
import { wanting } from 'lib/react-needful'
import { Projects, ProjectImages, Organizers, Invites, Teams } from 'remote'

const needs = ['project']

const wants = {
  project: ({dispatch, projectKey})=>dispatch(Projects.actions.watch(projectKey)),
  projectImage: ({dispatch, projectKey})=>dispatch(ProjectImages.actions.watch(projectKey)),
  teams: ({dispatch, projectKey})=>dispatch(ProjectImages.actions.query({orderByChild:'projectKey', equalTo:projectKey}))
}

const mapState = createSelector(
  (s,p)=>p.params.projectKey,
  (s,{params})=>{ return Projects.select.matching('projectKey')(s,params) },
  (s,{params})=>{ return ProjectImages.select.matching('projectKey')(s,params) },
  (s,{params})=>{ return Teams.select.by('projectKey')(s,params) },
  (projectKey,project,projectImage,teams)=>{ return {projectKey,project,projectImage,teams} }
)

// import { put } from 'redux-saga';
// import { master } from 'sagas'

import Glance from './Glance'
import Manage from './Manage'

export default {
  path: 'project/:projectKey',
  component: connect(mapState)(wanting(wants)(needfulPage(needs)(Page))),
  childRoutes: [ Glance, Manage ] //,
  // onEnter: ({params:{projectKey}})=>{
  //   master.start( function*() {
  //     yield put( Projects.actions.watch(projectKey) )
  //     yield put( ProjectImages.actions.watch(projectKey) )
  //     const params = { orderByChild:'projectKey', equalTo:projectKey }
  //     yield put( Organizers.actions.query(params) )
  //     yield put( Invites.actions.query(params) )
  //     yield put( Teams.actions.query(params) )
  //   })
  // }
}
