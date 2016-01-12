import {AUTH_START, AUTH_SUCCESS, AUTH_CLEAR} from './types'

export default class rfAuth {
  constructor(ref) {
    this.ref = ref
    this.actions = {
      login: ()=>this.login(),
      logout: ()=>this.logout(),
      listen: (...args)=>this.listen(...args)
    }
  }

  reducer(state=null,action) {
    switch (action.type) {
      case (AUTH_SUCCESS): return Object.assign({},action.authData);
      case (AUTH_CLEAR): return null
      default: return state;
    }
  }

  listen(cb) {
    return (dispatch)=> {
      this.ref.onAuth((authData)=>{
        if (authData) dispatch({type:AUTH_SUCCESS,authData})
        else dispatch({type:AUTH_CLEAR})
        if (cb) cb(authData)
      })
    }
  }

  login() {
    return (dispatch)=> {
      dispatch({ type: AUTH_START });
      this.ref.authWithOAuthRedirect('google', (error)=>{
        if (error) { dispatch({type:AUTH_CLEAR}) }
      }, {scope:'email'})
    }
  }

  logout() {
    return ()=> { this.ref.unauth(); }
  }
}

