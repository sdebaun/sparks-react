import React from 'react';

import Header from 'components/Header'
import LeftNavButton from 'components/LeftNavButton'

export default ({dataUrl,name,secondaryText,tabs,isMobile,height})=>
  <Header backgroundSrc={ dataUrl }
    style={ height ? {height} : (!isMobile && {height:100}) }
    navIcon={ isMobile && <LeftNavButton/> }
    { ...{primaryText:name, secondaryText, tabs} }
    />

