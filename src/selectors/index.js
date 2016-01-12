// import { createSelector } from 'reselect'

// const authSelector = (state)=>state.auth
// const uidSelector = (state)=>state.auth.uid

// const uidSelector = createSelector(
//   authSelector,
//   (auth)=>{ return { uid: auth && auth.uid }}
// )

// const currentUserSelector = createSelector(
//   uidSelector,
//   (state)=>Users.selectors.loaded(state,state.auth.uid)
//   (state)=>Users.selectors.
// )

// const currentProfileSelector = createSelector(
//   uidSelector,
//   (state)=>Users.selectors.Loaded(state,state.auth.uid)
// )


const currentProfileSelector = (state)=>
  state.auth && state.auth.uid &&
  state.data.Users && state.data.Users[state.auth.uid] &&
  state.data.Profiles && state.data.Profiles[state.data.Users[state.auth.uid]]

export { currentProfileSelector }