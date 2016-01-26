import React from 'react';

import ProjectTodos from 'containers/Project/ProjectTodos'

export default {
  path: '',
  component: ({projectKey})=><ProjectTodos {...{projectKey}}/>
}
