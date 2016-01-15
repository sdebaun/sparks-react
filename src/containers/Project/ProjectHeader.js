import React from 'react';

class ProjectHeader extends React.Component {
  render() {
    return (
      <div style={Object.assign({backgroundColor:'#EEEEDD'},this.props.style)}>
        {this.props.project && this.props.project.name}
      </div>
    );
  }
}

export default ProjectHeader;
