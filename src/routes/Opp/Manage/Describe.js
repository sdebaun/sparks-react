import React from 'react';

import Content from 'components/Content'

import List from 'material-ui/lib/lists/list'
import Divider from 'material-ui/lib/divider'
import Toggle from 'material-ui/lib/toggle'
import EditOppDescriptionListItem from 'containers/Opp/EditOppDescriptionListItem'

import Radium from 'radium'

const TitledBlock = ({title,body})=>
  <div><b>{title}.</b><br/>{body}</div>

const IsPublicLabel = ({isPublic})=> isPublic &&
  <TitledBlock title='Public' body='When you turn on recruiting, anyone will be able to apply.'/> ||
  <TitledBlock title='Private' body='Only people that you invite will be able to apply.'/>

const UpdatingSwitch = ({value,setValue,label})=>
  <Toggle {...{label}} toggled={value} labelPosition='right' onToggle={(ev,val)=>setValue(val)}/>

const Container = ({ opp,update,setPublic })=>
  <Content>
    <List>
    <UpdatingSwitch value={opp.isPublic} setValue={(v)=>setPublic(opp.$key,v)}
      label={<IsPublicLabel isPublic={opp.isPublic}/>}
      />
    <Divider/>
    <EditOppDescriptionListItem {...{opp,update:(v)=>update(opp.$key,v)}}/>
    </List>
  </Content>

import { connect } from 'react-redux'
import { Opps } from 'remote'

const mapDispatch = {
  update: Opps.actions.update,
  setPublic: Opps.actions.setPublic
}

export default {
  component: connect(()=>{return{}},mapDispatch)(Radium(Container))
}