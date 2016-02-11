import FirebaseQueue from 'firebase-queue'

export const mutator = handlers => ({client,collection,op,payload}) => {
  console.log('received',client,collection,op)
  const handler = (handlers[collection] && handlers[collection][op]) || handlerNotFound(collection)
  return handler(payload,client)
    .then( (result)=>result && {collection,op,result} )
}

export class Collection {
  constructor(ref) { this.ref = ref }

  push(payload) { return this.ref.push(payload) }
  set(key,val) { return this.ref.child(key).set(val) }
  update(key,vals) { return this.ref.child(key).update(vals) }
}

export class FirebaseRespondingQueue {
  constructor(ref,handle,respond) {
    this.queue = new FirebaseQueue(ref, (data,progress,resolve,reject)=>{
      handle(data)
      .then( (result)=>result && respond(data.client,result) )
      .then( resolve )
      .catch( (err)=>{
        console.log('Error in queue handler:',err,err.stack)
        reject(err)
      } )
    })
  }
}

export const createProfileFromOauth = authData => {
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



  // constructor(ref,ops) {
  //   const actions = {
  //     push: payload=>ref.push(payload),
  //     set: (key,val)=>ref.child(key).set(val),
  //     update: (key,vals)=>ref.child(key).update(vals),
  //     response: (op,payload)=>{ return {collection:ref.key(),op,payload} }      
  //   }
  //   for (let k of Object.keys(ops)) {
  //     this[k] = partialRight(ops[k],[actions]).bind(this)
  //   }
  // }
