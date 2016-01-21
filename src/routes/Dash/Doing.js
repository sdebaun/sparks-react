import React from 'react';
import ProjectListItem from 'containers/Project/ProjectListItem'
import List from 'components/styled/List'

class Doing extends React.Component {
  render() {
    const {organizers} = this.props
    return (
      <div className="index">
        { organizers && (organizers.length > 0) &&
          <List header='organizing' style={{paddingTop:0}}>
          { organizers.map( o=>
            <ProjectListItem key={o.$key} projectKey={o.projectKey} secondaryText={o.authority} targetRoute={'/project/'+o.projectKey} />
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
  component: connect(mapStateToProps)(Doing),
}
