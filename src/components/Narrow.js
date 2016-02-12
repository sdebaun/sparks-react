import React from 'react';

export default class Narrow extends React.Component {
  render() { return (
    <div style={{maxWidth:600,margin:'auto'}} {...this.props}>
      { this.props.children }
    </div>
  ) }
}