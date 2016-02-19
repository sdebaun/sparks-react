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

import FreeBreakfastIcon  from 'material-ui/lib/svg-icons/places/free-breakfast';
// import SentimentVerySatisfiedIcon  from 'material-ui/lib/svg-icons/social/sentiment-very-satisfied';
import MoodIcon from 'material-ui/lib/svg-icons/social/mood';
import EventSeatIcon  from 'material-ui/lib/svg-icons/action/event-seat';
import RestaurantMenuIcon  from 'material-ui/lib/svg-icons/maps/restaurant-menu';
import ToysIcon  from 'material-ui/lib/svg-icons/hardware/toys';

import { VolWaiverForm, VolShiftsForm, VolPaymentForm, VolDepositForm,
  ProjectCommunityForm, ProjectTicketForm, ProjectPerksForm, ProjectConsumableForm, ProjectSchwagForm }
  from 'containers/Opp/ObligForms'

import DropDownDialogPicker from 'components/DropDownDialogPicker'

// const volObligItems = {
//   waiver: <ListItem primaryText='Liability Waiver' value='waiver' leftIcon={<AssignmentTurnedInIcon/>} />,
//   shifts: <ListItem primaryText='Shifts of Work' value='shifts' leftIcon={<EventAvailableIcon/>} />,
//   payment: <ListItem primaryText='A Payment' value='payment' leftIcon={<AttachMoneyIcon/>} />,
//   deposit: <ListItem primaryText='A Deposit' value='deposit' leftIcon={<CreditCardIcon/>} />
// }

// const projectObligItems = {
//   community: <ListItem primaryText='Help Community' value='community' leftIcon={<MoodIcon/>} />,
//   ticket: <ListItem primaryText='Ticket to Event' value='ticket' leftIcon={<EventSeatIcon/>} />,
//   perks: <ListItem primaryText='Perks While Working' value='perks' leftIcon={<FreeBreakfastIcon/>} />,
//   consumable: <ListItem primaryText='Tracked Meals' value='consumable' leftIcon={<RestaurantMenuIcon/>} />,
//   schwag: <ListItem primaryText='Schwag' value='schwag' leftIcon={<ToysIcon/>} />
// }

const projectOfferOptions = [
  {
    party: 'project',
    code: 'community',
    menuText: 'Help Community',
    icon: <MoodIcon/>,
    allowed: (offers)=>!offers.find( o=>o.code=='community' ),
    listText: ({name})=>'To help ' + name,
    FormClass: ProjectCommunityForm
  },
  {
    party: 'project',
    code: 'ticket',
    menuText: 'Ticket to Event',
    icon: <EventSeatIcon/>,
    allowed: (offers)=>true,
    listText: ({name})=>'Helping ' + name,
    FormClass: ProjectTicketForm
  },
  {
    party: 'project',
    code: 'perks',
    menuText: 'Perks While Working',
    icon: <FreeBreakfastIcon/>,
    allowed: (offers)=>!offers.find( o=>o.code=='perks' ),
    listText: ({name})=>name + ' while they work',
    FormClass: ProjectPerksForm
  },
  {
    party: 'project',
    code: 'consumable',
    menuText: 'Tracked Meals',
    icon: <RestaurantMenuIcon/>,
    allowed: (offers)=>true,
    listText: ({name, count})=><span><b>{count}</b> {name}</span>,
    FormClass: ProjectConsumableForm,
    initialValues: { count:1 }
  },
  {
    party: 'project',
    code: 'schwag',
    menuText: 'Schwag',
    icon: <ToysIcon/>,
    allowed: (offers)=>true,
    listText: ({name})=>'Cool schwag like ' + name,
    FormClass: ProjectSchwagForm
  }
]

const volOfferOptions = [
  {
    party: 'vol',
    code: 'waiver',
    icon: <AssignmentTurnedInIcon/>,
    allowed: (offers)=>!offers.find( o=>o.code=='waiver' ),
    menuText: 'Liability Waiver',
    listText: ({name})=>'A liability waiver for ' + name,
    FormClass: VolWaiverForm
  },
  {
    party: 'vol',
    code: 'shifts',
    icon: <EventIcon/>,
    allowed: (offers)=>!offers.find( o=>o.code=='shifts' ),
    menuText: 'Shifts of Work',
    listText: ({count})=>'Work at least ' + count + ' shifts, length TBD',
    FormClass: VolShiftsForm,
    initialValues: { count: 1 }
  },
  {
    party: 'vol',
    code: 'payment',
    icon: <AttachMoneyIcon/>,
    allowed: (offers)=>!offers.find( o=>o.code=='payment' ),
    menuText: 'A Payment' ,
    listText: ({amount,name,purpose})=><span>A <b>${amount} {name}</b> for <b>{purpose}</b></span>,
    FormClass: VolPaymentForm
  },
  {
    party: 'vol',
    code: 'deposit',
    icon: <CreditCardIcon/>,
    allowed: (offers)=>!offers.find( o=>o.code=='deposit' ),
    menuText: 'A Deposit' ,
    listText: ({amount})=>'A refundable deposit of ' + amount + ' dollars',
    FormClass: VolDepositForm
  }
]

import ActionMenu from 'components/ActionMenu'
import MenuItem from 'material-ui/lib/menus/menu-item';

const OfferPicker = ({offers,offerOptions,create,primaryText})=>
  <DropDownDialogPicker {...{primaryText,create}}
    items={ offerOptions.filter( o=>o.allowed(offers) ).map( ({menuText,code,icon})=>
      <ListItem primaryText={menuText} value={code} leftIcon={icon}/>      
    ) }
    dialogs={ offerOptions.map( ({FormClass,party,code,icon,menuText,initialValues})=>
      <FormClass {...{value:code, party, leftIcon:icon, title:menuText, initialValues}}/>
    ) } 
    />

import { compose } from 'redux'
import { connect } from 'react-redux'
import { Opps, Offers } from 'remote'
import { createSelector } from 'reselect'
import { wanting } from 'lib/react-needful'

const nullMapper = ()=>{return {}}

const mapState = createSelector(
  Offers.select.by('oppKey'),
  (offers)=>{ return {
    volOffers: offers.filter( (o)=>o.party=='vol' ),
    projectOffers: offers.filter( (o)=>o.party=='project' )
  }}
)

const mapDispatch = {
  create: Offers.actions.create,
  remove: Offers.actions.remove,
  wantsOffers: Offers.actions.query
}

const wants = {
  offers: ({wantsOffers,oppKey})=>wantsOffers({orderByChild:'oppKey',equalTo:oppKey})
}

const _OfferActionMenu = ({remove, offerKey, ...props}) =>
  <ActionMenu {...props}>
    <MenuItem onTouchTap={()=>remove(offerKey)}>Remove</MenuItem>
  </ActionMenu>

const OfferActionMenu = connect(
  nullMapper,
  { remove: Offers.actions.remove }
)(_OfferActionMenu)

const OfferListItem = ({$key, primaryText, leftIcon})=>
  <ListItem {...{primaryText,leftIcon}}
    rightIconButton={<OfferActionMenu offerKey={$key}/>}
    />

const OfferList = ({offers, offerOptions})=>
  <List>
  { offers.map( o=>{
     const {listText,icon} = offerOptions.find( (opt)=>opt.code==o.code )
     return <OfferListItem key={o.$key} $key={o.$key} primaryText={listText(o)} leftIcon={icon}/>
  } ) }
  </List>

const OppExchange = ({opp,oppKey,volOffers,projectOffers,create})=>
    <Grid>
      <HalfColumn>
        <OfferPicker primaryText='they GIVE'
          offers={volOffers} offerOptions={volOfferOptions}
          create={(data)=>create({oppKey,...data})}
          />
        { (volOffers.length==0) && <p>What will your volunteers contribute to your project?</p> }
        <OfferList offers={volOffers} offerOptions={volOfferOptions}/>
      </HalfColumn>
      <HalfColumn>
        <OfferPicker primaryText='they GET'
          offers={projectOffers} offerOptions={projectOfferOptions}
          create={(data)=>create({oppKey,...data})}
          />
        { (projectOffers.length==0) && <p>What will your volunteers receive in return?</p> }
        <OfferList offers={projectOffers} offerOptions={projectOfferOptions}/>
      </HalfColumn>
    </Grid>

export default compose(connect(mapState,mapDispatch),wanting(wants))(OppExchange)