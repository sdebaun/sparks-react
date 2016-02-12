import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';

import RaisedButton from 'material-ui/lib/raised-button'
import TextField from 'material-ui/lib/text-field'
import SelectField from 'lib/reduxform-material/SelectField';
import MenuItem from 'material-ui/lib/menus/menu-item';

export const fields = ['email','authority'];

import {createValidator, isRequired, isEmail} from 'lib/validation'

const validate = createValidator({
  email: [isEmail, isRequired],
  authority: [isRequired]
})

class InviteForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  };

  render() {
    const {fields: {email,authority}, errors, handleSubmit, submitting} = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <TextField floatingLabelText="What's their E-mail Address?" errorText={email.touched && email.error} {...email} />
        <br/>
        <SelectField {...authority}
          floatingLabelText='What authority do they get?'
          errorText={authority.touched && authority.error}
          >
          <MenuItem value='manager' primaryText='Manager'/>
          <MenuItem value='owner' primaryText='Owner'/>
        </SelectField>
        { authority.value=='manager' &&
          <p>They can manage most things, but they can't add or remove new Admins.</p>
        }
        { authority.value=='owner' &&
          <p>They can change everything about this project, including adding and removing other Owners.</p>
        }
        <div style={{display:'flex',width:'100%',justifyContent:'flex-end'}}>
          <RaisedButton disabled={!!errors.email || !!errors.authority || submitting}
            primary={true} onTouchTap={handleSubmit}
            label='All Aboard!' style={{marginRight:'1em'}}/>
          {this.props.children}
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'synchronousValidation',
  fields,
  validate,
  initialValues: {
    authority: 'manager'
  }
})(InviteForm);