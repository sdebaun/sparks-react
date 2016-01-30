import React from 'react';

import MainBar from 'components/MainBar'
import SideNav from 'components/SideNav'
// import PageLoadSpinner from 'components/PageLoadSpinner'
import TeamHeader from 'containers/Team/TeamHeader'
import TeamNavList from 'containers/Team/TeamNavList'
import TeamAvatar from 'containers/Team/TeamAvatar'

import { Grid, Cell } from 'react-flexr'

import { findMatch } from 'react-flexr'

const TeamIndexPage = ({Title, Tabs, Main, team, teamImage, projectImage, location})=>{

  const baseUrl = '/team/'+team.projectKey + '/' + team.$key,
    tabs = React.cloneElement(Tabs,{baseUrl}),
    isLarge = findMatch('lap','desk'),
    headerAttrs = { name: team.name, projectKey: team.projectKey, dataUrl: projectImage && projectImage.dataUrl,
       isMobile: findMatch('palm'),
       leftIcon: <TeamAvatar src={teamImage && teamImage.dataUrl}/>
    }
  console.log('leftIcon.props.src',!!headerAttrs.leftIcon.props.src)
  return <div>
    <MainBar />
    <Grid gutter='0em'>
      <SideNav>
        { isLarge && <TeamHeader {...headerAttrs}/> }
        <TeamNavList {...{baseUrl, location}}/>
      </SideNav>
      <Cell>
        { isLarge ? tabs : <TeamHeader {...{secondaryText:Title, tabs, ...headerAttrs}}/> }
        { React.cloneElement(Main, {teamKey:team.$key,projectKey:team.projectKey}) }
      </Cell>
    </Grid>
  </div>
}

import { connect } from 'react-redux'
import { compose } from 'redux'
import { createSelector } from 'reselect'
import { Teams, TeamImages, ProjectImages } from 'remote'
import { wanting } from 'lib/react-needful'
import { needfulPage } from 'needers'

const mapState = createSelector(
  (s,{params})=>Teams.select.matching('teamKey')(s,params),
  (s,{params})=>TeamImages.select.matching('teamKey')(s,params),
  (s,{params})=>ProjectImages.select.matching('projectKey')(s,params),
  (team,teamImage,projectImage)=>{ return { team,teamImage,projectImage } }
)

const wants = {
  team: ({params:{teamKey},dispatch})=>dispatch(Teams.actions.watch(teamKey)),
  teamImage: ({params:{teamKey},dispatch})=>dispatch(TeamImages.actions.watch(teamKey)),
  projectImage: ({params:{projectKey},dispatch})=>dispatch(ProjectImages.actions.watch(projectKey))
}

const needs = ['team']

import Glance from './Glance'
import Manage from './Manage'

export default {
  path: 'team/:projectKey/:teamKey',
  component: compose(connect(mapState),wanting(wants),needfulPage(needs))(TeamIndexPage),
  childRoutes: [ Glance, Manage ] ,
  onEnter: ({params})=>console.log('team/index params', params)
  // onEnter: ({params:{teamKey,projectKey}})=>{
  //   master.start( function*() {
  //     // basically want to get all the stuff you need for project view
  //     // BE AGGRESSIVE
  //     yield put( Projects.actions.watch(projectKey) )
  //     yield put( ProjectImages.actions.watch(projectKey) )
  //     const byProject = { orderByChild:'projectKey', equalTo:projectKey }
  //     yield put( Teams.actions.query(byProject) ) // need to get all of em for nav lists
  //     // yield put( TeamImages.actions.query(byProject) ) // need to get all of em for nav lists
  //     const byTeam = { orderByChild:'teamKey', equalTo:teamKey }
  //     yield put( Invites.actions.query(byTeam) )
  //     // shifts
  //     // vols
  //   })
  // }
}
