import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';

import RaisedButton from 'material-ui/lib/raised-button'
import TextField from 'material-ui/lib/text-field'

export const fields = ['email'];

import {createValidator, isRequired, isEmail} from 'lib/validation'

const validate = createValidator({
  email: [isEmail, isRequired]
})

// const validate = values => {
//   const errors = {};
//   if (!values.email) {
//     errors.email = 'Required';
//   }
//   return errors;
// };

class InviteForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  };

  render() {
    const {fields: {email}, errors, resetForm, handleSubmit, submitting} = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <TextField floatingLabelText='Email Address' errorText={email.touched && email.error} {...email} />
        <div style={{display:'flex',width:'100%',justifyContent:'flex-end'}}>
          <RaisedButton disabled={errors.email} primary={true} onTouchTap={handleSubmit} label='Send Invite' style={{marginRight:'1em'}}/>
          {this.props.children}
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'synchronousValidation',
  fields,
  validate
})(InviteForm);