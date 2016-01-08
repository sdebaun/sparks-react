import {PROFILE_LOADED, LOGOUT_SUCCESS} from '../../actions'

export default function(state=null, action) {
  switch (action.type) {
    case PROFILE_LOADED:
      return Object.assign({}, action.profile);
    case LOGOUT_SUCCESS:
      return null
    default:
      return state
  }
}
