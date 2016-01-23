import React from 'react';

import { Grid } from 'react-flexr'

import DropAndCrop from 'components/DropAndCrop'
import RaisedButton from 'material-ui/lib/raised-button'
import AddAPhotoIcon from 'material-ui/lib/svg-icons/image/add-a-photo';

import Tab from 'material-ui/lib/tabs/tab'
import Tabs from 'material-ui/lib/tabs/tabs'

import OpeningListItem from 'components/OpeningListItem'
import HalfColumn from 'components/HalfColumn'
import IsDesktop from 'components/IsDesktop'

import ProjectHeader from 'containers/Project/ProjectHeader'
import ProjectAvatar from 'containers/Project/ProjectAvatar'

class ChooseProjectImageListItem extends React.Component {
  state = {
    image: null,
    previewUrl: null
  }

  save = ()=>{
    this.props.set(this.props.projectKey,{dataUrl:this.state.previewUrl})
    this.refs.listItem.close()
  }

  onImageChange = (dataUrl)=>this.setState({previewUrl: dataUrl})

  render() {
    const {onImageChange, state:{previewUrl}, props:{projectKey,projectImage}} = this

    if (!projectImage) return <div>...</div>

    const attrs = {
        primaryText: projectImage.dataUrl &&
          'Change your Project Background.' ||
          'Upload a cool picture to use as your Project Background.',
        leftIcon: projectImage.dataUrl &&
          <ProjectAvatar projectImage={projectImage}/> ||
          <AddAPhotoIcon/>,
        imageUrl: projectImage.dataUrl
      }

    return (
      <OpeningListItem ref='listItem' {...attrs}>
        <Grid>
          <HalfColumn>
            <DropAndCrop key='dnc' onImageChange={onImageChange} style={{height:200}}>
              <RaisedButton primary={true} label='Use This' onTouchTap={this.save}/>
            </DropAndCrop>
          </HalfColumn>
          <HalfColumn>
            { previewUrl &&
              <div>
                <IsDesktop>
                  <h4>Public Pages</h4>
                  <ProjectHeader {...{projectKey,previewUrl}} style={{width:450,height:150}} secondaryText='Applications Open!'/>
                </IsDesktop>
                <h4>Desktop Menu</h4>
                <ProjectHeader {...{projectKey,previewUrl}} style={{width:240,height:80}}/>
                <h4>Mobile Header</h4>
                <ProjectHeader {...{projectKey,previewUrl}} style={{width:330,height:110}}secondaryText='Subtitle'>
                  <Tabs {...this.props}>
                    <Tab label='Hot'/>
                    <Tab label='Apple'/>
                    <Tab label='Pie'/>
                  </Tabs>
                </ProjectHeader>
              </div>
            }
          </HalfColumn>
        </Grid>
      </OpeningListItem>
    )
  }
}

import { connect } from 'react-redux';
import { createSelector } from 'reselect'
import { Projects, ProjectImages } from 'remote'

const mapStateToProps = createSelector(
  Projects.select.matching('projectKey'),
  ProjectImages.select.matching('projectKey'),
  (project, projectImage)=>{ return {project, projectImage} }
)

const mapDispatchToProps = {
  set: ProjectImages.actions.set
}

export default connect(mapStateToProps,mapDispatchToProps)(ChooseProjectImageListItem)