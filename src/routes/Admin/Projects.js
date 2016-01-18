import React from 'react';
import { connect } from 'react-redux';
import { take, put } from 'redux-saga';

import List from 'material-ui/lib/lists/list'
import CreateProjectListItem from 'containers/Project/CreateProjectListItem'
import NavListItem from 'components/NavListItem'

class Container extends React.Component {
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

import {Projects} from 'remote'

function* loadSaga() {
  while(true) {
    yield take( (action)=>{
      return action.type.includes('@@router') && (action.payload.path=='/admin')
    })
    yield put( Projects.actions.query() )
  }
}

export const sagas = [loadSaga]

const mapStateToProps = (state)=>{
  return {
    projects: state.data.Projects || {}
  };
}

export default {
  component: connect(mapStateToProps)(Container)
}

