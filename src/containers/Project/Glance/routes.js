import Main from './Main'
import Todo from './Todo'
import Staff from './Staff'

export default {
  component: Main,
  indexRoute: { component: Todo },
  childRoutes: [
    { path:'staff', component: Staff }
  ]
}