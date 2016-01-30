import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect'

import MainBar from 'components/MainBar'
import SideNav from 'components/SideNav'
import PageLoadSpinner from 'components/PageLoadSpinner'
import TeamHeader from 'containers/Team/TeamHeader'
import TeamNavList from 'containers/Team/TeamNavList'

import { Grid, Cell } from 'react-flexr'

import { findMatch } from 'react-flexr'

const Page = ({Title, Tabs, Main, team, location, ...props})=>{
  if (!team.$key || !team.project.$key) return <div><MainBar/><PageLoadSpinner/></div>

  const baseUrl = '/team/'+team.project.$key + '/' + team.$key,
    tabs = React.cloneElement(Tabs,{baseUrl}),
    isLarge = findMatch('lap','desk')

  console.log('page',location)

  return <div>
    <MainBar />
    <Grid gutter='0em'>
      <SideNav>
        { isLarge && <TeamHeader {...team}/> }
        <TeamNavList {...{baseUrl, location}}/>
      </SideNav>
      <Cell>
        { isLarge && tabs || <TeamHeader {...{secondaryText:Title, tabs, ...team}}/> }
        { React.cloneElement(Main, {teamKey:team.$key,projectKey:team.projectKey}) }
      </Cell>
    </Grid>
  </div>
}

import { Teams, TeamImages, Projects, ProjectImages, Invites } from 'remote'

const selectedTeam = (s,{params})=>{ return Teams.select.matching('teamKey')(s,params) }

const parentProject = createSelector(
  selectedTeam,
  Projects.select.collection,
  (team,projects)=>team && projects[team.projectKey]
)

const parentProjectImage = createSelector(
  selectedTeam,
  ProjectImages.select.collection,
  (team,projectImages)=>team && projectImages[team.projectKey]
)

const mapStateToProps = createSelector(
  (s,p)=>p.params.teamKey,
  selectedTeam,
  // TeamImages.select.matching('teamKey'),
  (s,{params})=>{ return TeamImages.select.matching('teamKey')(s,params) },
  parentProject,
  parentProjectImage,
  (teamKey,team,teamImage,project,projectImage)=>{
    return {
      team: {...team, teamImage,
        project: {...project, projectImage}
      }
    }
  }
)

import { put } from 'redux-saga';
import { master } from 'sagas'

import Glance from './Glance'
import Manage from './Manage'

export default {
  path: 'team/:projectKey/:teamKey',
  component: connect(mapStateToProps)(Page),
  childRoutes: [ Glance, Manage ],
  onEnter: ({params:{teamKey,projectKey}})=>{
    master.start( function*() {
      // basically want to get all the stuff you need for project view
      // BE AGGRESSIVE
      yield put( Projects.actions.watch(projectKey) )
      yield put( ProjectImages.actions.watch(projectKey) )
      const byProject = { orderByChild:'projectKey', equalTo:projectKey }
      yield put( Teams.actions.query(byProject) ) // need to get all of em for nav lists
      // yield put( TeamImages.actions.query(byProject) ) // need to get all of em for nav lists
      const byTeam = { orderByChild:'teamKey', equalTo:teamKey }
      yield put( Invites.actions.query(byTeam) )
      // shifts
      // vols
    })
  }
}
