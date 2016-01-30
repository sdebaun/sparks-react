import React from 'react';

import LeftNavButton from 'components/LeftNavButton'

// import HelpIcon from 'material-ui/lib/svg-icons/action/help';

import ProjectDropdownMenu from 'containers/Project/ProjectDropdownMenu'

import Header from 'components/Header'

// import { findMatch } from 'react-flexr'

// const avatarStyle = {
//   height: '32px !important',
//   width: '32px !important'
// }
// const TeamAvatar = (props)=> {
//   const image = props.image
//   return image && <img style={avatarStyle} src={image.dataUrl}/> || <HelpIcon/>
// }

// TeamHeader
// export default ({project,teamImage,name,secondaryText,tabs,isMobile})=>
export default ({dataUrl,name,projectKey,leftIcon,secondaryText,tabs,isMobile})=>
  <Header backgroundSrc={ dataUrl }
    style={ !isMobile && {height:100} }
    topNav={ <ProjectDropdownMenu projectKey={projectKey}/> }
    navIcon={ isMobile && <LeftNavButton icon={leftIcon}/> || leftIcon }
    { ...{primaryText:name, secondaryText, tabs} }
    />

