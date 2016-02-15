import React from 'react';

import LeftNavButton from 'components/LeftNavButton'

import ProjectDropdownMenu from 'containers/Project/ProjectDropdownMenu'
import ProjectTitle from 'containers/Project/ProjectTitle'

import Header from 'components/Header'

export default ({dataUrl,name,projectKey,leftIcon,secondaryText,tabs,isMobile,hideNav})=>
  <Header backgroundSrc={ dataUrl }
    style={ !isMobile && {height:100} }
    topNav={ hideNav ? <ProjectTitle projectKey={projectKey}/> : <ProjectDropdownMenu projectKey={projectKey}/> }
    navIcon={ isMobile && <LeftNavButton icon={leftIcon}/> || leftIcon }
    { ...{primaryText:name, secondaryText, tabs} }
    />

