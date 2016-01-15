import Main from './Main'
import Finding from './Finding'
import Doing from './Doing'

export default {
  path:'dash',
  component: Main,
  indexRoute: { component: Finding },
  childRoutes: [
    { path: 'doing', component: Doing }
  ]
}