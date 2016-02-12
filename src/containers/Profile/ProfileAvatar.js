import React from 'react';
import Avatar from 'material-ui/lib/avatar'

const Component = ( {profile:{profileImageURL}, ...props} ) =>
  <Avatar src={profileImageURL} {...props}/>

import { connect } from 'react-redux';
import { createSelector } from 'reselect'
import { Profiles } from 'remote'
import { needfulListItem } from 'needers'
import { wanting } from 'lib/react-needful'

const wants = {
  profile: ({profileKey,wantsProfile})=>wantsProfile(profileKey)
}
const needs = ['profile']

const mapState = createSelector(
  Profiles.select.matching('profileKey'),
  (profile)=>{ return { profile } }
)
const mapDispatch = {
  wantsProfile: Profiles.actions.watch
}

export default connect(mapState,mapDispatch)(wanting(wants)(needfulListItem(needs)(Component)))
