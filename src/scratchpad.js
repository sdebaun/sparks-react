

/*
A Page component extracts params passed to it by the router
initiates async fetches
Composes other smart components, passing: keys or models???
  keys- because SC may 
*/
class Page extends React.Component {
  render() {
    const { props: {projectKey} } = this
    return (
      <Content>
        <List>
          <ChooseProjectImageListItem projectKey={projectKey}/>
          <EditProjectDescriptionListItem projectKey={projectKey}/>
          <RenameProjectListItem projectKey={projectKey}/>
        </List>
      </Content>
    )
  }
}

class Page extends React.Component {
  render() {
    const { props: {project,projectImage} } = this
    return (
      <Content>
        <List>
          <ChooseProjectImageListItem project={project} projectImage={projectImage}/>
          <EditProjectDescriptionListItem project={project}/>
          <RenameProjectListItem project={project}/>
        </List>
      </Content>
    )
  }
}


class ChooseProjectImageListItem React.Component {
  render() {
    const { props: {projectImage} } = this
    if (!projectImage) return <div>...</div>
    const exists = projectImage && !!projectImage.dataUrl,
      attrs = {
        primaryText: exists &&
          'Change your Project Background.' ||
          'Upload a cool picture to use as your Project Background.',
        imageUrl: projectImage.dataUrl,
        leftIcon: exists && <ProjectAvatar projectImage={projectImage}/> || "?"
      }
    return (
      <OpeningListItem ref='listItem' {...attrs}>
        <Grid>
        <Cell size="1" desk="1/2">
        </Cell>
        <Cell size="1" desk="1/2">
        </Cell>
        </Grid>
      </OpeningListItem>
    )
  }  
}