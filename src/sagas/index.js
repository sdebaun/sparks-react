import { take, put } from 'redux-saga';
import { LOCAL_UPDATE, AUTH_SUCCESS, AUTH_CLEAR } from 'lib/reduxfire/types';
import { pushPath } from 'redux-simple-router'
import { ACCEPT_INVITE } from 'actions'

import remote, { Profiles, Users, Invites, Organizers } from 'remote'
// import { authedProfileKeySelector } from 'selectors'

function* startListening() {
  yield put(remote.auth.listen())
}

function* loadAuthedUser() {
  while(true) {
    const {authData:{uid}} = yield take(AUTH_SUCCESS)
    yield put(Users.actions.watch(uid))
  }
}

function* authedUserUpdated(getState) {
  return yield take( (action)=>{
    const state = getState()
    return state.auth && (action.type==LOCAL_UPDATE) &&
      (action.collection=='Users') &&
      (action.key==state.auth.uid)
  })
}

function* loadUserProfile(getState) {
  while(true) {
    let userResult = yield* authedUserUpdated(getState)
    const profileKey = userResult.data
    if (profileKey) {
      yield put(Profiles.actions.watch(profileKey))
    }
  }
}

function* loadUserOrganizers(getState) {
  while(true) {
    let userResult = yield* authedUserUpdated(getState)
    const profileKey = userResult.data
    if (profileKey) {
      yield put(Organizers.actions.query({orderByChild:'profileKey', equalTo:profileKey}))
    }
  }
}

function* createUserProfileIfMissing(getState) {
  while(true) {
    let userResult = yield* authedUserUpdated(getState)
    const profileKey = userResult.data
    if (!profileKey) {
      const authData = getState().auth
      const newProfileRef = yield put(Profiles.actions.create(authData))
      yield put( Users.actions.set(authData.uid, newProfileRef.key()) )
    }
  }
}

function* authedProfileUpdated(getState) {
  return yield take( (action)=>{
    const authedProfileKey = Users.select.authed(getState())
    return (action.type==LOCAL_UPDATE) &&
      (action.collection=='Profiles') &&
      (action.key==authedProfileKey)
  })
}

function* loginRedirect(getState) {
  while(true) {
    const profileResult = yield* authedProfileUpdated(getState)
    if (!profileResult.data.isConfirmed) {
      const originalRoute = getState().routing.path
      yield* confirmProfile(getState)
      yield put( pushPath(originalRoute) )
    }
    if (getState().routing.path.includes('/#?')) { yield put( pushPath('/dash') ) }
  }
}

function* confirmProfile(getState) {
  yield put( pushPath('/confirmProfile') )
  yield* authedProfileUpdated(getState)
}

function* logoutRedirect(getState) {
  while(true) {
    yield take(AUTH_CLEAR)
    const {routing: { path } } = getState()
    if (path.includes('/dash') || path.includes('/project')) {
      yield put( pushPath('/') )
    }
  }
}

// function* projectInviteAcceptance(getState) {
//   while(true) {
//     const inviteAction = yield take(ACCEPT_INVITE)
//     const profileKey = Users.select.authed(getState())
//     yield put(Invites.update(inviteAction.key,{claimingProfileKey:profileKey}))
//     // this behavior should be triggered on the server when claimingProfileKey is set on an invite
//     yield put(Organizers.push({profileKey:profileKey,projectKey:inviteAction.invite.projectKey}))
//   }
// }

import SagaMaster from 'lib/SagaMaster'
export const master = new SagaMaster()

export const sagas = [startListening,
  logoutRedirect, loginRedirect,
  loadAuthedUser, loadUserProfile, createUserProfileIfMissing,
  loadUserOrganizers
  ]