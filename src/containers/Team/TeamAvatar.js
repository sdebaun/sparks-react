import React from 'react';

export default class TeamAvatar extends React.Component {
  render() {
    const {props:{teamImage}} = this

    const style = {
      // display: 'inline-block',
      height: '32px !important',
      width: '32px !important' //,
      // display:'flex',
      // flexDirection:'column', justifyContent:'flex-end',
      // backgroundImage: 'url('+projectImage.dataUrl+')',
      // zIndex: 0,
      // backgroundSize: 'cover' //,
    }
    return <img src={teamImage.dataUrl} style={{...style, ...this.props.style}}/>
  }
}