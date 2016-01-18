import { Reduxfire } from './lib/reduxfire'

const remote = new Reduxfire('https://sparks-development.firebaseIO.com');
export default remote;

const Users = remote.data.model('Users')

const Profiles = remote.data.model('Profiles', {
  actions: {
    create: (authData)=>Profiles.actions.push(OAuthToProfile(authData)),
    confirm: (profileKey)=>Profiles.actions.update(profileKey,{isConfirmed:true})
  }
})

const Projects = remote.data.model('Projects')
const Organizers = remote.data.model('Organizers')

const Invites = remote.data.model('Invites', {
  actions: {
    create: function(fields,projectKey,authorProfileKey) {
      return Invites.actions.push({...fields,projectKey,authorProfileKey})
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

export { Profiles, Users, Projects, Invites, Organizers }
