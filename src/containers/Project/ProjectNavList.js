import React from 'react';

import List from 'components/styled/List';
import NavListItem from 'components/NavListItem'
import TeamListItem from 'containers/Team/TeamListItem'
import OppListItem from 'containers/Opp/OppListItem'
import AddIcon from 'material-ui/lib/svg-icons/content/add';
import PopupListItemHeader from 'components/PopupListItemHeader'
import TeamForm from 'containers/Team/TeamForm'
import FlatButton from 'material-ui/lib/flat-button'

import { pushPath } from 'redux-simple-router'

export class ProjectNavList extends React.Component {
  saveTeam = data => {
    if (data) {
      this.props.createTeam({...data, ...{projectKey:this.props.projectKey}})
      // this.props.pushPath('/team/'+this.props.projectKey + '/' + teamRef.key())
    }    
    this.refs.teamPopup.close()
  }

  saveOpp = data => {
    data && this.props.createOpp({...data, ...{projectKey:this.props.projectKey}})
    this.refs.oppPopup.close()
  }

  cancel = ()=>{ this.refs.teamPopup.close(); this.refs.oppPopup.close() }


  render() {
    const {props: {baseUrl, teams, opps, ...props}} = this
    return (
      <div>
        <List>
          <NavListItem primaryText="At a Glance" activeFor={['/staff','/history']} targetRoute={baseUrl} {...props}/>
          <NavListItem primaryText="Manage" activeFor={['/exchange','/applying']} targetRoute={baseUrl+'/manage'} {...props}/>
        </List>
        { (teams.length > 0) &&
          <List>
            <PopupListItemHeader ref='teamPopup' primaryText='Teams' rightIcon={<AddIcon/>} onTouchTap={this.open}>
              <TeamForm onSubmit={this.saveTeam}>
                <FlatButton onTouchTap={this.cancel} label='CANCEL' secondary={true}/>
              </TeamForm>
            </PopupListItemHeader>
            {teams.map( t=><TeamListItem key={t.$key + 'nl'} teamKey={t.$key}/> )}
          </List>
        }
        { (opps.length > 0) &&
          <List>
            <PopupListItemHeader ref='oppPopup' primaryText='Opportunities' rightIcon={<AddIcon/>}>
              <TeamForm onSubmit={this.saveOpp}>
                <FlatButton onTouchTap={this.cancel} label='CANCEL' secondary={true}/>
              </TeamForm>
            </PopupListItemHeader>
            {opps.map( ({$key})=><OppListItem key={$key + 'nl'} oppKey={$key}/> )}
          </List>
        }


      </div>
    )
  }
}

import { connect } from 'react-redux';
import { createSelector } from 'reselect'
import { needful, wanting } from 'lib/react-needful'
import { Teams, Opps } from 'remote'

const wants = {
  teams: ({projectKey,wantsTeams})=>wantsTeams({orderByChild:'projectKey',equalTo:projectKey}),
  opps: ({projectKey,wantsOpps})=>wantsOpps({orderByChild:'projectKey',equalTo:projectKey}),
}
const needs = [ 'teams' ]

const mapState = createSelector(
  Teams.select.by('projectKey'),
  Opps.select.by('projectKey'),
  (teams,opps)=>{ return {teams,opps} }
)

const mapDispatch = {
  createTeam: Teams.actions.create,
  createOpp: Opps.actions.create,
  wantsTeams: Teams.actions.query,
  wantsOpps: Opps.actions.query,
  pushPath
}

export default connect(mapState,mapDispatch)(wanting(wants)(needful(needs)(ProjectNavList)))