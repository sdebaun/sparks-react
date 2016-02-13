import React from 'react';

import PlaylistAddIcon from 'material-ui/lib/svg-icons/av/playlist-add';
import PlaylistAddCheckIcon from 'material-ui/lib/svg-icons/av/playlist-add-check';


import OpeningListItem from 'components/OpeningListItem'

import OppDescriptionForm from 'containers/Opp/OppDescriptionForm'

import FlatButton from 'material-ui/lib/flat-button'

export default class EditOppDescriptionListItem extends React.Component {

  // save = (data)=>{
  //   this.props.update(this.props.teamKey,data)
  //   this.refs.listItem.close()
  // }

  render() {
    const {props:{opp,update}} = this

    const attrs = {
      primaryText: opp.description &&
        'Edit your Opp Description.' ||
        'Write a short Description of your Opp.',
      leftIcon: opp.description &&
        <PlaylistAddCheckIcon/> ||
        <PlaylistAddIcon/>
    }

    return (
      <OpeningListItem ref='listItem' {...attrs}>
        <OppDescriptionForm onSubmit={(v)=>{ console.log('form',v); update(v); this.refs.listItem.close() }} initialValues={opp}>
          <FlatButton onTouchTap={()=>this.refs.listItem.close()} label='CANCEL' secondary={true}/>
        </OppDescriptionForm>
      </OpeningListItem>
    )
  }
}

// import { connect } from 'react-redux';
// import { createSelector } from 'reselect'
// import { Opps } from 'remote'

// export default connect(()=>{return{}},mapDispatch)(EditOppDescriptionListItem)