import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect'

import RaisedButton from 'material-ui/lib/raised-button'

import AppIconMenu from 'components/AppIconMenu';
import HeaderLogo from 'components/HeaderLogo'
import MainBar from 'components/MainBar'

import {Profiles} from 'remote'

class ConfirmProfile extends React.Component {
  handle = ()=>{
    console.log("updating", this.props.userProfileKey)
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

import {currentProfileKeySelector, currentProfileSelector} from 'selectors'

const mapStateToProps = createSelector(
  currentProfileKeySelector,
  currentProfileSelector,
  (userProfileKey, userProfile)=>{
    return {userProfileKey, userProfile}
  }
)

const mapStateToDispatch = (dispatch)=>{
  return {
    updateProfile: (...args)=>dispatch(Profiles.update(...args))
  }
}

const routes = {
  path:'confirmProfile',
  component: connect(mapStateToProps,mapStateToDispatch)(ConfirmProfile)
}


export {routes}