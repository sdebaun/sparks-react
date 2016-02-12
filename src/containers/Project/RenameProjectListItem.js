import React from 'react';

import EditIcon from 'material-ui/lib/svg-icons/image/edit';

import OpeningListItem from 'components/OpeningListItem'

import ProjectForm from 'containers/Project/ProjectForm'

import FlatButton from 'material-ui/lib/flat-button'

class RenameProjectListItem extends React.Component {
  save = (data)=>{
    this.props.update(this.props.projectKey,data)
    this.refs.listItem.close()
  }

  cancel = ()=>{ this.refs.listItem.close() }

  render() {
    const {props:{project}} = this

    const attrs = {
        primaryText: 'Rename your Project.',
        leftIcon: <EditIcon/>
      }

    return (
      <OpeningListItem ref='listItem' {...attrs}>
        <ProjectForm onSubmit={this.save} initialValues={project}>
          <FlatButton onTouchTap={this.cancel} label='CANCEL' secondary={true}/>
        </ProjectForm>
      </OpeningListItem>
    )
  }
}

import { connect } from 'react-redux';
import { createSelector } from 'reselect'
import { Projects } from 'remote'

const mapStateToProps = createSelector(
  Projects.select.matching('projectKey'),
  (project)=>{ return {project} }
)

const mapDispatchToProps = {
  update: Projects.actions.update
}

export default connect(mapStateToProps,mapDispatchToProps)(RenameProjectListItem)