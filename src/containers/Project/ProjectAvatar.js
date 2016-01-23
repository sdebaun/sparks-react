import React from 'react';

class ProjectAvatar extends React.Component {
  render() {
    const {props:{projectImage}} = this

    const style = {
      // display: 'inline-block',
      // height: '30px !important',
      // width: '40px !important',
      // display:'flex',
      // flexDirection:'column', justifyContent:'flex-end',
      backgroundImage: 'url('+projectImage.dataUrl+')',
      // zIndex: 0,
      backgroundSize: 'cover' //,
    }
    // return <img src={projectImage.dataUrl} style={iconStyle}/>
    return <div style={{...style, ...this.props.style}}>&nbsp;</div>
  }
}

export default ProjectAvatar