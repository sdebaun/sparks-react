import React from 'react';

import Narrow from 'components/Narrow'

import RaisedButton from 'material-ui/lib/raised-button'

import Avatar from 'material-ui/lib/avatar'

import Content from 'components/Content'
import TeamHeader from 'containers/Team/TeamHeader'

import LoginButton from 'containers/LoginButton'

const LeadAccept = ({accept,authedTeamKeys,hasAccess,leadKey,team,email,authority,userProfile,authorProfile,profileKey,projectImage:{dataUrl}})=>
  <Narrow>
    <TeamHeader {...{dataUrl, ...team}} hideNav={true} />
    { profileKey && <Claimed/> ||
      (hasAccess && 
        <div>If you didn't already have access to this project, you'd be able to claim this invitation.</div> ||
        <Claim {...{accept,leadKey,userProfile,email,authority,authorProfile,team}}/>
      )
    }
  </Narrow>  

const Claim = ({accept,leadKey,userProfile, email, authority, authorProfile, team})=>
  <div>
    <Greet name={userProfile && userProfile.fullName || email}/>
    <Invitation {...{authorProfile,authority,team}}/>
    { userProfile &&
      <RaisedButton primary={true} onTouchTap={()=>accept(leadKey)} label='With Great Power Etc.'/> ||
      <LoginButton provider='google'/>
    }
  </div>

const Invitation = ({authorProfile,authority,team}) =>
  <div>
    <p>
       <b>{authorProfile.fullName}</b> has invited you to join <b>{team.name}</b> with <b>{authority}</b> authority.
    </p>
    { (authority=='owner') &&
      <p>As an <b>Owner</b>, you will have complete and total control over the volunteer project.  Can you handle the power?</p>
    }
    { (authority=='manager') &&
      <p>As a <b>Manager</b>, you will be able to do everything except create new teams, opportunities, or invite other managers.</p>
    }
  </div>
  
const Claimed = ()=> <h1>This Invite has been Claimed.</h1>

const Greet = ({name}) => <h1 style={{textAlign:'center'}}>Hello {name}!</h1>



  // return
  // <Narrow>
  //   <ProjectHeader/>
  //     { profileKey &&
  //       <h1>This Invite has been Claimed.</h1> ||
  //       <Content>
  //         <h1 style={{textAlign:'center'}}>Hello {userProfile && userProfile.fullName || email}!</h1>
  //         <Avatar size={128} style={{margin:'auto'}} src={authorProfile.profileImageURL}/>
  //         <p>
  //          <b>{authorProfile.fullName}</b> has invited you to join <b>{project.name}</b> with <b>{authority}</b> authority.
  //         </p>
  //         { (authority=='owner') &&
  //           <p>As an <b>Owner</b>, you will have complete and total control over the volunteer project.  Can you handle the power?</p>
  //         }
  //         { (authority=='manager') &&
  //           <p>As a <b>Manager</b>, you will be able to do everything except create new teams, opportunities, or invite other managers.</p>
  //         }
  //         <div style={{display:'flex',justifyContent:'center'}}>
  //           { hasAccess && <div>If you didn't already have access to this project, you'd be able to claim it.</div>}
  //           { !hasAccess && userProfile &&  <RaisedButton primary={true} onTouchTap={this.handle} label='With Great Power Etc.'/>}
  //           { !userProfile &&  <LoginButton provider='google'/> }
  //         </div>
  //       </Content>
  //     }
  // </Narrow>

import { connect } from 'react-redux'
import { compose } from 'redux'
import { createSelector } from 'reselect'
import { Teams, Leads, ProjectImages, Profiles } from 'remote'
import { needfulPage } from 'needers'
import { wanting } from 'lib/react-needful'

const needs = ['team','projectImage','authorProfile']

// const LeadAccept = ({accept,team,teamKey,email,authority,userProfile,authorProfileKey,profileKey,projectImage:{dataUrl}})=>

const wants = {
  team: ({teamKey,wantsTeam})=>wantsTeam(teamKey),
  projectImage: ({projectKey,wantsProjectImage})=>wantsProjectImage(projectKey),
  authorProfile: ({authorProfileKey,wantsProfile})=>wantsProfile(authorProfileKey)
}

const mapState = createSelector(
  (s,{teamKey})=>teamKey,
  Teams.select.matching('teamKey'),
  ProjectImages.select.matching('projectKey'),
  Profiles.select.authed,
  Leads.select.authedTeamKeys,
  Profiles.select.matching('authorProfileKey'),
  (teamKey,team,projectImage,userProfile,authedTeamKeys,authorProfile)=>{
    return {
      team, projectImage, userProfile, authorProfile,
      authedTeamKeys,
      hasAccess: authedTeamKeys.includes(teamKey)
    }
  }
)

const mapDispatch = {
  accept: Leads.actions.accept,
  wantsTeam: Teams.actions.watch,
  wantsProjectImage: ProjectImages.actions.watch,
  wantsProfile: Profiles.actions.watch,
}

export default compose(connect(mapState,mapDispatch),wanting(wants),needfulPage(needs))(LeadAccept)