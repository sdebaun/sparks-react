import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect'

import Query from 'containers/Query'

import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'

import CreateInviteListItem from 'containers/Project/Glance/CreateInviteListItem'
import InviteListItem from 'containers/Project/Glance/InviteListItem'

class Staff extends React.Component {
  componentDidMount() {
    const query = {orderByChild:'projectKey',equalTo:this.props.projectKey}
    // this.props.queryInvites(query)
    // this.props.queryOrganizers(query)
  }

  render() {
    const { projectKey, invites, organizers } = this.props
    return (
      <div>
        <Query collection='Invites' orderByChild='projectKey' equalTo={projectKey} />
        <Query collection='Organizers' orderByChild='projectKey' equalTo={projectKey} />
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

export default {
  component: connect(mapStateToProps)(Staff),
  path: 'staff'
}
