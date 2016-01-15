import React from 'react';

import IsMobile from 'components/IsMobile'
import LeftNavButton from 'components/LeftNavButton'

import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';

class ProjectHeader extends React.Component {
  render() {
    return (
      <div style={{backgroundColor:'#997766'}}>
        <Toolbar style={Object.assign({backgroundColor:'transparent'},this.props.style)}>
          <ToolbarGroup>
            <IsMobile><LeftNavButton/></IsMobile>
          </ToolbarGroup>
          <ToolbarGroup>
            {this.props.project && this.props.project.name}
          </ToolbarGroup>
        </Toolbar>
        { this.props.children }
      </div>
    );
  }
}

export default ProjectHeader;

        // <div style={Object.assign({display:'flex',flexDirection:'row'},this.props.style)}>
        // </div>

        // { this.props.children && React.cloneElement(this.props.children, {style:{backgroundColor:'transparent'}}) }
