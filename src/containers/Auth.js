import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { listenToAuth } from '../actions/index'

class Auth extends React.Component {
  render() { return false }

  componentWillMount() {
    this.props.listenToAuth()
  }
}

function mapStateToProps(state) {
  return { }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({listenToAuth},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);
