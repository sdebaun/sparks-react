import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect'

import { currentProfileSelector } from '../selectors'

class IsAdmin extends React.Component {
  render() { return (<div>
    {((this.props.show && this.props.isAdmin) || (!this.props.show && !this.props.isAdmin)) && this.props.children }
    </div>);
  }
}

IsAdmin.defaultProps = {
  show: true
}

// function mapStateToProps(state) {
//   return { profile: state.auth }
// }
const mapStateToProps = createSelector(
  currentProfileSelector,
  (profile)=>{ return { isAdmin: profile && profile.isAdmin } }
)

export default connect(mapStateToProps)(IsAdmin);
