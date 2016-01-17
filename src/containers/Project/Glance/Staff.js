import React from 'react';
import { connect } from 'react-redux';

import Query from 'containers/Query'

import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'

import AddCircleIcon from 'material-ui/lib/svg-icons/content/add-circle';
import EmailIcon from 'material-ui/lib/svg-icons/communication/email';

import CreateInviteListItem from 'containers/Project/Glance/CreateInviteListItem'
import InviteListItem from 'containers/Project/Glance/InviteListItem'

class Staff extends React.Component {

  render() {
    const { projectKey, invites } = this.props
    return (
      <div>
        <Query collection='Invites' orderByChild='projectKey' equalTo={projectKey} />
        <List>
          <CreateInviteListItem projectKey={projectKey}/>
        </List>
        <List subheader="Open Invites">

          {invites && Object.keys(invites).map(key=>{
            return ( <InviteListItem key={key} invite={invites[key]} /> )
            })
          }
        </List>
      </div>
    );
  }

}

function mapStateToProps(state,ownProps) {
  const invites = state.data.Invites
  const selectedInvites = invites && Object.keys(invites)
    .filter(k=>invites[k].projectKey==ownProps.projectKey)
    .map(k=>Object.assign({$key:k},invites[k]))

  return {
    invites: selectedInvites
  };
}

export default connect(mapStateToProps)(Staff);
