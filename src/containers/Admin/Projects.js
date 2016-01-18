// import React from 'react';
// import { connect } from 'react-redux';

// import List from 'material-ui/lib/lists/list'

// import Query from 'containers/Query'
// import NavListItem from 'components/NavListItem'

// import CreateProjectListItem from 'containers/Admin/CreateProjectListItem'

// import { pushPath } from 'redux-simple-router'

// class ProjectsComponent extends React.Component {
//   componentWillMount() {
//     this.setState({open:false})
//   }

//   handleOpen() { this.setState({open:true}) }
//   handleClose(val=null) {
//     this.setState({open:false})
//     if (val) this.props.projectPush({name:val}).then( (projectKey)=>{
//       this.props.pushPath('/project/'+projectKey)
//     })
//   }

//   render() {
//     return (
//       <div>
//         <Query collection='Projects'/>
//         <List>
//           <CreateProjectListItem/>
//           {Object.keys(this.props.projects).map(key=>{
//             return <NavListItem key={key} route={'/project/'+key} primaryText={this.props.projects[key].name}/>
//           })}
//         </List>
//       </div>
//     );
//   }

// }

// ProjectsComponent.defaultState = {
//   open: false
// }

// import { Projects } from 'remote'

// function mapStateToProps(state) {
//   return {
//     projects: state.data.Projects || {}
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     projectPush: (...args)=>dispatch(Projects.push(...args)),
//     pushPath: (...args)=>dispatch(pushPath(...args))
//   }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(ProjectsComponent);
