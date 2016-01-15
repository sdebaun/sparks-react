import React from 'react';
import { connect } from 'react-redux';

import remote from '../remote'

class Fetch extends React.Component {

  componentWillMount() {
    this.loadFrom(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.collection != this.props.collection) || (nextProps.itemKey != this.props.itemKey)) {
      this.loadFrom(nextProps)
    }
  }

  loadFrom(props) { this.props.watch(props.collection, props.itemKey) }

  render() { return null }

}

function mapStateToProps() {
  return { }
}

function mapDispatchToProps(dispatch) {
  return {watch: (...args)=>dispatch(remote.watch(...args))}
}

// export default connect(mapStateToProps,mapDispatchToProps)(Auth);
export default connect(mapStateToProps,mapDispatchToProps)(Fetch);