import { Reduxfire } from './lib/reduxfire'
import { createSelector } from 'reselect'

const remote = new Reduxfire('https://sparks-development.firebaseIO.com');
export default remote;

export const Users = remote.data.model('Users')
Object.assign(Users.select,{
  authed: createSelector(
    remote.auth.select.uid,
    Users.select.collection,
    (uid,users)=>users[uid]
  )
})

export const Profiles = remote.data.model('Profiles', {
  actions: {
    create: (authData)=>Profiles.actions.push(OAuthToProfile(authData)),
    confirm: (key,data)=>Profiles.actions.update(key,Object.assign({isConfirmed:true},data))
  }
})
Object.assign(Profiles.select,{
  authed: createSelector(
    Users.select.authed, // is uid=>profileKey
    Profiles.select.collection,
    (profileKey,profiles)=>profiles[profileKey]
  )
})

export const Projects = remote.data.model('Projects')

export const Organizers = remote.data.model('Organizers')
Object.assign(Organizers.select,{
  authed: createSelector(
    Users.select.authed,
    Organizers.select.rows,
    (userProfileKey,organizers)=> organizers.filter( o=>o.profileKey==userProfileKey )
  )
})
Object.assign(Organizers.select,{
  authedProjectKeys: createSelector(
    Organizers.select.authed,
    (organizers)=>organizers.map(o=>o.projectKey)
  )
})

export const Invites = remote.data.model('Invites', {
  actions: {
    create: function(fields,projectKey,authorProfileKey) {
      return Invites.actions.push({...fields,projectKey,authorProfileKey})
    },
    accept: function(invite,profile) {
      return Invites.actions.update(invite.$key,{
        claimedProfileKey: profile.$key
      })
    }
  }
})

function OAuthToProfile(authData) {
  const provider = authData.provider,
    d = authData[provider];
  switch (provider) {
    case 'google':
      return {
        uid: authData.uid,
        fullName: d.displayName,
        email: d.email,
        profileImageURL: d.profileImageURL
      }
    case 'facebook':
      return {
        uid: authData.uid,
        fullName: 'FB Full name',
        email: 'FB email',
        profileImageURL: 'FB image url'
      }
    default:
      throw 'Can only handle google or facebook oauth.'
  }
}
