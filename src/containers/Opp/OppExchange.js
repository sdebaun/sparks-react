import React from 'react';
import List from 'components/styled/List'
import HalfColumn from 'components/HalfColumn'
import { Grid } from 'react-flexr'

import ListItem from 'material-ui/lib/lists/list-item'

import AttachMoneyIcon from 'material-ui/lib/svg-icons/editor/attach-money';
import AccountBalanceIcon from 'material-ui/lib/svg-icons/action/account-balance';
import CreditCardIcon from 'material-ui/lib/svg-icons/action/credit-card';
import EventIcon from 'material-ui/lib/svg-icons/action/event';
import EventAvailableIcon from 'material-ui/lib/svg-icons/notification/event-available';
import AssignmentTurnedInIcon  from 'material-ui/lib/svg-icons/action/assignment-turned-in';

import { VolWaiverForm, VolShiftsForm, VolPaymentForm, VolDepositForm } from 'containers/Opp/ObligForms'

import DropDownDialogPicker from 'components/DropDownDialogPicker'

const volObligItems = {
  waiver: <ListItem primaryText='Liability Waiver' value='waiver' leftIcon={<AssignmentTurnedInIcon/>} />,
  shifts: <ListItem primaryText='Shifts of Work' value='shifts' leftIcon={<EventAvailableIcon/>} />,
  payment: <ListItem primaryText='A Payment' value='payment' leftIcon={<AttachMoneyIcon/>} />,
  deposit: <ListItem primaryText='A Deposit' value='deposit' leftIcon={<CreditCardIcon/>} />
}

const projectObligItems = {
  waiver: <ListItem primaryText='Liability Waiver' value='waiver' leftIcon={<AttachMoneyIcon/>} />,
  shifts: <ListItem primaryText='Shifts of Work' value='shifts' leftIcon={<AttachMoneyIcon/>} />,
  payment: <ListItem primaryText='A Payment' value='payment' leftIcon={<AttachMoneyIcon/>} />,
  deposit: <ListItem primaryText='A Deposit' value='deposit' leftIcon={<AttachMoneyIcon/>} />
}

const nonExistentItems = (items,exists)=>
  Object.keys(items).filter( key=>!exists[key] ).map( key=>items[key] )

const save = (data)=>console.log('save',data)

const VolObligPicker = ({obligs})=>
  <DropDownDialogPicker primaryText='they GIVE' {...{save}}
    items={ nonExistentItems(volObligItems,obligs) }
    dialogs={[
      <VolWaiverForm value='waiver' initialValues={obligs['waiver']}/>,
      <VolShiftsForm value='shifts' initialValues={obligs['shifts']}/>,
      <VolPaymentForm value='payment' initialValues={obligs['payment']}/>,
      <VolDepositForm value='deposit' initialValues={obligs['deposit']}/>
    ]}
    />

const ProjectObligPicker = ({obligs})=>
  <DropDownDialogPicker primaryText='they GET' {...{save}}
    items={ nonExistentItems(projectObligItems,obligs) }
    dialogs={[
      <VolWaiverForm value='waiver' initialValues={obligs['waiver']}/>,
      <VolShiftsForm value='shifts' initialValues={obligs['shifts']}/>,
      <VolPaymentForm value='payment' initialValues={obligs['payment']}/>,
      <VolDepositForm value='deposit' initialValues={obligs['deposit']}/>
    ]}
    />

export default ({opp})=>
  <Grid>
    <HalfColumn>
      <VolObligPicker obligs={opp.volObligs||{}} save={(key,data)=>console.log('save',key,data)}/>
      <List>
      </List>
    </HalfColumn>
    <HalfColumn>
      <ProjectObligPicker obligs={opp.projectObligs||{}} save={(key,data)=>console.log('save',key,data)}/>
      <List>
      </List>
    </HalfColumn>
  </Grid>