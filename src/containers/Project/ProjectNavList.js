import React from 'react';

import List from 'material-ui/lib/lists/list';
import NavListItem from 'components/NavListItem'
import CreateTeamListItem from 'containers/Team/CreateTeamListItem'

export class ProjectNavList extends React.Component {
  render() {
    const {props: {baseUrl, projectKey, teams, ...props}} = this
    return (
      <List>
        <NavListItem primaryText="At a Glance" activeFor={['/staff','/history']} targetRoute={baseUrl} {...props}/>
        <NavListItem primaryText="Manage" activeFor={['/exchange','/applying']} targetRoute={baseUrl+'/manage'} {...props}/>
        <CreateTeamListItem projectKey={projectKey}/>
        {teams.map( t=>
          <NavListItem key={t.$key} primaryText={t.name} targetRoute={'/team/'+t.$key} {...props}/>
        )}
      </List>
    )
  }
}

import { connect } from 'react-redux';
import { createSelector } from 'reselect'
import { Teams } from 'remote'

const mapStateToProps = createSelector(
  Teams.select.by('projectKey'),
  (teams)=>{ return {teams} }
)

export default connect(mapStateToProps)(ProjectNavList)