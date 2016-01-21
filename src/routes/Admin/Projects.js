import React from 'react';
import { connect } from 'react-redux';

import List from 'material-ui/lib/lists/list'
import CreateProjectListItem from 'containers/Project/CreateProjectListItem'
// import NavListItem from 'components/NavListItem'
import ProjectListItem from 'containers/Project/ProjectListItem'
import { createSelector } from 'reselect'

class Container extends React.Component {
  render() {
    return (
      <div className="index">
        <List>
          <CreateProjectListItem/>
          {Object.keys(this.props.projects).map(key=>(
            <ProjectListItem key={key} projectKey={key}
              targetRoute={'/project/'+key}
              />
          ))}
        </List>
      </div>
    );
  }
}

import {Projects} from 'remote'

const mapStateToProps = createSelector(
  Projects.select.collection,
  (projects)=>{ return {projects} }
)

import { put } from 'redux-saga';
import {master} from 'sagas'

export default {
  component: connect(mapStateToProps)(Container),
  onEnter: ()=>master.start( function*() {
    yield put( Projects.actions.query() )
  })
}

