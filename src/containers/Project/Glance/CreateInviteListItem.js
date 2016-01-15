import React from 'react';
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/lib/raised-button'
import Dialog from 'material-ui/lib/dialog'

import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import TextField from 'material-ui/lib/text-field'

import AddCircleIcon from 'material-ui/lib/svg-icons/content/add-circle';

import Query from 'containers/Query'
import NavListItem from 'components/NavListItem'

import { pushPath } from 'redux-simple-router'

class CreateInviteListItem extends React.Component {
  componentWillMount() {
    this.setState({open:false})
  }

  handleOpen() { this.setState({open:true}) }
  handleClose(val=null) {
    this.setState({open:false})
    if (val) this.props.invitePush({name:val,projectKey:this.props.projectKey})
  }

  render() {
    return (
          <ListItem primaryText='Invite a Staff Member'
            secondaryText='Add Owners or Admins to help run everything.'
            leftIcon={<AddCircleIcon/>}
            onTouchTap={()=>this.handleOpen()}>
            <Dialog title='Invite New Staff'
              actions={[<RaisedButton label='OK' onTouchTap={()=>this.handleClose(this.refs.nameField.getValue())}/>,
                <RaisedButton label='Cancel' onTouchTap={()=>this.handleClose()}/>]}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
              >
              <TextField floatingLabelText='Name' ref='nameField' />
            </Dialog>
          </ListItem>
    );
  }

}

CreateInviteListItem.defaultState = {
  open: false
}

import { Invites } from '../../../remote'

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    invitePush: (...args)=>dispatch(Invites.push(...args)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateInviteListItem);
