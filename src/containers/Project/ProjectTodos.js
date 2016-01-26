import React from 'react';
import List from 'components/styled/List'
import NavListItem from 'components/NavListItem'
import FAB from 'material-ui/lib/floating-action-button'

import AddAPhotoIcon from 'material-ui/lib/svg-icons/image/add-a-photo';
import PlaylistAddIcon from 'material-ui/lib/svg-icons/av/playlist-add';
import PersonAddIcon from 'material-ui/lib/svg-icons/social/person-add';
import CreateTeamListItem from 'containers/Team/CreateTeamListItem'

const todos = [
  { key:'describing',
    listItem: props => (
      <NavListItem key='describing'
        primaryText='Describe Your Project'
        secondaryText="Tell the world why they're volunteering for you."
        targetRoute={'/project/' + props.projectKey + '/manage'}
        leftIcon={<FAB mini={true}><PlaylistAddIcon/></FAB>}
        />
    )
  },
  { key:'image',
    listItem: props => (
      <NavListItem key='image'
        primaryText='Upload a Project Picture'
        secondaryText="Make it look fun!"
        targetRoute={'/project/' + props.projectKey + '/manage'}
        leftIcon={<FAB mini={true}><AddAPhotoIcon/></FAB>}
        />
    )
  },
  { key:'admins',
    listItem: props => (
      <NavListItem key='admins'
        primaryText='Invite More Staff'
        secondaryText='Ask a friend to help organize this project.'
        targetRoute={'/project/' + props.projectKey + '/staff'}
        leftIcon={<FAB mini={true}><PersonAddIcon/></FAB>}
        />
    )
  },
  { key:'teams',
    listItem: props => (
      <CreateTeamListItem key='teams' projectKey={props.projectKey}/>
    )
  }
]

 // leftIcon={<FAB mini={true}><Icon/></FAB>}

class ProjectTodos extends React.Component {
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
import { Projects, ProjectImages, Organizers, Teams } from 'remote'

const needsDescribing = createSelector(
  Projects.select.matching('projectKey'),
  (project)=>!project || !project.description
)
const needsImage = createSelector(
  ProjectImages.select.matching('projectKey'),
  (projectImage)=>!projectImage || !projectImage.dataUrl
)
const needsAdmins = createSelector(
  Organizers.select.by('projectKey'),
  (organizers)=>!(organizers && (organizers.length>1))
)
const needsTeams = createSelector(
  Teams.select.by('projectKey'),
  (teams)=>!(teams && (teams.length>0))
)

const mapStateToProps = createSelector(
  needsDescribing,
  needsImage,
  needsAdmins,
  needsTeams,
  (describing,image,admins,teams)=>{ return { needs:{describing,image,admins,teams} } }
)

export default connect(mapStateToProps)(ProjectTodos)

