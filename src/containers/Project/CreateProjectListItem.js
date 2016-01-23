import React from 'react';
import { connect } from 'react-redux';

import FlatButton from 'material-ui/lib/flat-button'
import AddIcon from 'material-ui/lib/svg-icons/content/add';

import PopupListItem from 'components/PopupListItem'

import ProjectForm from 'containers/Project/ProjectForm'

class CreateInviteListItem extends React.Component {

  save = data => {
    if (data) this.props.push(data)
    this.refs.listItem.close()
  }

  cancel = ()=>this.refs.listItem.close()

  render() {
    return (
      <PopupListItem ref='listItem' primaryText='Create New Project'
        secondaryText='Set up a project for an Early Access Partner.'
        leftIcon={<AddIcon/>}>
        <ProjectForm onSubmit={this.save}>
          <FlatButton onTouchTap={this.cancel} label='CANCEL' secondary={true}/>
        </ProjectForm>
      </PopupListItem>
    );
  }

}

import { Projects } from 'remote'

const mapStateToProps = ()=>{ return {} }

const mapDispatchToProps = {
  push: Projects.actions.push
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateInviteListItem);
