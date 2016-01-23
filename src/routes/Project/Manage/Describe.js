import React from 'react';

import Content from 'components/Content'

import List from 'material-ui/lib/lists/list'
import Divider from 'material-ui/lib/divider'

import Radium from 'radium'

import ChooseProjectImageListItem from 'containers/ProjectImage/ChooseProjectImageListItem'
import EditProjectDescriptionListItem from 'containers/Project/EditProjectDescriptionListItem'

class Page extends React.Component {
  render() {
    const {props:{projectKey}} = this
    return (
      <Content>
        <List>
          <ChooseProjectImageListItem projectKey={projectKey}/>
          <Divider/>
          <EditProjectDescriptionListItem projectKey={projectKey}/>
          <Divider/>
        </List>
      </Content>
    )
  }
}

export default {
  component: Radium(Page)
}