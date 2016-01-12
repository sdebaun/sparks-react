import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import remote from '../remote'

class Fetch extends React.Component {

  componentWillMount() {
    console.log("Fetch.componentWillMount this.props:", this.props)
    this.loadFrom(this.props)
  }

  componentWillReceiveProps(nextProps) {
    console.log("Fetch.componentWillReceiveProps", nextProps)
    if ((nextProps.collection != this.props.collection) || (nextProps.itemKey != this.props.itemKey)) {
      this.loadFrom(nextProps)
    }
  }

  loadFrom(props) { this.props.watch(props.collection, props.itemKey) }

  render() { return null }

}

function mapStateToProps(state) {
  return { }
}

function mapDispatchToProps(dispatch) {
  return {watch: (...args)=>dispatch(remote.watch(...args))}
}

// export default connect(mapStateToProps,mapDispatchToProps)(Auth);
export default connect(mapStateToProps,mapDispatchToProps)(Fetch);