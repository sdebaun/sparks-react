import React from 'react';
import Original from 'material-ui/lib/select-field';

class Patched extends React.Component {
  render() {
    return <Original {...this.props} onChange={(e,i,v)=>this.props.onChange(v)}>{this.props.children}</Original>
  }
}

export default Patched;
