// import React from 'react';

// import List from 'material-ui/lib/lists/list';
// import NavListItem from 'components/NavListItem'
// import CreateTeamListItem from 'containers/Team/CreateTeamListItem'

// export class Container extends React.Component {
//   render() {
//     const {props: {teams, children, ...props}} = this
//     return (
//       <List>
//         {teams.map( t=>
//           <NavListItem key={t.$key} primaryText={t.name} targetRoute={'/team/'+t.$key} {...props}/>
//         )}
//         {children}
//       </List>
//     )
//   }
// }

// import { connect } from 'react-redux';
// import { createSelector } from 'reselect'
// import { Teams } from 'remote'

// const mapStateToProps = createSelector(
//   Teams.select.by('projectKey'),
//   (teams)=>{ return {teams} }
// )

// export default connect(mapStateToProps)(Container)