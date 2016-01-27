import React from 'react';
import Radium from 'radium'

import LeftNavButton from 'components/LeftNavButton'

// import MenuItem from 'material-ui/lib/menus/menu-item';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import HelpIcon from 'material-ui/lib/svg-icons/action/help';

import ProjectDropdownMenu from 'containers/Project/ProjectDropdownMenu'

import Colors from 'material-ui/lib/styles/colors';

import Header from 'components/Header'

import { findMatch } from 'react-flexr'

// const tabStyle = {backgroundColor:'transparent'}

// const headerStyle = (backgroundSrc)=>{ return {
//   display:'flex', flexDirection:'column', justifyContent:'flex-end',
//   backgroundImage: backgroundSrc &&
//     'linear-gradient(rgba(0,0,0,0.60),rgba(0,0,0,0.90)), url('+backgroundSrc+')' ||
//     'linear-gradient(rgba(0,0,0,0.80),rgba(0,0,0,0.80))',
//   zIndex: 0,
//   backgroundSize: 'cover'
// } }

// // Generic Header with background image
// const Header = Radium( ({backgroundSrc,style,topNav,navIcon,primaryText,secondaryText,tabs})=>
//   <div style={[headerStyle(backgroundSrc),style]}>
//     {topNav}
//     <Toolbar style={{backgroundColor:'transparent', display:'flex', alignItems:'center'}}>
//       <ToolbarGroup firstChild={true}>{navIcon}</ToolbarGroup>
//       <ToolbarGroup style={{color:'white'}}>
//         <div>
//           <div style={{fontSize:'1.5em'}}>{primaryText}</div>
//           <div style={{fontSize:'0.9em',color:Colors.grey300}}>{secondaryText}</div>
//         </div>
//       </ToolbarGroup>
//     </Toolbar>
//     {tabs && React.cloneElement(tabs,{ tabItemContainerStyle:tabStyle })}
//   </div>
// )

const TeamAvatar = ({image})=> image && <img src={image.dataUrl}/> || <HelpIcon/>

// TeamHeader
export default ({project,teamImage,name,secondaryText,tabs,isMobile})=>
  <Header backgroundSrc={ project.projectImage && project.projectImage.dataUrl }
    style={ !isMobile && {height:100} }
    topNav={ <ProjectDropdownMenu projectKey={project.$key}/> }
    navIcon={ isMobile &&
      <LeftNavButton icon={<TeamAvatar image={teamImage}/>}/> ||
      <TeamAvatar image={teamImage}/>
    }
    { ...{primaryText:name, secondaryText, tabs} }
    />

