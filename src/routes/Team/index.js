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

const Page = ({Title, Tabs, Main, team, teamImage, teamKey, project, projectImage, location})=>{
  const baseUrl = '/team/'+teamKey,
    linkedTabs = React.cloneElement(Tabs,{baseUrl})

  return <div>
    <MainBar />
    { (!team || !teamImage || !project || !projectImage) && <PageLoadSpinner/> ||
      <Grid gutter='0em'>
        <SideNav>
          { findMatch('lap','desk') && <TeamHeader {...{teamKey,projectKey:team.projectKey}} style={{height:100}} /> }
          <TeamNavList {...{baseUrl, location}}/>
        </SideNav>
        <Cell>
          { findMatch('lap','desk') && linkedTabs ||
            <TeamHeader {...{teamKey, projectKey:team.projectKey, sideNav:true, secondaryText:Title}}>
              { linkedTabs }
            </TeamHeader>
          }
          { React.cloneElement(Main, {teamKey}) }
        </Cell>
      </Grid>
    }
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
  (s,{params})=>{ return TeamImages.select.matching('teamKey')(s,params) },
  parentProject,
  parentProjectImage,
  (teamKey,team,teamImage,project,projectImage)=>{ return {teamKey,team,teamImage,project,projectImage} }
)

import { put, take } from 'redux-saga';
import { master } from 'sagas'

import Glance from './Glance'
import Manage from './Manage'

export default {
  path: 'team/:teamKey',
  component: connect(mapStateToProps)(Page),
  childRoutes: [ Glance, Manage ],
  onEnter: ({params:{teamKey}})=>{
    master.start( function*() {
      const teamResult = yield take( Teams.taker(teamKey) )
      yield put( Projects.actions.watch(teamResult.data.projectKey) )
      yield put( ProjectImages.actions.watch(teamResult.data.projectKey) )
    })
    master.start( function*() {
      yield put( Teams.actions.watch(teamKey) )
      yield put( TeamImages.actions.watch(teamKey) )
      const params = { orderByChild:'teamKey', equalTo:teamKey }
      yield put( Invites.actions.query(params) )
    })
  }
}
