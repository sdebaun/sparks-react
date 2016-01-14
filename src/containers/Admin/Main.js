import React from 'react';
import { connect } from 'react-redux';

// import RaisedButton from 'material-ui/lib/raised-button'
import MainBar from 'components/MainBar'
import Tabs from 'material-ui/lib/tabs/tabs'
import Tab from 'material-ui/lib/tabs/tab'
// import LeftNav from 'material-ui/lib/left-nav'

// import IconButton from 'material-ui/lib/icon-button';
// import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
// import IconMenu from 'material-ui/lib/menus/icon-menu';
// import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
// import MenuItem from 'material-ui/lib/menus/menu-item';

import { pushPath } from 'redux-simple-router'

import AppIconMenu from '../../components/AppIconMenu';

class Main extends React.Component {
  
  render() {
    const dispatch = this.props.dispatch

    return (
      <div className="index">
        <MainBar />
        <Tabs>
          <Tab label='Projects' route='/' onActive={ tab=>dispatch(pushPath(tab.props.route)) }/>
        </Tabs>
        {this.props.children}
      </div>
    );
  }

}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Main);
