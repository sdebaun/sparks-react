import React from 'react';
import Radium from 'radium'

import IsMobile from 'components/IsMobile'
import LeftNavButton from 'components/LeftNavButton'
import TeamAvatar from 'containers/Team/TeamAvatar'

import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import HelpIcon from 'material-ui/lib/svg-icons/action/help';
import ArrowDropDownIcon from 'material-ui/lib/svg-icons/navigation/arrow-drop-down';

import Colors from 'material-ui/lib/styles/colors';

import { findMatch } from 'react-flexr'

class TeamHeader extends React.Component {
  render() {
    const {props:{style,sideNav,team,teamImage,project,projectImage,previewUrl,secondaryText}} = this
    const backgroundImageUrl = projectImage && projectImage.dataUrl
    const defaultStyle = {
      display:'flex', flexDirection:'column', justifyContent:'flex-end',
      backgroundImage: backgroundImageUrl &&
        'linear-gradient(rgba(0,0,0,0.60),rgba(0,0,0,0.90)), url('+backgroundImageUrl+')' ||
        'linear-gradient(rgba(0,0,0,0.80),rgba(0,0,0,0.80))',
      zIndex: 0,
      backgroundSize: 'cover'
    }

    return (
      <div style={[defaultStyle,style]}>
        <div style={{fontsize:'0.9em',color:'white',margin:'1em 1em 0em 1em',textTransform:'uppercase'}}>
        {project.name} <ArrowDropDownIcon color='white'/>
        </div>
        <Toolbar style={{backgroundColor:'transparent', display:'flex', alignItems:'center'}}>
          <ToolbarGroup firstChild={true}>
            { sideNav && findMatch('palm') &&
              <LeftNavButton icon={teamImage.dataUrl && <TeamAvatar teamImage={teamImage}/>}/>
            }
            { !sideNav && findMatch('lap','desk') && teamImage.dataUrl &&
              <TeamAvatar teamImage={teamImage}/>
            }
            { !sideNav && findMatch('lap','desk') && !teamImage.dataUrl &&
              <HelpIcon/>
            }
          </ToolbarGroup>
          <ToolbarGroup style={{color:'white'}}>
            <div>
              <div style={{fontSize:'1.5em'}}>{team.name}</div>
              <div style={{fontSize:'0.9em',color:Colors.grey300}}>{secondaryText}</div>
            </div>
          </ToolbarGroup>
        </Toolbar>
        { this.props.children && React.cloneElement(this.props.children,{ tabItemContainerStyle:{backgroundColor:'transparent'} }) }
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { createSelector } from 'reselect'
import { Teams, TeamImages, Projects, ProjectImages } from 'remote'

const mapStateToProps = createSelector(
  Teams.select.matching('teamKey'),
  TeamImages.select.matching('teamKey'),
  Projects.select.matching('projectKey'),
  ProjectImages.select.matching('projectKey'),
  (team,teamImage,project,projectImage)=>{ return {team,teamImage,project,projectImage} }
)

export default connect(mapStateToProps)(Radium(TeamHeader))

