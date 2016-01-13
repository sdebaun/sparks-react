// import { createSelector } from 'reselect'

const currentProfileSelector = (state)=>
  state.auth && state.auth.uid &&
  state.data.Users && state.data.Users[state.auth.uid] &&
  state.data.Profiles && state.data.Profiles[state.data.Users[state.auth.uid]]

export { currentProfileSelector }