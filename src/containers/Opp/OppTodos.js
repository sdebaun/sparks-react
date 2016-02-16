import React from 'react';
import List from 'components/styled/List'
import NavListItem from 'components/NavListItem'
import FAB from 'material-ui/lib/floating-action-button'

import AddAPhotoIcon from 'material-ui/lib/svg-icons/image/add-a-photo';
import PlaylistAddIcon from 'material-ui/lib/svg-icons/av/playlist-add';
// import PersonAddIcon from 'material-ui/lib/svg-icons/social/person-add';
// import CreateTeamListItem from 'containers/Team/CreateTeamListItem'
// import CreateOppListItem from 'containers/Opp/CreateOppListItem'

const todos = [
  { key:'describing',
    listItem: props => (
      <NavListItem key='describing'
        primaryText='Describe Your Opportunity'
        secondaryText="Tell the world why they're volunteering for you."
        targetRoute={'/opp/' + props.projectKey + '/' + props.oppKey + '/manage'}
        leftIcon={<FAB mini={true}><PlaylistAddIcon/></FAB>}
        />
    )
  },
  { key:'exchange',
    listItem: props => (
      <NavListItem key='image'
        primaryText='Set up the Energy Exchange'
        secondaryText="What do your volunteers give, and what do they get?"
        targetRoute={'/opp/' + props.projectKey + '/' + props.oppKey + '/manage/exchange'}
        leftIcon={<FAB mini={true}><AddAPhotoIcon/></FAB>}
        />
    )
  }
]

      // <CreateTeamListItem key='teams' projectKey={props.projectKey}/>

class OppTodos extends React.Component {
  render() {
    const {props:{needs,...props}} = this
    return <List header='Getting Started'>
      { todos.filter( t=>needs[t.key] )
        .map( t=>t.listItem(props) )
      }
    </List>
  }
}

import { connect } from 'react-redux';
import { createSelector } from 'reselect'
import { Opps } from 'remote'

console.log('Opps',Opps)

const needsDescribing = createSelector(
  Opps.select.matching('oppKey'),
  (opp)=>!opp || !opp.description
)
const needsExchange = createSelector(
  Opps.select.matching('oppKey'),
  (opp)=>!opp || !opp.volGives || !opp.volGets
)

const mapState = createSelector(
  needsDescribing,
  needsExchange,
  (describing,exchange)=>{ return { needs:{describing,exchange} } }
)

export default connect(mapState)(OppTodos)

