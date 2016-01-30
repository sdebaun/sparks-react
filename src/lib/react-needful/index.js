import React from 'react'

const defaultComponent = <div>loading...</div>

export const wanting = wants => WrappedComponent => {
  class Wrapper extends React.Component {
    seek = (props)=> Object.keys(wants).forEach( p=> wants[p](props) )
    // when i mount i seek out my wants
    componentWillMount = ()=>{
      console.log('mount', this.__proto__.constructor.displayName, this.props)
      this.seek(this.props)
    }
    componentWillUpdate = (newProps)=>{
      console.log('update', this.__proto__.constructor.displayName, newProps)
      this.seek(newProps)
    }
    // passthrough rendering
    render = ()=> <WrappedComponent {...this.props}/>
  }
  Wrapper.displayName = 'Wanting(' + (WrappedComponent.displayName||WrappedComponent.name) + ')'
  return Wrapper
}

export const needful = (needs,needyComponent=defaultComponent) => WrappedComponent => {
  class Wrapper extends React.Component {
    // i am satisfied if every one of my needs exists in props
    satisfied = ()=>needs.every( p=> this.props[p] )
    // render if i am satisfied, or my needyComponent if i am not
    render = ()=> this.satisfied() && <WrappedComponent {...this.props}/> || needyComponent
  }
  Wrapper.displayName = 'Needful(' + (WrappedComponent.displayName||WrappedComponent.name) + ')'
  return Wrapper
}
