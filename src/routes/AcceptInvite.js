import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect'

import RaisedButton from 'material-ui/lib/raised-button'
import MainBar from 'components/MainBar'

// import IconButton from 'material-ui/lib/icon-button';
// import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
// import IconMenu from 'material-ui/lib/menus/icon-menu';
// import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
// import MenuItem from 'material-ui/lib/menus/menu-item';

// import { pushPath } from 'redux-simple-router'

// import ShowIf from 'components/ShowIf'
// import IsMobile from 'components/IsMobile'
// import IsDesktop from 'components/IsDesktop'
import PageLoadSpinner from 'components/PageLoadSpinner'
// import Fetch from 'containers/Fetch'
// import ProjectHeader from 'containers/Project/ProjectHeader'
// import NavPopout from 'components/NavPopout'
// import NavList from 'containers/Project/NavList'
// import SideNav from 'components/SideNav'

// import IsUser from 'containers/IsUser'
import LoginButton from 'containers/LoginButton'

class Container extends React.Component {
  handle = ()=>{
    this.props.acceptProjectInvite(this.props.params.inviteKey, this.props.invite)
  }

  render() {
    const {invite, project, authorProfile, userProfile, params:{inviteKey} } = this.props

    return (
      <div className="index">
        <MainBar />
        { (!project || !authorProfile) && <PageLoadSpinner/>}
        { project && authorProfile && (
          <div style={{display:'flex'}}>
            <div style={{flex:1}}>
              <h1>Hello {invite.email}!</h1>
              <h2>
                {authorProfile.google.displayName} has invited you to join {project.name}
              </h2>
              { userProfile && (
                <div>
                <RaisedButton onTouchTap={this.handle} label='Accept This Invitation'/>
                </div>
              )}
              { !userProfile && (
                <div>
                <LoginButton provider='google'/>
                </div>
              )}
            </div>
          </div>
          )}
      </div>
    );
  }

}

import { Invites, Projects, Profiles } from 'remote'
// import { authedProfileSelector } from 'selectors'

const selectedInvite = createSelector(
  Invites.select.collection,
  (state,ownProps)=>ownProps.params.inviteKey,
  (invites,inviteKey)=>invites && invites[inviteKey]
  )

const selectedProject = createSelector(
  selectedInvite,
  Projects.select.collection,
  (invite,projects)=>invite && projects[invite.projectKey]
  )

const selectedAuthorProfile = createSelector(
  selectedInvite,
  Profiles.select.collection,
  (invite,profiles)=>invite && profiles[invite.authorProfileKey]
  )

const mapStateToProps = createSelector(
  selectedInvite,
  selectedProject,
  selectedAuthorProfile,
  (invite,project,authorProfile)=>{
    return {invite,project,authorProfile}
  }
)

import { acceptProjectInvite } from 'actions'

const mapDispatchToProps = {
  acceptProjectInvite
}

import { put, take } from 'redux-saga';
import { addSaga } from 'store'

export default {
  path:'acceptInvite/:inviteKey',
  component: connect(mapStateToProps,mapDispatchToProps)(Container),
  onEnter: (route)=>{
    addSaga( function*() {
      console.log('watching invite',route.params.inviteKey)
      const inviteUpdate = yield take( Invites.taker(route.params.inviteKey) )
      console.log('got inviteUpdte',inviteUpdate)
      yield put( Projects.actions.watch(inviteUpdate.data.projectKey) )
      yield put( Profiles.actions.watch(inviteUpdate.data.authorProfileKey) )
    }())
    addSaga( function*() {
      console.log('querying invite', route.params.inviteKey)
      yield put( Invites.actions.watch(route.params.inviteKey) )
    }())
  }
}
