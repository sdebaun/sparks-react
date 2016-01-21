import React from 'react';

class Content extends React.Component {
  render() { return (
    <div style={{display:'flex', flexDirection:'column',margin:'0em 1em'}}>
      { this.props.children }
    </div>
  ) }
}

export default Content
