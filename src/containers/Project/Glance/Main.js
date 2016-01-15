import React from 'react';

import NavTabs from 'components/NavTabs'
import Tab from 'material-ui/lib/tabs/tab'

import IsMobile from 'components/IsMobile'
import IsDesktop from 'components/IsDesktop'
import ProjectHeader from 'containers/Project/ProjectHeader'

class Main extends React.Component {
  
  render() {
    const tabs = (
      <NavTabs baseUrl={'/project/'+this.props.params.projectKey}>
        <Tab label='To Do' route='' />
        <Tab label='Staff' route='/staff' />
        <Tab label='History' route='/history' />
      </NavTabs>
    )
    const project = this.props.selectedProject

    return (
      <div>
        <IsMobile>
          <ProjectHeader project={project}
            primaryText={project && project.name}
            secondaryText="Your Route"
           >
            {tabs}
          </ProjectHeader>
        </IsMobile>
        <IsDesktop>{tabs}</IsDesktop>
        { this.props.children }
      </div>
    );
  }

}

export default Main;
