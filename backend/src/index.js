import Firebase from 'firebase'
import FirebaseQueue from 'firebase-queue'

const mutate = ({client,domain,...action},progress,resolve,reject)=>{
  console.log('received',client,domain,action)
  getHandlerFor(domain)(action)
  .then( (result)=>respondTo(client,result) )
  .then( resolve )
}

const ref = new Firebase('http://sparks-development.firebaseio.com')
const queue = new FirebaseQueue(ref, mutate)

const handlerNotFound = (domain)=> (action)=> console.log("No handler for",domain," could not process ",action)
const getHandlerFor = (domain)=> handlers[domain] || handlerNotFound(domain)

const handlers = {
  project: ({type,payload})=>{
    switch (type) {
      case "create":
        ref.child('project').push(payload).then( (snap)=>pushResult('project', snap) )
    }    
  }
}

const pushResult = (domain, snap)=>{ return {domain:'project',key:snap.ref().key()} }

const getResponseRef = (client)=>ref.child('response').child(client)

const respondTo = (client,result)=>getResponseRef(client).push(result)



// const sendInvite = (invite)=>{
//   return new Promise( (resolve,reject)=>{
//     console.log("send invite email", invite)
//     setTimeout(resolve,1000)
//   })

// }

// const listen = ()=>{

//   fb.child('Invites').on('child_added', (snap)=>{
//     const invite = snap.val()
//     if (!val.lastSent) sendInvite(invite).then(()=>snap.set('lastSent',1))
//   })

// }

// export listen