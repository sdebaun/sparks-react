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
import { wanting } from 'lib/react-needful'

const wants = {
  profile: ({dispatch,profileKey})=>dispatch(Profiles.actions.watch(profileKey))
}
const needs = ['profile']

const mapState = createSelector(
  Profiles.select.matching('profileKey'),
  (profile)=>{ return { profile } }
)

export default connect(mapState)(wanting(wants)(needfulListItem(needs)(Component)))
