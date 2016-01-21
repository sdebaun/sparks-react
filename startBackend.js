var Firebase = require('firebase');

var fb = new Firebase('https://sparks-development.firebaseIO.com')

var sendInvite = function(invite) {
  return new Promise( function(resolve,reject) {
    console.log("send invite email", invite)
    setTimeout(resolve,1000)
  })
}

fb.child('Invites').on('child_added', function(snap) {
  var invite = snap.val()
  if (!invite.lastSent) {
    sendInvite(invite)
    .then(function() {
      console.log("sent")
      snap.ref().child('lastSent').set(Firebase.ServerValue.TIMESTAMP)
    })
    .catch(function(err){
      console.log("err",err)
    })
  }
})

fb.child('Invites').on('child_changed', function(snap){
  var invite = snap.val()
  if (!invite.isComplete && invite.claimedProfileKey) {
    console.log('invite accepted, add organizer', invite)
    fb.child('Organizers').push({
      profileKey: invite.claimedProfileKey,
      projectKey: invite.projectKey
    })
    snap.ref().update({isComplete:true})
  }
})