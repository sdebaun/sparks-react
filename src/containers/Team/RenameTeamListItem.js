import React from 'react';

import EditIcon from 'material-ui/lib/svg-icons/image/edit';

import OpeningListItem from 'components/OpeningListItem'

import TeamForm from 'containers/Team/TeamForm'

import FlatButton from 'material-ui/lib/flat-button'

class RenameTeamListItem extends React.Component {
  save = (data)=>{
    this.props.update(this.props.teamKey,data)
    this.refs.listItem.close()
  }

  cancel = ()=>{ this.refs.listItem.close() }

  render() {
    const {props:{team}} = this

    const attrs = {
        primaryText: 'Rename your Team.',
        leftIcon: <EditIcon/>
      }

    return (
      <OpeningListItem ref='listItem' {...attrs}>
        <TeamForm onSubmit={this.save} initialValues={team}>
          <FlatButton onTouchTap={this.cancel} label='CANCEL' secondary={true}/>
        </TeamForm>
      </OpeningListItem>
    )
  }
}

import { connect } from 'react-redux';
import { createSelector } from 'reselect'
import { Teams } from 'remote'

const mapStateToProps = createSelector(
  Teams.select.matching('teamKey'),
  (team)=>{ return {team} }
)

const mapDispatchToProps = {
  update: Teams.actions.update
}

export default connect(mapStateToProps,mapDispatchToProps)(RenameTeamListItem)