import React from 'react';
import { connect } from 'react-redux';

// import RaisedButton from 'material-ui/lib/raised-button'
import AppBar from 'material-ui/lib/app-bar'
import Tabs from 'material-ui/lib/tabs/tabs'
import Tab from 'material-ui/lib/tabs/tab'
// import LeftNav from 'material-ui/lib/left-nav'

// import IconButton from 'material-ui/lib/icon-button';
// import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
// import IconMenu from 'material-ui/lib/menus/icon-menu';
// import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
// import MenuItem from 'material-ui/lib/menus/menu-item';

import { pushPath } from 'redux-simple-router'

import AppIconMenu from '../../../components/AppIconMenu';

class Main extends React.Component {
  
  render() {
    const dispatch = this.props.dispatch

    return (
      <div>
        <Tabs>
          <Tab label='To Do' route={'/project/'+this.props.params.projectKey} onActive={ tab=>dispatch(pushPath(tab.props.route)) }/>
          <Tab label='Invite' route={'/project/'+this.props.params.projectKey+'/invite'} onActive={ tab=>dispatch(pushPath(tab.props.route)) }/>
        </Tabs>
        <div>ProjectKey:{this.props.params.projectKey}</div>
        <div>ProjectName:{this.props.selectedProject.name}</div>
        { this.props.children }
      </div>
    );
  }

}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Main);
