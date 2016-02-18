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
const Offers = new Collection(fbRoot.child('Offers'))

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
      Projects.update(key,vals).then( ()=>{ // auth check if project manager
        Organizers.updateBy('projectKey',key,{project:vals})
        Teams.updateBy('projectKey',key,{project:vals})
        Opps.updateBy('projectKey',key,{project:vals})
        Leads.updateBy('projectKey',key,{project:vals})
        return true
      })
  },

  Organizers: {
    create: (payload,client)=> // auth check if project manager
      Projects.get(payload.projectKey).then( (snap)=>
        Organizers.push(Object.assign(payload,{project:snap.val()}))
        .then( ref=>ref.key() )
      ),
    accept: ({organizerKey},client)=>
      getAuth(client).then( profile=>
        Organizers.update(organizerKey,{profileKey:profile.key,profile})
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
    create: (payload,client)=> // auth check if project manager
      Projects.get(payload.projectKey)
      .then( projectSnap=>
        Teams.push({...payload,project:projectSnap.val()})
        .then( ref=>ref.key() )
      ), 
    update: ({key,vals},client)=>
      Teams.update(key,vals).then( ()=>{ // auth check if project manager
        Leads.updateBy('teamKey',key,{team:vals})
        return true
      })
  },

  TeamImages: {
    set: ({key,val},client)=>
      TeamImages.set(key,val) // auth check if project manager or team lead
  },

  Leads: {
    create: (payload,client)=>
      Teams.get(payload.teamKey)
      .then( teamSnap=> {
        const {project,...team} = teamSnap.val(),
          projectKey = team.projectKey
        Leads.push({...payload,team,projectKey,project})
        .then( ref=>ref.key() ) // auth check if project manager        
      }),
    accept: ({leadKey},client)=>
      getAuth(client).then( profile=>
        Leads.update(leadKey,{profileKey:profile.key,profile}) // get profileKey from auth object
      )
  },

  Opps: {
    create: (payload,client)=> // auth check if project manager
      Projects.get(payload.projectKey)
      .then( projectSnap=>
        Opps.push({...payload,project:projectSnap.val()})
        .then( ref=>ref.key() )
      ), 
    update: ({key,vals},client)=> // auth check if project manager or team lead
      Opps.update(key,vals).then( ()=>{
        Offers.updateBy('oppKey',key,{opp:vals})
        return true
      }), 
    setPublic: ({key,val})=> // auth check if project manager or team lead
      Opps.update(key,{isPublic:!!val})
  },

  Offers: {
    create: (payload,client)=>
      Opps.get(payload.oppKey)
      .then( oppSnap=>
        Offers.push({...payload,opp:oppSnap.val()})
        .then( ref=>ref.key() )
        ),
    update: ({key,vals},client)=>
      Offers.update(key,vals)
  }

}

const responder = (client,response)=>fbRoot.child('Responses').child(client).push(response)

const queue = new FirebaseRespondingQueue(fbRoot, mutator(handlers), responder)
