import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect'

import Content from 'components/Content'

import Cropper from 'react-cropper'
import Dropzone from 'react-dropzone'

import List from 'material-ui/lib/lists/list'
// import ListItem from 'material-ui/lib/lists/list-item'
import OpeningListItem from 'components/OpeningListItem'

import DropAndCrop from 'components/DropAndCrop'
import RaisedButton from 'material-ui/lib/raised-button'
import FlatButton from 'material-ui/lib/flat-button'

import IsDesktop from 'components/IsDesktop'

import Radium from 'radium'

import ProjectHeader from 'containers/Project/ProjectHeader'
// import NavTabs from 'components/NavTabs'
import Tab from 'material-ui/lib/tabs/tab'
import Tabs from 'material-ui/lib/tabs/tabs'
import Divider from 'material-ui/lib/divider'

const IS_DESKTOP = '@media (min-width:480px)',
  IS_MOBILE = '@media (max-width:480px)'

const initialState = {
  image: null,
  previewUrl: null
}

import EmailIcon from 'material-ui/lib/svg-icons/communication/email';
import AddAPhotoIcon from 'material-ui/lib/svg-icons/image/add-a-photo';

class Describe extends React.Component {
  state = initialState

  save = ()=>{
    this.props.set(this.props.projectKey,{dataUrl:this.state.previewUrl})
    this.setState({pickingImage:false})
  }

  onImageChange = (dataUrl)=>this.setState({previewUrl: dataUrl})

  render() {
    const {onImageChange, state:{previewUrl}, props:{project}} = this
    return <Content>
      <List>
        <OpeningListItem primaryText="Find a cool background image to help identify your project."
          leftIcon={<ProjectHeader style={{width:24,height:24}}/>}
          >
          <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap'}}>
            <div style={{padding:'0.5em',minWidth:300,flexGrow:1}}>
              <DropAndCrop key='dnc' onImageChange={onImageChange} style={{height:200}}>
                <RaisedButton primary={true} label='Use This' onTouchTap={this.save}/>
              </DropAndCrop>
            </div>
            { previewUrl &&
              <div style={{padding:'0.5em',flexGrow:1}}>
                <IsDesktop>
                  <h4>Public Pages</h4>
                  <ProjectHeader style={{width:450,height:150}} imageUrl={previewUrl} primaryText={project.name} secondaryText='Applications Open!'/>
                </IsDesktop>
                <h4>Desktop Menu</h4>
                <ProjectHeader style={{width:240,height:80}} imageUrl={previewUrl} primaryText={project.name}/>
                <h4>Mobile Header</h4>
                <ProjectHeader style={{width:330,height:110}} imageUrl={previewUrl} primaryText={project.name} secondaryText='Subtitle'>
                  <Tabs {...this.props}>
                    <Tab label='Hot'/>
                    <Tab label='Apple'/>
                    <Tab label='Pie'/>
                  </Tabs>
                </ProjectHeader>
              </div>
            }
          </div>
        </OpeningListItem>
        <Divider/>
        <OpeningListItem primaryText="Describe your project to the rest of the world."
          leftIcon={<ProjectHeader style={{width:24,height:24}}/>}
          >
          <p>Your project can include many events on many different days.  What's the common theme?</p>
          form
        </OpeningListItem>
      </List>

    </Content>
  }
}

import { Projects, ProjectImages } from 'remote'

const selectedProject = createSelector(
  Projects.select.collection,
  (state,ownProps)=>ownProps.params.projectKey,
  (projects,projectKey)=>projects && projects[projectKey]
)

const mapStateToProps = createSelector(
  selectedProject,
  (project)=>{ return {project} }
)

const mapDispatchToProps = {
  set: ProjectImages.actions.set
}



export default {
  component: connect(mapStateToProps,mapDispatchToProps)(Radium(Describe))
}