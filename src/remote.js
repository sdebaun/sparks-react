import { Reduxfire } from './lib/reduxfire'
import { createSelector } from 'reselect'

const remote = new Reduxfire('https://sparks-development.firebaseIO.com');
export default remote;

export const Users = remote.data.model('Users')
Object.assign(Users.select,{
  authed: createSelector(
    remote.auth.select.uid,
    Users.select.collection,
    (uid,users)=>users && users[uid]
  )
})

export const Profiles = remote.data.model('Profiles', {
  actions: {
    register: (authData)=>Profiles.actions.remote('register',authData),
    confirm: (key,vals)=>Profiles.actions.remote('confirm',{key,vals})
  }
})
Object.assign(Profiles.select,{
  authed: createSelector(
    Users.select.authed, // is uid=>profileKey
    Profiles.select.collection,
    (profileKey,profiles)=>profiles && profiles[profileKey]
  )
})

export const Projects = remote.data.model('Projects', {
  actions: {
    create: (data)=>Projects.actions.remote('create',data),
    update: (key,vals)=>Projects.actions.remote('update',{key,vals})
  }
})

export const ProjectImages = remote.data.model('ProjectImages', {
  actions: {
    set: (key,val)=>ProjectImages.actions.remote('set',{key,val})
  }
})

export const Organizers = remote.data.model('Organizers', {
  actions: {
    create: function(projectKey,authorProfileKey,fields) {
      return Organizers.actions.remote('create', {projectKey,authorProfileKey,...fields})
    },
    accept: function(organizerKey) {
      return Organizers.actions.remote('accept', {organizerKey})
    }
  }
})
Object.assign(Organizers.select,{
  authed: createSelector(
    Users.select.authed,
    Organizers.select.rows,
    (userProfileKey,organizers)=> organizers.filter( o=>userProfileKey && (o.profileKey==userProfileKey) )
  )
})
Object.assign(Organizers.select,{
  authedProjectKeys: createSelector(
    Organizers.select.authed,
    (organizers)=>organizers.map(o=>o.projectKey)
  )
})

export const Teams = remote.data.model('Teams', {
  actions: {
    create: (data)=>Teams.actions.remote('create',data)
  }
})

export const TeamImages = remote.data.model('TeamImages', {
  actions: {
    set: (key,val)=>TeamImages.actions.remote('set',{key,val})
  }
})

export const Exchanges = remote.data.model('Exchanges', {
  actions: {
    create: (data)=>Exchanges.actions.remote('create',data)
  }
})

export const Leads = remote.data.model('Leads', {
  actions: {
    create: function(teamKey,authorProfileKey,fields) {
      return Leads.actions.remote('create', {teamKey,authorProfileKey,...fields})
    },
    accept: function(leadKey) {
      return Leads.actions.remote('accept', {leadKey})
    }
  }
})
Object.assign(Leads.select,{
  authed: createSelector(
    Users.select.authed,
    Leads.select.rows,
    (userProfileKey,leads)=> leads.filter( l=>userProfileKey && (l.profileKey==userProfileKey) )
  )
})
Object.assign(Leads.select,{
  authedTeamKeys: createSelector(
    Leads.select.authed,
    (leads)=>leads.map(l=>l.teamKey)
  )
})

export const Opps = remote.data.model('Opps', {
  actions: {
    create: (data)=>Opps.actions.remote('create',data),
    update: (key,vals)=>Opps.actions.remote('update',{key,vals})
  }
})



// function OAuthToProfile(authData) {
//   const provider = authData.provider,
//     d = authData[provider];
//   switch (provider) {
//     case 'google':
//       return {
//         uid: authData.uid,
//         fullName: d.displayName,
//         email: d.email,
//         profileImageURL: d.profileImageURL
//       }
//     case 'facebook':
//       return {
//         uid: authData.uid,
//         fullName: 'FB Full name',
//         email: 'FB email',
//         profileImageURL: 'FB image url'
//       }
//     default:
//       throw 'Can only handle google or facebook oauth.'
//   }
// }
