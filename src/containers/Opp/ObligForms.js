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

export const VolPaymentForm = reduxForm({
  form: 'VolPaymentForm',
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

export const VolShiftsForm = reduxForm({
  form: 'VolShiftsForm',
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

