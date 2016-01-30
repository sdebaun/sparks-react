# react-needful

Simple async data requests for smart components.

So you have a smart component that needs to know about some data that you fetch asynchronously.  Wrap it in a ```needful``` higher-order-component, and tell it what properties it needs, and what to do if it doesnt have them.  

The ```needful``` component will check those properties when it is first mounted, and if they don't exist, will execute the async actions specified.  As long as there it has needed properties that don't exist, the component will display a "loading..." placeholder.

## install

npm install react-needful

## example

Here's an example of using ```needful``` with ```redux```.

```javascript
// a simple component that needs information
const ProjectHeader = ({project:{title,description}})=>
  <div>
    <h1>{title}</h1>
    <p>{description}</p>
  </div>

const needs = {
  project: ({projectKey})=>AsyncActionToLoadProject(projectKey)
}

const mapState = createReducer(
  ASelectorForAProject,
  (project)=>{ return {project,people} }
)

export default connect(mapState)(needful(needs,MyComponent))
```