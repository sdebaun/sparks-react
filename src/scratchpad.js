// page container
class Page extends React.Component { ... }

const mapStateToProps = ...
const mapDispatchToProps = ...
const fragments = [
  ({teamKey})=> [
    Teams.fragment(teamKey),
    TeamImages.fragment(teamKey),
    Leads.fragment(teamKey),
    ({projectKey})=> [
      Projects.fragment(projectKey),
      Teams.fragment({orderByChild:'projectKey',equalTo:projectKey}),
    ]
]

// Team Page
// - will pass the props of the component
// - will also collect fragments from all child components, when original fragment is loaded, will pass the result to child fragments
const fragment = ({params: {teamKey}})=>Teams.fragment(teamKey)

// children of Team Page
// TeamHeader
const fragment = ({id})=>TeamImages.fragment(key)

// Page -> TeamHeader -> ProjectBackgroundImage
const fragment = ({id})=>ProjectImages.fragment(key) // NOPE




ReduxFire.connect(fragments)(Redux.connect(mapState,mapDispatch)(Page))

/*
the ReduxFire HOC subscribes to specified fragments


    master.start( function*() {
      const teamResult = yield take( Teams.taker(teamKey) )
      yield put( Teams.actions.query({orderByChild:'projectKey',equalTo:teamResult.data.projectKey}) ) // need to get all of em for nav lists
      yield put( Projects.actions.watch(teamResult.data.projectKey) )
      yield put( ProjectImages.actions.watch(teamResult.data.projectKey) )
    })
    master.start( function*() {
      yield put( Teams.actions.watch(teamKey) )
      yield put( TeamImages.actions.watch(teamKey) )
      const params = { orderByChild:'teamKey', equalTo:teamKey }
      yield put( Invites.actions.query(params) )
    })

*/

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