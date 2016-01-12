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

export Profiles = remote.model('Profiles')

export Uids = remote.model('Uids')

```

### reducer

Add reducers to parts of your state tree to 

```javascript
// reducers/index.js
import remote from './remote'

export default combineReducers({
  routing: someRoutingReducer,
  data: remote.data.reducer,
  auth: remote.auth.reducer
})

```

### components

```
<Auth/>
```
Starts listening for Firebase OAuth result and triggers actions appropriately.

```


### custom

```
class Session extends Component {
  render() { return (
    <Fetch model='Uids' key={this.props.uid}/>
    <Fetch model='Profiles' key={this.props.profileKey}/>
  )}
}

function mapStateToProps(state) {
  (state)=>state.auth.uid,
  (state)=>state.data.Uids && state.data.Uids[state.auth.uid],
  (uid,profileKey)=>{ return {uid,profileKey} }
}
```

```
class ProfileBuilder extends Component {
  render() { return null }
  componentWillMount() {
    this.props.ProfileActions.push( this.)
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ProfileActions: Profile.actions}, dispatch)
}
```


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
