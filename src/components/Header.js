import React from 'react';
import Radium from 'radium'

import { Grid, Cell } from 'react-flexr'

import Colors from 'material-ui/lib/styles/colors';

const tabStyle = {backgroundColor:'transparent'}

const headerStyle = (backgroundSrc)=>{ return {
  backgroundImage: backgroundSrc &&
    'linear-gradient(rgba(0,0,0,0.60),rgba(0,0,0,0.90)), url('+backgroundSrc+')' ||
    'linear-gradient(rgba(0,0,0,0.80),rgba(0,0,0,0.80))',
  zIndex: 0,
  color: 'white',
  backgroundSize: 'cover'
} }

// Generic Header with background image
export default Radium( ({backgroundSrc,style,topNav,navIcon,primaryText,secondaryText,tabs})=>
  <div style={[headerStyle(backgroundSrc),style]}>
    <Grid gutter='0em' align='bottom' style={{height:'100%'}}>
      <Cell size='1/1' style={{padding:'0.25em 1em 0em 0em'}}>{topNav}</Cell>
      <Cell size='1/1' style={{padding:'0.25em 1em 0em'}}><Grid gutter='0em' align='center'>
        { navIcon && <div style={{marginRight:'0.5em',height:'100%'}}>{navIcon}</div> }
        <Cell><Grid gutter='0em'>
          <Cell size='1/1' style={{fontSize:'1.5em'}}>{primaryText}</Cell>
          <Cell size='1/1' style={{fontSize:'0.9em',color:Colors.grey300}}>{secondaryText}</Cell>
        </Grid></Cell>
      </Grid></Cell>
      { tabs && <Cell size='1/1' style={{padding:'0.5em 0em 0em 0em'}}>
        {React.cloneElement(tabs,{ tabItemContainerStyle:tabStyle })}
      </Cell> || <div/> }
    </Grid>
  </div>
)

