import React from 'react';
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/lib/raised-button'
import AppBar from 'material-ui/lib/app-bar'
import Tabs from 'material-ui/lib/tabs/tabs'
import Tab from 'material-ui/lib/tabs/tab'
import Dialog from 'material-ui/lib/dialog'
// import LeftNav from 'material-ui/lib/left-nav'

// import IconButton from 'material-ui/lib/icon-button';
// import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
// import IconMenu from 'material-ui/lib/menus/icon-menu';
// import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
// import MenuItem from 'material-ui/lib/menus/menu-item';

import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import TextField from 'material-ui/lib/text-field'

import AddCircle from 'material-ui/lib/svg-icons/content/add-circle';

// import { pushPath } from 'redux-simplae-router'

class ProjectsComponent extends React.Component {
  componentWillMount() {
    this.setState({open:false})
  }

  handleOpen() { this.setState({open:true}) }
  handleClose(val=null) {
    this.setState({open:false})
    if (val) this.props.projectPush({name:val})
  }

  render() {
    return (
      <div>
        <List>
          <ListItem primaryText='Create a Project'
            secondaryText='Start a new project for an Early Access Partner.'
            leftIcon={<AddCircle/>}
            onTouchTap={()=>this.handleOpen()}
            />
        </List>
        <Dialog title='Create Project'
          actions={[<RaisedButton label='OK' onTouchTap={()=>this.handleClose(this.refs.nameField.getValue())}/>,
            <RaisedButton label='Cancel' onTouchTap={()=>this.handleClose()}/>]}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          >
          <TextField floatingLabelText='Name' ref='nameField' />
        </Dialog>
      </div>
    );
  }

}

ProjectsComponent.defaultState = {
  open: false
}

import { Projects } from '../../remote'

function mapStateToProps(state) {
  return {
    projects: state.data.Projects || {}
  };
}

function mapDispatchToProps(dispatch) {
  return {
    projectPush: (...args)=>dispatch(Projects.push(...args)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProjectsComponent);
