import React from 'react';

import List from 'components/styled/List';
import NavListItem from 'components/NavListItem'
// import CreateTeamListItem from 'containers/Team/CreateTeamListItem'
import TeamListItem from 'containers/Team/TeamListItem'
// import CreateTeamDialog from 'containers/Team/CreateTeamDialog'
import AddIcon from 'material-ui/lib/svg-icons/content/add';
import PopupListItemHeader from 'components/PopupListItemHeader'
// import ListItemHeader from 'components/styled/ListItemHeader'
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
import { Teams } from 'remote'

const mapStateToProps = createSelector(
  Teams.select.by('projectKey'),
  (teams)=>{ return {teams} }
)

const mapDispatchToProps = {
  push: Teams.actions.push,
  pushPath
}

export default connect(mapStateToProps,mapDispatchToProps)(ProjectNavList)