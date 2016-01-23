import React from 'react';

import NavTabs from 'components/NavTabs'
import Tab from 'material-ui/lib/tabs/tab'

const Title = ()=>
  <div>Manage</div>

const Tabs = (props)=>
  <NavTabs {...props}>
    <Tab label='Describe' route='/manage' />
    <Tab label='Applying' route='/manage/applying' />
  </NavTabs>

const Main = ({children,...props})=>
  React.cloneElement(children, {...props})

import Describe from './Describe'
import Applying from './Applying'

export default {
  components: {Title, Tabs, Main},
  path: 'manage',
  indexRoute: Describe,
  childRoutes: [Applying]
}
