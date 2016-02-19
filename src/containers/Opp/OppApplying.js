import React from 'react';
import HalfColumn from 'components/HalfColumn'
import { Grid } from 'react-flexr'
import { VBox } from 'react-layout-components'
import TextField from 'material-ui/lib/text-field'
import ValidatingForm from 'components/ValidatingForm'
import {reduxForm} from 'redux-form';
import List from 'components/styled/List'
import OpeningListItem from 'components/OpeningListItem'
import QuestionAnswerIcon  from 'material-ui/lib/svg-icons/action/question-answer';

const QuestionForm = reduxForm({
  form: 'QuestionForm',
  fields: ['question'],
  validate: (values) => {
    const errors = {};
    if (!values.question) {
      errors.question = 'Required';
    }
    return errors;
  }
})( (props)=>
  <ValidatingForm {...props}>
    <TextField multiLine floatingLabelText='What do you really want to know?' field='question'/>
  </ValidatingForm>
);

import { connect } from 'react-redux'
import { Opps } from 'remote'

const mapState = ()=>{return {}}
const mapDispatch = {
  update: Opps.actions.update
}

export default connect(mapState,mapDispatch)(
  ({opp,oppKey,update})=>
    <Grid>
      <HalfColumn>
        <List>
          <OpeningListItem primaryText='What question do you want to ask all your applicants?' leftIcon={<QuestionAnswerIcon/>}>
            <QuestionForm {...{initialValues:opp, onSubmit:(data)=>update(oppKey,data)}}/>
          </OpeningListItem>
        </List>
      </HalfColumn>
      <HalfColumn>
        Teams Here
      </HalfColumn>
    </Grid>
)
