'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

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
var TeamImages = new _util.Collection(fbRoot.child('TeamImages'));
var Leads = new _util.Collection(fbRoot.child('Leads'));

var Opps = new _util.Collection(fbRoot.child('Opps'));
var Offers = new _util.Collection(fbRoot.child('Offers'));

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
      return Projects.update(key, vals).then(function () {
        // auth check if project manager
        Organizers.updateBy('projectKey', key, { project: vals });
        Teams.updateBy('projectKey', key, { project: vals });
        Opps.updateBy('projectKey', key, { project: vals });
        Leads.updateBy('projectKey', key, { project: vals });
        return true;
      });
    }
  },

  Organizers: {
    create: function create(payload, client) {
      return (// auth check if project manager
        Projects.get(payload.projectKey).then(function (snap) {
          return Organizers.push(Object.assign(payload, { project: snap.val() })).then(function (ref) {
            return ref.key();
          });
        })
      );
    },
    accept: function accept(_ref3, client) {
      var organizerKey = _ref3.organizerKey;
      return getAuth(client).then(function (profile) {
        return Organizers.update(organizerKey, { profileKey: profile.key, profile: profile }).then(function () {
          return Organizers.get(organizerKey).then(function (organizerSnap) {
            return organizerSnap.val().projectKey;
          });
        });
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
      return (// auth check if project manager
        Projects.get(payload.projectKey).then(function (projectSnap) {
          return Teams.push(_extends({}, payload, { project: projectSnap.val() })).then(function (ref) {
            return ref.key();
          });
        })
      );
    },
    update: function update(_ref5, client) {
      var key = _ref5.key;
      var vals = _ref5.vals;
      return Teams.update(key, vals).then(function () {
        // auth check if project manager
        Leads.updateBy('teamKey', key, { team: vals });
        return true;
      });
    }
  },

  TeamImages: {
    set: function set(_ref6, client) {
      var key = _ref6.key;
      var val = _ref6.val;
      return TeamImages.set(key, val);
    } // auth check if project manager or team lead
  },

  Leads: {
    create: function create(payload, client) {
      return Teams.get(payload.teamKey).then(function (teamSnap) {
        var _teamSnap$val = teamSnap.val();

        var project = _teamSnap$val.project;
        var team = _objectWithoutProperties(_teamSnap$val, ['project']);
        var projectKey = team.projectKey;
        Leads.push(_extends({}, payload, { team: team, projectKey: projectKey, project: project })).then(function (ref) {
          return ref.key();
        }); // auth check if project manager      
      });
    },
    accept: function accept(_ref7, client) {
      var leadKey = _ref7.leadKey;
      return getAuth(client).then(function (profile) {
        return Leads.update(leadKey, { profileKey: profile.key, profile: profile });
      } // get profileKey from auth object
      );
    }
  },

  Opps: {
    create: function create(payload, client) {
      return (// auth check if project manager
        Projects.get(payload.projectKey).then(function (projectSnap) {
          return Opps.push(_extends({}, payload, { project: projectSnap.val() })).then(function (ref) {
            return ref.key();
          });
        })
      );
    },
    update: function update(_ref8, client) {
      var key = _ref8.key;
      var vals = _ref8.vals;
      return (// auth check if project manager or team lead
        Opps.update(key, vals).then(function () {
          Offers.updateBy('oppKey', key, { opp: vals });
          return true;
        })
      );
    },
    setPublic: function setPublic(_ref9) {
      var key = _ref9.key;
      var val = _ref9.val;
      return (// auth check if project manager or team lead
        Opps.update(key, { isPublic: !!val })
      );
    }
  },

  Offers: {
    create: function create(payload, client) {
      return Opps.get(payload.oppKey).then(function (oppSnap) {
        return Offers.push(_extends({}, payload, { opp: oppSnap.val() })).then(function (ref) {
          return ref.key();
        });
      });
    },
    update: function update(_ref10, client) {
      var key = _ref10.key;
      var vals = _ref10.vals;
      return Offers.update(key, vals);
    }
  }

};

var responder = function responder(client, response) {
  return fbRoot.child('Responses').child(client).push(response);
};

var queue = new _util.FirebaseRespondingQueue(fbRoot, (0, _util.mutator)(handlers), responder);