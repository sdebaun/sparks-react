import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect'

// import RaisedButton from 'material-ui/lib/raised-button'
import MainBar from 'components/MainBar'
import Tabs from 'material-ui/lib/tabs/tabs'
import Tab from 'material-ui/lib/tabs/tab'
// import LeftNav from 'material-ui/lib/left-nav'

// import IconButton from 'material-ui/lib/icon-button';
// import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
// import IconMenu from 'material-ui/lib/menus/icon-menu';
// import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
// import MenuItem from 'material-ui/lib/menus/menu-item';

import { pushPath } from 'redux-simple-router'

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import LeftNav from 'material-ui/lib/left-nav';

import AppIconMenu from '../../components/AppIconMenu';

import ShowIf from 'components/ShowIf'
import PageLoadSpinner from 'components/PageLoadSpinner'
import Fetch from '../Fetch'
import MediaQuery from 'react-responsive'

class Main extends React.Component {
  
  render() {
    return (
      <div className="index">
        <MainBar />
        <Fetch collection="Projects" itemKey={this.props.params.projectKey}/>
        <ShowIf isTrue={!this.props.selectedProject}>
          <PageLoadSpinner/>
        </ShowIf>
        <ShowIf isTrue={this.props.selectedProject}>
          <MediaQuery maxWidth={480}>
            <LeftNav>
              swipe navigation
            </LeftNav>
          </MediaQuery>
          <div style={{display:'flex'}}>
            <MediaQuery minWidth={480}>
              <div style={{width:240}}>
                <div style={{height:100, backgroundColor:'#EEEEDD', margin:0, padding:0}}>
                  {this.props.selectedProject && this.props.selectedProject.name}
                </div>
                <List>
                  <ListItem primaryText="At a Glance" onTouchTap={()=>this.props.pushPath('/project/'+this.props.params.projectKey)}/>
                  <ListItem primaryText="Manage" onTouchTap={()=>this.props.pushPath('/project/'+this.props.params.projectKey+'/manage')}/>
                </List>
              </div>
            </MediaQuery>
            <div style={{flex:1}}>
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
