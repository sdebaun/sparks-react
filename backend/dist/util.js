'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createProfileFromOauth = exports.FirebaseRespondingQueue = exports.Collection = exports.mutator = undefined;

var _firebaseQueue = require('firebase-queue');

var _firebaseQueue2 = _interopRequireDefault(_firebaseQueue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var handlerNotFound = function handlerNotFound(collection) {
  return function (payload, client) {
    return new Promise(function (resolve, reject) {
      console.log('Could not find handler for collection', collection);
      resolve();
    });
  };
};

var mutator = exports.mutator = function mutator(handlers) {
  return function (_ref) {
    var client = _ref.client;
    var collection = _ref.collection;
    var op = _ref.op;
    var payload = _ref.payload;

    console.log('received', client, collection, op);
    var handler = handlers[collection] && handlers[collection][op] || handlerNotFound(collection);
    return handler(payload, client).then(function (result) {
      return result && { collection: collection, op: op, result: result };
    });
  };
};

var Collection = exports.Collection = (function () {
  function Collection(ref) {
    _classCallCheck(this, Collection);

    this.ref = ref;
  }

  _createClass(Collection, [{
    key: 'child',
    value: function child(key) {
      return this.ref.child(key);
    }
  }, {
    key: 'push',
    value: function push(payload) {
      return this.ref.push(payload);
    }
  }, {
    key: 'set',
    value: function set(key, val) {
      return this.ref.child(key).set(val);
    }
  }, {
    key: 'update',
    value: function update(key, vals) {
      return this.ref.child(key).update(vals);
    }
  }, {
    key: 'get',
    value: function get(key) {
      return this.ref.child(key).once('value');
    }
  }, {
    key: 'updateBy',
    value: function updateBy(field, key, vals) {
      var _this = this;

      return this.ref.orderByChild(field).equalTo(key).once('value').then(function (snap) {
        console.log('updating from', key, 'with', vals);
        var childs = snap.val();
        console.log('childs', childs);
        Object.keys(snap.val()).map(function (childKey) {
          return _this.update(childKey, vals);
        });
        return true;
      });
    }
  }]);

  return Collection;
})();

var FirebaseRespondingQueue = exports.FirebaseRespondingQueue = function FirebaseRespondingQueue(ref, handle, respond) {
  _classCallCheck(this, FirebaseRespondingQueue);

  this.queue = new _firebaseQueue2.default(ref, function (data, progress, resolve, reject) {
    handle(data).then(function (result) {
      return result && respond(data.client, result);
    }).then(resolve).catch(function (err) {
      console.log('Error in queue handler:', err, err.stack);
      reject(err);
    });
  });
};

var createProfileFromOauth = exports.createProfileFromOauth = function createProfileFromOauth(authData) {
  var provider = authData.provider,
      d = authData[provider];
  switch (provider) {
    case 'google':
      return {
        uid: authData.uid,
        fullName: d.displayName,
        email: d.email,
        profileImageURL: d.profileImageURL
      };
    case 'facebook':
      return {
        uid: authData.uid,
        fullName: 'FB Full name',
        email: 'FB email',
        profileImageURL: 'FB image url'
      };
    default:
      throw 'Can only handle google or facebook oauth.';
  }
};

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