import React from 'react';
import { connect } from 'react-redux';

import List from 'material-ui/lib/lists/list'
import CreateProjectListItem from 'containers/Project/CreateProjectListItem'
import ProjectListItem from 'containers/Project/ProjectListItem'

class Page extends React.Component {
  render() {
    const { props: { projects } } = this
    return <List>
      <CreateProjectListItem/>
      { projects.map( p=> <ProjectListItem key={p.$key} projectKey={p.$key} /> )}
    </List>
  }
}

import { createSelector } from 'reselect'
import { put } from 'redux-saga';
import {master} from 'sagas'
import {Projects} from 'remote'
import needful from 'lib/react-needful'

const needs = {
  projects: ({dispatch})=> dispatch(Projects.actions.query())
}

const mapState = createSelector(
  Projects.select.rows,
  (projects)=>{ return {projects} }
)

export default {
  component: connect(mapState)(needful(needs)(Page))
}

// export default {
//   component: connect(mapState)(needful(needs)(Page)),
//   onEnter: ()=>master.start( function*() {
//     yield put( Projects.actions.query() )
//   })
// }

