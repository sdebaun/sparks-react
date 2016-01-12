import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import remote from '../remote'

class Auth extends React.Component {
  render() { return false }

  componentWillMount() { this.props.listen() }
}

function mapStateToProps(state) {
  return { }
}

function mapDispatchToProps(dispatch) {
  return {listen: ()=>dispatch(remote.auth.listen())}
}

// export default connect(mapStateToProps,mapDispatchToProps)(Auth);
export default connect(mapStateToProps,mapDispatchToProps)(Auth);
