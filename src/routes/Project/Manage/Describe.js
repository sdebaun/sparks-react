require('react-crop/cropper.css')

import React from 'react';
import Content from 'components/Content'

import Cropper from 'react-crop'

class Describe extends React.Component {
  state = {
    image: null,
    previewUrl: null
  }

  onChange = (evt)=>this.setState({image:evt.target.files[0]})

  crop = async ()=>{
    let image = await this.refs.crop.cropImage()
    this.setState({previewUrl: window.URL.createObjectURL(image)})
  }

  clear = ()=>{
    this.refs.file.value = null
    this.setState({
      previewUrl: null,
      image: null
    })
  }

  imageLoaded = (img)=>{
    if (img.naturalWidth && img.naturalWidth < 100 && img.naturalHeight && img.naturalHeight < 100) {
      this.crop()
    }
  }

  render() {
    return (
      <Content>
        <p>Find a cool background image to help identify your project.</p>
        <input ref='file' type='file' onChange={this.onChange}/>
        {this.state.image &&
          <div>
            <Cropper ref='crop' image={this.state.image} width={100} height={100}
              onImageLoaded={this.onImageLoaded}/>
            <button onClick={this.crop}>Crop</button>
            <button onClick={this.clear}>Clear</button>
          </div>
        }
        { this.state.previewUrl &&
          <div><img src={this.state.previewUrl}/></div>
        }
      </Content>
    );
  }
}

export default {
  component: Describe
}