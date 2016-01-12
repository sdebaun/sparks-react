# Reduxfire

Redux middleware for Firebase.

## problem solved

You want to use Firebase with your Redux-based SPA.

## installation

```bash
$ npm install reduxfire
```

## use

### remote

Your project should create a Reduxfire object to manage your connection with your Firebase store.

```javascript
// remote.js

import Reduxfire from 'reduxfire'

const remote = new Reduxfire('https://sparks-development.firebaseIO.com');
export default remote;

```

### reducer

Add reducers to parts of your state tree to 

```javascript
// reducers/index.js
import remote from './remote'

export default combineReducers({
  routing: someRoutingReducer,
  data: remote.dataReducer,
  auth: remote.authReducer
})

```

### actions

Call different actions to start syncing your firebase to your state:

```javascript
// in your application bootstrap
remote.init(store.dispatch)

store.dispatch(remote.actions.listenForOAuth())
.then((auth)=>{
  if (!auth) return
  remote.get('uid',auth.uid).then( (uidSnap)=>{
    const profileKey = uidSnap.val()
    if (profileKey) remote.get('profile', profileKey)
    else {
        const newRef = remote.push('profile', oauthToProfile(oauth))
        uidSnap.ref().set(newRef.name())
        remote.get('profile', newRef.name())
    }
  })
})


```

state.data.profile[state.data.uid[state.auth.uid]]



"subscribe to this location"
