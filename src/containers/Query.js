import React from 'react';
import { connect } from 'react-redux';

import remote from '../remote'

class Query extends React.Component {

  componentWillMount() {
    this.loadFrom(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.collection != this.props.collection) ||
        (nextProps.orderByChild != this.props.orderByChild) ||
        (nextProps.equalTo != this.props.equalTo)) {
      this.loadFrom(nextProps)
    }
  }

  loadFrom(props) {
    const params = {
      orderByChild: this.props.orderByChild,
      equalTo: this.props.equalTo
    }
    this.props.query(props.collection, params)
  }

  render() { return null }

}

function mapStateToProps() {
  return { }
}

function mapDispatchToProps(dispatch) {
  return {query: (...args)=>dispatch(remote.query(...args))}
}

// export default connect(mapStateToProps,mapDispatchToProps)(Auth);
export default connect(mapStateToProps,mapDispatchToProps)(Query);