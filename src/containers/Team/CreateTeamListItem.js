import React from 'react';
import { connect } from 'react-redux';

import FlatButton from 'material-ui/lib/flat-button'
import AddIcon from 'material-ui/lib/svg-icons/content/add';

import PopupListItem from 'components/PopupListItem'

import TeamForm from 'containers/Team/TeamForm'

class CreateTeamListItem extends React.Component {

  save = data => {
    if (data) this.props.push({...data, ...{projectKey:this.props.projectKey}})
    this.refs.listItem.close()
  }

  cancel = ()=>this.refs.listItem.close()

  render() {
    return (
      <PopupListItem ref='listItem' primaryText='Form a Team'
        secondaryText='A Team lets you add Leads to create Shifts and manage Volunteers.'
        leftIcon={<AddIcon/>}>
        <TeamForm onSubmit={this.save}>
          <FlatButton onTouchTap={this.cancel} label='CANCEL' secondary={true}/>
        </TeamForm>
      </PopupListItem>
    );
  }

}

import { Teams } from 'remote'

const mapStateToProps = ()=>{ return {} }

const mapDispatchToProps = {
  push: Teams.actions.push
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTeamListItem);
