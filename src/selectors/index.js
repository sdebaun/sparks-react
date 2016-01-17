// import { createSelector } from 'reselect'

const currentProfileKeySelector = (state)=>
  state.auth && state.auth.uid &&
  state.data.Users && state.data.Users[state.auth.uid]

const currentProfileSelector = (state)=>
  currentProfileKeySelector(state) &&
  state.data.Profiles && state.data.Profiles[state.data.Users[state.auth.uid]]

export { currentProfileKeySelector, currentProfileSelector }