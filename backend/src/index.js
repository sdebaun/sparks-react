import Firebase from 'firebase'
import { mutator, Collection, FirebaseRespondingQueue, createProfileFromOauth } from './util'

const fbRoot = new Firebase('http://sparks-development.firebaseio.com')

const getAuth = (client)=>
  fbRoot.child('Users').child(client).once('value')
  .then( (userSnap)=>
    userSnap.val() && fbRoot.child('Profiles').child(userSnap.val()).once('value')
    .then( (profileSnap)=>{ return {key:userSnap.val(),...profileSnap.val()} } )
  )

const Users = new Collection(fbRoot.child('Users'))
const Projects = new Collection(fbRoot.child('Projects'))
const Profiles = new Collection(fbRoot.child('Profiles'))
const ProjectImages = new Collection(fbRoot.child('ProjectImages'))
const Teams = new Collection(fbRoot.child('Teams'))

const handlers = {

  Profiles: {
    register: (payload,client)=>
      getAuth(client).then( profile=> !profile &&
        Profiles.push(createProfileFromOauth(payload))
        .then( ref=>Users.set(client,ref.key()) && ref.key() )
      ),
    confirm: ({key,vals},client)=>
      getAuth(client).then( profile=> (profile.key==key) &&
        Profiles.update(key,{isConfirmed:true,...vals}) &&
        null
      )
  },

  Projects: {
    create: (payload,client)=>
      getAuth(client).then( profile=> profile.isAdmin &&
        Projects.push(payload)
        .then( ref=>ref.key() )
      ),
    update: ({key,vals},client)=>
      Projects.update(key,vals) // auth check if project manager
  },

  ProjectImages: {
    set: ({key,val},client)=>
      ProjectImages.set(key,val) // auth check if project manager
  },

  Teams: {
    create: (payload,client)=>
      Teams.push(payload).then( ref=>ref.key() ), // auth check if project manager
    update: ({key,vals},client)=>
      Teams.update(key,vals) // auth check if project manager or team lead
  }
}

const responder = (client,response)=>fbRoot.child('Responses').child(client).push(response)

const queue = new FirebaseRespondingQueue(fbRoot, mutator(handlers), responder)
