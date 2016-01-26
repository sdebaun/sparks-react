import React from 'react';
import { connect } from 'react-redux';

import ListItem from 'material-ui/lib/lists/list-item'

import ActionMenu from 'components/ActionMenu'
import MenuItem from 'material-ui/lib/menus/menu-item';

import EmailIcon from 'material-ui/lib/svg-icons/communication/email';

import TimeAgo from 'react-timeago'

// should get invite directly from state based on props.inviteKey
// and not rely on props.invite?
class InviteListItem extends React.Component {
  resend = ()=>{}
  revoke = ()=>{}

  render() {
    const { props: { invite } } = this

    return (
      <ListItem primaryText={invite.email}
        secondaryText={ invite.lastSent &&
          <div>{invite.authority} invite sent <TimeAgo date={invite.lastSent} minPeriod={10}/></div> ||
          <div>{invite.authority} invite sending soon...</div>
        }
        leftIcon={<EmailIcon/>}
        rightIconButton={
          <ActionMenu>
            <MenuItem href={'/acceptInvite/'+invite.$key} target='new'>Preview</MenuItem>
            <MenuItem disabled={true} onTouchTap={this.resend}>Resend</MenuItem>
            <MenuItem disabled={true} onTouchTap={this.revoke}>Revoke</MenuItem>
          </ActionMenu>
        } />
    );
  }
}

const mapStateToProps = ()=>{ return {} }

export default connect(mapStateToProps)(InviteListItem);
