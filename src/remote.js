import { Reduxfire } from './lib/reduxfire'

const remote = new Reduxfire('https://sparks-development.firebaseIO.com');
export default remote;

const Profiles = remote.data.model('Profiles')
const Users = remote.data.model('Users')
const Projects = remote.data.model('Projects')
const Organizers = remote.data.model('Organizers')

const Invites = remote.data.model('Invites', {
  actions: {
    create: function(fields,projectKey,authorProfileKey) {      
      return Invites.actions.push({...fields,projectKey,authorProfileKey})
    }
  }
})

export { Profiles, Users, Projects, Invites, Organizers }
