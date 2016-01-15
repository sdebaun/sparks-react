import Main from './Main'
import Todo from './Todo'
import Invite from './Invite'

export default {
  component: Main,
  indexRoute: { component: Todo },
  childRoutes: [
    { path:'invite', component: Invite}
  ]
}