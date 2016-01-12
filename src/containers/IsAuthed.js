import React from 'react';
import { connect } from 'react-redux';

class IsAuthed extends React.Component {
  render() { return (<div>
    {((this.props.show && this.props.auth) || (!this.props.show && !this.props.auth)) && this.props.children }
    </div>);
  }
}

IsAuthed.defaultProps = {
  show: true
}

function mapStateToProps(state) {
  return { auth: state.auth }
}

export default connect(mapStateToProps)(IsAuthed);
