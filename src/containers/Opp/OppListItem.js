import React from 'react';

import NavListItem from 'components/NavListItem'

const OppListItem = ({opp:{name,projectKey},oppKey,...props})=>
  <NavListItem primaryText={name} targetRoute={'/opp/' + projectKey + '/' + oppKey} {...props}/>

import { connect } from 'react-redux';
import { createSelector } from 'reselect'
import { Opps } from 'remote'
import { wanting } from 'lib/react-needful'
import { needfulPage } from 'needers'
import { compose } from 'redux'

const needs = ['opp']
const wants = {
  opp: ({oppKey,wantsOpp})=> wantsOpp(oppKey)
}

const mapState = createSelector(
  Opps.select.matching('oppKey'),
  (opp)=>{ return {opp} }
)

const mapDispatch = {
  wantsOpp: Opps.actions.watch
}

export default compose(connect(mapState,mapDispatch),wanting(wants),needfulPage(needs))(OppListItem)

