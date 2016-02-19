import React from 'react';
import {reduxForm} from 'redux-form';

import { Grid, Cell } from 'react-flexr'

import TextField from 'material-ui/lib/text-field'
import SelectField from 'lib/reduxform-material/SelectField'
import MenuItem from 'material-ui/lib/menus/menu-item';

import ValidatingForm from 'components/ValidatingForm'

export const VolWaiverForm = reduxForm({
  form: 'VolWaiverForm',
  fields: ['name'],
  validate: (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Required';
    }
    return errors;
  }
})( (props)=>
  <ValidatingForm {...props}>
    <p>Your volunteers will accept a waiver that releases both you and the Sparks.Network from liability.</p>
    <TextField floatingLabelText="Your Organization's Legal Name" field='name' />
  </ValidatingForm>
);

export const VolDepositForm = reduxForm({
  form: 'VolDepositForm',
  fields: ['amount'],
  validate: (values) => {
    const errors = {};
    if (!values.amount) {
      errors.amount = 'Required';
    }
    return errors;
  }
})( (props)=>
  <ValidatingForm {...props}>
    <p>
      Your volunteers will put down a deposit when they confirm their participation.
      That deposit will be fully refunded when they complete their obligations.
    </p>
    <b>$ </b><TextField floatingLabelText='How much is the deposit?' field='amount' />
  </ValidatingForm>
);

export const VolPaymentForm = reduxForm({
  form: 'VolPaymentForm',
  fields: ['amount','name','purpose'],
  validate: (values) => {
    const errors = {};
    if (!values.amount) {
      errors.amount = 'Required';
    }
    return errors;
  }
})( (props)=>
  <ValidatingForm {...props}>
    <p>
      Your volunteers will make a non-refundable payment to secure their spot.
      Tell your volunteers what you they are paying for.
    </p>
    <b>$ </b><TextField floatingLabelText='How much do they pay?' field='amount' />
    <SelectField floatingLabelText='What do you call it?' field='name'>
      <MenuItem primaryText='Volunteer Ticket' value='Volunteer Ticket'/>
      <MenuItem primaryText='Impact Fee' value='Impact Fee'/>
      <MenuItem primaryText='Admin Fee' value='Admin Fee'/>
      <MenuItem primaryText='Donation' value='Donation'/>
    </SelectField>
    <TextField floatingLabelText='It is used for...' field='purpose'/>
  </ValidatingForm>
);

import Spinner from 'components/Spinner'

export const VolShiftsForm = reduxForm({
  form: 'VolShiftsForm',
  fields: ['count'],
  validate: (values) => {
    const errors = {};
    if (!values.count) {
      errors.count = 'Required';
    }
    return errors;
  }
})( (props)=>
  <ValidatingForm {...props}>
    <p>
      Your volunteers will commit to working one or more shifts in the schedule you create.
    </p>
    <Spinner labelText='Shifts' field='count' minValue={1} maxValue={12}/>
  </ValidatingForm>
);

export const ProjectCommunityForm = reduxForm({
  form: 'ProjectCommunityForm',
  fields: ['name'],
  validate: (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Required';
    }
    return errors;
  }
})( (props)=>
  <ValidatingForm {...props}>
    <p>Who are your volunteers helping, and how are they helping?</p>
    <TextField multiLine={true} floatingLabelText="Volunteers get to help..." field='name' />
  </ValidatingForm>
);

export const ProjectTicketForm = reduxForm({
  form: 'ProjectTicketForm',
  fields: ['name'],
  validate: (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Required';
    }
    return errors;
  }
})( (props)=>
  <ValidatingForm {...props}>
    <p>Coming Soon!</p>
  </ValidatingForm>
);

export const ProjectPerksForm = reduxForm({
  form: 'ProjectPerksForm',
  fields: ['name'],
  validate: (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Required';
    }
    return errors;
  }
})( (props)=>
  <ValidatingForm {...props}>
    <p>What free perks do your volunteers get while working?  Do they get beverages or snacks?</p>
    <TextField multiLine={true} floatingLabelText="Volunteers get..." field='name' />
  </ValidatingForm>
);

export const ProjectConsumableForm = reduxForm({
  form: 'ProjectConsumableForm',
  fields: ['name','count'],
  validate: (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Required';
    }
    return errors;
  }
})( (props)=>
  <ValidatingForm {...props}>
    <p>Do your volunteers get a specific number of something that you need to track?  These are things like meal tickets, afterparty passes, etc.</p>
    <TextField multiLine={true} floatingLabelText="Volunteers get..." field='name' />
    <Spinner labelText='How many?' field='count' minValue={1} maxValue={12}/>
  </ValidatingForm>
);

export const ProjectSchwagForm = reduxForm({
  form: 'ProjectSchwagForm',
  fields: ['name'],
  validate: (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Required';
    }
    return errors;
  }
})( (props)=>
  <ValidatingForm {...props}>
    <p>Give your volunteers something special to recognize their help, like a t-shirt or other gift.</p>
    <TextField multiLine={true} floatingLabelText="Volunteers get..." field='name' />
  </ValidatingForm>
);