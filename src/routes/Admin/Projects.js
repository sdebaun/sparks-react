import React from 'react';
import { connect } from 'react-redux';
import { take, put } from 'redux-saga';

import List from 'material-ui/lib/lists/list'
import CreateProjectListItem from 'containers/Admin/CreateProjectListItem'
import NavListItem from 'components/NavListItem'

class Projects extends React.Component {
  render() {
    return (
      <div className="index">
        <List>
          <CreateProjectListItem/>
          {Object.keys(this.props.projects).map(key=>{
            return <NavListItem key={key} route={'/project/'+key} primaryText={this.props.projects[key].name}/>
          })}
        </List>
      </div>
    );
  }
}

const mapStateToProps = (state)=>{
  return {
    projects: state.data.Projects || {}
  };
}

export default {
  component: connect(mapStateToProps)(Projects)
}

import remote from 'remote'

function* loadSaga() {
  while(true) {
    // console.log('loadSaga waiting')
    yield take( (action)=>{ return action.type.includes('@@router') && (action.payload.path=='/admin') })
    // console.log('loadSaga action received')
    yield put( remote.query('Projects') )
  }
}

export const sagas = [loadSaga]