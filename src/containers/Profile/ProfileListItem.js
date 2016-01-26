import React from 'react';
import { connect } from 'react-redux';

import ListItem from 'material-ui/lib/lists/list-item'
import Avatar from 'material-ui/lib/avatar'

class ProfileListItem extends React.Component {
  componentWillMount() {
    this.props.dispatch(Profiles.actions.watch(this.props.profileKey))
  }

  render() {
    const { props: { profile, ...props } } = this
    if (!profile) return <ListItem>...</ListItem>
    return <ListItem {...props}
      leftAvatar={<Avatar src={profile.profileImageURL}/>}
      primaryText={profile.fullName}
      />
  }
}

import { createSelector } from 'reselect'
import { Profiles } from 'remote'

const mapStateToProps = createSelector(
  Profiles.select.matching('profileKey'),
  (profile)=>{ return {profile} }
)

export default connect(mapStateToProps)(ProfileListItem);
