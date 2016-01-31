import React from 'react';

import MainBar from 'components/MainBar'
import NavTabs from 'components/NavTabs'
import Tab from 'material-ui/lib/tabs/tab'

const Page = ({children})=>
  <div className="index">
    <MainBar/>
    {children}
  </div>

import Lead from './Lead'

export default {
  path: 'accept',
  component: Page,
  childRoutes: [ Lead ]
}
