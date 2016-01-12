import { Reduxfire } from './lib/reduxfire'

const remote = new Reduxfire('https://sparks-development.firebaseIO.com');
export default remote;

// export Uid = remote.model