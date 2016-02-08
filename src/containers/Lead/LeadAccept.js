import React from 'react';

import Narrow from 'components/Narrow'

import RaisedButton from 'material-ui/lib/raised-button'

import Avatar from 'material-ui/lib/avatar'

import Content from 'components/Content'
import ProjectHeader from 'containers/Project/ProjectHeader'

import LoginButton from 'containers/LoginButton'




export default class Container extends React.Component {
  handle = ()=>this.props.accept(this.props.$key,this.props.userProfile.$key)

  render() {
    const {authorProfile, authority, email, team, profileKey} = this.props
    return 
    return <Narrow>
      <ProjectHeader {...headerAttrs}/>
        { isClaimed &&
          <h1>This Invite has been Claimed.</h1> ||
          <Content>
            <h1 style={{textAlign:'center'}}>Hello {userProfile && userProfile.fullName || email}!</h1>
            <Avatar size={128} style={{margin:'auto'}} src={authorProfile.profileImageURL}/>
            <p>
             <b>{authorProfile.fullName}</b> has invited you to join <b>{project.name}</b> with <b>{authority}</b> authority.
            </p>
            { (authority=='owner') &&
              <p>As an <b>Owner</b>, you will have complete and total control over the volunteer project.  Can you handle the power?</p>
            }
            { (authority=='manager') &&
              <p>As a <b>Manager</b>, you will be able to do everything except create new teams, opportunities, or invite other managers.</p>
            }
            <div style={{display:'flex',justifyContent:'center'}}>
              { hasAccess && <div>If you didn't already have access to this project, you'd be able to claim it.</div>}
              { !hasAccess && userProfile &&  <RaisedButton primary={true} onTouchTap={this.handle} label='With Great Power Etc.'/>}
              { !userProfile &&  <LoginButton provider='google'/> }
            </div>
          </Content>
        }
    </Narrow>
  }
}

// import { connect } from 'react-redux'
// import { compose } from 'redux'
// import { createSelector } from 'reselect'
// import { Invites, Projects, ProjectImages, Profiles, Organizers } from 'remote'
// import { needfulPage } from 'needers'
// import { wanting } from 'lib/react-needful'

// const mapState = createSelector(
//   Projects.select.matching('projectKey'),
//   ProjectImages.select.matching('projectKey'),
//   Profiles.select.matching('authorProfileKey'),
//   Profiles.select.authed,
//   Organizers.select.authedProjectKeys,
//   (project, projectImage, authorProfile, userProfile, userProjectKeys)=>{
//     return {project, projectImage, authorProfile, userProfile, userProjectKeys}
//   }
// )

// const mapDispatch = {
//   accept: Invites.actions.accept,
//   wantsProject: Projects.actions.watch,
//   wantsProjectImage: ProjectImages.actions.watch,
//   wantsProfile: Profiles.actions.watch
// }

// const wants = {
//   project: ({wantsProject,projectKey})=>wantsProject(projectKey),
//   projectImage: ({wantsProjectImage,projectKey})=>wantsProjectImage(projectKey),
//   authorProfile: ({wantsProfile,authorProfileKey})=>wantsProfile(authorProfileKey)
// }

// const needs = ['project','projectImage', 'authorProfile']

// export default compose(connect(mapState,mapDispatch),wanting(wants),needfulPage(needs))(Container)