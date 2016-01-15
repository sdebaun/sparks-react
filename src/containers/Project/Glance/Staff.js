import React from 'react';
import { connect } from 'react-redux';

import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'

import AddCircleIcon from 'material-ui/lib/svg-icons/content/add-circle';
import EmailIcon from 'material-ui/lib/svg-icons/communication/email';

import CreateInviteListItem from 'containers/Project/Glance/CreateInviteListItem'

class Staff extends React.Component {
  
  render() {
    return (
      <div>
        <List>
          <CreateInviteListItem projectKey={this.props.projectKey}/>
        </List>
        <List subheader="Open Invites">
          <ListItem primaryText='foo@bar'
            secondaryText='Sent three days ago.'
            leftIcon={<EmailIcon/>}
            onTouchTap={()=>this.handleOpen()} />
        </List>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Staff);
