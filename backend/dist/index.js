'use strict';

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

var _firebaseQueue = require('firebase-queue');

var _firebaseQueue2 = _interopRequireDefault(_firebaseQueue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var mutate = function mutate(_ref, progress, resolve, reject) {
  var client = _ref.client;
  var domain = _ref.domain;

  var action = _objectWithoutProperties(_ref, ['client', 'domain']);

  console.log('received', client, domain, action);
  getHandlerFor(domain)(action).then(function (result) {
    return respondTo(client, result);
  }).then(resolve);
};

var ref = new _firebase2.default('http://sparks-development.firebaseio.com');
var queue = new _firebaseQueue2.default(ref, mutate);

var handlerNotFound = function handlerNotFound(domain) {
  return function (action) {
    return console.log("No handler for", domain, " could not process ", action);
  };
};
var getHandlerFor = function getHandlerFor(domain) {
  return handlers[domain] || handlerNotFound(domain);
};

var handlers = {
  project: function project(_ref2) {
    var type = _ref2.type;
    var payload = _ref2.payload;

    switch (type) {
      case "create":
        ref.child('project').push(payload).then(function (snap) {
          return pushResult('project', snap);
        });
    }
  }
};

var pushResult = function pushResult(domain, snap) {
  return { domain: 'project', key: snap.ref().key() };
};

var getResponseRef = function getResponseRef(client) {
  return ref.child('response').child(client);
};

var respondTo = function respondTo(client, result) {
  return getResponseRef(client).push(result);
};

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