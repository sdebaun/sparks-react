import React from 'react';

import Narrow from 'components/Narrow'

import RaisedButton from 'material-ui/lib/raised-button'
import MainBar from 'components/MainBar'

import Avatar from 'material-ui/lib/avatar'

import Content from 'components/Content'
import PageLoadSpinner from 'components/PageLoadSpinner'
import ProjectHeader from 'containers/Project/ProjectHeader'

import LoginButton from 'containers/LoginButton'

import InviteAccept from 'containers/Invite/InviteAccept'

const Container = ({invite})=> {
  console.log('invite',invite)
  return <div className="index">
    <MainBar />
    <Narrow>
      <InviteAccept {...invite}/>
    </Narrow>
  </div>
}



// class Container extends React.Component {
//   handle = ()=>{
//     this.props.accept(this.props.invite,this.props.userProfile)
//   }

  // <div className="index">
    // <MainBar />
    // <Narrow>
      // <InviteAccept {...invite}/>
    // </Narrow>
  // </div>

//   render() {
//     const {invite} = this.props

//     return (
//       <div className="index">
//         <MainBar />
//         <Narrow>
//           <ProjectHeader projectKey={invite.projectKey} style={{height:'150px'}} secondaryText={invite.authority + ' invite'}/>
//             { invite.isClaimed &&
//               <h1>This Invite has been Claimed.</h1> ||
//               <Content>
//                 <h1 style={{textAlign:'center'}}>Hello {userProfile && userProfile.fullName || invite.email}!</h1>
//                 <Avatar size={128} style={{margin:'auto'}} src={authorProfile.profileImageURL}/>
//                 <p>
//                  <b>{authorProfile.fullName}</b> has invited you to join <b>{project.name}</b> with <b>{invite.authority}</b> authority.
//                 </p>
//                 { (invite.authority=='owner') &&
//                   <p>As an <b>Owner</b>, you will have complete and total control over the volunteer project.  Can you handle the power?</p>
//                 }
//                 { (invite.authority=='manager') &&
//                   <p>As a <b>Manager</b>, you will be able to do everything except create new teams, opportunities, or invite other managers.</p>
//                 }
//                 <div style={{display:'flex',justifyContent:'center'}}>
//                   { hasAccess && <div>If you didn't already have access to this project, you'd be able to claim it.</div>}
//                   { !hasAccess && userProfile &&  <RaisedButton primary={true} onTouchTap={this.handle} label='With Great Power Etc.'/>}
//                   { !userProfile &&  <LoginButton provider='google'/> }
//                 </div>
//               </Content>
//             }
//         </Narrow>
//       </div>
//     )
//   }
// }

// const selectedInvite = createSelector(
//   Invites.select.collection,
//   (state,props)=>props.params.inviteKey,
//   (invites,inviteKey)=>invites && invites[inviteKey]
//   )

// const selectedProject = createSelector(
//   selectedInvite,
//   Projects.select.collection,
//   (invite,projects)=>invite && projects[invite.projectKey]
//   )

// const selectedProjectImage = createSelector(
//   selectedInvite,
//   ProjectImages.select.collection,
//   (invite,projectImages)=>invite && projectImages && projectImages[invite.projectKey]
// )

// const selectedAuthorProfile = createSelector(
//   selectedInvite,
//   Profiles.select.collection,
//   (invite,profiles)=>invite && profiles[invite.authorProfileKey]
//   )

// const mapState = createSelector(
//   selectedInvite,
//   selectedProject,
//   selectedProjectImage,
//   selectedAuthorProfile,
//   Profiles.select.authed,
//   Organizers.select.authedProjectKeys,
//   (invite,project,projectImage,authorProfile,userProfile,userProjectKeys)=>{
//     return {invite,project,projectImage,authorProfile,userProfile,userProjectKeys}
//   }
// )

import { connect } from 'react-redux'
import { compose } from 'redux'
import { createSelector } from 'reselect'
import { Invites, Users } from 'remote'
import { needfulPage } from 'needers'
import { wanting } from 'lib/react-needful'

const mapState = createSelector(
  (state,props)=>Invites.select.matching('inviteKey')(state,props.params),
  (invite)=>{ return { invite } }
  )

const mapDispatch = {
  accept: Invites.actions.accept,
  wantsInvite: Invites.actions.watch
}

const wants = {
  invite: ({wantsInvite,params:{inviteKey}})=>wantsInvite(inviteKey)
}

const needs = ['invite']

import { put, take } from 'redux-saga';
import { master } from 'sagas';
import { pushPath } from 'redux-simple-router'

export default {
  path:'acceptInvite/:inviteKey',
  component: compose(connect(mapState,mapDispatch),wanting(wants),needfulPage(needs))(Container),
  onEnter: (route)=>{
    // master.start( function*() {
    //   const inviteUpdate = yield take( Invites.taker(route.params.inviteKey) )
    //   yield put( Projects.actions.watch(inviteUpdate.data.projectKey) )
    //   yield put( ProjectImages.actions.watch(inviteUpdate.data.projectKey) )
    //   yield put( Profiles.actions.watch(inviteUpdate.data.authorProfileKey) )
    // })
    // master.start( function*() {
    //   yield put( Invites.actions.watch(route.params.inviteKey) )
    // })
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
