import React from 'react';
import HalfColumn from 'components/HalfColumn'
import { Grid } from 'react-flexr'
import { VBox } from 'react-layout-components'
import TextField from 'material-ui/lib/text-field'
import ValidatingForm from 'components/ValidatingForm'
import {reduxForm} from 'redux-form';
import List from 'components/styled/List'
import ListItem from 'material-ui/lib/lists/list-item'
import ListItemHeader from 'components/styled/ListItemHeader'
import OpeningListItem from 'components/OpeningListItem'
import QuestionAnswerIcon  from 'material-ui/lib/svg-icons/action/question-answer';
import Checkbox from 'material-ui/lib/checkbox'

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

import { compose } from 'redux'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { Opps, Teams, Fulfillers } from 'remote'
import { wanting } from 'lib/react-needful'

const mapState = createSelector(
  Teams.select.by('projectKey'),
  Fulfillers.select.by('oppKey'),
  (teams,fulfillers)=>{ return {teams,fulfillers} }
)

const mapDispatch = {
  update: Opps.actions.update,
  createFulfiller: Fulfillers.actions.create,
  removeFulfiller: Fulfillers.actions.remove,
  wantsFulfillers: Fulfillers.actions.query,
}

const wants = {
  fulfillers: ({oppKey,wantsFulfillers})=>wantsFulfillers({orderByChild:'oppKey',equalTo:oppKey})
}

import CheckboxOutline from 'material-ui/lib/svg-icons/toggle/check-box-outline-blank';
import CheckboxChecked from 'material-ui/lib/svg-icons/toggle/check-box';
import Colors from 'material-ui/lib/styles/colors';

export default compose(connect(mapState,mapDispatch),wanting(wants))(
  ({opp,oppKey,update,teams,fulfillers,createFulfiller,removeFulfiller})=>
    <Grid>
      <HalfColumn>
        <p>
          When people apply for this opportunity, they will be asked a question.
          They'll only be able to pick shifts from teams that you select here.
        </p>
        <List>
          <OpeningListItem primaryText='What question do you want to ask all your applicants?' leftIcon={<QuestionAnswerIcon/>}>
            <QuestionForm {...{initialValues:opp, onSubmit:(data)=>update(oppKey,data)}}/>
          </OpeningListItem>
        </List>
      </HalfColumn>
      <HalfColumn>
        {(teams.length==0) &&
          <p>Create some teams so that people can join them and fulfill their commitments.</p> ||
          <List>
            <ListItemHeader primaryText='Work on Teams' rightIcon={<div style={{width:'4em',textAlign:'right',color:'white'}}>{fulfillers.length} / {teams.length}</div>}/>
            { teams.map( ({$key,name})=>
              <ListItem key={$key} primaryText={name} leftCheckbox={
                <Checkbox checked={!!fulfillers.find((f)=>f.teamKey==$key)}
                  checkedIcon={<CheckboxChecked color={Colors.amber700}/>}
                  onCheck={()=>!fulfillers.find((f)=>f.teamKey==$key) &&
                    createFulfiller({teamKey:$key,oppKey}) ||
                    removeFulfiller(fulfillers.find((f)=>f.teamKey==$key).$key)
                    }
                  />
                } />
            )}
          </List>
        }
      </HalfColumn>
    </Grid>
)
