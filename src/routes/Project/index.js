import React from 'react';

import MainBar from 'components/MainBar'
import SideNav from 'components/SideNav'
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
  </div>
}

import { connect } from 'react-redux'
import { compose } from 'redux'
import { createSelector } from 'reselect'
import { needfulPage } from 'needers'
import { wanting } from 'lib/react-needful'
import { Projects, ProjectImages, Teams, Organizers } from 'remote'

const needs = ['project']

const wants = {
  project: ({dispatch, projectKey})=>dispatch(Projects.actions.watch(projectKey)),
  projectImage: ({dispatch, projectKey})=>dispatch(ProjectImages.actions.watch(projectKey)),
  teams: ({dispatch, projectKey})=>dispatch(ProjectImages.actions.query({orderByChild:'projectKey', equalTo:projectKey})),
  organizers: ({dispatch, projectKey})=>dispatch(Organizers.actions.query({orderByChild:'projectKey', equalTo:projectKey}))
}

const mapState = createSelector(
  (s,p)=>p.params.projectKey,
  (s,{params})=>{ return Projects.select.matching('projectKey')(s,params) },
  (s,{params})=>{ return ProjectImages.select.matching('projectKey')(s,params) },
  (s,{params})=>{ return Teams.select.by('projectKey')(s,params) },
  (projectKey,project,projectImage,teams)=>{ return {projectKey,project,projectImage,teams} }
)

import Glance from './Glance'
import Manage from './Manage'

export default {
  path: 'project/:projectKey',
  component: compose(connect(mapState),wanting(wants),needfulPage(needs))(Page),
  childRoutes: [ Glance, Manage ]
}
