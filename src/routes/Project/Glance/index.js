import React from 'react';

import NavTabs from 'components/NavTabs'
import Tab from 'material-ui/lib/tabs/tab'

class Title extends React.Component {
  render() { return <div>At a Glance</div> }
}

class Tabs extends React.Component {
  render() {
    return (
      <NavTabs {...this.props}>
        <Tab label='Whats Up' route='' />
        <Tab label='Staff' route='/staff' />
        <Tab label='History' route='/history' />
      </NavTabs>
    );
  }
}

class Main extends React.Component {
  render() {
    return React.cloneElement(this.props.children, {...this.props})
  }
}

import Todos from './Todos'
import Staff from './Staff'
import History from './History'

export default {
  components: {Title, Tabs, Main},
  indexRoute: Todos,
  childRoutes: [Staff, History]
}
