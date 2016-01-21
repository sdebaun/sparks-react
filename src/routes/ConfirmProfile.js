import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect'

import RaisedButton from 'material-ui/lib/raised-button'
import Avatar from 'material-ui/lib/avatar'
import PageLoadSpinner from 'components/PageLoadSpinner'

import MainBar from 'components/MainBar'
import Narrow from 'components/Narrow'

import ProfileForm from 'containers/Profile/ProfileForm'

class ConfirmProfile extends React.Component {
  handleSubmit = (data)=>{
    console.log('confirming',this.props.userProfileKey,data)
    this.props.confirm(this.props.userProfileKey,data)
  }
  // handle = ()=>this.props.confirm(this.props.userProfile.$key)

  render() {
    const { userProfile } = this.props
    return (
      <div className="index">
        <MainBar showMenu={false}/>
        {!userProfile && <PageLoadSpinner/>}
        {userProfile &&
          <Narrow>
            <div style={{display:'flex', flexDirection:'column',margin:'0em 1em'}}>
              <h1>Is This You?</h1>
              <Avatar size={192} src={userProfile.profileImageURL} style={{margin:'auto'}}/>
              <ProfileForm initialValues={userProfile} onSubmit={this.handleSubmit}/>
            </div>
          </Narrow>
        }
      </div>
      );
  }

}

// import {authedProfileKeySelector, authedProfileSelector} from 'selectors'

import {Profiles, Users} from 'remote'

const mapStateToProps = createSelector(
  Users.select.authed,
  Profiles.select.authed,
  (userProfileKey,userProfile)=>{ return {userProfileKey,userProfile} }
)

const mapStateToDispatch = {
  confirm: Profiles.actions.confirm
}

export default {
  path:'confirmProfile',
  component: connect(mapStateToProps,mapStateToDispatch)(ConfirmProfile)
}
