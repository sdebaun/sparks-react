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

import { VolWaiverForm, VolShiftsForm, VolPaymentForm, VolDepositForm } from 'containers/Opp/ObligForms'

import DropDownDialogPicker from 'components/DropDownDialogPicker'

// const volOfferOptions = {
//   waiver: <ListItem primaryText='Liability Waiver' value='waiver' leftIcon={<AssignmentTurnedInIcon/>} />,
//   shifts: <ListItem primaryText='Shifts of Work' value='shifts' leftIcon={<EventAvailableIcon/>} />,
//   payment: <ListItem primaryText='A Payment' value='payment' leftIcon={<AttachMoneyIcon/>} />,
//   deposit: <ListItem primaryText='A Deposit' value='deposit' leftIcon={<CreditCardIcon/>} />
// }


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

// const nonExistentItems = (items,exists)=>
//   Object.keys(items).filter( key=>!exists[key] ).map( key=>items[key] )

// const VolObligPicker = ({obligs,save})=>
//   <DropDownDialogPicker primaryText='they GIVE' {...{save}}
//     items={ nonExistentItems(volObligItems,obligs) }
//     dialogs={[
//       <VolWaiverForm value='waiver' initialValues={obligs['waiver']}/>,
//       <VolShiftsForm value='shifts' initialValues={obligs['shifts']}/>,
//       <VolPaymentForm value='payment' initialValues={obligs['payment']}/>,
//       <VolDepositForm value='deposit' initialValues={obligs['deposit']}/>
//     ]}
//     />

// const ProjectObligPicker = ({obligs,save})=>
//   <DropDownDialogPicker primaryText='they GET' {...{save}}
//     items={ nonExistentItems(projectObligItems,obligs) }
//     dialogs={[
//       <VolWaiverForm value='waiver' initialValues={obligs['waiver']}/>,
//       <VolShiftsForm value='shifts' initialValues={obligs['shifts']}/>,
//       <VolPaymentForm value='payment' initialValues={obligs['payment']}/>,
//       <VolDepositForm value='deposit' initialValues={obligs['deposit']}/>
//     ]}
//     />

const volOfferOptions = [
  {
    party: 'vol',
    code: 'waiver',
    allowed: (offers)=>!offers.find( o=>o.code=='waiver' ),
    item: <ListItem primaryText='Liability Waiver' value='waiver' leftIcon={<AssignmentTurnedInIcon/>} />,
    form: (data)=><VolWaiverForm party='vol' value='waiver' initialValues={data}/>,
  },
  {
    party: 'vol',
    code: 'shifts',
    allowed: (offers)=>!offers.find( o=>o.code=='shifts' ),
    item: <ListItem primaryText='Shifts of Work' value='shifts' leftIcon={<EventAvailableIcon/>} />,
    form: (data)=><VolShiftsForm party='vol' value='shifts' initialValues={data}/>
  },
  {
    party: 'vol',
    code: 'payment',
    allowed: (offers)=>!offers.find( o=>o.code=='payment' ),
    item: <ListItem primaryText='A Payment' value='payment' leftIcon={<AttachMoneyIcon/>} />,
    form: (data)=><VolPaymentForm party='vol' value='payment' initialValues={data}/>
  },
  {
    party: 'vol',
    code: 'deposit',
    allowed: (offers)=>!offers.find( o=>o.code=='deposit' ),
    item: <ListItem primaryText='A Deposit' value='deposit' leftIcon={<CreditCardIcon/>} />,
    form: (data)=><VolDepositForm party='vol' value='deposit' initialValues={data}/>
  }
]


const OfferPicker = ({offers,offerOptions,create})=>
  <DropDownDialogPicker primaryText='they GET' {...{create}}
    items={ offerOptions.filter( o=>o.allowed(offers) ).map( o=>o.item ) }
    dialogs={ offerOptions.map( o=>o.form({}) ) } 
    />

import { compose } from 'redux'
import { connect } from 'react-redux'
import { Opps, Offers } from 'remote'
import { createSelector } from 'reselect'
import { wanting } from 'lib/react-needful'

const mapState = createSelector(
  Offers.select.by('oppKey'),
  (offers)=>{ return {
    volOffers: offers.filter( (o)=>o.party=='vol' ),
    projectOffers: offers.filter( (o)=>o.party=='project' )
  }}
)

const mapDispatch = {
  create: Offers.actions.create,
  wantsOffers: Offers.actions.query
}

const wants = {
  offers: ({wantsOffers,oppKey})=>wantsOffers({orderByChild:'oppKey',equalTo:oppKey})
}

const OppExchange = ({opp,oppKey,volOffers,projectOffers,create})=>
  <Grid>
    <HalfColumn>
      <OfferPicker primaryText='they GET'
        offers={volOffers} offerOptions={volOfferOptions}
        create={(data)=>create({oppKey,...data})}
        />
      <List>
      { volOffers.map(o=><ListItem key={o.$key} primaryText={o.name}/>) }
      </List>
    </HalfColumn>
  </Grid>

export default compose(connect(mapState,mapDispatch),wanting(wants))(OppExchange)