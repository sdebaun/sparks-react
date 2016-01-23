import React from 'react';

import ProjectTodos from 'containers/Project/ProjectTodos'

class Todos extends React.Component {
  render = ()=><div>
    <ProjectTodos projectKey={this.props.projectKey}/>
  </div>
}

export default {
  path: '',
  component: Todos
}
