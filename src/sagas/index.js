import { take, put } from 'redux-saga';
import { LOCAL_UPDATE, AUTH_SUCCESS, AUTH_CLEAR } from 'lib/reduxfire/types';
import { pushPath } from 'redux-simple-router'

import remote, { Profiles, Users } from 'remote'

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
    console.log("user loaded with profileKey", profileKey)
    if (!profileKey) {
      const authData = getState().auth
      console.log("creating user for",authData.uid,authData)
      Profiles.push(authData)().then((newKey)=>{
        console.log("new profile created, key:",newKey)
        Users.set(authData.uid,newKey)()
      })
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
    if (!profileResult.data.isConfirmed) {
      const originalRoute = getState().routing.path
      yield* confirmProfile(getState)
      yield put( pushPath(originalRoute) )
    }
    if (!getState().routing.path.includes('/joinProject')) { yield put( pushPath('/dash') ) }
  }
}

function* confirmProfile(getState) {
  yield put( pushPath('/confirmProfile') )
  const profileResult = yield take( (action)=>{
    const state = getState()
    return state.auth && state.data.Users && state.data.Users[state.auth.uid] &&
      (action.type==LOCAL_UPDATE) &&
      (action.collection=='Profiles') &&
      (action.key==state.data.Users[state.auth.uid])
  })
}

function* logoutRedirect(getState) {
  while(true) {
    yield take(AUTH_CLEAR)
    if (getState().routing.path=='/dash') {
      yield put( pushPath('/') )
    }
  }
}

export default [logoutRedirect, loginRedirect, loadAuthedUser, loadUserProfile]