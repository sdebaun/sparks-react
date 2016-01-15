import App from './containers/App';
import Landing from './containers/Landing';

import DashRoutes from 'containers/Dash/routes'
import AdminRoutes from 'containers/Admin/routes'
import ProjectRoutes from 'containers/Project/routes'

export default [
  { path: '/',
    component: App,
    indexRoute: { component: Landing },
    childRoutes: [ DashRoutes, AdminRoutes, ProjectRoutes ]
  }
]

