import React from 'react';

import NavTabs from 'components/NavTabs'
import Tab from 'material-ui/lib/tabs/tab'

class Main extends React.Component {
  
  render() {
    return (
      <div>
        <NavTabs baseUrl={'/project/'+this.props.params.projectKey}>
          <Tab label='To Do' route='' />
          <Tab label='Invite' route='/invite' />
        </NavTabs>
        <div>ProjectKey:{this.props.params.projectKey}</div>
        <div>ProjectName:{this.props.selectedProject.name}</div>
        { this.props.children }
      </div>
    );
  }

}

export default Main;
