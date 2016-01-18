import React from 'react';
import { connect } from 'react-redux';

import ListItem from 'material-ui/lib/lists/list-item'

import Colors from 'material-ui/lib/styles/colors';
import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';

import EmailIcon from 'material-ui/lib/svg-icons/communication/email';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';

import TimeAgo from 'react-timeago'

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltipPosition="bottom-left">
    <MoreVertIcon color={Colors.grey400} />
  </IconButton>
);

class InviteListItem extends React.Component {
  handleResend = ()=>{}
  handleRevoke = ()=>{}

  render() {
    const { invite } = this.props

    const rightIconMenu = (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem href={'/acceptInvite/'+invite.$key} target='new'>Preview</MenuItem>
        <MenuItem disabled={true} onTouchTap={this.handleResend}>Resend</MenuItem>
        <MenuItem disabled={true} onTouchTap={this.handleRevoke}>Revoke</MenuItem>
      </IconMenu>
    );

    return (
      <ListItem primaryText={invite.email}
        secondaryText={invite.lastSent && <TimeAgo date={invite.lastSent} minPeriod={10}/> || 'Sending...'}
        leftIcon={<EmailIcon/>}
        rightIconButton={rightIconMenu} />
    );
  }

}

const mapStateToProps = ()=>{ return {} }

// function mapStateToProps(state,ownProps) {
//   const invites = state.data.Invites
//   const selectedInvites = invites && Object.keys(invites)
//     .filter(k=>invites[k].projectKey==ownProps.projectKey)
//     .map(k=>Object.assign({$key:k},invites[k]))

//   return {
//     invites: selectedInvites
//   };
// }

export default connect(mapStateToProps)(InviteListItem);
