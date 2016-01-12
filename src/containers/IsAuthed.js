import React from 'react';
import { connect } from 'react-redux';
import authSelector from '../selectors/authSelector'

class IsAuthed extends React.Component {
  render() { return (this.props.hide && this.props.auth) ? this.props.children : null }
}

export default connect(authSelector)(IsAuthed);
