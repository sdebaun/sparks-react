import React from 'react';

import MainBar from 'components/MainBar'
import NavTabs from 'components/NavTabs'
import Tab from 'material-ui/lib/tabs/tab'

const Page = ({children})=>
  <div className="index">
    <MainBar/>
    <NavTabs>
      <Tab label='Projects' route='/admin' />
      <Tab label='Profiles' route='/admin/profiles' />
    </NavTabs>
    {children}
  </div>

import Projects from './Projects'
import Profiles from './Profiles'

export default {
  path: 'admin',
  component: Page,
  indexRoute: Projects,
  childRoutes: [ Profiles ]
}
