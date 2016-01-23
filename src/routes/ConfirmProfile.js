import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect'

import Avatar from 'material-ui/lib/avatar'
import PageLoadSpinner from 'components/PageLoadSpinner'

import MainBar from 'components/MainBar'
import Narrow from 'components/Narrow'
import Content from 'components/Content'

import ProfileForm from 'containers/Profile/ProfileForm'

class ConfirmProfile extends React.Component {
  handleSubmit = (data)=>{
    this.props.confirm(this.props.userProfileKey,data)
  }

  render() {
    const { userProfile } = this.props
    return (
      <div className="index">
        <MainBar showMenu={false}/>
        {!userProfile && <PageLoadSpinner/>}
        {userProfile &&
          <Narrow>
            <Content>
              <h1>Is This You?</h1>
              <Avatar size={192} src={userProfile.profileImageURL} style={{margin:'auto'}}/>
              <ProfileForm initialValues={userProfile} onSubmit={this.handleSubmit}/>
            </Content>
          </Narrow>
        }
      </div>
      );
  }

}

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
