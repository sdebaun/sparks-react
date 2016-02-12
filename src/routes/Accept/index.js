import React from 'react';

import MainBar from 'components/MainBar'
import NavTabs from 'components/NavTabs'
import Tab from 'material-ui/lib/tabs/tab'

class Page extends React.Component {
  render() {
    return <div className="index">
      <MainBar/>
      {this.props.children}
    </div>
  }
}

// const Page = ({children})=>
// <div className="index">
//   <MainBar/>
//   {this.children}
// </div>

import Lead from './Lead'
import Organizer from './Organizer'

export default {
  path: 'accept',
  component: Page,
  childRoutes: [ Lead, Organizer ]
}
