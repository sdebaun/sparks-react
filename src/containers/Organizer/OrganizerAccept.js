import React from 'react';

import Narrow from 'components/Narrow'

import RaisedButton from 'material-ui/lib/raised-button'

import ProfileAvatar from 'containers/Profile/ProfileAvatar'

import ProjectHeader from 'containers/Project/ProjectHeader'

import LoginButton from 'containers/LoginButton'

const OrganizerAccept = ({accept,hasAccess,organizerKey,project,email,authority,userProfile,authorProfile,profileKey,projectImage:{dataUrl}})=>
  <Narrow>
    <ProjectHeader {...{dataUrl, ...project}} hideNav={true} />
    <Claim {...{accept,organizerKey,userProfile,email,authority,authorProfile,project}}/>
    { profileKey &&
      <h1>This Invite has been Claimed.</h1> ||
      ( hasAccess &&
        <div>If you didn't already have access to this project, you'd be able to claim this invitation.</div> ||
        ( userProfile &&
          <RaisedButton primary={true} onTouchTap={()=>accept(organizerKey)} label='With Great Power Etc.'/> ||
          <LoginButton provider='google'/>
        )
      )
    }
  </Narrow>

const Claim = ({userProfile, email, authority, authorProfile, project})=>
  <div>
    <Greet name={userProfile && userProfile.fullName || email}/>
    <Invitation {...{authorProfile,authority,project}}/>
  </div>

const Greet = ({name}) => <h1 style={{textAlign:'center'}}>Hello {name}!</h1>

const Invitation = ({authorProfile,authority,project}) =>
  <div>
    <ProfileAvatar profileKey={authorProfile.$key} size={200} style={{margin:'auto'}}/>
    <p>
       <b>{authorProfile.fullName}</b> has invited you to join <b>{project.name}</b> with <b>{authority}</b> authority.
    </p>
    { (authority=='owner') &&
      <p>As an <b>Owner</b>, you will have complete and total control over your project.  Can you handle the power?</p>
    }
    { (authority=='manager') &&
      <p>As a <b>Manager</b>, you will be able to approve volunteers, change their schedules, and check them in.</p>
    }
  </div>
  
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createSelector } from 'reselect'
import { Projects, Organizers, ProjectImages, Profiles } from 'remote'
import { needfulPage } from 'needers'
import { wanting } from 'lib/react-needful'

const needs = ['project','projectImage','authorProfile']

const wants = {
  project: ({projectKey,wantsProject})=>wantsProject(projectKey),
  projectImage: ({projectKey,wantsProjectImage})=>wantsProjectImage(projectKey),
  authorProfile: ({authorProfileKey,wantsProfile})=>wantsProfile(authorProfileKey)
}

const mapState = createSelector(
  (s,{projectKey})=>projectKey,
  Projects.select.matching('projectKey'),
  ProjectImages.select.matching('projectKey'),
  Profiles.select.authed,
  Organizers.select.authedProjectKeys,
  Profiles.select.matching('authorProfileKey'),
  (projectKey,project,projectImage,userProfile,authedProjectKeys,authorProfile)=>{
    return {
      project, projectImage, userProfile, authorProfile,
      authedProjectKeys,
      hasAccess: authedProjectKeys.includes(projectKey)
    }
  }
)

const mapDispatch = {
  accept: Organizers.actions.accept,
  wantsProject: Projects.actions.watch,
  wantsProjectImage: ProjectImages.actions.watch,
  wantsProfile: Profiles.actions.watch
}

export default compose(connect(mapState,mapDispatch),wanting(wants),needfulPage(needs))(OrganizerAccept)