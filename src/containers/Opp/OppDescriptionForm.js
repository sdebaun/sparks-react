import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';

import RaisedButton from 'material-ui/lib/raised-button'
import TextField from 'material-ui/lib/text-field'

import { Grid } from 'react-flexr'

export const fields = ['description'];

const validate = values => {
  const errors = {};
  if (!values.description) {
    errors.description = 'Required';
  }
  return errors;
};

class Form extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  };

  render() {
    const {fields: {description}, errors, handleSubmit, submitting} = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <TextField floatingLabelText='Describe It' errorText={description.touched && description.error} {...description} />
        <Grid hAlign='right'>
          <RaisedButton disabled={!!errors.description || submitting} primary={true} onTouchTap={handleSubmit} label='OK'/>
          {this.props.children}
        </Grid>
      </form>
    );
  }
}

export default reduxForm({
  form: 'OppDescriptionForm',
  fields,
  validate
})(Form);