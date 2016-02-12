import React from 'react'

import RaisedButton from 'material-ui/lib/raised-button'

class LoginButton extends React.Component {
  login = ()=> this.props.login(this.props.provider)

  render() {
    const {props: {provider}} = this
    return <RaisedButton label={'Sign in with ' + provider} onClick={this.login}/>
  }
}

import { connect } from 'react-redux'
import remote from 'remote'

const mapStateToProps = ()=>{ return {} }

const mapDispatchToProps = {
  login: remote.auth.login
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginButton);