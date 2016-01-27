import React from 'react';
import { connect } from 'react-redux';

import ListItem from 'material-ui/lib/lists/list-item'
import Avatar from 'material-ui/lib/avatar'

export default ( {fullName, profileImageURL, ...props} ) =>
  <ListItem {...props}
    leftAvatar={<Avatar src={profileImageURL}/>}
    primaryText={fullName}
    />



// export default class ProfileListItem extends React.Component {
//   render() {
//     const {props: { fullName,profileImageURL,...props }} = this
//     return <ListItem {...props}
//       leftAvatar={<Avatar src={profileImageURL}/>}
//       primaryText={fullName}
//       />
//   }
// }
