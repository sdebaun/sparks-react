import React from 'react';
import List from 'components/styled/List'
import HalfColumn from 'components/HalfColumn'
import { Grid } from 'react-flexr'
import OppExchangeItemDropdown from 'containers/Opp/OppExchangeItemDropdown'

import MenuItem from 'material-ui/lib/menus/menu-item';
import AddAPhotoIcon from 'material-ui/lib/svg-icons/image/add-a-photo';

const volObligOptions = {
  pay: <MenuItem value='pay' key='pay' primaryText='Online Payment' onTouchTap={()=>console.log('touched')}/>,
  deposit: <MenuItem value='deposit' key='deposit' primaryText='Volunteer Deposit'/>,
  shifts: <MenuItem value='shifts' key='shifts' primaryText='Work Shifts'/>,
  waiver: <MenuItem value='waiver' key='waiver' primaryText='Liability Waiver'/>
  // pay: <MenuItem value='pay' key='pay' leftIcon={<AddAPhotoIcon/>} primaryText='Online Payment'/>,
  // deposit: <MenuItem value='deposit' key='deposit' leftIcon={<AddAPhotoIcon/>} primaryText='Volunteer Deposit'/>,
  // shifts: <MenuItem value='shifts' key='shifts' leftIcon={<AddAPhotoIcon/>} primaryText='Work Shifts'/>,
  // waiver: <MenuItem value='waiver' key='waiver' leftIcon={<AddAPhotoIcon/>} primaryText='Liability Waiver'/>
}

export default ({opp})=>
  <Grid>
    <HalfColumn>
      <OppExchangeItemDropdown primaryText='they GIVE' obligOptions={volObligOptions} obligs={opp.volObligs}/>
      <List>
      </List>
    </HalfColumn>
    <HalfColumn>
      <List header='they GET'>
      </List>
    </HalfColumn>
  </Grid>