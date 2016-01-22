import React from 'react';

import IsMobile from 'components/IsMobile'
import LeftNavButton from 'components/LeftNavButton'

import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
// import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';

import Colors from 'material-ui/lib/styles/colors';

class ProjectHeader extends React.Component {
  render() {
    const {sideNav} = this.props
    const style = {
      display:'flex', flexDirection:'column', justifyContent:'flex-end',
      backgroundImage: 'linear-gradient(rgba(0,0,0,0.70),rgba(0,0,0,0.80)), url('+this.props.imageUrl+')',
      zIndex: 0,
      backgroundSize: 'cover'
    }
    return (

      <div style={{...style , ...this.props.style}}>
        <Toolbar style={{backgroundColor:'transparent', display:'flex', alignItems:'center'}}>
          { sideNav &&
            <ToolbarGroup firstChild={true}>
              <IsMobile><LeftNavButton/></IsMobile>&nbsp;
            </ToolbarGroup>
          }
          <ToolbarGroup style={{color:'white'}}>
            <div>
              <div style={{fontSize:'1.5em'}}>{this.props.primaryText}</div>
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

