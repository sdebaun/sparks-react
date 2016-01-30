import React from 'react'

const defaultComponent = <div>loading...</div>

export const wanting = wants => WrappedComponent =>
  class Wrapper extends React.Component {
    // when i mount i seek out my wants
		componentWillMount = ()=>Object.keys(wants).forEach( p=> wants[p](this.props) )
    // passthrough rendering
		render = ()=> <WrappedComponent {...this.props}/>
  }

export const needful = (needs,needyComponent=defaultComponent) => WrappedComponent =>
  class Wrapper extends React.Component {
  	// i am satisfied if every one of my needs exists in props
  	satisfied = ()=>needs.every( p=> this.props[p] )
  	// render if i am satisfied, or my needyComponent if i am not
  	render = ()=> this.satisfied() && <WrappedComponent {...this.props}/> || needyComponent
  }
