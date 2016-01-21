import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect'

// import List from 'material-ui/lib/lists/list'
import List from 'components/styled/List'
import ListItem from 'material-ui/lib/lists/list-item'

import CreateInviteListItem from 'containers/Invite/CreateInviteListItem'
import InviteListItem from 'containers/Invite/InviteListItem'
import ProfileListItem from 'containers/Profile/ProfileListItem'

import ActionMenu from 'containers/Organizer/OrganizerActionMenu'
// import ActionMenu from 'components/ActionMenu'
// import MenuItem from 'material-ui/lib/menus/menu-item';

class Container extends React.Component {
  render() {
    const { projectKey, invites, organizers } = this.props

    return (
      <div>
        <List>
          <CreateInviteListItem projectKey={projectKey}/>
        </List>
        { (invites && (invites.length > 0)) &&
          <List header="Open Invites">
            {invites.map(i=><InviteListItem key={i.$key} invite={i} />)}
          </List>
        }
        { (organizers && (organizers.length > 0)) &&
          <List header='Organizers'>
            {organizers.map(o=>( <ProfileListItem key={o.$key} profileKey={o.profileKey}
              secondaryText='Admin' rightIconButton={<ActionMenu organizer={o}/>} />
            ))}
          </List>
        }
      </div>
    );
  }
}

                // rightIconButton={<ActionMenu>
                //     <MenuItem href={'/profile/'+organizer.profileKey} target='new'>Profile</MenuItem>
                //     <MenuItem disabled={true} onTouchTap={this.handleResend}>Remove</MenuItem>
                //   </ActionMenu>}

import {Organizers,Invites} from 'remote'

const filteredInvites = createSelector(
  Invites.select.by('projectKey'),
  (invites)=>invites && invites.filter(invite=>!invite.claimedProfileKey)
)

const mapStateToProps = createSelector(
  filteredInvites,
  Organizers.select.by('projectKey'),
  (invites,organizers)=>{ return {invites,organizers} }
)

import { put } from 'redux-saga';
import { master } from 'sagas'

export default {
  path: 'staff',
  component: connect(mapStateToProps)(Container)
}
