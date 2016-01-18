import { Reduxfire } from './lib/reduxfire'

const remote = new Reduxfire('https://sparks-development.firebaseIO.com');
export default remote;

const Profiles = remote.data.model('Profiles')
const Users = remote.data.model('Users')
const Projects = remote.data.model('Projects')
const Invites = remote.data.model('Invites')
const Organizers = remote.data.model('Organizers')

export { Profiles, Users, Projects, Invites, Organizers }
