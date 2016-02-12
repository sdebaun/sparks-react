import React from 'react';
// import { connect } from 'react-redux';

import ListItem from 'material-ui/lib/lists/list-item'

import ActionMenu from 'components/ActionMenu'
import MenuItem from 'material-ui/lib/menus/menu-item';

import EmailIcon from 'material-ui/lib/svg-icons/communication/email';

import TimeAgo from 'react-timeago'

// should get invite directly from state based on props.inviteKey
// and not rely on props.invite?
export default class InviteListItem extends React.Component {
  resend = ()=>{}
  revoke = ()=>{}

  render() {
    const { props: { $key,email,lastSent,authority,actionMenu } } = this

    return (
      <ListItem primaryText={email}
        secondaryText={ lastSent &&
          <div>{authority} invite sent <TimeAgo date={lastSent} minPeriod={10}/></div> ||
          <div>{authority} invite sending soon...</div>
        }
        leftIcon={<EmailIcon/>}
        rightIconButton={ actionMenu ||
          <ActionMenu>
            <MenuItem href={'/acceptInvite/'+$key} target='new'>Preview</MenuItem>
            <MenuItem disabled={true} onTouchTap={this.resend}>Resend</MenuItem>
            <MenuItem disabled={true} onTouchTap={this.revoke}>Revoke</MenuItem>
          </ActionMenu>
        } />
    );
  }
}

// const mapStateToProps = ()=>{ return {} }

// export default connect(mapStateToProps)(InviteListItem);
