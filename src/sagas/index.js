import { take, put } from 'redux-saga';
import { LOCAL_UPDATE, AUTH_SUCCESS, AUTH_CLEAR } from 'lib/reduxfire/types';
import { pushPath } from 'redux-simple-router'
import { ACCEPT_INVITE } from 'actions'

import remote, { Profiles, Users, Invites, Organizers } from 'remote'

function* startListening() {
  yield put(remote.auth.listen())
}

function* loadAuthedUser() {
  while(true) {
    const {authData:{uid}} = yield take(AUTH_SUCCESS)
    yield put(Users.actions.watch(uid))
  }
}

function* loadUserData(getState) {
  while(true) {
    const {key:uid,data:profileKey} = yield take( Users.takeAny )
    if (profileKey && (uid == getState().auth.uid)) {
      yield put(Profiles.actions.watch(profileKey))
      yield put(Organizers.actions.query({orderByChild:'profileKey', equalTo:profileKey}))
    }
  }
}

function* createUserProfileIfMissing(getState) {
  while(true) {
    const {key,data:profileKey} = yield take( Users.takeAny )
    const {auth} = getState()
    if (!profileKey && (userResult.key == auth.uid)) {
      const newProfileRef = yield put(Profiles.actions.create(auth))
      yield put( Users.actions.set(auth.uid, newProfileRef.key()) )
    }
  }
}

const LOGIN_REDIRECT_AWAY = ['/#?','/','/confirmProfile']
function* loginRedirect(getState) {
  while(true) {
    const {key,data} = yield take( Profiles.takeAny )
    if (key==Users.select.authed(getState())) {
      const {routing:{path}} = getState()
      if (!data.isConfirmed) {
        yield put( pushPath('/confirmProfile') )
        yield take( Profiles.taker(Users.select.authed(getState())) )
        yield put( pushPath(path) )
      }
      if (LOGIN_REDIRECT_AWAY.includes(path)) { yield put( pushPath('/dash') ) }
    }
  }
}

const LOGOUT_REDIRECT_AWAY = ['/dash','/project','/confirmProfile']
function* logoutRedirect(getState) {
  while(true) {
    yield take(AUTH_CLEAR)
    const {routing: { path } } = getState()
    if (LOGOUT_REDIRECT_AWAY.reduce( (acc,val)=>acc || path.includes(val) )) {
      yield put( pushPath('/') )
    }
  }
}

import SagaMaster from 'lib/SagaMaster'
export const master = new SagaMaster()

export const sagas = [
  startListening, loadAuthedUser,
  loadUserData, createUserProfileIfMissing,
  loginRedirect, logoutRedirect
  ]