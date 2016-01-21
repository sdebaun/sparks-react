import React from 'react';

import NavTabs from 'components/NavTabs'
import Tab from 'material-ui/lib/tabs/tab'

class Title extends React.Component {
  render() { return <div>Manage</div> }
}

class Tabs extends React.Component {
  render() {
    return (
      <NavTabs {...this.props}>
        <Tab label='Describe' route='/manage' />
        <Tab label='Exchange' route='/manage/exchange' />
        <Tab label='Applying' route='/manage/applying' />
      </NavTabs>
    );
  }
}

class Main extends React.Component {
  render() {
    return React.cloneElement(this.props.children, {...this.props})
  }
}

import Describe from './Describe'
import Exchange from './Exchange'
import Applying from './Applying'

export default {
  path: 'manage',
  components: {Title, Tabs, Main},
  indexRoute: Describe,
  childRoutes: [Exchange, Applying]
}
