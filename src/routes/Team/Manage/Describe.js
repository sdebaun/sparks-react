import React from 'react';

import Content from 'components/Content'

import List from 'material-ui/lib/lists/list'
import Divider from 'material-ui/lib/divider'

import Radium from 'radium'

import ChooseTeamImageListItem from 'containers/TeamImage/ChooseTeamImageListItem'
// import EditProjectDescriptionListItem from 'containers/Project/EditProjectDescriptionListItem'
// import RenameProjectListItem from 'containers/Project/RenameProjectListItem'

const Container = ({ teamKey })=>
  <Content>
    <List>
      <ChooseTeamImageListItem teamKey={teamKey}/>
      <Divider/>
    </List>
  </Content>

export default {
  component: Radium(Container)
}

      // <EditProjectDescriptionListItem projectKey={projectKey}/>
      // <Divider/>
      // <RenameProjectListItem projectKey={projectKey}/>
