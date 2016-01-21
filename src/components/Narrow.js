import React from 'react';

class Narrow extends React.Component {
  render() { return (
    <div style={{width:400,margin:'auto'}} {...this.props}>
      { this.props.children }
    </div>
  ) }
}

export default Narrow
