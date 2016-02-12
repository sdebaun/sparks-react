import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';

import RaisedButton from 'material-ui/lib/raised-button'
import TextField from 'material-ui/lib/text-field'

export const fields = ['name'];

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  }
  return errors;
};

class SynchronousValidationForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  };

  render() {
    const {fields: {name}, errors, handleSubmit, submitting} = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <TextField floatingLabelText='Name' errorText={name.touched && name.error} {...name} />
        <div style={{display:'flex',width:'100%',justifyContent:'flex-end'}}>
          <RaisedButton disabled={!!errors.name || submitting} primary={true} onTouchTap={handleSubmit} label='OK' style={{marginRight:'1em'}}/>
          {this.props.children}
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'OpportunityForm',
  fields,
  validate
})(SynchronousValidationForm);