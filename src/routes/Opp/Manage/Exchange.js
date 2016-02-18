import React from 'react';
import Content from 'components/Content'
import OppExchange from 'containers/Opp/OppExchange'

export default {
  path: 'exchange',
  component: (props)=><Content><OppExchange {...props}/></Content>
}
