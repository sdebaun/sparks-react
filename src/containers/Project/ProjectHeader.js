import React from 'react';

import IsMobile from 'components/IsMobile'
import LeftNavButton from 'components/LeftNavButton'

import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';

import Colors from 'material-ui/lib/styles/colors';

        // <Toolbar style={Object.assign({backgroundColor:'transparent', display:'flex', alignItems:'center'},this.props.style)}>

class ProjectHeader extends React.Component {
  render() {
    return (
      <div style={{backgroundColor:Colors.grey800, display:'flex', flexDirection:'column', justifyContent:'flex-end', ...this.props.style}}>
        <Toolbar style={{backgroundColor:'transparent', display:'flex', alignItems:'center'}}>
          <ToolbarGroup firstChild={true}>
            <IsMobile><LeftNavButton/></IsMobile>&nbsp;
          </ToolbarGroup>
          <ToolbarGroup style={{color:'white'}}>
            <div>
              <div style={{fontSize:'1.1em'}}>{this.props.primaryText}</div>
              <div style={{fontSize:'0.9em',color:Colors.grey300}}>{this.props.secondaryText}</div>
            </div>
          </ToolbarGroup>
        </Toolbar>
        { this.props.children && React.cloneElement(this.props.children,{ tabItemContainerStyle:{backgroundColor:'transparent'} }) }
      </div>
    );
  }
}

export default ProjectHeader;

        // <div style={Object.assign({display:'flex',flexDirection:'row'},this.props.style)}>
        // </div>

        // { this.props.children && React.cloneElement(this.props.children, {style:{backgroundColor:'transparent'}}) }
