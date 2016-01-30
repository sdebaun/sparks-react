import React from 'react'

const defaultComponent = <div>loading...</div>

export default (needs,needyComponent=defaultComponent) => WrappedComponent =>
  class Wrapper extends React.Component {

    // i am satisfied if every one of my needs exists in props
    satisfied = ()=>Object.keys(needs).every( p=> this.props[p] )

    // run the satisfier for each of my unsatisfied needs
    // satisfy = ()=>Object.keys(needs).forEach( p=> this.props[p] || needs[p](this.props) )
    satisfy = ()=>Object.keys(needs).forEach( p=> needs[p](this.props) )
    // satisfy = ()=>{
    //     console.log('satisfying',needs)
    //     Object.keys(needs).forEach( p=> needs[p](this.props) )
    // }

    // when i start up, satisfy myself if am unsatisfied
    // componentWillMount = ()=>this.satisfied() || this.satisfy()
    componentWillMount = ()=>this.satisfy()

    // render if i am satisfied, or my needyComponent if i am not
    render = ()=> this.satisfied() && <WrappedComponent {...this.props}/> || needyComponent
  }
