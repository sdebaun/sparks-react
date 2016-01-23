import React from 'react';
import Radium from 'radium'

import IsMobile from 'components/IsMobile'
import LeftNavButton from 'components/LeftNavButton'

import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';

import Colors from 'material-ui/lib/styles/colors';

class TeamHeader extends React.Component {
  render() {
    const {props:{style,sideNav,team,project,projectImage,previewUrl,secondaryText}} = this
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
        <div style={{fontsize:'0.9em',color:'white',margin:'1em 1em 0em 1em',textTransform:'uppercase'}}>{project.name}</div>
        <Toolbar style={{backgroundColor:'transparent', display:'flex', alignItems:'center'}}>
          { sideNav &&
            <ToolbarGroup firstChild={true}>
              <IsMobile><LeftNavButton/></IsMobile>&nbsp;
            </ToolbarGroup>
          }
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
import { Teams, Projects, ProjectImages } from 'remote'

const mapStateToProps = createSelector(
  Teams.select.matching('teamKey'),
  Projects.select.matching('projectKey'),
  ProjectImages.select.matching('projectKey'),
  (team,project,projectImage)=>{ return {team,project,projectImage} }
)

export default connect(mapStateToProps)(Radium(TeamHeader))

