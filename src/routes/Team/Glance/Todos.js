import React from 'react';

import TeamTodos from 'containers/Team/TeamTodos'

export default {
  path: '',
  component: ({teamKey,projectKey})=><TeamTodos {...{teamKey,projectKey}}/>
}
