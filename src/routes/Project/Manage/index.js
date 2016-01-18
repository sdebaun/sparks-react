import React from 'react';

import ProjectTabs from 'containers/Project/ProjectTabs'
import Tab from 'material-ui/lib/tabs/tab'

class Manage extends React.Component {
  render() {
    return (
      <div>
        <ProjectTabs {...this.props} secondaryText="Manage">
          <Tab label='Describe' route='/manage' />
          <Tab label='Exchange' route='/manage/exchange' />
          <Tab label='Applying' route='/manage/applying' />
        </ProjectTabs>
        { React.cloneElement(this.props.children,this.props) }
      </div>
    );
  }
}

import Describe from './Describe'
import Exchange from './Exchange'
import Applying from './Applying'

export default {
  path: 'manage',
  component: Manage,
  indexRoute: Describe,
  childRoutes: [Exchange, Applying]
}
