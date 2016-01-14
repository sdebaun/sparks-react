import React from 'react';

import NavTabs from 'components/NavTabs'
import Tab from 'material-ui/lib/tabs/tab'

class Main extends React.Component {
  
  render() {
    const dispatch = this.props.dispatch

    return (
      <div>
        <NavTabs>
          <Tab label='To Do' route={'/project/'+this.props.params.projectKey} />
          <Tab label='Invite' route={'/project/'+this.props.params.projectKey+'/invite'} />
        </NavTabs>
        <div>ProjectKey:{this.props.params.projectKey}</div>
        <div>ProjectName:{this.props.selectedProject.name}</div>
        { this.props.children }
      </div>
    );
  }

}

export default Main;
