/*
takes the needs, Component, WaitingComponent and returns a HOC that:
  when it mounts:
  - fires off async requests for parts of the model, based on result of needs(this.props)
  rendering:
  - if its needs have not been met, displays WaitingComponent
*/
const needy = (needs,WaitingComponent) => Component => {
  class Wrapper extends React.Component {
    render() { return <Component {...this.props}/> }
  }
  return connect(mapState)(Wrapper)
}

// Teams/index page container
// only knows about route params
const Page = ({Title, Tabs, Main, teamKey, projectKey, location})=>{
  const tabs = React.cloneElement(Tabs,{baseUrl}),
    baseUrl = '/team/' + projectKey + '/' + teamKey
  return <div>
    <MainBar/>
    <Grid gutter='0em'>
      <SideNav header={<TeamHeader {...{teamKey}}/>} nav={<TeamNavList {...{teamKey, location}}/>}/>
      <Cell>
        { isLarge() && tabs || <TeamHeader {...{secondaryText:Title, tabs, teamKey}}/> }
        { React.cloneElement(Main, {teamKey}) }
      </Cell>
    </Grid>
  </div> 
}

// -----

const TeamHeader = ({...})=>{

}

const needs = ({teamKey})=>{ return {
  team: Teams.sub(teamKey),
  teamImage: TeamImages.sub(teamKey),
} }

const mapState = createSelector(
  Teams.select.matching('teamKey'), // state.routing.params.teamkey? matchingParam()?
  TeamImages.select.matching('teamKey'),
  (team,teamImage)=>{team,teamImage}
)

export default connect(mapState)( needy(needs,<div/>)(TeamHeader) )

// -----

const ProjectDropdownMenu = ({...})=>{

}

const needs = ({projectKey})=>{ return {
  projects: Projects.sub(projectKey),
  teams: Teams.sub({orderByChild:'projectKey',equalTo:projectKey})
} }

// -----

const TeamNavItem = ({...})=>{

}

const needs = ({teamKey})=>{
  team: Team.sub(teamKey),
  teamImage: TeamImage.sub(teamKey)
}

// -----

// AcceptInvite crazypants stuff
// only knows about route params
const Page = ({inviteKey})=>
  <div>
    <MainBar/>
    <Invitation {...{inviteKey}}/>
  </div> 

// ----- Invitation

const needs = ({inviteKey})=>{ return {
  invite: Invites.sub(inviteKey),
} }

const Invitation = ({invite:{$key,projectKey,authorProfileKey,isClaimed,authority}})=>
  <Narrow>
    <ProjectHeader secondaryText={authority + ' invitation'} {...{projectKey}} />
    { isClaimed &&
      <InviteClaimed/> ||
      <InviteAccept {...{$key,authority,isClaimed,projectKey,authorProfileKey}} />
    }
  </Narrow>

export default needy(Invitation,needs)

// -----

const needs = ({authorProfileKey,projectKey})=>{ return {
  authorProfile: Profiles.sub(authorProfileKey),
  project: Projects.sub(projectKey)
} }

const InviteAccept = ({$key,authority,isClaimed,project,authorProfile}})=>
  <Narrow>
    <ProjectHeader secondaryText={authority + ' invitation'} {...{projectKey}} />
    <InviteWelcomeText {...{authority,authorProfileKey,isClaimed,projectKey}} />
    <InviteAcceptAction {...{$key,projectKey,isClaimed}} />
  </Narrow>

export default needy(InviteAccept,needs)

// ----- InviteAcceptAction

const InviteAcceptAction = ({$key,projectKey,isClaimed,hasAccess})=>
  <Grid>
    { hasAccess &&
      <p>already got it</p> ||
      ( userProfile &&
          <p>grab it</p> ||
          <p>login</p>
      )
    }
  </Grid>

const mapState = createReducer(
  Profiles.select.authed,
  Organizers.select.authedProjectKeys,
  (s,p)=>p.params.projectKey,
  (userProfile,userProjectKeys,invitedProjectKey)=>{ return {
    userProfile,
    hasAccess: userProjectKeys && userProjectKeys.includes(invitedProjectKey)
  } }
)

const mapDispatch = {
  accept: Invite.actions.accept(?)
}

  <Narrow>
    <ProjectHeader secondaryText={authority + ' invitation'} {...{projectKey}} />
    <InviteWelcomeText {...{authority,authorProfileKey,isClaimed,projectKey}} />
    <InviteAcceptAction {...{$key,projectKey,isClaimed}} />
  </Narrow>

export default needy(InviteAccept,needs)

// const mapState = ...
// const mapDispatch = ...

      yield put( Projects.actions.watch(projectKey) )
      yield put( ProjectImages.actions.watch(projectKey) )
      const byProject = { orderByChild:'projectKey', equalTo:projectKey }
      yield put( Teams.actions.query(byProject) ) // need to get all of em for nav lists
      // yield put( TeamImages.actions.query(byProject) ) // need to get all of em for nav lists
      const byTeam = { orderByChild:'teamKey', equalTo:teamKey }
      yield put( Invites.actions.query(byTeam) )


// in route:
{
  component: needy(needs)(Page)
}

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