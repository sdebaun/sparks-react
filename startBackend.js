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
