import React from 'react';

import List from 'components/styled/List'
import NavListItem from 'components/NavListItem'
import Icon from 'material-ui/lib/svg-icons/av/playlist-add-check';
import FAB from 'material-ui/lib/floating-action-button';

const todos = (props)=>[
  {
    key:1,
    primaryText: 'Describe Your Project',
    secondaryText: 'Tell the world why they\'re volunteering for you.',
    targetRoute: '/project/' + props.projectKey + '/manage',
    isComplete: false
  },
  {
    key:2,
    primaryText: 'Make a Team',
    secondaryText: 'Organize your volunteers into Teams and put Leads in charge of them.',
    onTouchTap: ()=>{},
    isComplete: false
  },
  {
    key:3,
    primaryText: 'Create an Opportunity',
    secondaryText: 'Let people sign up and commit to helping you out.',
    onTouchTap: ()=>{},
    isComplete: false
  },
  {
    key:4,
    primaryText: 'Invite More Staff',
    secondaryText: 'Ask a friend to help organize this project.',
    targetRoute: '/project/' + props.projectKey + '/staff',
    isComplete: false
  }
]
class Todos extends React.Component {
  render = ()=><div>
    <List>
      { todos(this.props)
        .filter( t=>!t.isComplete )
        .map( t=><NavListItem {...t} leftIcon={<FAB mini={true}><Icon/></FAB>}/> ) }
    </List>
  </div>
}

export default {
  path: '',
  component: Todos
}
