import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect'

import RaisedButton from 'material-ui/lib/raised-button'

import MainBar from 'components/MainBar'

class ConfirmProfile extends React.Component {
  handle = ()=>this.props.confirm(this.props.userProfile.$key)

  render() {
    return (
      <div className="index">
        <MainBar showMenu={false}/>
        <h1>Is This You?</h1>
        <RaisedButton onTouchTap={this.handle} label='It Sure Is'/>
      </div>
      );
  }

}

// import {authedProfileKeySelector, authedProfileSelector} from 'selectors'

import {Profiles} from 'remote'

const mapStateToProps = createSelector(
  Profiles.select.authed,
  (userProfile)=>{ return {userProfile} }
)

const mapStateToDispatch = {
  confirm: Profiles.actions.confirm
}

export default {
  path:'confirmProfile',
  component: connect(mapStateToProps,mapStateToDispatch)(ConfirmProfile)
}
