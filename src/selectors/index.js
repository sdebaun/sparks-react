import { createSelector } from 'reselect'

export const dataUsers = (state)=>state.data.Users
export const dataProfiles = (state)=>state.data.Profiles
export const dataInvites = (state)=>state.data.Invites
export const dataOrganizers = (state)=>state.data.Organizers

const rowMapper = (collection)=>collection && Object.keys(collection).map(k=>Object.assign({$key:k},collection[k]))

// export const dataOrganizersRows = createSelector(
//   dataOrganizers,
//   (organizers)=>rowMapper(organizers)
// )

// export const dataOrganizersRowsByProjectKey = createSelector(
//   (state,ownProps)=>ownProps.projectKey,
//   dataOrganizersRows,
//   (projectKey,organizers)=>organizers && organizers.filter(organizer=>organizer.projectKey==projectKey)
// )

// export const dataInvitesRows = createSelector(
//   dataInvites,
//   (invites)=>rowMapper(invites)
//   // (invites)=>invites && Object.keys(invites).map(k=>Object.assign({$key:k},invites[k]))
// )

// export const dataInvitesRowsByProjectKey = createSelector(
//   (state,ownProps)=>ownProps.projectKey,
//   dataInvitesRows,
//   (projectKey,invites)=>invites && invites.filter(invite=>invite.projectKey==projectKey)
// )

// export const authedUidSelector = (state)=>state.auth && state.auth.uid

// export const authedProfileKeySelector = createSelector(
//   authedUidSelector,
//   dataUsers,
//   (uid,users)=>users && users[uid]
// )

// export const authedProfileSelector = createSelector(
//   authedProfileKeySelector,
//   dataProfiles,
//   (profileKey,profiles)=>profiles && profiles[profileKey]
// )
