import Firebase from 'firebase'

const fb = new Firebase()

const sendInvite = (invite)=>{
  return new Promise( (resolve,reject)=>{
    console.log("send invite email", invite)
    setTimeout(resolve,1000)
  })

}

const listen = ()=>{

  fb.child('Invites').on('child_added', (snap)=>{
    const invite = snap.val()
    if (!val.lastSent) sendInvite(invite).then(()=>snap.set('lastSent',1))
  })

}

export listen