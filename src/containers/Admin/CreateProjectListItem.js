import React from 'react';
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/lib/raised-button'
import FlatButton from 'material-ui/lib/flat-button'
import Dialog from 'material-ui/lib/dialog'

import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'

import AddCircleIcon from 'material-ui/lib/svg-icons/content/add-circle';

import Query from 'containers/Query'
import NavListItem from 'components/NavListItem'

import ProjectForm from 'containers/Admin/ProjectForm'

import { pushPath } from 'redux-simple-router'

class CreateInviteListItem extends React.Component {
  state = { open: false }
  handleOpen = ev => this.setState({open:true})
  handleClose = ev => this.setState({open:false})
  handleSubmit = data => {
    if (data) this.props.projectPush(data)
    this.handleClose()
  }

  render() {
    return (
          <ListItem primaryText='Create New Project'
            secondaryText='Set up a project for an Early Access Partner.'
            leftIcon={<AddCircleIcon/>}
            onTouchTap={this.handleOpen}>
            <Dialog title='Create New Project'
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
              >
              <ProjectForm onSubmit={this.handleSubmit}>
                <FlatButton onTouchTap={this.handleClose} label='CANCEL' secondary={true}/>
              </ProjectForm>
            </Dialog>
          </ListItem>
    );
  }

}

import { Projects } from 'remote'

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    projectPush: (...args)=>dispatch(Projects.push(...args)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateInviteListItem);
