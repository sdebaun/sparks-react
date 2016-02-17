import React from 'react';
import {reduxForm} from 'redux-form';

import TextField from 'material-ui/lib/text-field'

import ValidatingForm from 'components/ValidatingForm'

export default reduxForm({
  form: 'ObligWaiverForm',
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
