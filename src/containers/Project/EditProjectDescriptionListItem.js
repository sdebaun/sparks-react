import React from 'react';

import DropAndCrop from 'components/DropAndCrop'
import RaisedButton from 'material-ui/lib/raised-button'
// import FlatButton from 'material-ui/lib/flat-button'
import PlaylistAddIcon from 'material-ui/lib/svg-icons/av/playlist-add';
import PlaylistAddCheckIcon from 'material-ui/lib/svg-icons/av/playlist-add-check';

import Tab from 'material-ui/lib/tabs/tab'
import Tabs from 'material-ui/lib/tabs/tabs'

import OpeningListItem from 'components/OpeningListItem'
import HalfColumn from 'components/HalfColumn'
import IsDesktop from 'components/IsDesktop'

import ProjectHeader from 'containers/Project/ProjectHeader'
import ProjectDescriptionForm from 'containers/Project/ProjectDescriptionForm'

import FlatButton from 'material-ui/lib/flat-button'

class EditProjectDescriptionListItem extends React.Component {
  // state = {
  //   image: null,
  //   previewUrl: null
  // }

  save = (data)=>{
    this.props.update(this.props.projectKey,data)
    this.refs.listItem.close()
  }

  cancel = ()=>{ this.refs.listItem.close() }

  // onImageChange = (dataUrl)=>this.setState({previewUrl: dataUrl})

  render() {
    const {props:{project}} = this

    if (!project) return <div>...</div>

    const attrs = {
        primaryText: project.description &&
          'Change your Project Description.' ||
          'Describe your Project.',
        leftIcon: project.description &&
          <PlaylistAddCheckIcon/> ||
          <PlaylistAddIcon/>
      }

    return (
      <OpeningListItem ref='listItem' {...attrs}>
        <ProjectDescriptionForm onSubmit={this.save} initialValues={project}>
          <FlatButton onTouchTap={this.cancel} label='CANCEL' secondary={true}/>
        </ProjectDescriptionForm>
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

export default connect(mapStateToProps,mapDispatchToProps)(EditProjectDescriptionListItem)