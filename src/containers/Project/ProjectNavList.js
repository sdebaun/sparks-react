import React from 'react';

import List from 'components/styled/List';
import NavListItem from 'components/NavListItem'
import TeamListItem from 'containers/Team/TeamListItem'
import AddIcon from 'material-ui/lib/svg-icons/content/add';
import PopupListItemHeader from 'components/PopupListItemHeader'
import TeamForm from 'containers/Team/TeamForm'
import FlatButton from 'material-ui/lib/flat-button'

import { pushPath } from 'redux-simple-router'

export class ProjectNavList extends React.Component {
  save = data => {
    if (data) {
      const teamRef = this.props.push({...data, ...{projectKey:this.props.projectKey}})
      this.props.pushPath('/team/'+teamRef.key())
    }
      
    this.refs.listItem.close()
  }

  cancel = ()=>this.refs.listItem.close()


  render() {
    const {props: {baseUrl, teams, ...props}} = this
    return (
      <div>
        <List>
          <NavListItem primaryText="At a Glance" activeFor={['/staff','/history']} targetRoute={baseUrl} {...props}/>
          <NavListItem primaryText="Manage" activeFor={['/exchange','/applying']} targetRoute={baseUrl+'/manage'} {...props}/>
        </List>
        { (teams.length > 0) &&
          <List>
            <PopupListItemHeader ref='listItem' primaryText='Teams' rightIcon={<AddIcon/>} onTouchTap={this.open}>
              <TeamForm onSubmit={this.save}>
                <FlatButton onTouchTap={this.cancel} label='CANCEL' secondary={true}/>
              </TeamForm>
            </PopupListItemHeader>
            {teams.map( t=><TeamListItem key={t.$key + 'nl'} teamKey={t.$key}/> )}
          </List>
        }
      </div>
    )
  }
}

import { connect } from 'react-redux';
import { createSelector } from 'reselect'
import needful from 'lib/react-needful'
import { Teams } from 'remote'

const needs = {
  teams: ({projectKey,query})=>query({orderByChild:'projectKey',equalTo:projectKey})
}

const mapState = createSelector(
  Teams.select.by('projectKey'),
  (teams)=>{ return {teams} }
)

const mapDispatch = {
  push: Teams.actions.push,
  query: Teams.actions.query,
  pushPath
}

export default connect(mapState,mapDispatch)(needful(needs)(ProjectNavList))