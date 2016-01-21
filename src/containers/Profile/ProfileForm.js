import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';

import RaisedButton from 'material-ui/lib/raised-button'
import TextField from 'material-ui/lib/text-field'
import SelectField from 'components/SelectField';
// import DropDownMenu from 'components/DropDownMenu';
// import DropDownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';

const fields = ['fullName','email', 'phone', 'zip'];

import {createValidator, isRequired, isEmail} from 'lib/validation'

const validate = createValidator({
  fullName: [isRequired],
  email: [isEmail, isRequired],
})

class ProfileForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  };

        // <DropDownMenu value={authority.value} onChange={(e,i,v)=>authority.onChange(v)}>

  render() {
    const {fields: {fullName,email,phone,zip}, errors, handleSubmit, submitting} = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <TextField floatingLabelText="Your Name" errorText={fullName.touched && fullName.error} {...fullName} />
        <p style={{fontWeight:'bold',color:'red',textAlign:'center'}}>
          Your email and phone number will only be shared with organizers that you work with.
          Your phone number is optional, but awfully convenient to share with your coworkers.
        </p>
        <TextField floatingLabelText="What's Your E-mail Address?" errorText={email.touched && email.error} {...email} />
        <br/>
        <TextField floatingLabelText="What's Your Phone Number?" errorText={phone.touched && phone.error} {...phone} />
        <p style={{fontWeight:'bold',color:'red',textAlign:'center'}}>
          Your ZIP code will NEVER be shared with other users.
        </p>
        <TextField floatingLabelText="What's Your ZIP Code?" errorText={zip.touched && zip.error} {...zip} />
        <p>Your ZIP will help us show you opportunities that are close to you.</p>
        <div style={{display:'flex',width:'100%',justifyContent:'flex-end'}}>
          <RaisedButton disabled={errors.email || submitting}
            primary={true} onTouchTap={handleSubmit}
            label='It Sure Is!' style={{marginRight:'1em'}}/>
          {this.props.children}
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'ProfileForm',
  fields,
  validate
})(ProfileForm);