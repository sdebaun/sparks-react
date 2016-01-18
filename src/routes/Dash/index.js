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
          <Tab label='Doing' route='/dash' />
          <Tab label='Finding' route='/dash/finding' />
        </NavTabs>
        {this.props.children}
      </div>
    );
  }
}

import Doing from './Doing'
import Finding from './Finding'

export default {
  path: 'dash',
  component: Main,
  indexRoute: Doing,
  childRoutes: [ Finding ]
}
