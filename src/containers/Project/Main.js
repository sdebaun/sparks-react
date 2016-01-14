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

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import LeftNav from 'material-ui/lib/left-nav';

import ShowIf from 'components/ShowIf'
import IsMobile from 'components/IsMobile'
import IsDesktop from 'components/IsDesktop'
import PageLoadSpinner from 'components/PageLoadSpinner'
import Fetch from '../Fetch'
import ProjectHeader from './ProjectHeader'
import NavListItem from 'components/NavListItem'

import NavList from 'containers/Project/NavList'

class Main extends React.Component {
  
  render() {
    const baseUrl = '/project/'+this.props.params.projectKey
    return (
      <div className="index">
        <MainBar />
        <Fetch collection="Projects" itemKey={this.props.params.projectKey}/>
        <ShowIf isTrue={!this.props.selectedProject}><PageLoadSpinner/></ShowIf>
        <ShowIf isTrue={this.props.selectedProject}>
          <IsMobile>
            <LeftNav docked={false}><NavList/></LeftNav>
          </IsMobile>
          <div style={{display:'flex'}}>
            <IsDesktop>
              <div style={{width:256}}>
                <ProjectHeader style={{height:100}} project={this.props.selectedProject}/>
                <NavList/>
              </div>
            </IsDesktop>
            <div style={{flex:1}}>
              <IsMobile>
                <ProjectHeader style={{height:60}} project={this.props.selectedProject}/>
              </IsMobile>
              { React.cloneElement(this.props.children, {selectedProject:this.props.selectedProject}) }
            </div>
          </div>
        </ShowIf>
      </div>
    );
  }

}

import { Projects } from '../../remote'

const mapStateToProps = createSelector(
  (state,ownProps)=>Projects.selectors.loaded(state,ownProps.params.projectKey),
  (state,ownProps)=>Projects.selectors.single(state,ownProps.params.projectKey),
  (selectedProjectLoaded,selectedProject)=>{
    return {selectedProjectLoaded,selectedProject}
  }
)

function mapDispatchToProps(dispatch) {
  return {
    pushPath: (...args)=>dispatch(pushPath(...args))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Main);
