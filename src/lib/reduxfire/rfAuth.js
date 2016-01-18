import {AUTH_LISTEN, AUTH_LOGIN, AUTH_LOGOUT, AUTH_SUCCESS, AUTH_CLEAR} from './types'

export default class rfAuth {
  constructor(ref) {
    this.ref = ref
  }

  listen = ()=>{
    return {type:AUTH_LISTEN}
  }

  login = (provider='google')=>{
    return {type:AUTH_LOGIN, provider}
  }

  logout = ()=>{
    return {type:AUTH_LOGOUT}
  }

  reducer(state=null,action) {
    switch (action.type) {
      case (AUTH_SUCCESS): return Object.assign({},action.authData);
      case (AUTH_CLEAR): return null
      default: return state;
    }
  }

  middleware = store => next => action => {
    const {dispatch}=store
    switch (action.type) {
      case AUTH_LISTEN:
        this.ref.onAuth( authData=>dispatch({type:authData && AUTH_SUCCESS || AUTH_CLEAR,authData}) )
        break
      case AUTH_LOGIN:
        dispatch({ type: AUTH_START });
        this.ref.authWithOAuthRedirect(action.provider, (error)=>{
          error && dispatch({type:AUTH_CLEAR})
        }, {scope:'email'})
        break
      case AUTH_LOGOUT:
        this.ref.unauth()
        break
    }
    return next(action)
  }

  //   return (dispatch)=> {
  //     this.ref.onAuth((authData)=>{
  //       if (authData) dispatch({type:AUTH_SUCCESS,authData})
  //       else dispatch({type:AUTH_CLEAR})
  //       if (cb) cb(authData)
  //     })
  //   }
  // }

    // this.actions = {
    //   login: ()=>this.login(),
    //   logout: ()=>this.logout(),
    //   listen: (...args)=>this.listen(...args)
    // }


  // listen(cb) {
  //   return (dispatch)=> {
  //     this.ref.onAuth((authData)=>{
  //       if (authData) dispatch({type:AUTH_SUCCESS,authData})
  //       else dispatch({type:AUTH_CLEAR})
  //       if (cb) cb(authData)
  //     })
  //   }
  // }

  // login() {
  //   return (dispatch)=> {
  //     dispatch({ type: AUTH_START });
  //     this.ref.authWithOAuthRedirect('google', (error)=>{
  //       if (error) { dispatch({type:AUTH_CLEAR}) }
  //     }, {scope:'email'})
  //   }
  // }

  // logout() {
  //   return ()=> { this.ref.unauth(); }
  // }
}

