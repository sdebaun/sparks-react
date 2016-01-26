import React from 'react';

import NavTabs from 'components/NavTabs'
import Tab from 'material-ui/lib/tabs/tab'

const Title = ()=>
  <div>At a Glance</div>

const Tabs = (props)=>
  <NavTabs {...props}>
    <Tab label='Whats Up' route='' />
    <Tab label='Leads' route='/leads' />
    <Tab label='Find' route='/find' />
  </NavTabs>

const Main = ({children,...props})=>
  React.cloneElement(children, {...props})

import Todos from './Todos'
import Leads from './Leads'
import Find from './Find'

export default {
  components: {Title, Tabs, Main},
  indexRoute: Todos,
  childRoutes: [Leads, Find]
}
