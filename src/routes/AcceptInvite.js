import React from 'react';

import MainBar from 'components/MainBar'
import Narrow from 'components/Narrow'
import InviteAccept from 'containers/Invite/InviteAccept'

const Container = ({invite})=>
  <div className="index">
    <MainBar />
    <Narrow><InviteAccept {...invite}/></Narrow>
  </div>

import { connect } from 'react-redux'
import { compose } from 'redux'
import { createSelector } from 'reselect'
import { Invites, Users } from 'remote'
import { needfulPage } from 'needers'
import { wanting } from 'lib/react-needful'

const mapState = createSelector(
  (state,props)=>Invites.select.matching('inviteKey')(state,props.params),
  (invite)=>{ return { invite } }
  )

const mapDispatch = {
  wantsInvite: Invites.actions.watch
}

const wants = {
  invite: ({wantsInvite,params:{inviteKey}})=>wantsInvite(inviteKey)
}

const needs = ['invite']

import { put, take } from 'redux-saga';
import { master } from 'sagas';
import { pushPath } from 'redux-simple-router'

export default {
  path:'acceptInvite/:inviteKey',
  component: compose(connect(mapState,mapDispatch),wanting(wants),needfulPage(needs))(Container),
  onEnter: (route)=>{
    master.start( function*(getState) { // redirect on acceptance
      while (true) {
        const {data:{projectKey, claimedProfileKey,isComplete}} = yield take( Invites.taker(route.params.inviteKey) )
        const userProfileKey = Users.select.authed(getState())
        if (isComplete && (userProfileKey==claimedProfileKey)) {
          yield put( pushPath('/project/' + projectKey) )
          return
        }
      }
    })
  }
}
