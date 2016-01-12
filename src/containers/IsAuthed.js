import React from 'react';
import { connect } from 'react-redux';
import authSelector from '../selectors/authSelector'

class IsAuthed extends React.Component {
  render() { return (<div>
    {((this.props.show && this.props.auth) || (!this.props.show && !this.props.auth)) && this.props.children }
    </div>);
  }
}

IsAuthed.defaultProps = {
  show: true
}

export default connect(authSelector)(IsAuthed);
