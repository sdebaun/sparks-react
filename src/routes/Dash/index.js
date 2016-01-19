import React from 'react';

import MainBar from 'components/MainBar'
import NavTabs from 'components/NavTabs'
import Tab from 'material-ui/lib/tabs/tab'

class Main extends React.Component {
  render() {
    const {profileKey} = this.props
    return (
      <div className="index">
        <MainBar/>
        <NavTabs>
          <Tab label='Doing' route='/dash' />
          <Tab label='Finding' route='/dash/finding' />
        </NavTabs>
        {React.cloneElement(this.props.children,{profileKey})}
      </div>
    );
  }
}

import Doing from './Doing'
import Finding from './Finding'

import { connect } from 'react-redux';
import { createSelector } from 'reselect'
import { Users } from 'remote'

const mapStateToProps = createSelector(
  Users.select.authed,
  (profileKey)=>{ return {profileKey} }
)

export default {
  path: 'dash',
  component: connect(mapStateToProps)(Main),
  indexRoute: Doing,
  childRoutes: [ Finding ]
}
