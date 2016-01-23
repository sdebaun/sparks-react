

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

class ChooseProjectImageListItem React.Component {
  render() {
    const { props: {projectImage} } = this
    if (!projectImage) return <div>...</div>
    const exists = projectImage && !!projectImage.dataUrl,
      attrs = {
        primaryText: exists &&
          'Change your Project Background.' ||
          'Upload a picture to use as your Project Background.'
        imageUrl: projectImage.dataUrl
      }
    return (
      <OpeningListItem ref="pickProjectImage"
        primaryText="Find a cool background image to help identify your project."
        leftIcon={<ProjectAvatar projectImage={projectImage}/>}
        >
    )
  }  
}