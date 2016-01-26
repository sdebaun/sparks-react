import React from 'react';

import NavTabs from 'components/NavTabs'
import Tab from 'material-ui/lib/tabs/tab'

const Title = ()=>
  <div>At a Glance</div>

const Tabs = (props)=>
  <NavTabs {...props}>
    <Tab label='Whats Up' route='' />
    <Tab label='Staff' route='/staff' />
    <Tab label='History' route='/history' />
  </NavTabs>

const Main = ({children,...props})=>
  React.cloneElement(children, {...props})

import Todos from './Todos'
import Staff from './Staff'
import History from './History'

export default {
  components: {Title, Tabs, Main},
  indexRoute: Todos,
  childRoutes: [Staff, History]
}
