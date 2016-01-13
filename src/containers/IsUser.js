import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect'

import { currentProfileSelector } from '../selectors'

class IsUser extends React.Component {
  render() { return (<div>
    {((this.props.show && this.props.profile) || (!this.props.show && !this.props.profile)) && this.props.children }
    </div>);
  }
}

IsUser.defaultProps = {
  show: true
}

const mapStateToProps = createSelector(
  currentProfileSelector,
  (profile)=>{ return {profile} }
)

export default connect(mapStateToProps)(IsUser);
