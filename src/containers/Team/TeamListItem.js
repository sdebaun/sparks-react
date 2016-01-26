import React from 'react';
import { connect } from 'react-redux';

import ListItem from 'material-ui/lib/lists/list-item'

import NavListItem from 'components/NavListItem'

import { createSelector } from 'reselect'
import { Teams } from 'remote'

class Container extends React.Component {
  // componentWillMount() {
  //   this.props.project || this.props.dispatch(Projects.actions.watch(this.props.projectKey))
  // }
  render() {
    const { props: {team, teamKey}, ...props } = this
    return !team &&
      <ListItem/> ||
      <NavListItem primaryText={team.name} targetRoute={'/team/' + teamKey} {...props}/>
  }

}

const mapStateToProps = createSelector(
  Teams.select.matching('teamKey'),
  (team)=>{ return {team} }
)

export default connect(mapStateToProps)(Container);
