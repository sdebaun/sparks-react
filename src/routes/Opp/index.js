import React from 'react';

import MainBar from 'components/MainBar'
import SideNav from 'components/SideNav'
import OppHeader from 'containers/Opp/OppHeader'
import OppNavList from 'containers/Opp/OppNavList'

import { Grid, Cell } from 'react-flexr'

import { findMatch } from 'react-flexr'

const OppIndexPage = ({Title, Tabs, Main, opp, projectImage, location})=>{

  const baseUrl = '/opp/'+opp.projectKey + '/' + opp.$key,
    tabs = React.cloneElement(Tabs,{baseUrl}),
    isLarge = findMatch('lap','desk'),
    headerAttrs = { name: opp.name, projectKey: opp.projectKey, dataUrl: projectImage && projectImage.dataUrl,
       isMobile: findMatch('palm')
    }

  return <div>
    <MainBar />
    <Grid gutter='0em'>
      <SideNav>
        { isLarge && <OppHeader {...headerAttrs}/> }
        <OppNavList {...{baseUrl, location}}/>
      </SideNav>
      <Cell>
        { isLarge ? tabs : <OppHeader {...{secondaryText:Title, tabs, ...headerAttrs}}/> }
        { React.cloneElement(Main, {opp,oppKey:opp.$key,projectKey:opp.projectKey}) }
      </Cell>
    </Grid>
  </div>
}

import { connect } from 'react-redux'
import { compose } from 'redux'
import { createSelector } from 'reselect'
import { Opps, ProjectImages } from 'remote'
import { wanting } from 'lib/react-needful'
import { needfulPage } from 'needers'

const mapState = createSelector(
  (s,{params})=>Opps.select.matching('oppKey')(s,params),
  (s,{params})=>ProjectImages.select.matching('projectKey')(s,params),
  (opp,projectImage)=>{ return { opp,projectImage } }
)

const wants = {
  opp: ({params:{oppKey},dispatch})=>dispatch(Opps.actions.watch(oppKey)),
  projectImage: ({params:{projectKey},dispatch})=>dispatch(ProjectImages.actions.watch(projectKey))
}

const needs = ['opp']

import Glance from './Glance'
import Manage from './Manage'

export default {
  path: 'opp/:projectKey/:oppKey',
  component: compose(connect(mapState),wanting(wants),needfulPage(needs))(OppIndexPage),
  childRoutes: [ Glance, Manage ]
}
