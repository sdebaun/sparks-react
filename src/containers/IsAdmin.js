import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect'

// import { authedProfileSelector } from '../selectors'

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

import { Profiles } from 'remote'

const mapStateToProps = createSelector(
  Profiles.select.authed,
  (profile)=>{ return { isAdmin: profile && profile.isAdmin } }
)

export default connect(mapStateToProps)(IsAdmin);
