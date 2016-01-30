import React from 'react';
import Radium from 'radium'

import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';

import Colors from 'material-ui/lib/styles/colors';

const tabStyle = {backgroundColor:'transparent'}

const headerStyle = (backgroundSrc)=>{ return {
  display:'flex', flexDirection:'column', justifyContent:'flex-end',
  backgroundImage: backgroundSrc &&
    'linear-gradient(rgba(0,0,0,0.60),rgba(0,0,0,0.90)), url('+backgroundSrc+')' ||
    'linear-gradient(rgba(0,0,0,0.80),rgba(0,0,0,0.80))',
  zIndex: 0,
  backgroundSize: 'cover'
} }

// Generic Header with background image
export default Radium( ({backgroundSrc,style,topNav,navIcon,primaryText,secondaryText,tabs})=>
  <div style={[headerStyle(backgroundSrc),style]}>
    {topNav}
    <Toolbar style={{backgroundColor:'transparent', display:'flex', alignItems:'center'}}>
      <ToolbarGroup firstChild={!!navIcon}>{navIcon}</ToolbarGroup>
      <ToolbarGroup firstChild={false} style={{color:'white'}}>
        <div>
          <div style={{fontSize:'1.5em'}}>{primaryText}</div>
          <div style={{fontSize:'0.9em',color:Colors.grey300}}>{secondaryText}</div>
        </div>
      </ToolbarGroup>
    </Toolbar>
    {tabs && React.cloneElement(tabs,{ tabItemContainerStyle:tabStyle })}
  </div>
)
