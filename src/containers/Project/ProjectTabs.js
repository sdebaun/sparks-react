import React from 'react';

import NavTabs from 'components/NavTabs'

import IsMobile from 'components/IsMobile'
import IsDesktop from 'components/IsDesktop'
import ProjectHeader from 'containers/Project/ProjectHeader'

class ProjectTabs extends React.Component {

  render() {
    const {project,projectKey,secondaryText} = this.props

    return (
      <div>
        <IsMobile>
          <ProjectHeader primaryText={project && project.name} secondaryText={secondaryText}>
            <NavTabs baseUrl={'/project/'+projectKey}>
              { this.props.children }
            </NavTabs>
          </ProjectHeader>
        </IsMobile>
        <IsDesktop>
          <NavTabs baseUrl={'/project/'+projectKey}>
            { this.props.children }
          </NavTabs>
        </IsDesktop>
      </div>
    );
  }

}

export default ProjectTabs;
