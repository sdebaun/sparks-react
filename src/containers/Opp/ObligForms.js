import React from 'react';
import {reduxForm} from 'redux-form';

import TextField from 'material-ui/lib/text-field'

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
    <TextField floatingLabelText='Name' field='name' />
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
    <TextField floatingLabelText='Amount' field='amount' />
  </ValidatingForm>
);

export const VolPaymentForm = reduxForm({
  form: 'VolPaymentForm',
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
    <TextField floatingLabelText='Amount' field='amount' />
  </ValidatingForm>
);

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
    <TextField floatingLabelText='Shifts' field='count' />
  </ValidatingForm>
);

