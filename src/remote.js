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
    confirm: (profileKey)=>Profiles.actions.update(profileKey,{isConfirmed:true})
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

export const Invites = remote.data.model('Invites', {
  actions: {
    create: function(fields,projectKey,authorProfileKey) {
      return Invites.actions.push({...fields,projectKey,authorProfileKey})
    },
    accept: function(invite,profile) {
      return Invites.actions.update(invite.$key,{
        confirmedProfileKey: profile.$key
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
