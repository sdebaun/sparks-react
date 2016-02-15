import React from 'react';

import NavTabs from 'components/NavTabs'
import Tab from 'material-ui/lib/tabs/tab'

const Title = ()=>
  <div>Manage</div>

const Tabs = (props)=>
  <NavTabs {...props}>
    <Tab label='Describe' route='/manage' />
    <Tab label='Exchange' route='/manage/exchange' />
    <Tab label='Applying' route='/manage/applying' />
  </NavTabs>

const Main = ({children,...props})=>
  React.cloneElement(children, {...props})

import Describe from './Describe'
import Exchange from './Exchange'
import Applying from './Applying'

export default {
  path: 'manage',
  components: {Title, Tabs, Main},
  indexRoute: Describe,
  childRoutes: [Exchange, Applying]
}
