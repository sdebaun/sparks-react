import React from 'react';
import List from 'components/styled/List'
import HalfColumn from 'components/HalfColumn'
import { Grid } from 'react-flexr'

import ListItem from 'material-ui/lib/lists/list-item'
import AttachMoneyIcon from 'material-ui/lib/svg-icons/editor/attach-money';
import Dialog from 'components/styled/Dialog'

import ObligWaiverForm from 'containers/Opp/ObligWaiverForm'

import DropDownDialogPicker from 'components/DropDownDialogPicker'

const volObligItems = {
  waiver: <ListItem primaryText='Liability Waiver' value='waiver' leftIcon={<AttachMoneyIcon/>} />,
  shifts: <ListItem primaryText='Shifts of Work' value='shifts' leftIcon={<AttachMoneyIcon/>} />,
  payment: <ListItem primaryText='A Payment' value='payment' leftIcon={<AttachMoneyIcon/>} />,
  deposit: <ListItem primaryText='A Deposit' value='deposit' leftIcon={<AttachMoneyIcon/>} />
}

const nonExistentItems = (items,exists)=>
  Object.keys(items).filter( key=>!exists[key] ).map( key=>items[key] )

const save = (data)=>console.log('save',data)

const VolObligPicker = ({primaryText, obligs})=>
  <DropDownDialogPicker {...{primaryText,save}}
    items={ nonExistentItems(volObligItems,obligs) }
    dialogs={[
      <Dialog value='waiver'>
        <ObligWaiverForm initialValues={obligs['waiver']}/>
      </Dialog>,
      <Dialog value='shifts'>
        Shifts
      </Dialog>,
      <Dialog value='payment'>
        Payment
      </Dialog>,
      <Dialog value='deposit'>
        Deposit
      </Dialog>
    ]}
    />

export default ({opp})=>
  <Grid>
    <HalfColumn>
      <VolObligPicker primaryText='they GIVE' obligs={opp.volObligs||{}} save={(key,data)=>console.log('save',key,data)}/>
      <List>
      </List>
    </HalfColumn>
    <HalfColumn>
      <List header='they GET'>
      </List>
    </HalfColumn>
  </Grid>