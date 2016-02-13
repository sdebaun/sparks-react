import React from 'react';

import Content from 'components/Content'

import List from 'material-ui/lib/lists/list'
import Divider from 'material-ui/lib/divider'
import Toggle from 'material-ui/lib/toggle'

import Radium from 'radium'

const TitledBlock = ({title,body})=>
  <div><b>{title}.</b><br/>{body}</div>

const SwitchLabel = ({isPublic})=> isPublic &&
  <TitledBlock title='Public' body='When you turn on recruiting, anyone will be able to apply.'/> ||
  <TitledBlock title='Private' body='Only people that you invite will be able to apply.'/>

const BaseSwitchPublic = ({opp:{$key, isPublic},setPublic})=>
  <Toggle label={<SwitchLabel {...{isPublic}}/>}
    toggled={isPublic}
    labelPosition='right'
    onToggle={(ev,val)=>setPublic($key,val)}
    />

import { connect } from 'react-redux'
import { Opps } from 'remote'

const mapDispatch = {
  setPublic: Opps.actions.setPublic
}

const SwitchPublic = connect(()=>{return{}},mapDispatch)(BaseSwitchPublic)

const Container = ({ opp })=>
  <Content>
    <List>
    <SwitchPublic {...{opp}}/>
    </List>
  </Content>

export default {
  component: Radium(Container)
}