import React from 'react';
import SelectField from 'material-ui/lib/select-field';
// import ArrowDropDownIcon from 'material-ui/lib/svg-icons/navigation/arrow-drop-down';
import MenuItem from 'material-ui/lib/menus/menu-item';
// import TeamListItem from 'containers/Team/TeamListItem'

class Container extends React.Component {
  navigate = (evt,idx,val)=> this.props.pushPath(val)

  render() {
    const {props:{projectKey,project,teams}} = this
    return (
      <SelectField value={'/project/'+projectKey} onChange={this.navigate}
        style={{margin:'0em 1em 0em 1em',textTransform:'uppercase'}} labelStyle={{color:'white'}}
        >
        <MenuItem value={'/project/'+projectKey} primaryText={project.name} style={{textTransform:'uppercase'}}/>
        {teams.map( t=>
          <MenuItem key={t.$key + 'dd'} value={'/team/' + projectKey + '/' + t.$key} primaryText={t.name}/>
        )}
      </SelectField>
    )
  }
}

import { connect } from 'react-redux';
import { createSelector } from 'reselect'
import { Projects, Teams } from 'remote'
import { pushPath } from 'redux-simple-router'

const mapStateToProps = createSelector(
  Projects.select.matching('projectKey'),
  Teams.select.by('projectKey'),
  (project,teams)=>{ return {project,teams} }
)
const mapDispatchToProps = { pushPath }

export default connect(mapStateToProps,mapDispatchToProps)(Container)