import React from 'react';

import List from 'material-ui/lib/lists/list';
import NavListItem from 'components/NavListItem'

export class TeamNavList extends React.Component {
  render() {
    const {props: {baseUrl, ...props}} = this
    return (
      <List>
        <NavListItem primaryText="At a Glance" activeFor={['/leads','/find']} targetRoute={baseUrl} {...props}/>
        <NavListItem primaryText="Manage" activeFor={['/exchange','/applying']} targetRoute={baseUrl+'/manage'} {...props}/>
      </List>
    )
  }
}

import { connect } from 'react-redux';
import { createSelector } from 'reselect'

export default TeamNavList