import React from 'react'

const defaultComponent = <div>loading...</div>

export default (needs,needyComponent=defaultComponent) => WrappedComponent => {
  class Wrapper extends React.Component {
    satisfied = _=>true

    componentWillMount = ()=>console.log('this.props',this.props)

    render = _=> this.satisfied() && <WrappedComponent {...this.props}/> || needyComponent
  }

  return Wrapper
}
