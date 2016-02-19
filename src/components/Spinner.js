import React from 'react';
import { Box, VBox } from 'react-layout-components'

import IconButton from 'material-ui/lib/icon-button';
import ChevronLeftIcon from 'material-ui/lib/svg-icons/navigation/chevron-left';
import ChevronRightIcon from 'material-ui/lib/svg-icons/navigation/chevron-right';

export default ({labelText,value,onChange,minValue,maxValue})=>
  <Box fit justifyContent='space-around' style={{margin:'0.5em 0'}}>
    <IconButton onTouchTap={()=>onChange((value||0)-1)} disabled={!(value>minValue)}><ChevronLeftIcon/></IconButton>
    <VBox justifyContent='space-around'>
      <label>{labelText}</label>
      <Box style={{fontSize:'1.5em',fontWeight:'bold'}} justifyContent='space-around'>
      {value}
      </Box>
    </VBox>
    <IconButton onTouchTap={()=>onChange((value||0)+1)} disabled={value>=maxValue}><ChevronRightIcon/></IconButton>
  </Box>
