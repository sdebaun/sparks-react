import React from 'react';

import NavTabs from 'components/NavTabs'
import Tab from 'material-ui/lib/tabs/tab'

class Main extends React.Component {
  
  render() {
    return (
      <div>
        <NavTabs>
          <Tab label='To Do' route='/'/>
        </NavTabs>
        {this.props.children}
      </div>
    );
  }

}

export default Main;
