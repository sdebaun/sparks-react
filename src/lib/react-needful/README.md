# react-needful

Simple async data requests for smart components.

So you have a smart component that needs to know about some data that you fetch asynchronously.  Wrap it in a ```needful``` higher-order-component, and tell it what properties it needs, and what to do if it doesnt have them.  

The ```needful``` component will check those properties when it is first mounted, and if they don't exist, will execute the async actions specified.  As long as there it has needed properties that don't exist, the component will display a "loading..." placeholder.

## install

npm install react-needful

## example

Here's an example of using ```needful``` with ```redux```.

```Project.actions.query``` and ```Project.selectors.collection``` are part of reduxfire, a simple middleware for subscribing to firebase locations.  The former simply returns an action that, when it is handled by the reduxfire middleware, makes the async call and updates the store with the response.  The latter is a selector that watches that corresponding part of the store.

```javascript
// a simple component that needs information
const ProjectPage = ({projects})=>
  <div>
    { projects.map( p=> <ProjectRow project={p}/> ) }
  </div>

// a component to show when we're waiting to have needs satisfied
const Waiting = ()=><div>loading...</div>

// need:satisfier() mapping.  The satisfier will be passed the component's props.
// in this case, its using the dispatch prop provided by redux.
const needs = {
  project: ({dispatch})=>dispatch(Project.actions.query(projectKey))
}

// standard redux mapping, using a reduxfire model
const mapState = createSelector(
  Project.selectors.collection,
  (projects)=>{ return {projects} }
)

// shazam!
export default connect(mapState)(needful(needs,Waiting)(MyComponent))
```

