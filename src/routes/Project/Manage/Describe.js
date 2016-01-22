import React from 'react';
import Content from 'components/Content'

import Cropper from 'react-cropper'
import Dropzone from 'react-dropzone'

import RaisedButton from 'material-ui/lib/raised-button'
import FlatButton from 'material-ui/lib/flat-button'

import ProjectHeader from 'containers/Project/ProjectHeader'

class Describe extends React.Component {
  state = {
    image: null,
    previewUrl: null
  }

  onDrop = (files)=>this.setState({image:files[0].preview})

  open = ()=>this.refs.dropzone.open()

  crop = ()=>{
    this.setState({previewUrl: this.refs.cropper.getCroppedCanvas().toDataURL()})
  }

  // crop = async ()=>{
  //   let image = await this.refs.crop.cropImage()
  //   this.setState({previewUrl: window.URL.createObjectURL(image)})
  // }

  clear = ()=>{
    this.refs.file.value = null
    this.setState({
      previewUrl: null,
      image: null
    })
  }

  // imageLoaded = (img)=>{
  //   if (img.naturalWidth && img.naturalWidth < 100 && img.naturalHeight && img.naturalHeight < 100) {
  //     this.crop()
  //   }
  // }

  render() {
    return (
      <Content style={{marginTop:'1em'}}>
        <p>Find a cool background image to help identify your project.</p>
        <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',alignItems:'center'}}>
          <Dropzone style={{border:'1px solid red', minWidth:360,minHeight:180}} ref='dropzone' onDrop={this.onDrop} multiple={false} disableClick={true}>
            {!this.state.image &&
              <div style={{padding:'2em'}}>
                <p>Drop an Image Here or</p>
                <RaisedButton primary={true} onTouchTap={this.open} label='Choose a File'/>
              </div>
            }
            {this.state.image &&
              <div style={{border:'1px solid green', minHeight:181, minWidth:361}}>
                <Cropper ref='cropper' src={this.state.image}
                  aspectRatio={2/1} guides={true} crop={this.crop}
                  />
                <RaisedButton disabled={!this.state.image} primary={true} onTouchTap={this.crop} label='Try This' style={{marginRight:'1em'}}/>
                <FlatButton disabled={!this.state.image} secondary={true} onTouchTap={this.open} label='Pick Another' style={{marginRight:'1em'}}/>
              </div>
            }
          </Dropzone>
          <div>
            <ProjectHeader style={{width:360,height:180}} imageUrl={this.state.previewUrl} primaryText='Your Project' secondaryText='Subtitle'/>
          </div>
        </div>
      </Content>
    );
  }
}

            // { this.state.previewUrl && <div><img src={this.state.previewUrl}/></div> }

export default {
  component: Describe
}