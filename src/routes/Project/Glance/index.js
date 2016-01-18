import React from 'react';

import ProjectTabs from 'containers/Project/ProjectTabs'
import Tab from 'material-ui/lib/tabs/tab'

class Glance extends React.Component {
  render() {
    return (
      <div>
        <ProjectTabs {...this.props} secondaryText="At a Glance">
          <Tab label='Whats Up' route='' />
          <Tab label='Staff' route='/staff' />
          <Tab label='History' route='/history' />
        </ProjectTabs>
        { React.cloneElement(this.props.children, {...this.props}) }
      </div>
    );
  }
}

import Todos from './Todos'
import Staff from './Staff'
import History from './History'

export default {
  component: Glance,
  indexRoute: Todos,
  childRoutes: [Staff, History]
}
