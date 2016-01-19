import React from 'react';
import ProjectListItem from 'containers/Project/ProjectListItem'

class Doing extends React.Component {
  render() {
    return (
      <div className="index">
        <h1>Doing</h1>
        { this.props.organizers.map( org=>
          <ProjectListItem key={org.$key} projectKey={org.projectKey}
            secondaryText='Admin'
            route={'/project/'+org.projectKey}
            />
        )}
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
