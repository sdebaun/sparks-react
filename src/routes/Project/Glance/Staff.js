import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect'

import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'

import CreateInviteListItem from 'containers/Invite/CreateInviteListItem'
import InviteListItem from 'containers/Invite/InviteListItem'

class Staff extends React.Component {
  componentDidMount() {
    const params = { orderByChild:'projectKey', equalTo:this.props.params.projectKey }
    this.props.loadInvites(params)
    this.props.loadOrganizers(params)
  }

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

import {dataInvitesRowsByProjectKey,dataOrganizersRowsByProjectKey} from 'selectors'

const filteredInvites = createSelector(
  dataInvitesRowsByProjectKey,
  (invites)=>invites && invites.filter(invite=>!invite.isClaimed)
  )

const mapStateToProps = createSelector(
  filteredInvites,
  dataOrganizersRowsByProjectKey,
  (invites,organizers)=>{
    return {invites,organizers}
  }
)

import {Organizers,Invites} from 'remote'

const mapDispatchToProps = {
  loadOrganizers: Organizers.actions.query,
  loadInvites: Invites.actions.query
}

export default {
  component: connect(mapStateToProps,mapDispatchToProps)(Staff),
  path: 'staff'
}
