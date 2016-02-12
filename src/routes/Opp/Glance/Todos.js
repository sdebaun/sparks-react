import React from 'react';

import OppTodos from 'containers/Opp/OppTodos'

export default {
  path: '',
  component: ({oppKey,projectKey})=><OppTodos {...{oppKey,projectKey}}/>
  // component: ({oppKey,projectKey})=><div>opp:{oppKey}, project:{projectKey}</div>
}
