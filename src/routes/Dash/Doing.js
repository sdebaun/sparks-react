import React from 'react';

class Doing extends React.Component {
  render() {
    return (
      <div className="index">
        <h1>Doing</h1>
        { this.props.organizers.map( org=>(
          <div key={org.$key}>{org.profileKey},{org.projectKey}</div>
          ))}
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { createSelector } from 'reselect'
import { Organizers } from 'remote'

const mapStateToProps = createSelector(
  Organizers.select.by('profileKey'),
  (organizers)=>{ return {organizers} }
)

export default {
  component: connect(mapStateToProps)(Doing),
}
