import React from 'react';
import SelectField from 'material-ui/lib/select-field';
// import ArrowDropDownIcon from 'material-ui/lib/svg-icons/navigation/arrow-drop-down';
import MenuItem from 'material-ui/lib/menus/menu-item';
// import TeamListItem from 'containers/Team/TeamListItem'

class Container extends React.Component {
  navigate = (evt,idx,val)=> this.props.pushPath(val)

  render() {
    const {props:{projectKey,project,teams,opps}} = this
    return (
      <SelectField value={'/project/'+projectKey} onChange={this.navigate}
        style={{margin:'0em 1em 0em 1em',textTransform:'uppercase'}} labelStyle={{color:'white'}}
        >
        <MenuItem value={'/project/'+projectKey} primaryText={project.name} style={{textTransform:'uppercase'}}/>
        {teams.map( t=>
          <MenuItem key={t.$key + 'dd'} value={'/team/' + projectKey + '/' + t.$key} primaryText={t.name}/>
        )}
        {opps.map( ({$key,name})=>
          <MenuItem key={$key + 'dd'} value={'/opp/' + projectKey + '/' + $key} primaryText={name}/>
        )}
      </SelectField>
    )
  }
}

import { connect } from 'react-redux'
import { compose } from 'redux'
import { createSelector } from 'reselect'
import { Projects, Teams, Opps } from 'remote'
import { wanting, needful } from 'lib/react-needful'
import { pushPath } from 'redux-simple-router'

const wants = {
  project: ({projectKey,wantsProject})=>wantsProject(projectKey),
  teams: ({projectKey,wantsTeams})=>wantsTeams({orderByChild:'projectKey',equalTo:projectKey}),
  opps: ({projectKey,wantsOpps})=>wantsOpps({orderByChild:'projectKey',equalTo:projectKey}),
}

const needs = ['project']

const mapState = createSelector(
  Projects.select.matching('projectKey'),
  Teams.select.by('projectKey'),
  Opps.select.by('projectKey'),
  (project,teams,opps)=>{ return {project,teams,opps} }
)
const mapDispatch = {
  pushPath,
  wantsProject: Projects.actions.watch,
  wantsTeams: Teams.actions.query,
  wantsOpps: Opps.actions.query,
}

export default compose(connect(mapState,mapDispatch),wanting(wants),needful(needs))(Container)