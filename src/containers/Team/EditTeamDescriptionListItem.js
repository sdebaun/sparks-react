import React from 'react';

import PlaylistAddIcon from 'material-ui/lib/svg-icons/av/playlist-add';
import PlaylistAddCheckIcon from 'material-ui/lib/svg-icons/av/playlist-add-check';


import OpeningListItem from 'components/OpeningListItem'

import TeamDescriptionForm from 'containers/Team/TeamDescriptionForm'

import FlatButton from 'material-ui/lib/flat-button'

class EditTeamDescriptionListItem extends React.Component {

  save = (data)=>{
    this.props.update(this.props.teamKey,data)
    this.refs.listItem.close()
  }

  cancel = ()=>{ this.refs.listItem.close() }

  render() {
    const {props:{team}} = this

    const attrs = {
      primaryText: team.description &&
        'Edit your Team Description.' ||
        'Write a short Description of your Team.',
      leftIcon: team.description &&
        <PlaylistAddCheckIcon/> ||
        <PlaylistAddIcon/>
    }

    return (
      <OpeningListItem ref='listItem' {...attrs}>
        <TeamDescriptionForm onSubmit={this.save} initialValues={team}>
          <FlatButton onTouchTap={this.cancel} label='CANCEL' secondary={true}/>
        </TeamDescriptionForm>
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

export default connect(mapStateToProps,mapDispatchToProps)(EditTeamDescriptionListItem)