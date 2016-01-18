// import { createSelector } from 'reselect'

const authedUidSelector = (state)=>
  state.auth && state.auth.uid

const authedProfileKeySelector = (state)=>
  authedUidSelector(state) &&
  state.data.Users && state.data.Users[state.auth.uid]

const authedProfileSelector = (state)=>
  authedProfileKeySelector(state) &&
  state.data.Profiles && state.data.Profiles[state.data.Users[state.auth.uid]]

export { authedUidSelector, authedProfileKeySelector, authedProfileSelector }