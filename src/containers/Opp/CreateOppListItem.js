import React from 'react';
import { connect } from 'react-redux';

import FlatButton from 'material-ui/lib/flat-button'
import AddIcon from 'material-ui/lib/svg-icons/content/add';

import PopupListItem from 'components/PopupListItem'

import OppForm from 'containers/Opp/OppForm'

import { pushPath } from 'redux-simple-router'

class CreateOppListItem extends React.Component {

  save = data => {
    if (data) {
      this.props.create({...data, ...{projectKey:this.props.projectKey}})
      // this needs to wait for a task from the response queue?
      // this.props.pushPath('/opportunity/'+this.props.projectKey + '/' + opportunityRef.key())
    }
      
    this.refs.listItem.close()
  }

  cancel = ()=>this.refs.listItem.close()

  render() {
    return (
      <PopupListItem ref='listItem' primaryText='Create an Opportunity'
        secondaryText='A Opportunity lets you add Leads to create Shifts and manage Volunteers.'
        leftIcon={<AddIcon/>}>
        <OppForm onSubmit={this.save}>
          <FlatButton onTouchTap={this.cancel} label='CANCEL' secondary={true}/>
        </OppForm>
      </PopupListItem>
    );
  }

}

import { Opps } from 'remote'

const mapState = ()=>{ return {} }

const mapDispatch = {
  create: Opps.actions.create,
  pushPath
}

export default connect(mapState, mapDispatch)(CreateOppListItem);
