import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect'

import RaisedButton from 'material-ui/lib/raised-button'

import MainBar from 'components/MainBar'

import {Profiles} from 'remote'

class ConfirmProfile extends React.Component {
  handle = ()=>{
    this.props.updateProfile(this.props.userProfileKey,{isConfirmed:true})
  }

  render() {
    return (
      <div className="index">
        <MainBar showMenu={false}/>
        <h1>Is This You?</h1>
        <RaisedButton onTouchTap={this.handle} label='It Sure Is'/>
      </div>
      );
  }

}

import {authedProfileKeySelector, authedProfileSelector} from 'selectors'

const mapStateToProps = createSelector(
  authedProfileKeySelector,
  authedProfileSelector,
  (userProfileKey, userProfile)=>{
    return {userProfileKey, userProfile}
  }
)

const mapStateToDispatch = (dispatch)=>{
  return {
    updateProfile: (...args)=>dispatch(Profiles.update(...args))
  }
}

export default {
  path:'confirmProfile',
  component: connect(mapStateToProps,mapStateToDispatch)(ConfirmProfile)
}
