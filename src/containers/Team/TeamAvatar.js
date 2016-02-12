import React from 'react';

import HelpIcon from 'material-ui/lib/svg-icons/action/help';

const avatarStyle = {
  height: '32px !important',
  width: '32px !important'
}
export default ({src})=> src && <img style={avatarStyle} src={src}/> || <HelpIcon color='white'/>

// export default class TeamAvatar extends React.Component {
//   render() {
//     const {props:{teamImage}} = this

//     const style = {
//       // display: 'inline-block',
//       height: '32px !important',
//       width: '32px !important' //,
//       // display:'flex',
//       // flexDirection:'column', justifyContent:'flex-end',
//       // backgroundImage: 'url('+projectImage.dataUrl+')',
//       // zIndex: 0,
//       // backgroundSize: 'cover' //,
//     }
//     return <img src={teamImage.dataUrl} style={{...style, ...this.props.style}}/>
//   }
// }