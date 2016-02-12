import React from 'react';

import NavListItem from 'components/NavListItem'

const TeamListItem = ({team:{name,projectKey},teamKey,...props})=>
  <NavListItem primaryText={name} targetRoute={'/team/' + projectKey + '/' + teamKey} {...props}/>

import { connect } from 'react-redux';
import { createSelector } from 'reselect'
import { Teams } from 'remote'
import { wanting } from 'lib/react-needful'
import { needfulPage } from 'needers'
import { compose } from 'redux'

const needs = ['team']
const wants = {
  team: ({teamKey,wantsTeam})=> wantsTeam(teamKey)
}

const mapState = createSelector(
  Teams.select.matching('teamKey'),
  (team)=>{ return {team} }
)

const mapDispatch = {
  wantsTeam: Teams.actions.watch
}

export default compose(connect(mapState,mapDispatch),wanting(wants),needfulPage(needs))(TeamListItem)

