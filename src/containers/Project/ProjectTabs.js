import React from 'react';

import NavTabs from 'components/NavTabs'

import IsMobile from 'components/IsMobile'
import IsDesktop from 'components/IsDesktop'
import ProjectHeader from 'containers/Project/ProjectHeader'

class ProjectTabs extends React.Component {

  render() {
    const {project,projectKey,secondaryText} = this.props

    return (
      <NavTabs baseUrl={'/project/'+projectKey}>
        { this.props.children }
      </NavTabs>
    );
  }
}

export default ProjectTabs;
