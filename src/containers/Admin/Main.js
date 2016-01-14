import React from 'react';

import MainBar from 'components/MainBar'
import NavTabs from 'components/NavTabs'
import Tab from 'material-ui/lib/tabs/tab'

class Main extends React.Component {
  
  render() {
    return (
      <div className="index">
        <MainBar />
        <NavTabs baseUrl='/admin'>
          <Tab label='Projects' route=''/>
          <Tab label='Other' route='/other'/>
        </NavTabs>
        {this.props.children}
      </div>
    );
  }

}

export default Main;
