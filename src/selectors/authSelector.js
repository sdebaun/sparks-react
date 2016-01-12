import { createSelector } from 'reselect'

export default createSelector(
  (state)=>state.auth,
  (state)=>{ return { auth: state.auth } }
)