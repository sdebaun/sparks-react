import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect'

import Query from 'containers/Query'

import List from 'material-ui/lib/lists/list'

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

          {invites && invites.map(invite=>{
            return ( <InviteListItem key={invite.$key} invite={invite} /> )
            })
          }
        </List>
      </div>
    );
  }

}

// import { currentProfileSelector } from '../../../selectors'

// function mapStateToProps(state,ownProps) {
//   const invites = state.data.Invites
//   const selectedInvites = invites && Object.keys(invites)
//     .filter(k=>invites[k].projectKey==ownProps.projectKey)
//     .map(k=>Object.assign({$key:k},invites[k]))

//   return {
//     invites: selectedInvites
//   };
// }

const mapStateToProps = createSelector(
  (state,ownProps)=>{ return state.data.Invites &&
    Object.keys(state.data.Invites)
    .filter(k=>state.data.Invites[k].projectKey==ownProps.projectKey)
    .map(k=>Object.assign({$key:k},state.data.Invites[k]))
  },
  (invites)=>{
    return {invites}
  }
)

export default connect(mapStateToProps)(Staff);
