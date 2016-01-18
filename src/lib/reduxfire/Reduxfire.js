import Firebase from 'firebase'

import rfAuth from './rfAuth'
import rfData from './rfData'

export default class Reduxfire {
  constructor(fbUrl) {
    this.fbUrl = fbUrl
    this.ref = new Firebase(fbUrl)
    this.auth = new rfAuth(this.ref);
    this.data = new rfData(this.ref);
  }

}