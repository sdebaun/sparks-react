import React from 'react';

import ProjectTabs from 'containers/Project/ProjectTabs'
import Tab from 'material-ui/lib/tabs/tab'

class Main extends React.Component {

  render() {
    return (
      <div>
        <ProjectTabs {...this.props} secondaryText="Manage">
          <Tab label='Describe' route='/manage' />
          <Tab label='Exchange' route='/manage/exchange' />
          <Tab label='Applying' route='/manage/applying' />
        </ProjectTabs>
        { this.props.children }
      </div>
    );
  }

}

export default Main;
