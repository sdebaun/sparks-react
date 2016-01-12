import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect'

// import remote from '../remote'

import Fetch from './Fetch'

class User extends React.Component {

  componentWillMount() {
    this.createProfileIfNeeded(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.UserLoaded != this.props.UserLoaded) || (nextProps.profileKey != this.props.profileKey)) {
      this.createProfileIfNeeded(nextProps);
    }
  }

  createProfileIfNeeded(props) {
    if (props.UserLoaded && !props.profileKey) {
      props.profilePush(props.auth).then((newKey)=>props.userSet(props.uid,newKey))
    }
  }

  render() { return (
    <div>
      <div>My UID is {this.props.uid}</div>
      <Fetch collection="Users" itemKey={this.props.uid}/>
      <Fetch collection="Profiles" itemKey={this.props.profileKey}/>
    </div>
  )}

}

import { Profiles, Users } from '../remote'

const mapStateToProps = createSelector(
  (state)=>state.auth,
  (state)=>state.auth.uid,
  (state)=>Users.selectors.loaded(state,state.auth.uid),
  (state)=>Users.selectors.single(state,state.auth.uid),
  // (state)=>state.data.Users && (state.auth.uid in state.data.Users),
  // (state)=>state.data.Users && state.data.Users[state.auth.uid],
  (auth,uid,UserLoaded,profileKey)=>{
    return {uid,profileKey,UserLoaded,auth}
  }
)

function mapDispatchToProps(dispatch) {
  return {
    profilePush: (...args)=>dispatch(Profiles.push(...args)),
    userSet: (...args)=>dispatch(Users.set(...args))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(User);