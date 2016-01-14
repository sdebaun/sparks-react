import React from 'react';
import { connect } from 'react-redux';

// import RaisedButton from 'material-ui/lib/raised-button'
// import AppBar from 'material-ui/lib/app-bar'
// import Tabs from 'material-ui/lib/tabs/tabs'
// import Tab from 'material-ui/lib/tabs/tab'
// import IconButton from 'material-ui/lib/icon-button';
// import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
// import IconMenu from 'material-ui/lib/menus/icon-menu';
// import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
// import MenuItem from 'material-ui/lib/menus/menu-item';

// import { Link } from 'react-router';
// import { pushPath } from 'redux-simple-router'

class Invite extends React.Component {
  
  render() {
    return (
      <div className="index">
        This is the Glance/Invite page
      </div>
    );
  }

}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Invite);
