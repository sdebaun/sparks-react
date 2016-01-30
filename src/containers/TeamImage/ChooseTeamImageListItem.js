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

import TeamHeader from 'containers/Team/TeamHeader'
// import ProjectAvatar from 'containers/Project/ProjectAvatar'

class ChooseTeamImageListItem extends React.Component {
  state = {
    image: null,
    previewUrl: null
  }

  save = ()=>{
    this.props.set(this.props.teamKey,{dataUrl:this.state.previewUrl})
    this.refs.listItem.close()
  }

  onImageChange = (dataUrl)=>this.setState({previewUrl: dataUrl})

  render() {
    // const {onImageChange, state:{previewUrl}, props:{teamKey,teamImage,team, project}} = this
    const {onImageChange, state:{previewUrl}, props:{teamImage,team, project}} = this

    // if (!teamImage) return <div>...</div>

    const attrs = {
        primaryText: teamImage &&
          'Replace your Project Background.' ||
          'Upload a cool picture to use as your Project Background.',
        leftIcon: <AddAPhotoIcon/>,
        // leftIcon: teamImage.dataUrl &&
        //   <ProjectAvatar teamImage={teamImage}/> ||
        //   <AddAPhotoIcon/>,
        imageUrl: teamImage && teamImage.dataUrl
      }

    return (
      <OpeningListItem ref='listItem' {...attrs}>
        <Grid>
          <HalfColumn>
            <DropAndCrop key='dnc' onImageChange={onImageChange} style={{height:200}} aspectRatio={1}>
              <RaisedButton primary={true} label='Use This' onTouchTap={this.save}/>
            </DropAndCrop>
          </HalfColumn>
          <HalfColumn>
            { previewUrl &&
              <div>
                <IsDesktop>
                  <h4>Public Pages</h4>
                  <TeamHeader {...{secondaryText:'Applications Open!', project, ...team}} style={{width:450,height:150}}/>
                </IsDesktop>
                <h4>Desktop Menu</h4>
                <TeamHeader {...{secondaryText:'Applications Open!', project, ...team}} style={{width:240,height:80}}/>
                <h4>Mobile Header</h4>
                <TeamHeader {...{secondaryText:'Applications Open!', project, ...team}} style={{width:90,height:130}}>
                  <Tabs {...this.props}>
                    <Tab label='Hot'/>
                    <Tab label='Apple'/>
                    <Tab label='Pie'/>
                  </Tabs>
                </TeamHeader>
              </div>
            }
          </HalfColumn>
        </Grid>
      </OpeningListItem>
    )
  }
}

                // <TeamHeader {...{teamKey,projectKey,previewUrl}} style={{width:390,height:130}} secondaryText='Subtitle'>
                  // <TeamHeader {...{teamKey,projectKey,previewUrl}} style={{width:450,height:150}} secondaryText='Applications Open!'/>
                // <TeamHeader {...{teamKey,projectKey,previewUrl}} style={{width:240,height:80}}/>

import { connect } from 'react-redux';
import { createSelector } from 'reselect'
import { Projects, Teams, TeamImages } from 'remote'

const mapStateToProps = createSelector(
  Projects.select.matching('projectKey'),
  Teams.select.matching('teamKey'),
  TeamImages.select.matching('teamKey'),
  (project, team, teamImage)=>{ return {project, team, teamImage} }
)

const mapDispatchToProps = {
  set: TeamImages.actions.set
}

export default connect(mapStateToProps,mapDispatchToProps)(ChooseTeamImageListItem)