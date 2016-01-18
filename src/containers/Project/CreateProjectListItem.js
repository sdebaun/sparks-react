import React from 'react';
import { connect } from 'react-redux';

import FlatButton from 'material-ui/lib/flat-button'
import Dialog from 'material-ui/lib/dialog'

import ListItem from 'material-ui/lib/lists/list-item'

import AddCircleIcon from 'material-ui/lib/svg-icons/content/add-circle';

import ProjectForm from 'containers/Project/ProjectForm'

class CreateInviteListItem extends React.Component {
  state = { open: false }
  handleOpen = ()=> this.setState({open:true})
  handleClose = ()=> this.setState({open:false})
  handleSubmit = data => {
    if (data) this.props.push(data)
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

function mapStateToProps() {
  return {}
}

const mapDispatchToProps = {
  push: Projects.actions.push
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateInviteListItem);
