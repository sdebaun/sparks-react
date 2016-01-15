import React from 'react';

import ProjectTabs from 'containers/Project/ProjectTabs'
import Tab from 'material-ui/lib/tabs/tab'

class Main extends React.Component {

  render() {
    return (
      <div>
        <ProjectTabs {...this.props} secondaryText="Manage">
          <Tab label='Describe' route='' />
          <Tab label='Exchange' route='/exchange' />
          <Tab label='Other' route='/other' />
        </ProjectTabs>
        { this.props.children }
      </div>
    );
  }

}

export default Main;
