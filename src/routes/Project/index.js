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
    linkedTabs = React.cloneElement(Tabs,{baseUrl})

  return <div>
    <MainBar />
    { (!project || !projectImage) && <PageLoadSpinner/> ||
      <Grid gutter='0em'>
        <SideNav>
          { findMatch('lap','desk') && <ProjectHeader {...{projectKey}} style={{height:100}} /> }
          <ProjectNavList {...{baseUrl, location, projectKey}}/>
        </SideNav>
        <Cell>
          { findMatch('lap','desk') && linkedTabs ||
            <ProjectHeader {...{projectKey, sideNav:true, secondaryText:Title}}>
              { linkedTabs }
            </ProjectHeader>
          }
          { React.cloneElement(Main, {projectKey}) }
        </Cell>
      </Grid>
    }
  </div>
}

import { Projects, ProjectImages, Organizers, Invites, Teams } from 'remote'

const mapStateToProps = createSelector(
  (s,p)=>p.params.projectKey,
  (s,{params})=>{ return Projects.select.matching('projectKey')(s,params) },
  (s,{params})=>{ return ProjectImages.select.matching('projectKey')(s,params) },
  (projectKey,project,projectImage)=>{ return {projectKey,project,projectImage} }
)

import { put } from 'redux-saga';
import { master } from 'sagas'

import Glance from './Glance'
import Manage from './Manage'

export default {
  path: 'project/:projectKey',
  component: connect(mapStateToProps)(Page),
  childRoutes: [ Glance, Manage ],
  onEnter: ({params:{projectKey}})=>{
    master.start( function*() {
      yield put( Projects.actions.watch(projectKey) )
      yield put( ProjectImages.actions.watch(projectKey) )
      const params = { orderByChild:'projectKey', equalTo:projectKey }
      yield put( Organizers.actions.query(params) )
      yield put( Invites.actions.query(params) )
      yield put( Teams.actions.query(params) )
    })
  }
}
