import Firebase from 'firebase'
import { mutator, Collection, FirebaseRespondingQueue, createProfileFromOauth } from './util'

const fbRoot = new Firebase('http://sparks-development.firebaseio.com')

const getAuth = (client)=>
  Users.get(client)
  .then( (userSnap)=>
    userSnap.val() && Profiles.get(userSnap.val())
    // should also add organizers, leads, etc. (relationships)
    .then( (profileSnap)=>{ return {key:userSnap.val(),...profileSnap.val()} } )
  )

const Users = new Collection(fbRoot.child('Users'))
const Profiles = new Collection(fbRoot.child('Profiles'))

const Projects = new Collection(fbRoot.child('Projects'))
const ProjectImages = new Collection(fbRoot.child('ProjectImages'))
const Organizers = new Collection(fbRoot.child('Organizers'))

const Teams = new Collection(fbRoot.child('Teams'))
const TeamImages = new Collection(fbRoot.child('TeamImages'))
const Leads = new Collection(fbRoot.child('Leads'))

const Opps = new Collection(fbRoot.child('Opps'))
const Exchanges = new Collection(fbRoot.child('Exchanges'))

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

  Organizers: {
    create: (payload,client)=>
      Organizers.push(payload).then( ref=>ref.key() ), // auth check if project manager
    accept: ({organizerKey},client)=>
      getAuth(client).then( profile=>
        Organizers.update(organizerKey,{profileKey:profile.key})
        .then( ()=>
          Organizers.get(organizerKey)
          .then( organizerSnap=>organizerSnap.val().projectKey )
        )
      )    
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
  },

  TeamImages: {
    set: ({key,val},client)=>
      TeamImages.set(key,val) // auth check if project manager or team lead
  },

  Leads: {
    create: (payload,client)=>
      Teams.get(payload.teamKey)
      .then( teamSnap=> {
        payload.projectKey = teamSnap.val().projectKey
        Leads.push(payload).then( ref=>ref.key() ) // auth check if project manager        
      } ),
    accept: ({leadKey},client)=>
      getAuth(client).then( profile=>
        Leads.update(leadKey,{profileKey:profile.key}) // get profileKey from auth object
      )
  },

  Opps: {
    create: (payload,client)=>
      Opps.push(payload).then( ref=>ref.key() ), // auth check if project manager
    update: ({key,vals},client)=>
      Opps.update(key,vals), // auth check if project manager or team lead
    setPublic: ({key,val})=>
      Opps.update(key,{isPublic:!!val}) // auth check if project manager or team lead
  },

  Exchanges: {
    create: (payload,client)=>
      Exchanges.push(payload).then( ref=>ref.key() ), // auth check if project manager
  }

}

const responder = (client,response)=>fbRoot.child('Responses').child(client).push(response)

const queue = new FirebaseRespondingQueue(fbRoot, mutator(handlers), responder)
