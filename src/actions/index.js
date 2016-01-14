// import Firebase from 'firebase'

// export const LOGIN_ATTEMPT = 'LOGIN_ATTEMPT'
// export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
// export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
// export const PROFILE_LOADED = 'PROFILE_LOADED'

export const POPOUT_TOGGLE = 'POPOUT_TOGGLE'

export function popoutToggle(open) {
  return {
    type: POPOUT_TOGGLE,
    open
  }
}

// function OAuthToProfile(authData) {
//   const provider = authData.provider,
//     d = authData[provider];

//   switch (provider) {
//     case 'google':
//       return {
//         uid: authData.uid,
//         fullName: d.displayName,
//         email: d.email,
//         profileImageURL: d.profileImageURL
//       }
//     case 'facebook':
//       return {
//         uid: authData.uid,
//         fullName: 'FB Full name',
//         email: 'FB email',
//         profileImageURL: 'FB image url'
//       }
//     default:
//       throw 'Can only handle google or facebook oauth.'
//   }
// }

// export function listenToAuth() {
//   return function (dispatch, getState) {
//     const ref = new Firebase(getState().fbUrl)
//     ref.onAuth( (authData)=>{
//       if (authData) {
//         const profilesRef = ref.child('profile'),
//           authRef = ref.child('auth').child(authData.uid);

//         authRef.once('value', (authSnap)=>{
//           const profileKey = authSnap.val()
//           const profileRef = profileKey ? profilesRef.child(profileKey) : profilesRef.push(OAuthToProfile(authData))
//           if (!profileKey) authRef.set(profileRef.name()) // THIS SHOULD BE SET SERVER-SIDE??
//           profileRef.once('value', (profileSnap)=>{
//             console.log("profile loaded");
//             dispatch(profileLoaded(profileSnap.val()));
//             dispatch(loginSuccess(authData.uid));
//           })
//         })
//       } else {
//         dispatch({ type: LOGOUT_SUCCESS });
//       }
//     })
//   }
// }

// export function login() {
//   return function (dispatch, getState) {
//     dispatch({ type: LOGIN_ATTEMPT });
//     const ref = new Firebase(getState().fbUrl)
//     ref.authWithOAuthRedirect('google', (error)=>{
//       if (error) { dispatch({type:LOGOUT_SUCCESS}) }
//     }, {scope:'email'})
//   }
// }

// export function logout() {
//   return function (dispatch, getState) {
//     const ref = new Firebase(getState().fbUrl)
//     ref.unauth();
//     dispatch({ type: LOGOUT_SUCCESS });
//   }
// }

// export function loginSuccess(uid) {
//   return {
//     type: LOGIN_SUCCESS,
//     uid
//   }
// }

// export function profileLoaded(profile) {
//   return {
//     type: PROFILE_LOADED,
//     profile
//   }
// }