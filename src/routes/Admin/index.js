import React from 'react';

import MainBar from 'components/MainBar'
import NavTabs from 'components/NavTabs'
import Tab from 'material-ui/lib/tabs/tab'

class Main extends React.Component {  
  render() {
    return (
      <div className="index">
        <MainBar/>
        <NavTabs>
          <Tab label='Projects' route='/admin' />
          <Tab label='Profiles' route='/admin/profiles' />
        </NavTabs>
        {this.props.children}
      </div>
    );
  }
}

import Projects from './Projects'
import Profiles from './Profiles'

export default {
  path: 'admin',
  component: Main,
  indexRoute: Projects,
  childRoutes: [ Profiles ]
}
