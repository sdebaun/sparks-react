import React from 'react';
import Radium from 'radium'

import RaisedButton from 'material-ui/lib/raised-button'
import FlatButton from 'material-ui/lib/flat-button'

import _Cropper from 'react-cropper'
import _Dropzone from 'react-dropzone'

const Cropper = Radium(_Cropper)
const Dropzone = Radium(_Dropzone)

const initialState = {
  image: null,
  previewUrl: null
}

class DropAndCrop extends React.Component {
  state = initialState

  open = ()=>this.refs.dropzone.open()

  onDrop = (files)=>this.setState({image:files[0].preview})

  onCrop = ()=>{
    const canvas = this.refs.cropper.getCroppedCanvas()
    canvas && this.props.onImageChange(canvas.toDataURL())
  }

  render() {
    const { open, onDrop, onCrop, state:{image}, props:{style, aspectRatio} } = this
    return <Dropzone ref='dropzone' onDrop={onDrop} multiple={false} disableClick={true} style={{}}>
      {image &&
        <div>
          <div style={{display:'flex',justifyContent:'center',marginBottom:'0.5em'}}>
            {this.props.children}
            <FlatButton onTouchTap={open} label='Try Another One'/>
          </div>
          <Cropper ref='cropper' {...{style,aspectRatio,src:image,crop:onCrop,autoCrop:true}}/>
        </div>
        ||
        <div style={{padding:'1em',display:'flex',justifyContent:'center', alignItems:'center',border: '3px dashed #666',borderRadius:'1em'}}>
          <span>Drop an Image or</span>
          <RaisedButton primary={true} onTouchTap={open} label='Choose an Image' style={{marginLeft:'1em'}}/>
        </div>
      }
    </Dropzone>
  }
}

export default DropAndCrop;

