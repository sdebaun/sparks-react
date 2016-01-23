import React from 'react';
import ProjectListItem from 'containers/Project/ProjectListItem'
import List from 'components/styled/List'

class Doing extends React.Component {
  render() {
    const { props: { organizers } } = this
    return (
      <div className="index">
        { (organizers.length > 0) &&
          <List header='organizing'>
          { organizers.map( o=>
            <ProjectListItem key={o.$key} projectKey={o.projectKey} secondaryText={o.authority} />
          )}
          </List>
        }
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
  component: connect(mapStateToProps)(Doing)
}
