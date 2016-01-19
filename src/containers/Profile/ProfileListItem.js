import React from 'react';
import { connect } from 'react-redux';

import ListItem from 'material-ui/lib/lists/list-item'

import Colors from 'material-ui/lib/styles/colors';
import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Avatar from 'material-ui/lib/avatar'

import EmailIcon from 'material-ui/lib/svg-icons/communication/email';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';

import TimeAgo from 'react-timeago'

import { createSelector } from 'reselect'
import { Profiles } from 'remote'

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltipPosition="bottom-left">
    <MoreVertIcon color={Colors.grey400} />
  </IconButton>
);

class ProfileListItem extends React.Component {
  componentWillMount() {
    this.props.dispatch(Profiles.actions.watch(this.props.profileKey))
  }

  render() {
    const { profile, profileKey } = this.props
    if (!profile) return <ListItem>...</ListItem>
    return <ListItem leftAvatar={<Avatar src={profile.profileImageURL}/>}
      primaryText={profile.fullName} secondaryText={profileKey}
      {...this.props}
      />
      
  }

}
        // secondaryText={invite.lastSent && <TimeAgo date={invite.lastSent} minPeriod={10}/> || 'Sending...'}
        // leftIcon={<EmailIcon/>}
        // rightIconButton={rightIconMenu} />

const mapStateToProps = createSelector(
  Profiles.select.matching('profileKey'),
  (profile)=>{ return {profile} }
)

export default connect(mapStateToProps)(ProfileListItem);
