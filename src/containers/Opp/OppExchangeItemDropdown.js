import React from 'react';
import Popover from 'material-ui/lib/popover/popover';
import List from 'components/styled/List'

export default class OppExchangeItemDropdown extends React.Component {
  state = { open: false }

  handleTouchTap = (evt)=>this.setState({open:true, anchorEl: evt.currentTarget})
  handleItemTouchTap = (key)=> ()=>{
    console.log('opening',key)
    this.handleRequestClose()
  }

  handleRequestClose = ()=>this.setState({open:false})

  render() {
    const {obligOptions,obligs,primaryText} = this.props
    return (
      <div>
      <h3 onTouchTap={this.handleTouchTap}>{primaryText}</h3>
      <Popover open={this.state.open} anchorEl={this.state.anchorEl} onRequestClose={this.handleRequestClose}>
        <List>
        { Object.keys(obligOptions).map( (optionKey)=>
          (!obligs || !obligs[optionKey]) &&
            React.cloneElement(obligOptions[optionKey],{onTouchTap:this.handleItemTouchTap(optionKey)})
        )}
        </List>
      </Popover>
      </div>
    )
  }
}

// export default ({obligOptions,obligs,primaryText})=>
//   <DropDownMenu value={0} onChange={(e,i,v)=>console.log('selected',i,v)}
//     menuStyle={{width:320}}>
//     <MenuItem value={0} primaryText={primaryText}/>
//     { Object.keys(obligOptions).map( (optionKey)=>
//       (!obligs || !obligs[optionKey]) && obligOptions[optionKey]
//     )}
//   </DropDownMenu>

// export default ({obligOptions,obligs})=>
//   <SelectField onChange={(e,i,v)=>console.log('selected',i,v)}>
//     { Object.keys(obligOptions).map( (optionKey)=>
//       (!obligs || !obligs[optionKey]) &&
//       <div>option {optionKey}</div>
//     )}
//   </SelectField>


// class Container extends React.Component {
//   navigate = (evt,idx,val)=> this.props.pushPath(val)

//   render() {
//     const {props:{projectKey,project,teams,opps}} = this
//     return (
//       <SelectField value={'/project/'+projectKey} onChange={this.navigate}
//         style={{margin:'0em 1em 0em 1em',textTransform:'uppercase'}} labelStyle={{color:'white'}}
//         >
//         <MenuItem value={'/project/'+projectKey} primaryText={project.name} style={{textTransform:'uppercase'}}/>
//         <Divider/>
//         {opps.map( ({$key,name})=>
//           <MenuItem key={$key + 'dd'} value={'/opp/' + projectKey + '/' + $key} primaryText={name}/>
//         )}
//         <Divider/>
//         {teams.map( t=>
//           <MenuItem key={t.$key + 'dd'} value={'/team/' + projectKey + '/' + t.$key} primaryText={t.name}/>
//         )}
//       </SelectField>
//     )
//   }
// }

// import { connect } from 'react-redux'
// import { compose } from 'redux'
// import { createSelector } from 'reselect'
// import { Projects, Teams, Opps } from 'remote'
// import { wanting, needful } from 'lib/react-needful'
// import { pushPath } from 'redux-simple-router'

// const wants = {
//   project: ({projectKey,wantsProject})=>wantsProject(projectKey),
//   teams: ({projectKey,wantsTeams})=>wantsTeams({orderByChild:'projectKey',equalTo:projectKey}),
//   opps: ({projectKey,wantsOpps})=>wantsOpps({orderByChild:'projectKey',equalTo:projectKey}),
// }

// const needs = ['project']

// const mapState = createSelector(
//   Projects.select.matching('projectKey'),
//   Teams.select.by('projectKey'),
//   Opps.select.by('projectKey'),
//   (project,teams,opps)=>{ return {project,teams,opps} }
// )
// const mapDispatch = {
//   pushPath,
//   wantsProject: Projects.actions.watch,
//   wantsTeams: Teams.actions.query,
//   wantsOpps: Opps.actions.query,
// }

// export default compose(connect(mapState,mapDispatch),wanting(wants),needful(needs))(Container)