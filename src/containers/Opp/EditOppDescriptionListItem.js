import React from 'react';

import PlaylistAddIcon from 'material-ui/lib/svg-icons/av/playlist-add';
import PlaylistAddCheckIcon from 'material-ui/lib/svg-icons/av/playlist-add-check';


import OpeningListItem from 'components/OpeningListItem'

import OppDescriptionForm from 'containers/Opp/OppDescriptionForm'

import FlatButton from 'material-ui/lib/flat-button'

export default class EditOppDescriptionListItem extends React.Component {
  render() {
    const {props:{opp,update}} = this
    return <OpeningListItem ref='listItem'
      primaryText={opp.description && 'Edit your Opp Description.' || 'Write a short Description of your Opp.'}
      leftIcon={opp.description && <PlaylistAddCheckIcon/> || <PlaylistAddIcon/>}
      >
      <OppDescriptionForm initialValues={opp} onSubmit={(v)=>{update(v); this.refs.listItem.close() }}>
        <FlatButton onTouchTap={()=>this.refs.listItem.close()} label='CANCEL' secondary={true}/>
      </OppDescriptionForm>
    </OpeningListItem>
  }
}