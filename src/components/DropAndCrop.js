import React from 'react';
import Radium from 'radium'

import RaisedButton from 'material-ui/lib/raised-button'

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

  styles = {
    dropzone: {
      border: '3px dashed #666',
      borderRadius: '1em'
    }
  }

  open = ()=>this.refs.dropzone.open()

  onDrop = (files)=>this.setState({image:files[0].preview})

  onCrop = ()=>{
    const canvas = this.refs.cropper.getCroppedCanvas()
    canvas && this.props.onImageChange(canvas.toDataURL())
  }

  render() {
    const { open, onDrop, onCrop, state:{image}, props:{style} } = this
    return <Dropzone ref='dropzone' onDrop={onDrop} multiple={false} disableClick={true} style={[this.styles.dropzone,style]}>
      {image &&
          <Cropper ref='cropper' src={image} aspectRatio={3/1} crop={onCrop}
            autoCrop={true} style={style}
            />
        ||
        <div style={{padding:'1em',display:'flex',alignItems:'center'}}>
          <span>Drop an Image Here or</span>
          <RaisedButton primary={true} onTouchTap={open} label='Choose a File'/>
        </div>
      }
    </Dropzone>
  }
}

export default DropAndCrop;

