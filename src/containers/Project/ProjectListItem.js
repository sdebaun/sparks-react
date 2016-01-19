import React from 'react';
import { connect } from 'react-redux';

import ListItem from 'material-ui/lib/lists/list-item'

import Colors from 'material-ui/lib/styles/colors';
import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';

import EmailIcon from 'material-ui/lib/svg-icons/communication/email';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';

import NavListItem from 'components/NavListItem'

import { createSelector } from 'reselect'
import { Projects } from 'remote'

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltipPosition="bottom-left">
    <MoreVertIcon color={Colors.grey400} />
  </IconButton>
);

class Container extends React.Component {
  componentWillMount() {
    this.props.dispatch(Projects.actions.watch(this.props.projectKey))
  }

  render() {
    const { project, projectKey, route } = this.props
    if (!project) return <ListItem>...</ListItem>
    return route ? <NavListItem primaryText={project.name} {...this.props}/> :
      <ListItem primaryText={project.name} {...this.props}/>
  }

}
        // secondaryText={invite.lastSent && <TimeAgo date={invite.lastSent} minPeriod={10}/> || 'Sending...'}
        // leftIcon={<EmailIcon/>}
        // rightIconButton={rightIconMenu} />

const mapStateToProps = createSelector(
  Projects.select.matching('projectKey'),
  (project)=>{ return {project} }
)

export default connect(mapStateToProps)(Container);
