import Main from './Main'
import Describe from './Describe'
import Exchange from './Exchange'
import Applying from './Applying'

export default {
  component: Main,
  path: 'manage',
  indexRoute: { component: Describe },
  childRoutes: [
    { path:'exchange', component: Exchange },
    { path:'applying', component: Applying }
  ]

}