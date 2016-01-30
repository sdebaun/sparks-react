import React from 'react';
import List from 'components/styled/List'
import NavListItem from 'components/NavListItem'
import FAB from 'material-ui/lib/floating-action-button'

import AddAPhotoIcon from 'material-ui/lib/svg-icons/image/add-a-photo';
import PlaylistAddIcon from 'material-ui/lib/svg-icons/av/playlist-add';

const todos = [
  { key:'describing',
    listItem: props => (
      <NavListItem key='describing'
        primaryText='Describe Your Team'
        secondaryText="What kind of work does this team do?"
        targetRoute={'/team/' + props.projectKey + '/' + props.teamKey + '/manage'}
        leftIcon={<FAB mini={true}><PlaylistAddIcon/></FAB>}
        />
    )
  },
  { key:'image',
    listItem: props => (
      <NavListItem key='image'
        primaryText='Upload a Team Picture'
        secondaryText="Choose an emblem to rally people to your team."
        targetRoute={'/team/' + props.projectKey + '/' + props.teamKey + '/manage'}
        leftIcon={<FAB mini={true}><AddAPhotoIcon/></FAB>}
        />
    )
  }
]

class TeamTodos extends React.Component {
  render() {
    const {props:{needs,...props}} = this
    return <List header='Getting Started'>
      <p>Take care of these things before you turn on Recruiting!</p>
      { todos.filter( t=>needs[t.key] )
        .map( t=>t.listItem(props) )
      }
    </List>
  }
}

import { connect } from 'react-redux';
import { createSelector } from 'reselect'
import { Teams, TeamImages } from 'remote'

const needsDescribing = createSelector(
  Teams.select.matching('teamKey'),
  (team)=>!team || !team.description
)
const needsImage = createSelector(
  TeamImages.select.matching('teamKey'),
  (teamImage)=>!teamImage || !teamImage.dataUrl
)
// const needsAdmins = createSelector(
//   Organizers.select.by('teamKey'),
//   (organizers)=>!(organizers && (organizers.length>1))
// )

const mapStateToProps = createSelector(
  needsDescribing,
  needsImage,
  (describing,image)=>{ return { needs:{describing,image} } }
)

export default connect(mapStateToProps)(TeamTodos)

