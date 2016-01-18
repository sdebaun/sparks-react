import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect'

// import RaisedButton from 'material-ui/lib/raised-button'
import MainBar from 'components/MainBar'

// import IconButton from 'material-ui/lib/icon-button';
// import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
// import IconMenu from 'material-ui/lib/menus/icon-menu';
// import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
// import MenuItem from 'material-ui/lib/menus/menu-item';

import { pushPath } from 'redux-simple-router'

// import ShowIf from 'components/ShowIf'
// import IsMobile from 'components/IsMobile'
// import IsDesktop from 'components/IsDesktop'
import PageLoadSpinner from 'components/PageLoadSpinner'
import Fetch from 'containers/Fetch'
// import ProjectHeader from 'containers/Project/ProjectHeader'
// import NavPopout from 'components/NavPopout'
// import NavList from 'containers/Project/NavList'
// import SideNav from 'components/SideNav'

// import IsUser from 'containers/IsUser'
import LoginButton from 'containers/LoginButton'

class Main extends React.Component {
  
  render() {
    const {invite, project, authorProfile, userProfile, params:{inviteKey} } = this.props

    return (
      <div className="index">
        <MainBar />
        { (!project || !authorProfile) && <PageLoadSpinner/>}
        <Fetch collection="Invites" itemKey={inviteKey}/>
        { invite && (<div>
          <Fetch collection="Projects" itemKey={invite && invite.projectKey}/>
          <Fetch collection="Profiles" itemKey={invite && invite.authorProfileKey}/>
          </div>)}
        { project && authorProfile && (
          <div style={{display:'flex'}}>
            <div style={{flex:1}}>
              <h1>Hello {invite.email}!</h1>
              <h2>
                {authorProfile.google.displayName} has invited you to join {project.name}
              </h2>
              { userProfile && (
                <div>
                Accept this invitation
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

import { Invites } from 'remote'
import { currentProfileSelector } from 'selectors'

const mapStateToProps = createSelector(
  (state,ownProps)=>Invites.selectors.loaded(state,ownProps.params.inviteKey),
  (state,ownProps)=>Invites.selectors.single(state,ownProps.params.inviteKey),
  (state,ownProps)=>{
    return ownProps.params.inviteKey &&
      state.data.Invites && state.data.Invites[ownProps.params.inviteKey] &&
      state.data.Projects && state.data.Projects[state.data.Invites[ownProps.params.inviteKey].projectKey]
  },
  (state,ownProps)=>{
    return ownProps.params.inviteKey &&
      state.data.Invites && state.data.Invites[ownProps.params.inviteKey] &&
      state.data.Profiles && state.data.Profiles[state.data.Invites[ownProps.params.inviteKey].authorProfileKey]
  },
  currentProfileSelector,
  (inviteLoaded, invite, project, authorProfile, userProfile)=>{
    return {inviteLoaded, invite, project, authorProfile, userProfile}
  }
)

function mapDispatchToProps(dispatch) {
  return {
    pushPath: (...args)=>dispatch(pushPath(...args)) //,
    // inviteSet: (...args)=>dispatch(inviteSet(...args))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Main);
