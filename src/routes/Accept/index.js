import React from 'react';

import MainBar from 'components/MainBar'

class Page extends React.Component {
  render() {
    return <div className="index">
      <MainBar/>
      {this.props.children}
    </div>
  }
}

import Lead from './Lead'
import Organizer from './Organizer'

export default {
  path: 'accept',
  component: Page,
  childRoutes: [ Lead, Organizer ]
}
