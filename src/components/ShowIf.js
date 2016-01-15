import React from 'react';

class ShowIf extends React.Component {
  render() {
    return (
      <div>{ this.props.isTrue && this.props.children }</div>
    );
  }
}

export default ShowIf;
