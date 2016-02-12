'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fbRoot = new _firebase2.default('http://sparks-development.firebaseio.com');

var getAuth = function getAuth(client) {
  return Users.get(client).then(function (userSnap) {
    return userSnap.val() && Profiles.get(userSnap.val())
    // should also add organizers, leads, etc. (relationships)
    .then(function (profileSnap) {
      return _extends({ key: userSnap.val() }, profileSnap.val());
    });
  });
};

var Users = new _util.Collection(fbRoot.child('Users'));
var Profiles = new _util.Collection(fbRoot.child('Profiles'));

var Projects = new _util.Collection(fbRoot.child('Projects'));
var ProjectImages = new _util.Collection(fbRoot.child('ProjectImages'));
var Organizers = new _util.Collection(fbRoot.child('Organizers'));

var Teams = new _util.Collection(fbRoot.child('Teams'));
var Leads = new _util.Collection(fbRoot.child('Leads'));

var handlers = {

  Profiles: {
    register: function register(payload, client) {
      return getAuth(client).then(function (profile) {
        return !profile && Profiles.push((0, _util.createProfileFromOauth)(payload)).then(function (ref) {
          return Users.set(client, ref.key()) && ref.key();
        });
      });
    },
    confirm: function confirm(_ref, client) {
      var key = _ref.key;
      var vals = _ref.vals;
      return getAuth(client).then(function (profile) {
        return profile.key == key && Profiles.update(key, _extends({ isConfirmed: true }, vals)) && null;
      });
    }
  },

  Projects: {
    create: function create(payload, client) {
      return getAuth(client).then(function (profile) {
        return profile.isAdmin && Projects.push(payload).then(function (ref) {
          return ref.key();
        });
      });
    },
    update: function update(_ref2, client) {
      var key = _ref2.key;
      var vals = _ref2.vals;
      return Projects.update(key, vals);
    } // auth check if project manager
  },

  Organizers: {
    create: function create(payload, client) {
      return Organizers.push(payload).then(function (ref) {
        return ref.key();
      });
    }, // auth check if project manager
    accept: function accept(_ref3, client) {
      var organizerKey = _ref3.organizerKey;
      return getAuth(client).then(function (profile) {
        return Organizers.update(organizerKey, { profileKey: profile.key });
      });
    }
  },

  ProjectImages: {
    set: function set(_ref4, client) {
      var key = _ref4.key;
      var val = _ref4.val;
      return ProjectImages.set(key, val);
    } // auth check if project manager
  },

  Teams: {
    create: function create(payload, client) {
      return Teams.push(payload).then(function (ref) {
        return ref.key();
      });
    }, // auth check if project manager
    update: function update(_ref5, client) {
      var key = _ref5.key;
      var vals = _ref5.vals;
      return Teams.update(key, vals);
    } // auth check if project manager or team lead
  },

  Leads: {
    create: function create(payload, client) {
      return Teams.get(payload.teamKey).then(function (teamSnap) {
        payload.projectKey = teamSnap.val().projectKey;
        Leads.push(payload).then(function (ref) {
          return ref.key();
        }); // auth check if project manager      
      });
    },
    accept: function accept(_ref6, client) {
      var leadKey = _ref6.leadKey;
      return getAuth(client).then(function (profile) {
        return Leads.update(leadKey, { profileKey: profile.key });
      } // get profileKey from auth object
      );
    }
  }
};

var responder = function responder(client, response) {
  return fbRoot.child('Responses').child(client).push(response);
};

var queue = new _util.FirebaseRespondingQueue(fbRoot, (0, _util.mutator)(handlers), responder);