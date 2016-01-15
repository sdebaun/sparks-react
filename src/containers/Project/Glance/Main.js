import React from 'react';

import NavTabs from 'components/NavTabs'
import Tab from 'material-ui/lib/tabs/tab'

import IsMobile from 'components/IsMobile'
import IsDesktop from 'components/IsDesktop'
import ProjectHeader from 'containers/Project/ProjectHeader'

class Main extends React.Component {
  
  render() {
    return (
      <div>
        <IsMobile>
          <ProjectHeader project={this.props.selectedProject}>
            <NavTabs baseUrl={'/project/'+this.props.params.projectKey} tabItemContainerStyle={{backgroundColor:'transparent'}}>
              <Tab label='To Do' route='' />
              <Tab label='Staff' route='/staff' />
              <Tab label='History' route='/history' />
            </NavTabs>
          </ProjectHeader>
        </IsMobile>
        <IsDesktop>
          <NavTabs baseUrl={'/project/'+this.props.params.projectKey}>
            <Tab label='To Do' route='' />
            <Tab label='Staff' route='/staff' />
            <Tab label='History' route='/history' />
          </NavTabs>
        </IsDesktop>
        { this.props.children }
      </div>
    );
  }

}

export default Main;
