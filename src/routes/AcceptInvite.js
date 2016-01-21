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

import Avatar from 'material-ui/lib/avatar'

// import ShowIf from 'components/ShowIf'
// import IsMobile from 'components/IsMobile'
// import IsDesktop from 'components/IsDesktop'
import PageLoadSpinner from 'components/PageLoadSpinner'
// import Fetch from 'containers/Fetch'
import ProjectHeader from 'containers/Project/ProjectHeader'
// import NavPopout from 'components/NavPopout'
// import NavList from 'containers/Project/NavList'
// import SideNav from 'components/SideNav'

// import IsUser from 'containers/IsUser'
import LoginButton from 'containers/LoginButton'

class Container extends React.Component {
  handle = ()=>{
    this.props.accept(this.props.invite,this.props.userProfile)
  }

  render() {
    const {invite, project, authorProfile, userProfile, userProjectKeys} = this.props
    const hasAccess = invite && userProjectKeys && userProjectKeys.includes(invite.projectKey)

    if (!(project && authorProfile)) return <PageLoadSpinner/>
    if (invite.isComplete) return <h1>This Invite has been Claimed.</h1>
    return (
      <div className="index">
        <MainBar />
        { !(project && authorProfile) && <PageLoadSpinner/>}
        { project && authorProfile && (

          <div style={{maxWidth:400,margin:'auto'}}>
            <ProjectHeader style={{height:'100px'}} primaryText={project.name} secondaryText={invite.authority + ' invite'}/>
            <div style={{display:'flex', flexDirection:'column',margin:'0em 1em'}}>
              <h1 style={{textAlign:'center'}}>Hello {userProfile && userProfile.fullName || invite.email}!</h1>
              <Avatar size={128} style={{margin:'auto'}} src={authorProfile.profileImageURL}/>
              <p>
               <b>{authorProfile.fullName}</b> has invited you to join <b>{project.name}</b> with <b>{invite.authority}</b> authority.
              </p>
              { (invite.authority=='owner') &&
                <p>As an <b>Owner</b>, you will have complete and total control over the volunteer project.  Can you handle the power?</p>
              }
              { (invite.authority=='manager') &&
                <p>As a <b>Manager</b>, you will be able to do everything except create new teams, opportunities, or invite other managers.</p>
              }
              <div style={{display:'flex',justifyContent:'center'}}>
                { hasAccess && <div>If you didn't already have access to this project, you'd be able to claim it.</div>}
                { !hasAccess && userProfile &&  <RaisedButton primary={true} onTouchTap={this.handle} label='With Great Power Etc.'/>}
                { !userProfile &&  <LoginButton provider='google'/> }
              </div>
            </div>
          </div>
          )}
      </div>
    );
  }

}

import { Invites, Projects, Profiles, Users, Organizers } from 'remote'

const selectedInvite = createSelector(
  Invites.select.collection,
  (state,props)=>props.params.inviteKey,
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
  Profiles.select.authed,
  Organizers.select.authedProjectKeys,
  (invite,project,authorProfile,userProfile,userProjectKeys)=>{
    return {invite,project,authorProfile,userProfile,userProjectKeys}
  }
)

const mapDispatchToProps = {
  accept: Invites.actions.accept
}

import { put, take } from 'redux-saga';
import { master } from 'sagas';
import { pushPath } from 'redux-simple-router'

export default {
  path:'acceptInvite/:inviteKey',
  component: connect(mapStateToProps,mapDispatchToProps)(Container),
  onEnter: (route)=>{
    master.start( function*() {
      const inviteUpdate = yield take( Invites.taker(route.params.inviteKey) )
      yield put( Projects.actions.watch(inviteUpdate.data.projectKey) )
      yield put( Profiles.actions.watch(inviteUpdate.data.authorProfileKey) )
    })
    master.start( function*() {
      yield put( Invites.actions.watch(route.params.inviteKey) )
    })
    master.start( function*(getState) {
      while (true) {
        const {data:{projectKey, claimedProfileKey,isComplete}} = yield take( Invites.taker(route.params.inviteKey) )
        const userProfileKey = Users.select.authed(getState())
        if (isComplete && (userProfileKey==claimedProfileKey)) {
          yield put( pushPath('/project/' + projectKey) )
          return
        }
      }
    })
  }
}
