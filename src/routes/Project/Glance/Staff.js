import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect'

import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'

import CreateInviteListItem from 'containers/Invite/CreateInviteListItem'
import InviteListItem from 'containers/Invite/InviteListItem'

class Container extends React.Component {
  render() {
    const { projectKey, invites, organizers } = this.props
    return (
      <div>
        <List>
          <CreateInviteListItem projectKey={projectKey}/>
        </List>
        { (invites && (invites.length > 0)) &&
          <List subheader="Open Invites">
            {invites && invites.map(invite=>{
              return ( <InviteListItem key={invite.$key} invite={invite} /> )
              })
            }
          </List>
        }
        { (organizers && (organizers.length > 0)) &&
          <List subheader="Organizers">
            {organizers && organizers.map(organizer=>{
              return ( <ListItem key={organizer.$key} primaryText={organizer.profileKey} /> )
              })
            }
          </List>
        }
      </div>
    );
  }

}

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
import { addSaga } from 'store'

export default {
  path: 'staff',
  component: connect(mapStateToProps)(Container),
  onEnter: ({params:{projectKey}})=>addSaga( function*() {
    const params = { orderByChild:'projectKey', equalTo:projectKey }
    yield put( Organizers.actions.query(params) )
    yield put( Invites.actions.query(params) )
  }())
}
