import React from 'react';
import ListItem from 'material-ui/lib/lists/list-item'
import Avatar from 'material-ui/lib/avatar'

const Component = ( {profile:{profileImageURL,fullName}, ...props} ) =>
  <ListItem {...props}
    leftAvatar={<Avatar src={profileImageURL}/>}
    primaryText={fullName}
    />

import { connect } from 'react-redux';
import { createSelector } from 'reselect'
import { Profiles } from 'remote'
import { needfulListItem } from 'needers'

const needs = {
  profile: ({dispatch,profileKey})=>dispatch(Profiles.actions.watch(profileKey))
}

const mapState = createSelector(
  Profiles.select.matching('profileKey'),
  (profile)=>{ return { profile } }
)

export default connect(mapState)(needfulListItem(needs)(Component))
