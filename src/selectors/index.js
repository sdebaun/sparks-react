import { createSelector } from 'reselect'

const dataUsers = (state)=>state.data.Users
const dataProfiles = (state)=>state.data.Profiles
const dataInvites = (state)=>state.data.Invites
const dataOrganizers = (state)=>state.data.Organizers

const rowMapper = (collection)=>collection && Object.keys(collection).map(k=>Object.assign({$key:k},collection[k]))

const dataOrganizersRows = createSelector(
  dataOrganizers,
  (organizers)=>rowMapper(organizers)
)

const dataOrganizersRowsByProjectKey = createSelector(
  (state,ownProps)=>ownProps.projectKey,
  dataOrganizersRows,
  (projectKey,organizers)=>organizers && organizers.filter(organizer=>organizer.projectKey==projectKey)
)

const dataInvitesRows = createSelector(
  dataInvites,
  (invites)=>rowMapper(invites)
  // (invites)=>invites && Object.keys(invites).map(k=>Object.assign({$key:k},invites[k]))
)

const dataInvitesRowsByProjectKey = createSelector(
  (state,ownProps)=>ownProps.projectKey,
  dataInvitesRows,
  (projectKey,invites)=>invites && invites.filter(invite=>invite.projectKey==projectKey)
)

const authedUidSelector = (state)=>state.auth && state.auth.uid

const authedProfileKeySelector = createSelector(
  authedUidSelector,
  dataUsers,
  (uid,users)=>users && users[uid]
)

const authedProfileSelector = createSelector(
  authedProfileKeySelector,
  dataProfiles,
  (profileKey,profiles)=>profiles && profiles[profileKey]
)

export { authedUidSelector, authedProfileKeySelector, authedProfileSelector,
  dataInvitesRows, dataInvitesRowsByProjectKey, dataOrganizersRowsByProjectKey }