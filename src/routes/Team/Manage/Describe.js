import React from 'react';

import Content from 'components/Content'

import List from 'material-ui/lib/lists/list'
import Divider from 'material-ui/lib/divider'

import Radium from 'radium'

import ChooseTeamImageListItem from 'containers/TeamImage/ChooseTeamImageListItem'
import EditTeamDescriptionListItem from 'containers/Team/EditTeamDescriptionListItem'
import RenameTeamListItem from 'containers/Team/RenameTeamListItem'

const Container = ({ teamKey })=>
  <Content>
    <List>
      <ChooseTeamImageListItem teamKey={teamKey}/>
      <Divider/>
      <EditTeamDescriptionListItem teamKey={teamKey}/>
      <Divider/>
      <RenameTeamListItem teamKey={teamKey}/>
    </List>
  </Content>

export default {
  component: Radium(Container)
}

