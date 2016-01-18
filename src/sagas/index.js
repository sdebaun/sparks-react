import { take, put } from 'redux-saga';
import { LOCAL_UPDATE, AUTH_SUCCESS, AUTH_CLEAR } from 'lib/reduxfire/types';
import { pushPath } from 'redux-simple-router'

import { Profiles, Users } from 'remote'

import remote from 'remote'

function* loadAuthedUser() {
  while(true) {
    const authResult = yield take(AUTH_SUCCESS)
    yield put(remote.watch('Users', authResult.authData.uid))
  }  
}

function* loadUserProfile(getState) {
  while(true) {
    let userResult = yield take( (action)=>{
      const state = getState()
      return state.auth && (action.type==LOCAL_UPDATE) &&
        (action.collection=='Users') &&
        (action.key==state.auth.uid)
    })
    const profileKey = userResult.data
    console.log("loadUserProfile:profileKey",profileKey)
    if (!profileKey) {
      Profiles.push(authResult.authData).then((newKey)=>Users.set(uid,newKey))
    } else {
      yield put(remote.watch('Profiles', profileKey))
    }
  }
}

function* loginRedirect(getState) {
  while(true) {
    const profileResult = yield take( (action)=>{
      const state = getState()
      return state.auth && state.data.Users && state.data.Users[state.auth.uid] &&
        (action.type==LOCAL_UPDATE) &&
        (action.collection=='Profiles') &&
        (action.key==state.data.Users[state.auth.uid])
    })
    yield put( pushPath('/dash') )
  }
}

function* logoutRedirect() {
  while(true) {
    yield take(AUTH_CLEAR)
    yield put( pushPath('/') )
  }
}

export default [logoutRedirect, loginRedirect, loadAuthedUser, loadUserProfile]